import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Layout, BookOpen, FileText, BarChart, Trophy, Target, Gift, Megaphone, HelpCircle, Settings, Menu } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg p-5 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-40 lg:translate-x-0 lg:relative lg:w-64`}
      >
        <div className="flex items-center justify-start mb-6">
          {/* Image */}
          <img src="/logo.png" alt="Logo" className="w-18 h-16 me-2" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">QuizMorphs</h2>
        </div>
        <nav>
          <ul className="space-y-4">
            <SidebarItem to="/" icon={<Layout size={20} />} label="Dashboard" />
            <SidebarItem to="/classroom" icon={<BookOpen size={20} />} label="Classrooms" />
            <SidebarItem to="/quizzes" icon={<FileText size={20} />} label="Quizzes" />
            <SidebarItem to="/progress" icon={<BarChart size={20} />} label="Progress" />
            <SidebarItem to="/challenges" icon={<Trophy size={20} />} label="Challenges" />
            <SidebarItem to="/announcements" icon={<Target size={20} />} label="Announcements" />
            <SidebarItem to="/rewards" icon={<Gift size={20} />} label="Rewards" />
            <SidebarItem to="/leaderboard" icon={<Megaphone size={20} />} label="Leaderboard" />
            <SidebarItem to="/help" icon={<HelpCircle size={20} />} label="Help" />
            <SidebarItem to="/studsettings" icon={<Settings size={20} />} label="Settings" />
          </ul>
        </nav>
      </aside>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 bg-white text-black p-2 rounded-md lg:hidden mt-7 ms-4"
      >
        <Menu size={18} />
      </button>
    </>
  );
};

const SidebarItem = ({ to, icon, label }) => (
  <li className="flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
    {icon}
    <Link to={to}>{label}</Link>
  </li>
);

export default Sidebar;
