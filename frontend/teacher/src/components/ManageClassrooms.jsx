import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const ManageClassrooms = () => {
  const navigate = useNavigate();

  // Predefined Classrooms (Ensure they are unique)
  const predefinedClassrooms = [
    { id: 1, name: "SY IT C", subject: "UCSD" },
    { id: 2, name: "SY IT C", subject: "DSA" },
  ];

  // Load classrooms from local storage, ensuring predefined classrooms aren't duplicated
  const [classrooms, setClassrooms] = useState(() => {
    const savedClassrooms = JSON.parse(localStorage.getItem("classrooms")) || [];
    const uniqueSavedClassrooms = savedClassrooms.filter(
      (cls) =>
        !predefinedClassrooms.some(
          (predefined) =>
            predefined.name === cls.name && predefined.subject === cls.subject
        )
    );
    return [...predefinedClassrooms, ...uniqueSavedClassrooms];
  });

  const [editingClassroom, setEditingClassroom] = useState(null);
  const [newName, setNewName] = useState("");
  const [newSubject, setNewSubject] = useState("");

  // Update local storage whenever classrooms change (excluding predefined classrooms)
  useEffect(() => {
    localStorage.setItem(
      "classrooms",
      JSON.stringify(classrooms.filter((cls) => !predefinedClassrooms.includes(cls)))
    );
  }, [classrooms]);

  // Handle Delete
  const handleDelete = (id) => {
    setClassrooms(classrooms.filter((classroom) => classroom.id !== id));
  };

  // Handle Edit
  const handleEdit = (id) => {
    const classroom = classrooms.find((cls) => cls.id === id);
    setEditingClassroom(id);
    setNewName(classroom.name);
    setNewSubject(classroom.subject);
  };

  // Save Edited Classroom
  const handleSaveEdit = (id) => {
    setClassrooms(
      classrooms.map((cls) =>
        cls.id === id ? { ...cls, name: newName, subject: newSubject } : cls
      )
    );
    setEditingClassroom(null);
  };

  return (
    <div className="p-6 md:ml-64">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Manage Classrooms</h1>

      {classrooms.length === 0 ? (
        <p className="text-gray-500 text-lg">No classrooms created yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classrooms.map((classroom) => (
            <div
              key={classroom.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-300 dark:border-gray-700 flex flex-col justify-between"
            >
              {editingClassroom === classroom.id ? (
                <div>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="block w-full border p-2 rounded mb-2 focus:ring focus:ring-blue-300"
                  />
                  <input
                    type="text"
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    className="block w-full border p-2 rounded mb-2 focus:ring focus:ring-blue-300"
                  />
                  <button
                    onClick={() => handleSaveEdit(classroom.id)}
                    className="w-full bg-green-600 text-white px-3 py-2 rounded-md shadow hover:bg-green-700 transition"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                    {classroom.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">{classroom.subject}</p>

                  {/* Edit & Delete Buttons */}
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => handleEdit(classroom.id)}
                      className="bg-blue-600 text-white px-3 py-2 rounded-md shadow hover:bg-blue-700 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(classroom.id)}
                      className="bg-red-600 text-white px-3 py-2 rounded-md shadow hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}

              {/* Open Classroom Button */}
              <button
                onClick={() => navigate(`/classroom/${classroom.id}`)}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition"
              >
                Open Classroom
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageClassrooms;
