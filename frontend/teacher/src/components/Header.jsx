import React, { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

const Header = () => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const [scrollY, setScrollY] = useState(0);
  const [hidden, setHidden] = useState(false);

  // Handle Theme Change
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Handle Scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > scrollY && window.scrollY > 50) {
        setHidden(true); // Hide header when scrolling down
      } else {
        setHidden(false); // Show header when scrolling up
      }
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY]);

  return (
    <header
      className={`fixed top-5 left-10 md:left-72 right-5 max-w-[calc(100%-2.5rem)] md:max-w-[calc(100%-18rem)] z-50 flex justify-between items-center px-6 py-3 bg-white dark:bg-gray-900 rounded-lg shadow-lg transition-all duration-300 ${
        hidden ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      {/* Left - Title */}
      <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
        QuizMorphs
      </h1>

      {/* Right - Dark Mode Toggle + Profile */}
      <div className="flex items-center gap-4">
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-all hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          {darkMode ? <Sun className="text-yellow-500" /> : <Moon />}
        </button>

        {/* Profile Icon */}
        <img
          src="https://randomuser.me/api/portraits/men/10.jpg"
          alt="Profile"
          className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-500 shadow-md"
        />
      </div>
    </header>
  );
};

export default Header;
