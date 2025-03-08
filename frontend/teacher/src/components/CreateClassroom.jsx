import React, { useState, useEffect } from "react";
import { PlusCircle, X, BookOpen, School, Check, Users, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CreateClassroom = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [classroom, setClassroom] = useState({ 
    name: "", 
    subject: "", 
    grade: "",
    section: "" 
  });

  const [classrooms, setClassrooms] = useState(() => {
    const storedClassrooms = JSON.parse(localStorage.getItem("classrooms")) || [];
    const defaultClassrooms = [
      { id: 1, name: "SY IT C", subject: "UCSD" },
      { id: 2, name: "SY IT C", subject: "DSA" }
    ];
    return storedClassrooms.length > 0 ? storedClassrooms : defaultClassrooms;
  });

  useEffect(() => {
    localStorage.setItem("classrooms", JSON.stringify(classrooms));
  }, [classrooms]);

  const handleSaveClassroom = () => {
    if (classroom.name && classroom.subject) {
      const newClassroom = { id: Date.now(), ...classroom };
      const updatedClassrooms = [...classrooms, newClassroom];

      setClassrooms(updatedClassrooms);
      localStorage.setItem("classrooms", JSON.stringify(updatedClassrooms));

      setClassroom({ name: "", subject: "", grade: "", section: "" });
      setShowForm(false);
    } else {
      alert("Please fill in all required fields!");
    }
  };

  return (
    <div className="mt-24 ml-64 p-8 bg-white rounded-3xl shadow-md border border-gray-200">
      {!showForm ? (
        <div className="text-center max-w-md mx-auto">
          <div className="mb-6">
            <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <School size={32} className="text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Create New Classroom</h2>
            <p className="text-gray-600">
              Set up a virtual learning space for your students with all the tools you need.
            </p>
          </div>
          
          <button
            onClick={() => setShowForm(true)}
            className="group w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-xl hover:from-indigo-700 hover:to-blue-600 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <PlusCircle size={20} className="group-hover:rotate-90 transition-transform duration-200" />
            <span className="font-medium">Get Started</span>
          </button>
        </div>
      ) : (
        <div className="animate-fadeIn max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-800">Create Your Classroom</h3>
              <p className="text-gray-600 mt-1">Fill in the details to set up your virtual classroom</p>
            </div>
            <button
              onClick={() => setShowForm(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-4">
              <div className="relative">
                <School size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Classroom Name *"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all duration-200"
                  value={classroom.name}
                  onChange={(e) => setClassroom({ ...classroom, name: e.target.value })}
                />
              </div>

              <div className="relative">
                <BookOpen size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Subject *"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all duration-200"
                  value={classroom.subject}
                  onChange={(e) => setClassroom({ ...classroom, subject: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setShowForm(false)}
              className="flex-1 px-6 py-3.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveClassroom}
              className="flex-1 px-6 py-3.5 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-xl hover:from-green-700 hover:to-emerald-600 transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2 font-medium"
            >
              <Check size={20} />
              Create Classroom
            </button>
          </div>
        </div>
      )}

      {/* Display Created Classrooms */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold text-gray-800">Your Classrooms</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {classrooms.map((cls) => (
            <div 
              key={cls.id} 
              className="p-4 bg-gray-50 rounded-xl shadow-md border flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-all"
            >
              <div>
                <h4 className="text-md font-semibold">{cls.name}</h4>
                <p className="text-gray-500 text-sm">{cls.subject}</p>
              </div>
              <button
                onClick={() => navigate('/manage-classrooms')}
                className="text-blue-600 font-semibold"
              >
                View
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateClassroom;
