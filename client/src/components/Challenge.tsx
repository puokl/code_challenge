import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "../styles.css";
import { highlightTestResults } from "../utils/resultStyle";
import Modal from "../utils/Modal";

interface Challenge {
  id: number;
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

  const handleToggleSolution = () => {
    if (!showSolution) {
      setIsModalOpen(true); // Open modal if trying to show solution
    } else {
      setShowSolution(false); // Hide solution immediately
    }
  };

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
      const response = await fetch("http://localhost:3001/submit", {
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
      console.log("result", result.error);

      if (!response.ok) {
        console.error("Server error:", response.status, response.statusText);
        console.log("Error response body:", result);
        setTestResults(result.error);
        return;
      }

      console.log("Test Results:", result);

      if (result.stderr) {
        console.log("Test Failures or Errors:", result.stderr);
        const clean_stderr = result.stderr.split("\nRan all test")[0];
        setTestResults(clean_stderr);
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
    <div className="container mx-auto">
      <h1 className="text-3xl font-semibold mb-4">{challenge.title}</h1>
      <p className="text-gray-600 mb-4">{challenge.description}</p>
      <div className="flex">
        <div className="first flex-1 w-1/2">
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
          />

          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white font-semibold py-2 px-4 rounded-md mt-4"
          >
            Submit
          </button>
        </div>
        {testResults && !isLoading && (
          <div className="second flex-1 ml-5">
            <h2 className="text-2xl font-semibold mb-4">Test Results</h2>
            <div className="test-results">
              <pre
                dangerouslySetInnerHTML={{
                  __html: highlightTestResults(testResults),
                }}
              />
            </div>
          </div>
        )}
        {isLoading && (
          <div className="second flex-1 ml-5">
            <h2 className="text-2xl font-semibold mb-4">Test Results</h2>
            <div>Loading...</div>
          </div>
        )}
      </div>

      <button
        onClick={handleToggleSolution}
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md mt-4"
      >
        {showSolution ? "Hide Solution" : "Show Solution"}
      </button>

      {showSolution && (
        <div className="solution mt-4">
          <h2 className="text-2xl font-semibold mb-4">Solution</h2>
          <pre className="text-sm">{challenge.solution}</pre>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmShowSolution}
      />
    </div>
  );
};

export default Challenge;
