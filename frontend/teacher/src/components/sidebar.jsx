import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Layout,
  Users,
  BookOpen,
  Award,
  MessageSquare,
  Settings,
  Menu,
  X,
  HelpCircle,
  PlusCircle,
  List,
} from "lucide-react";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();

  const predefinedClassrooms = [
    { id: 1, name: "SY IT C", subject: "UCSD" },
    { id: 2, name: "SY IT C", subject: "DSA" },
  ];

  const [classrooms, setClassrooms] = useState([]);

  useEffect(() => {
    const savedClassrooms = JSON.parse(localStorage.getItem("classrooms")) || [];
    setClassrooms([...predefinedClassrooms, ...savedClassrooms]);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedClassrooms = JSON.parse(localStorage.getItem("classrooms")) || [];
      setClassrooms([...predefinedClassrooms, ...updatedClassrooms]);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50  text-white p-2 rounded-lg shadow-lg transition-transform duration-300 hover:bg-gray-700"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Sidebar"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-xl p-6 transition-transform duration-300 z-40 
          ${isOpen ? "translate-x-0" : "-translate-x-64"} md:translate-x-0 flex flex-col`}
      >
        {/* Logo and Brand Name */}
        <div className="flex items-center space-x-3 mb-6">
          <img src="/logo-svg.svg" alt="Logo" className="w-16 h-16 rounded-full shadow-md" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">QuizMorphs</h2>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 flex-grow">
          <NavLink
            to="/create-classroom"
            className={({ isActive }) =>
              `flex items-center p-3 rounded-lg transition-all duration-300 ${
                isActive
                  ? " shadow-md"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`
            }
            aria-label="Create Classroom"
          >
            <PlusCircle className="mr-3" /> Create Classroom
          </NavLink>

          <NavLink
            to="/manage-classrooms"
            className={({ isActive }) =>
              `flex items-center p-3 rounded-lg transition-all duration-300 ${
                isActive
                  ? "  shadow-md"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`
            }
            aria-label="Manage Classrooms"
          >
            <List className="mr-3" /> Manage Classrooms
          </NavLink>

          <NavLink to="/" className="flex items-center p-3 rounded-lg hover:bg-gray-200">
            <Layout className="mr-3" /> Dashboard
          </NavLink>
          <NavLink to="/students" className="flex items-center p-3 rounded-lg hover:bg-gray-200">
            <Users className="mr-3" /> Students
          </NavLink>
          <NavLink to="/quizzes" className="flex items-center p-3 rounded-lg hover:bg-gray-200">
            <BookOpen className="mr-3" /> Quizzes
          </NavLink>
          <NavLink to="/leaderboard" className="flex items-center p-3 rounded-lg hover:bg-gray-200">
            <Award className="mr-3" /> Leaderboard
          </NavLink>
          <NavLink to="/doubt-forum" className="flex items-center p-3 rounded-lg hover:bg-gray-200">
            <MessageSquare className="mr-3" /> Doubts
          </NavLink>
          <NavLink to="/help" className="flex items-center p-3 rounded-lg hover:bg-gray-200">
            <HelpCircle className="mr-3" /> Help
          </NavLink>
          <NavLink to="/settings" className="flex items-center p-3 rounded-lg hover:bg-gray-200">
            <Settings className="mr-3" /> Settings
          </NavLink>
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
          aria-label="Close Sidebar"
        />
      )}
    </>
  );
};

export default Sidebar;
