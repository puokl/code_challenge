import React from "react";

interface TestResultsProps {
  resultText: string;
}

const TestResults: React.FC<TestResultsProps> = ({ resultText }) => {
  const formattedText = resultText.split("\n").map((line, index) => {
    if (line.startsWith("PASS")) {
      return (
        <div key={index} className="text-green-500">
          {line}
        </div>
      );
    } else if (line.startsWith("FAIL")) {
      return (
        <div key={index} className="text-red-500">
          {line}
        </div>
      );
    } else if (line.startsWith("✓")) {
      return (
        <div key={index} className="pl-4">
          {line}
        </div>
      );
    } else {
      return <div key={index}>{line}</div>;
    }
  });

  return <div className="font-mono">{formattedText}</div>;
};

export default TestResults;
