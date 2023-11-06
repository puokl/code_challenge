import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

interface Challenge {
  id: number;
  title: string;
  level?: string;
  category?: string;
  description: string;
  functionName: string;
  initialCode: string;
  testCases: { input: string; output: string }[];
}
interface Local {
  id: number;
  title: string;
}

const ChallengeList: React.FC = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [passedChallenges, setPassedChallenges] = useState<Local[]>([]);

  const categories = useMemo(() => {
    const allCategories = new Set(
      challenges
        .map((challenge) => challenge.category)
        .filter((category): category is string => category !== undefined)
    );
    return ["all", ...allCategories];
  }, [challenges]);

  const filteredChallenges = useMemo(() => {
    return selectedCategory === "all"
      ? challenges
      : challenges.filter(
          (challenge) => challenge.category === selectedCategory
        );
  }, [challenges, selectedCategory]);

  useEffect(() => {
    const passedChallengesString =
      localStorage.getItem("passedChallenges") || "[]";
    setPassedChallenges(JSON.parse(passedChallengesString));
  }, []);

  useEffect(() => {
    fetch("/utils/challenges.json")
      .then((response) => response.json())
      .then((data: Challenge[]) => setChallenges(data))
      .catch((error) => console.error("Error loading challenges:", error));
  }, []);

  return (
    <div className="flex">
      {/* Sidebar for filters */}
      <aside className="w-64 bg-white p-4 border-r">
        <ul>
          {categories.map((category) => (
            <li key={category}>
              <button
                onClick={() => setSelectedCategory(category)}
                className={`block text-left p-2 mb-2 rounded ${
                  selectedCategory === category
                    ? "bg-blue-500 text-white"
                    : "bg-transparent hover:bg-gray-200"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            </li>
          ))}
        </ul>
      </aside>
      <div className="flex-grow container mx-auto p-4">
        <h1 className="text-3xl font-semibold mb-6 text-center">
          Javascript Coding Challenges
        </h1>
        <div className="bg-white p-4 shadow rounded">
          <ul>
            {filteredChallenges.map((challenge) => (
              <li
                key={challenge.id}
                className="mb-6 rounded border bg-gray-50 hover:shadow-md transition-shadow duration-200"
                style={{ backgroundColor: "#f9fafb" }}
              >
                <div className="flex justify-between p-4 hover:bg-gray-50 rounded-lg">
                  <div className="flex flex-col justify-between flex-grow">
                    <h2 className="text-xl font-semibold">
                      {challenge.title}
                      <span
                        className={`inline-block ml-2 align-middle text-xs font-semibold py-1 px-2.5 rounded-full ${
                          challenge.level === "easy"
                            ? "bg-green-200 text-green-800"
                            : challenge.level === "medium"
                            ? "bg-yellow-200 text-yellow-800"
                            : "bg-red-200 text-red-800"
                        }`}
                      >
                        {challenge.level}
                      </span>
                    </h2>
                    <p className="text-gray-600 mt-2 text-sm">
                      {challenge.description.length > 100
                        ? challenge.description.substring(0, 97) + "..."
                        : challenge.description}
                    </p>
                  </div>
                  <Link
                    to={`/challenge/${challenge.id}`}
                    className="self-center"
                  >
                    <button className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-md text-sm">
                      View
                    </button>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Sidebar for completed challenges */}
      <aside className="w-64 bg-white p-4 border-l">
        <div className="sticky top-0">
          <h2 className="text-2xl font-semibold mb-4">Progress</h2>
          <p className="text-lg mb-4">
            {passedChallenges.length}/{challenges.length} completed
          </p>
          {passedChallenges.length > 0 && (
            <ul className="list-disc pl-4">
              {passedChallenges.map((passedChallenge) => (
                <li
                  key={passedChallenge.id}
                  className="mb-2 text-gray-700 text-sm"
                >
                  {passedChallenge.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>
    </div>
  );
};

export default ChallengeList;
