import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import DashboardCard from "./components/DashboardCard";
import Classroom from "./components/Classroom";  // Import Classroom
import mockData from "./data/mockData";
import Announcements from "./components/Announcements";
import Leaderboard from "./components/Leaderboard";
import Help from "./components/Help";
import Challenges from "./components/Challenges";
import StudSettings from "./components/StudSettings";


const App = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Router>
      <div className="flex">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} />

        {/* Main Content */}
        <main className="flex-1 bg-gray-100 dark:bg-gray-800 p-6">
          <Header 
            toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} 
            isSidebarOpen={isSidebarOpen} 
          />

          <Routes>
            {/* Dashboard Route */}
            <Route 
              path="/" 
              element={
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
                  {mockData.map((item, index) => (
                    <DashboardCard key={index} {...item} />
                  ))}
                </div>
              } 
            />

            {/* Classroom Route */}
            <Route path="/classroom" element={<Classroom />} />
            <Route path="/announcements" element={<Announcements />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/help" element={<Help />} />
            <Route path="/challenges" element={<Challenges />} />
            <Route path="/studsettings" element={<StudSettings />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
