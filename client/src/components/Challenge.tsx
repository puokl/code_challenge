import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "../styles.css";
import { highlightTestResults } from "../utils/resultStyle";
import Modal from "../utils/Modal";
import { useNavigate } from "react-router-dom";

interface Challenge {
  id: number;
  level?: string;
  title: string;
  description: string;
  functionName: string;
  initialCode: string;
  note?: string;
  note2?: string;
  solution?: string;
}

const Challenge: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [userCode, setUserCode] = useState("");
  const [testResults, setTestResults] = useState<string | null>(null);
  const [challengeId, setChallengeId] = useState<number | null>(null);
  const [challengeName, setChallengeName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [activeTab, setActiveTab] = useState("editor");

  //ANCHOR -
  const [confirmShowSolution, setConfirmShowSolution] = useState(false);

  const handleToggleSolution = () => {
    if (!showSolution) {
      // If we're about to show the solution, ask for confirmation
      setConfirmShowSolution(true);
    } else {
      // If we're hiding the solution, just hide it without confirmation
      setShowSolution(false);
    }
  };

  const confirmSolution = (answer: any) => {
    if (answer) {
      setShowSolution(true);
    }
    setConfirmShowSolution(false);
  };

  //ANCHOR -

  const navigate = useNavigate();

  const goBackToHome = () => {
    navigate("/");
  };

  // const handleToggleSolution = () => {
  //   if (!showSolution) {
  //     setIsModalOpen(true); // Open modal if trying to show solution
  //   } else {
  //     setShowSolution(false); // Hide solution immediately
  //   }
  // };

  const handleConfirmShowSolution = () => {
    setShowSolution(true);
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:5000/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: userCode,
          challengeId: challengeId,
          challengeName: challengeName,
        }),
      });

      const result = await response.json();
      console.log("result", result);

      if (!response.ok) {
        console.error("Server error:", response.status, response.statusText);
        console.log("Error response body:", result);
        setTestResults(result.error);
        return;
      }

      if (result.stderr) {
        console.log("Test Failures or Errors:", result.stderr);
        const clean_stderr = result.stderr.split("\nRan all test")[0];
        setTestResults(clean_stderr);

        // Check if the first word is PASS
        const testOutcome = clean_stderr.split(" ")[0];
        if (testOutcome === "PASS") {
          // Retrieve the item from localStorage and if it's null, default to "[]"
          const passedChallengesString =
            localStorage.getItem("passedChallenges") || "[]";
          const passedChallenges = JSON.parse(passedChallengesString);

          const challengeData = { title: challengeName, id: challengeId };
          const challengeExists = passedChallenges.some(
            (c: any) => c.id === challengeData.id
          );

          if (!challengeExists) {
            passedChallenges.push(challengeData);
            localStorage.setItem(
              "passedChallenges",
              JSON.stringify(passedChallenges)
            );
          }
        }
      }
    } catch (error) {
      console.error("Error submitting code:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (id) {
      fetch("/utils/challenges.json")
        .then((response) => response.json())
        .then((data: Challenge[]) => {
          const selectedChallenge = data.find(
            (ch) => ch.id === parseInt(id, 10)
          );
          if (selectedChallenge) {
            setChallenge(selectedChallenge);
            setUserCode(selectedChallenge.initialCode);
            setChallengeId(selectedChallenge.id);
            setChallengeName(selectedChallenge.functionName);
          }
        })
        .catch((error) => console.error("Error loading challenge:", error));
    }
  }, [id]);

  if (!challenge) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-8">
      <button
        onClick={goBackToHome}
        className="absolute top-2 left-2 bg-blue-500 text-white font-semibold py-2 px-4 rounded-md"
        style={{ position: "absolute" }} // Ensure it is positioned in the top-left
      >
        Home
      </button>
      <h1 className="text-4xl font-bold mb-6">{challenge.title}</h1>
      <p className="text-gray-700 mb-2">{challenge.description}</p>
      {challenge.note && (
        <p className="text-gray-500 text-xs mb-4">{challenge.note}</p>
      )}

      <div className="flex">
        <div className="flex-1 w-1/2 pr-2">
          <CodeMirror
            value={userCode}
            options={{
              mode: "javascript",
              theme: "default",
              lineNumbers: true,
            }}
            onBeforeChange={(_editor, _data, value) => {
              setUserCode(value);
            }}
            editorDidMount={(editor) => {
              editor.setSize(null, "400px");
            }}
          />
        </div>

        <div className="flex-1 w-1/2 pl-2">
          <div
            className={`h-full border bg-slate-100 ${
              isLoading
                ? "border-stone-400 animate-pulse border-4"
                : "border-gray-300"
            } rounded-md p-4`}
          >
            <h2 className="text-2xl font-semibold mb-4">Test Results</h2>
            {isLoading ? (
              <div className="text-gray-500">Running tests...</div>
            ) : (
              testResults && (
                <div className="test-results overflow-auto whitespace-pre-wrap">
                  <pre
                    dangerouslySetInnerHTML={{
                      __html: highlightTestResults(testResults),
                    }}
                  />
                </div>
              )
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white font-semibold py-2 px-4 rounded-md mt-4 w-36"
        >
          Submit
        </button>
        {/* <button
          onClick={handleToggleSolution}
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md mt-6 w-36"
        >
          {showSolution ? "Hide Solution" : "Show Solution"}
        </button> */}
      </div>

      {/* {showSolution && (
        <div className="solution mt-4">
          <h2 className="text-2xl font-semibold mb-4">Solution</h2>
          <pre className="text-sm">{challenge.solution}</pre>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmShowSolution}
      /> */}

      <div>
        <button
          onClick={handleToggleSolution}
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md mt-6 w-36"
        >
          {showSolution ? "Hide Solution" : "Show Solution"}
        </button>
        {confirmShowSolution && (
          <span className="inline-block ml-4">
            Are you sure?
            <span
              onClick={() => confirmSolution(true)}
              className="text-green-600 cursor-pointer ml-2"
            >
              Yes
            </span>
            <span className="mx-1">/</span>
            <span
              onClick={() => confirmSolution(false)}
              className="text-red-600 cursor-pointer ml-1"
            >
              No
            </span>
          </span>
        )}
      </div>

      {showSolution && (
        <div className="solution mt-4">
          <h2 className="text-2xl font-semibold mb-4">Solution</h2>
          <pre className="text-sm">{challenge.solution}</pre>
        </div>
      )}
    </div>
  );
};

export default Challenge;
