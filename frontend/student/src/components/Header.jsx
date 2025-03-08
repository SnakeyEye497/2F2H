import React, { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

const Header = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-900 shadow-md">
      {/* Left - Title */}
      <h1 className="text-xl font-semibold text-gray-900 dark:text-white ms-7">
        QuizMorphs
      </h1>

      {/* Right - Dark Mode Toggle + Profile */}
      <div className="flex items-center gap-4">
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
        >
          {darkMode ? <Sun className="text-yellow-500" /> : <Moon />}
        </button>

        {/* Profile Icon */}
        <img
          src="https://randomuser.me/api/portraits/men/10.jpg"
          alt="Profile"
          className="w-10 h-10 rounded-full border border-gray-300"
        />
      </div>
    </header>
  );
};

export default Header;
