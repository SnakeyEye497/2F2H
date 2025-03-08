import React, { useState, useEffect } from "react";
import { BarChart, Folder, ArrowLeft, Plus } from "lucide-react";

const teacherNames = [
  "Amit Sharma", "Priya Patel", "Rahul Verma", "Neha Singh", "Vikram Joshi",
  "Suman Das", "Rohit Mehta", "Swati Kulkarni", "Anjali Rao", "Pankaj Gupta"
];

const subjectNames = [
  "Mathematics", "Software Engineering", "Computer Network", "Probability & Statistics",
  "Computer Graphics", "Computer Science", "Data Centric AI", "Data Ethics",
  "Web Technology", "Client Side Scripting"
];

const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const Classroom = () => {
  const storedClasses = JSON.parse(sessionStorage.getItem("joinedClasses")) || [
    {
      code: "DSA101",
      name: "Data Structures and Algorithms",
      subject: "Data Structures and Algorithms",
      teacher: "Manisha Gade",
      profile: "https://i.pravatar.cc/50?u=manisha",
      hasMaterials: false,
    },
  ];

  const [joinedClasses, setJoinedClasses] = useState(storedClasses);
  const [showJoinClass, setShowJoinClass] = useState(joinedClasses.length === 1);

  useEffect(() => {
    sessionStorage.setItem("joinedClasses", JSON.stringify(joinedClasses));
  }, [joinedClasses]);

  const handleJoinClass = (classCode) => {
    const subject = getRandomItem(subjectNames);
    const newClass = {
      code: classCode,
      name: subject,
      subject: subject,
      teacher: getRandomItem(teacherNames),
      profile: `https://i.pravatar.cc/50?u=${classCode}`,
      hasMaterials: false,
    };

    setJoinedClasses([...joinedClasses, newClass]);
    setShowJoinClass(false);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        {showJoinClass && joinedClasses.length > 1 && (
          <ArrowLeft
            size={28}
            className="cursor-pointer text-gray-700 hover:text-gray-900"
            onClick={() => setShowJoinClass(false)}
          />
        )}
        My Classrooms
      </h1>
      <p className="text-gray-600">Manage your classrooms efficiently.</p>

      {showJoinClass && <JoinClassroom onJoin={handleJoinClass} />}

      {!showJoinClass && (
        <>
          <button
            className="mt-4 flex items-center bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition"
            onClick={() => setShowJoinClass(true)}
          >
            <Plus size={20} className="mr-2" />
            Join Another Classroom
          </button>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {joinedClasses.map((classroom, index) => (
              <ClassroomCard key={index} classroom={classroom} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const JoinClassroom = ({ onJoin }) => {
  const [classCode, setClassCode] = useState("");

  const handleJoin = () => {
    if (classCode.trim()) {
      onJoin(classCode);
      setClassCode("");
    }
  };

  return (
    <div className="p-5 flex flex-col sm:flex-row gap-3 items-center bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
      <input
        type="text"
        placeholder="Enter Class Code"
        value={classCode}
        onChange={(e) => setClassCode(e.target.value)}
        className="border p-2 rounded w-full sm:flex-1"
      />
      <button
        onClick={handleJoin}
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
      >
        Join Class
      </button>
    </div>
  );
};

const ClassroomCard = ({ classroom }) => {
  return (
    <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white p-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold">{classroom.name}</h2>
        <img
          src={classroom.profile}
          alt="Teacher"
          className="w-10 h-10 rounded-full border-2 border-white shadow-lg"
        />
      </div>
      <div className="p-4">
        <p className="text-gray-700 dark:text-gray-300 font-medium">{classroom.subject}</p>
        <p className="text-gray-500 dark:text-gray-400">{classroom.teacher}</p>
      </div>
      <div className="p-4 flex justify-between border-t">
        <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center gap-1">
          <BarChart size={20} /> Stats
        </button>
        <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center gap-1">
          <Folder size={20} /> Files
        </button>
      </div>
      {!classroom.hasMaterials && (
        <p className="text-center text-gray-500 dark:text-gray-400 italic p-2">No materials uploaded</p>
      )}
    </div>
  );
};

export default Classroom;
