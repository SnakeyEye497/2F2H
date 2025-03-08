import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Quizzes from "./components/Quizzes";
import Students from "./components/Students";
import Leaderboard from "./components/Leaderboard";
import DiscussionForum from "./components/Doubtforium";
import Settings from "./components/Settings";
import Help from "./components/Help";
import CreateClassroom from "./components/CreateClassroom";
import ManageClassrooms from "./components/ManageClassrooms";
import ClassroomDetails from "./components/ClassroomDetails";

const App = () => {
  const [classrooms, setClassrooms] = useState([]);

  const handleAddClassroom = (newClassroom) => {
    setClassrooms([...classrooms, { ...newClassroom, notes: [] }]);
  };
  
  const handleDeleteClassroom = (id) => {
    setClassrooms(classrooms.filter((classroom) => classroom.id !== id));
  };
  
  const handleEditClassroom = (id) => {
    alert(`Edit functionality for classroom ID: ${id} (To be implemented)`);
  };

  const handleAddNote = (id, note) => {
    setClassrooms(classrooms.map(classroom => 
      classroom.id === id ? { ...classroom, notes: [...classroom.notes, note] } : classroom
    ));
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Sidebar classrooms={classrooms} />
        <main className="flex-1 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <Header className="text-2xl font-bold mb-4" />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/quizzes" element={<Quizzes />} />
            <Route path="/students" element={<Students />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/doubt-forum" element={<DiscussionForum />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/help" element={<Help />} />
            <Route path="/create-classroom" element={<CreateClassroom onClassroomAdd={handleAddClassroom} />} />
            <Route path="/manage-classrooms" element={<ManageClassrooms classrooms={classrooms} onDelete={handleDeleteClassroom} onEdit={handleEditClassroom} />} />
            <Route path="/classroom/:id" element={<ClassroomDetails onAddNote={handleAddNote} classrooms={classrooms} />} />
          </Routes>
        </main>
        <footer className="bg-gray-200 dark:bg-gray-700 p-4 text-center">
          <p className="text-sm">© 2025 QuizMorphs</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;