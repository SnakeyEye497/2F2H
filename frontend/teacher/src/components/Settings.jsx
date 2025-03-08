import React, { useState } from "react";
import { Sun, Moon, User, Lock, Bell, LogOut } from "lucide-react";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  return (
    <div className="max-w-2xl mt-24 mx-auto bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-xl shadow-lg mt-8 transition-all duration-300 ease-in-out ml-[530px]">
      {/* Title */}
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">⚙️ Settings</h2>

      {/* Profile Section */}
      <div className="flex items-center p-5 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md mb-6 transition-transform transform hover:scale-105">
        <User className="w-12 h-12 text-gray-700 dark:text-gray-300 mr-4" />
        <div>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">Rahul Sharma</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">rahul.sharma@example.com</p>
        </div>
      </div>

      {/* Settings Options */}
      <div className="space-y-4">
        {/* Dark Mode Toggle */}
        <div className="flex items-center justify-between p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 shadow-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition">
          <span className="text-gray-900 dark:text-white font-medium">Dark Mode</span>
          <button
            className="relative w-12 h-6 bg-gray-300 dark:bg-gray-600 rounded-full transition"
            onClick={toggleDarkMode}
          >
            <span
              className={`absolute left-1 top-1 w-4 h-4 bg-white dark:bg-yellow-500 rounded-full transition-transform transform ${
                darkMode ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Change Password */}
        <div className="flex items-center justify-between p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 shadow-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition">
          <div className="flex items-center">
            <Lock className="w-5 h-5 text-gray-600 dark:text-gray-300 mr-3" />
            <span className="text-gray-900 dark:text-white font-medium">Change Password</span>
          </div>
          <button className="text-blue-600 dark:text-blue-400 hover:underline transition duration-200">Edit</button>
        </div>

        {/* Manage Notifications */}
        <div className="flex items-center justify-between p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 shadow-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition">
          <div className="flex items-center">
            <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300 mr-3" />
            <span className="text-gray-900 dark:text-white font-medium">Manage Notifications</span>
          </div>
          <button className="text-blue-600 dark:text-blue-400 hover:underline transition duration-200">Edit</button>
        </div>

        {/* Logout Button */}
        <button className="w-full flex items-center justify-center bg-red-600 text-white py-3 rounded-lg shadow-md hover:bg-red-700 transition duration-200 ease-in-out transform hover:scale-105">
          <LogOut className="w-5 h-5 mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Settings;
