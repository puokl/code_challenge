import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface Challenge {
  id: number;
  title: string;
  description: string;
  functionName: string;
  initialCode: string;
  testCases: { input: string; output: string }[];
}

const ChallengeList: React.FC = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  useEffect(() => {
    fetch("/utils/challenges.json")
      .then((response) => response.json())
      .then((data: Challenge[]) => setChallenges(data))
      .catch((error) => console.error("Error loading challenges:", error));
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-semibold mb-4">
        Javascript Coding Challenges
      </h1>
      <h2></h2>
      <ul>
        {challenges.map((challenge, index) => (
          <li
            key={challenge.id}
            className={`mb-4 flex justify-between items-start ${
              index !== challenges.length - 1 ? "border-b pb-4" : ""
            }`}
          >
            <div>
              <h2 className="text-xl font-semibold">{challenge.title}</h2>
              <p className="text-gray-600">{challenge.description}</p>
            </div>
            <Link to={`/challenge/${challenge.id}`} className="ml-4">
              <button className="bg-blue-500 text-white font-semibold py-1 px-3 rounded-md text-sm w-32">
                View Challenge
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChallengeList;
