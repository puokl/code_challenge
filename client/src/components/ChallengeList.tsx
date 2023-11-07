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
    <div className="flex min-h-screen">
      {/* Sidebar for filters */}
      <aside className="w-64 bg-slate-100 p-4 border-r sticky top-0">
        <ul className="w-56 pt-20 text-md">
          {categories.map((category) => (
            <li key={category}>
              <button
                onClick={() => setSelectedCategory(category)}
                className={`block text-left p-[5px] pl-2 mb-[2px] w-full rounded font-short ${
                  selectedCategory === category
                    ? "bg-slate-400 text-white"
                    : "bg-transparent hover:bg-gray-200"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            </li>
          ))}
        </ul>
      </aside>
      {/* Main */}
      <div className="flex-grow container mx-auto p-4 bg-slate-100 ">
        <h1 className="text-3xl font-semibold mb-6 text-center font-permanent-marker">
          Javascript Coding Challenges
        </h1>
        <div className="bg-gray-100 p-2 shadow rounded">
          <ul>
            {filteredChallenges.map((challenge: any) => (
              <li
                key={challenge.id}
                className="mb-4 rounded border bg-gray-50 hover:shadow-md transition-shadow duration-200"
                style={{ backgroundColor: "#f9fafb" }}
              >
                <div className="flex justify-between p-4 hover:bg-gray-50 rounded-lg">
                  <div className="flex flex-col justify-between flex-grow">
                    <h2 className="text-xl font-semibold mr-2">
                      {challenge.title}
                      <span
                        className={`inline-block  align-middle text-xs font-semibold py-1 px-2.5 rounded-full mx-3 ${
                          challenge.level === "easy"
                            ? "bg-green-200 text-green-800"
                            : challenge.level === "medium"
                            ? "bg-yellow-200 text-yellow-800"
                            : "bg-red-200 text-red-800"
                        }`}
                      >
                        {challenge.level}
                      </span>
                      {passedChallenges.some(
                        (passedChallenge) => passedChallenge.id === challenge.id
                      ) && (
                        <span
                          className="text-red-500 ml-2 text-lg font-bold"
                          style={{ textShadow: "0 2px 2px rgba(0,0,0,0.25)" }}
                        >
                          ✓
                        </span>
                      )}
                    </h2>
                    <p className="text-gray-600 mt-2 text-sm">
                      {challenge.description.length > 120
                        ? challenge.description.substring(0, 115) + "..."
                        : challenge.description}
                    </p>
                  </div>
                  <Link
                    to={`/challenge/${challenge.id}`}
                    className="self-center"
                  >
                    <button className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-md text-sm font-changa">
                      Train
                    </button>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Sidebar for completed challenges */}
      <aside className="w-64 bg-slate-100 p-4 border-l min-h-screen">
        <div className="pt-20">
          <h2 className="text-2xl font-semibold mb-4 font-short">Progress</h2>
          <p className="text-lg mb-4 font-kalam">
            {passedChallenges.length}/{challenges.length} completed
          </p>
          {passedChallenges.length > 0 && (
            <ul className="list-disc pl-4">
              {passedChallenges.map((passedChallenge) => (
                <li
                  key={passedChallenge.id}
                  className="mb-2 text-gray-700 text-sm font-kalam"
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
