import React, { useState } from "react";
import { Sun, Moon, User, Lock, Bell, LogOut, Eye, EyeOff, CheckCircle } from "lucide-react";

const DarkModeToggle = ({ darkMode, toggleDarkMode }) => {
  return (
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
  );
};

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showPasswordCard, setShowPasswordCard] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [successMessage, setSuccessMessage] = useState(false); // ✅ Success message state

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  const handleChangePassword = () => {
    if (password.trim() !== "") {
      setSuccessMessage(true); // ✅ Show success message
      setPassword(""); // ✅ Clear input field
      setShowPasswordCard(false); // ✅ Hide password card

      // ✅ Hide message after 3 seconds
      setTimeout(() => setSuccessMessage(false), 3000);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-xl shadow-lg mt-8 transition-all duration-300 ease-in-out">
      {/* Title */}
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">⚙ Settings</h2>

      {/* Profile Section */}
      <div className="flex items-center p-5 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md mb-6 transition-transform transform hover:scale-105">
        <User className="w-12 h-12 text-gray-700 dark:text-gray-300 mr-4" />
        <div>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">Aman Gupta</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">aman.gupta@example.com</p>
        </div>
      </div>
      
      {/* Settings Options */}
      <div className="space-y-4">
        {/* Dark Mode Toggle */}
        <div className="flex items-center justify-between p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 shadow-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition">
          <span className="text-gray-900 dark:text-white font-medium">
            {darkMode ? "Light Mode" : "Dark Mode"}
          </span>
          <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </div>

        {/* Change Password */}
        <div className="flex items-center justify-between p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 shadow-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition">
          <div className="flex items-center">
            <Lock className="w-5 h-5 text-gray-600 dark:text-gray-300 mr-3" />
            <span className="text-gray-900 dark:text-white font-medium">Change Password</span>
          </div>
          <button
            onClick={() => setShowPasswordCard(!showPasswordCard)}
            className="text-blue-600 dark:text-blue-400 hover:underline transition duration-200"
          >
            {showPasswordCard ? "Cancel" : "Edit"}
          </button>
        </div>

        {/* Password Update Card */}
        {showPasswordCard && (
          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
            <label className="text-gray-900 dark:text-white font-medium mb-2 block">New Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full p-2 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-500 dark:text-gray-300"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            <button
              onClick={handleChangePassword}
              className="mt-3 bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              Update Password
            </button>
          </div>
        )}

        {/* ✅ Success Message */}
        {successMessage && (
          <div className="flex items-center bg-green-500 text-white p-3 rounded-lg shadow-md">
            <CheckCircle className="w-5 h-5 mr-2" />
            Password changed successfully!
          </div>
        )}

        {/* Manage Notifications (with Toggle) */}
        <div className="flex items-center justify-between p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 shadow-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition">
          <div className="flex items-center">
            <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300 mr-3" />
            <span className="text-gray-900 dark:text-white font-medium">Manage Notifications</span>
          </div>
          <button
            onClick={() => setNotifications(!notifications)}
            className={`relative w-12 h-6 ${
              notifications ? "bg-green-500" : "bg-gray-400"
            } rounded-full transition`}
          >
            <span
              className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform transform ${
                notifications ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
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
