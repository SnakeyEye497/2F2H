import React from "react";
import { FaBookOpen, FaUsers, FaCheckCircle, FaCommentDots } from "react-icons/fa";

const Dashboard = () => {
  const stats = [
    { title: "Total Quizzes", value: "156", icon: <FaBookOpen className="text-blue-500 text-4xl" />, change: "+12%", changeColor: "text-green-500" },
    { title: "Active Students", value: "2,847", icon: <FaUsers className="text-green-500 text-4xl" />, change: "+5%", changeColor: "text-green-500" },
    { title: "Completion Rate", value: "87%", icon: <FaCheckCircle className="text-purple-500 text-4xl" />, change: "+3%", changeColor: "text-green-500" },
    { title: "Pending Questions", value: "24", icon: <FaCommentDots className="text-orange-500 text-4xl" />, change: "-8%", changeColor: "text-red-500" },
  ];

  return (
    <div className="md:ml-64 mt-22 p-6 transition-all duration-300">
      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold">Welcome to QuizMorphs Admin Dashboard</h1>
        <p className="mt-2 text-lg">Monitor quiz performance, student progress, and engagement with ease.</p>
      </div>

      {/* Dashboard Heading */}
      <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mt-8">Dashboard Overview</h2>

      {/* Stats Grid */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-start transition-transform transform hover:scale-105 hover:bg-gray-100 dark:hover:bg-gray-700">
            <div className="flex justify-between items-center w-full">
              {stat.icon}
              <span className={`${stat.changeColor} font-semibold text-lg`}>{stat.change}</span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mt-3 text-lg">{stat.title}</p>
            <p className="text-4xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
