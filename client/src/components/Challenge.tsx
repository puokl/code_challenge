import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "../styles.css";
import { highlightTestResults } from "../utils/resultStyle";
import { useNavigate } from "react-router-dom";

interface ChallengeProps {
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
  const [challenge, setChallenge] = useState<ChallengeProps | null>(null);
  const [userCode, setUserCode] = useState("");
  const [testResults, setTestResults] = useState<string | null>(null);
  const [challengeId, setChallengeId] = useState<number | null>(null);
  const [challengeName, setChallengeName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState("instructions");

  const handleToggleSolution = () => {
    setShowSolution((prevShowSolution) => !prevShowSolution);
  };

  const navigate = useNavigate();

  const goBackToHome = () => {
    navigate("/");
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.REACT_APP_ENDPOINT}/submit`, {
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

      if (!response.ok) {
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
        .then((data: ChallengeProps[]) => {
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
    <div className="w-screen p-8 bg-slate-300">
      <button
        onClick={goBackToHome}
        className="flex absolute top-6 left-12 bg-blue-400 hover:bg-blue-600 text-white font-semibold py-1 px-4 rounded-lg"
      >
        {/* <img src="/home.png" alt="Home" className="mr-2 w-5 h-5" /> */}
        Home
      </button>
      <div className="flex w-full h-screen">
        <div className="info w-2/5 h-full p-4 flex flex-col bg-slate-200 overflow-auto rounded-lg mt-2 mr-2">
          <h1 className="text-4xl font-bold mb-6 mt-4 font-changa">
            {challenge.title}
          </h1>

          {/* Tab buttons */}
          <div className="flex mb-2">
            <button
              className={`px-4 py-1 rounded-lg font-changa ${
                activeTab === "instructions" ? " bg-slate-50" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("instructions")}
            >
              Instructions
            </button>
            <button
              className={`px-4 py-1 rounded-lg font-changa ${
                activeTab === "solution" ? " bg-slate-50" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("solution")}
            >
              Solution
            </button>
          </div>

          {/* Tab content */}
          {activeTab === "instructions" && (
            <div className="flex flex-col h-full border p-4 bg-gray-100 rounded-lg">
              {challenge.description.split("\n\n").map((paragraph, index) => (
                <p className="text-gray-700 mb-2 font-short">
                  {paragraph.trim()}
                </p>
              ))}

              {challenge.note && (
                <p className="text-gray-600 text-sm my-4 font-kalam">
                  {challenge.note}
                </p>
              )}
            </div>
          )}
          {activeTab === "solution" && (
            <div className="flex flex-col h-full border p-4 bg-gray-100 rounded-lg">
              <button
                onClick={handleToggleSolution}
                className="bg-teal-400 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-md my-4 w-1/3 mx-auto font-changa"
              >
                {showSolution ? "Hide Solution" : "Show Solution"}
              </button>

              {showSolution && (
                <pre className="text-sm whitespace-pre-wrap">
                  {challenge.solution}
                </pre>
              )}
            </div>
          )}
        </div>
        <div className="w-3/5 h-full flex flex-col">
          <div className="code h-1/2 p-2 overflow-auto relative">
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
            <div className="flex flex-col">
              <button
                onClick={handleSubmit}
                className="bg-emerald-400 hover:bg-emerald-600 text-white font-semibold py-1 px-3 rounded-md mt-4 w-36 absolute top-0 right-0 m-4"
              >
                Submit
              </button>
            </div>
          </div>

          <div className="test  h-1/2 p-2 overflow-auto">
            <div
              className={`h-full border bg-slate-100 ${
                isLoading
                  ? "border-stone-400 animate-pulse border-4"
                  : "border-gray-300"
              } rounded-md p-4`}
            >
              <h2 className="text-2xl font-semibold mb-4 font-changa">
                Test Results
              </h2>
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
      </div>
    </div>
  );
};

export default Challenge;
