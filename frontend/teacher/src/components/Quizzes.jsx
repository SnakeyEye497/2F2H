import React from "react";
import PropTypes from "prop-types"; // Import PropTypes for type checking
import { PlusCircle } from "lucide-react"; // Import icon from Lucide
import { Tooltip } from "react-tooltip";

const quizzes = [
  { id: 1, title: "Math Quiz", date: "March 5, 2025", questions: 10 },
  { id: 2, title: "Science Quiz", date: "March 7, 2025", questions: 15 },
  { id: 3, title: "History Quiz", date: "March 10, 2025", questions: 8 },
];

const Quizzes = () => {
  const handleCreateQuiz = () => {
    window.open("https://docs.google.com/forms/", "_blank"); // Opens Google Forms in a new tab
  };

  return (
    <div className="max-w-5xl mt-24 mx-auto bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg mt-4 ml-80">
      {/* Header Section */}
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Quizzes</h2>
        
        {/* Add Quiz Button with Tooltip */}
        <button
          className="flex items-center bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          onClick={handleCreateQuiz}
          aria-label="Create a new quiz" // Added aria-label for accessibility
          data-tip="Create a new quiz" // Tooltip for better user experience
        >
          <PlusCircle className="mr-2" /> Add Quiz
        </button>
        <Tooltip place="top" effect="solid" /> {/* Tooltip component */}
      </header>

      {/* Responsive Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 dark:border-gray-700 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
              <th className="border border-gray-300 dark:border-gray-700 p-4 text-left">ID</th>
              <th className="border border-gray-300 dark:border-gray-700 p-4 text-left">Title</th>
              <th className="border border-gray-300 dark:border-gray-700 p-4 text-left">Date</th>
              <th className="border border-gray-300 dark:border-gray-700 p-4 text-left">Questions</th>
            </tr>
          </thead>
          <tbody>
            {quizzes.map((quiz, index) => (
              <tr
                key={quiz.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50 dark:bg-gray-900" : "bg-white dark:bg-gray-800"
                } hover:bg-gray-200 dark:hover:bg-gray-700 transition-all`}
              >
                <td className="border border-gray-300 dark:border-gray-700 p-4">{quiz.id}</td>
                <td className="border border-gray-300 dark:border-gray-700 p-4">{quiz.title}</td>
                <td className="border border-gray-300 dark:border-gray-700 p-4">{quiz.date}</td>
                <td className="border border-gray-300 dark:border-gray-700 p-4">{quiz.questions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Added PropTypes for type checking
Quizzes.propTypes = {
  quizzes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      questions: PropTypes.number.isRequired,
    })
  ),
};

export default Quizzes;
