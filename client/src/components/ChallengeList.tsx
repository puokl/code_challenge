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
      <h1 className="text-3xl font-semibold mb-4">Coding Challenges</h1>
      <ul>
        {challenges.map((challenge) => (
          <li key={challenge.id} className="mb-4">
            <h2 className="text-xl font-semibold">{challenge.title}</h2>
            <p className="text-gray-600">{challenge.description}</p>
            <Link to={`/challenge/${challenge.id}`}>
              <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md mt-2">
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
