import React from "react";
import { Trophy } from "lucide-react";

const leaderboardData = [
  { id: 1, name: "Rahul Sharma", score: 98 },
  { id: 2, name: "Sneha Gupta", score: 92 },
  { id: 3, name: "Amit Verma", score: 88 },
  { id: 4, name: "Priya Singh", score: 85 },
  { id: 5, name: "Rohan Mehta", score: 82 },
];

const trophyIcons = [
  <Trophy className="w-6 h-6 text-yellow-500" />, // Gold Trophy
  <Trophy className="w-6 h-6 text-gray-400" />,  // Silver Trophy
  <Trophy className="w-6 h-6 text-orange-500" />, // Bronze Trophy
];

const Leaderboard = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg mt-[80px] ms-[450px]">
      {/* Leaderboard Heading */}
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">Leaderboard</h2>

      {/* Responsive Table Wrapper */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-400 dark:border-gray-600 rounded-lg shadow-md transition-shadow duration-300 hover:shadow-xl text-left">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 border border-gray-400 dark:border-gray-600 text-gray-900 dark:text-white">
              <th className="p-4 font-medium border border-gray-400 dark:border-gray-600">Rank</th>
              <th className="p-4 font-medium border border-gray-400 dark:border-gray-600">Student</th>
              <th className="p-4 font-medium border border-gray-400 dark:border-gray-600">Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((student, index) => (
              <tr
                key={student.id}
                className="border-b border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                {/* Rank */}
                <td className="p-4 font-semibold flex items-center gap-2 border border-gray-400 dark:border-gray-600">
                  {index < 3 ? trophyIcons[index] : index + 1}
                </td>
                <td className="p-4 border border-gray-400 dark:border-gray-600">{student.name}</td>
                <td className="p-4 font-medium border border-gray-400 dark:border-gray-600">{student.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;