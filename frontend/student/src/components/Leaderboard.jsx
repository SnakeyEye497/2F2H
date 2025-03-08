import React from "react";
import { Trophy, User } from "lucide-react"; // Importing icons

const students = [
  { id: 1, name: "Amit Sharma", score: 98 },
  { id: 2, name: "Neha Singh", score: 92 },
  { id: 3, name: "Rahul Verma", score: 88 },
  { id: 4, name: "Priya Patel", score: 85 },
  { id: 5, name: "Vikram Joshi", score: 80 },
];

const getRankIcon = (rank) => {
  if (rank === 1) return <Trophy size={24} className="text-yellow-500" />;
  if (rank === 2) return <Trophy size={24} className="text-gray-400" />;
  if (rank === 3) return <Trophy size={24} className="text-orange-500" />;
  return <User size={24} className="text-gray-600" />;
};

const Leaderboard = () => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg mt-5">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Leaderboard</h2>
      <ul className="space-y-3">
        {students.map((student, index) => (
          <li
            key={student.id}
            className="flex items-center justify-between p-3 border-b last:border-none"
          >
            <div className="flex items-center gap-3">
              {getRankIcon(index + 1)}
              <span className="text-lg font-medium">{student.name}</span>
            </div>
            <span className="text-gray-700 font-semibold">{student.score} pts</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
