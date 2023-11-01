import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import TestResults from "./TestResult";

interface Challenge {
  id: number;
  title: string;
  description: string;
  functionName: string;
  initialCode: string;
  testCases: { input: string; output: string }[];
}

const Challenge: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [userCode, setUserCode] = useState("");
  const [testResults, setTestResults] = useState<any[] | null>(null);

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
          }
        })
        .catch((error) => console.error("Error loading challenge:", error));
    }
  }, [id]);

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3001/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: userCode,
        }),
      });
      console.log("second");
      console.log("response", response);
      if (!response.ok) {
        console.error("Server error:", response.status, response.statusText);
        return;
      }

      const result = await response.json();
      console.log("first");
      console.log("Test Results:", result);
      // setTestResults(result[0]);
      setTestResults(result.stderr);
    } catch (error) {
      console.error("Error submitting code:", error);
    }
  };

  if (!challenge) return <div>Loading...</div>;

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-semibold mb-4">{challenge.title}</h1>
      <p className="text-gray-600 mb-4">{challenge.description}</p>
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
      {/* <button onClick={handleSubmit}>Submit</button> */}
      {testResults && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Test Results</h2>
          <ul>
            <TestResults resultText={JSON.stringify(testResults, null, 2)} />
            {/* {testResults.map((result, index) => (
              <li
                key={index}
                className={result.passed ? "text-green-500" : "text-red-500"}
              >
                {result.description}: {result.passed ? "Passed" : "Failed"}
              </li>
            ))} */}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Challenge;
