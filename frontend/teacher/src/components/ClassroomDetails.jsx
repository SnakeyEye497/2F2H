import { useParams } from "react-router-dom";
import { useState } from "react";

const ClassroomDetails = () => {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [notes, setNotes] = useState([]);
  const [assignments, setAssignments] = useState([
    { id: 1, title: "Assignment 1", dueDate: "March 15, 2025" },
    { id: 2, title: "Assignment 2", dueDate: "March 22, 2025" },
  ]);
  const [students, setStudents] = useState([
    "Alice Johnson",
    "Bob Smith",
    "Charlie Davis",
    "Diana King",
  ]);
  const [discussion, setDiscussion] = useState([]);
  const [message, setMessage] = useState("");
  const [showStudentList, setShowStudentList] = useState(false);
  const [viewAssignments, setViewAssignments] = useState(false);

  // Assign Task Functionality
  const handleAssignTask = () => {
    const taskName = prompt("Enter task name:");
    if (taskName) {
      setTasks([...tasks, { id: tasks.length + 1, name: taskName }]);
    }
  };

  // Handle File Upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newNote = {
        id: notes.length + 1,
        name: file.name,
        url: URL.createObjectURL(file),
      };
      setNotes([...notes, newNote]);
    }
  };

  // Handle Discussion Forum Messages
  const handlePostMessage = () => {
    if (message.trim()) {
      setDiscussion([...discussion, { id: discussion.length + 1, text: message }]);
      setMessage("");
    }
  };

  return (
    <div className="p-6 ml-64">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Classroom {id}</h1>

      {/* Classroom Features */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border">
        <h2 className="text-xl font-semibold mb-4">Classroom Management</h2>

        <div className="flex space-x-4 mb-6">
          <button
            onClick={handleAssignTask}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Assign Task
          </button>

          {/* Hidden File Input */}
          <input
            type="file"
            id="noteUpload"
            onChange={handleFileUpload}
            className="hidden"
          />

          <label
            htmlFor="noteUpload"
            className="bg-pink-600 text-white px-4 py-2 rounded-lg shadow hover:bg-pink-700 transition cursor-pointer"
          >
            Add Note
          </label>

          <button
            onClick={() => setViewAssignments(true)}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-700 transition"
          >
            View Assignments
          </button>
          <button
            onClick={() => setShowStudentList(true)}
            className="bg-orange-600 text-white px-4 py-2 rounded-lg shadow hover:bg-orange-700 transition"
          >
            Student List
          </button>
          <button
            onClick={() =>
              document
                .getElementById("discussion-section")
                .scrollIntoView({ behavior: "smooth" })
            }
            className="bg-gray-600 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-700 transition"
          >
            Discussion Forum
          </button>
        </div>

        {/* Display Assigned Tasks */}
        <h3 className="text-lg font-semibold mt-6">Assigned Tasks:</h3>
        {tasks.length === 0 ? (
          <p className="text-gray-500">No tasks assigned yet.</p>
        ) : (
          <ul className="mt-2">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="bg-gray-200 dark:bg-gray-700 p-3 rounded-md mb-2"
              >
                {task.name}
              </li>
            ))}
          </ul>
        )}

        {/* Display Uploaded Notes */}
        <h3 className="text-lg font-semibold mt-6">Classroom Notes:</h3>
        {notes.length === 0 ? (
          <p className="text-gray-500">No notes added yet.</p>
        ) : (
          <ul className="mt-2">
            {notes.map((note) => (
              <li
                key={note.id}
                className="bg-yellow-200 dark:bg-yellow-700 p-3 rounded-md mb-2 flex justify-between items-center"
              >
                <span>{note.name}</span>
                <a
                  href={note.url}
                  download={note.name}
                  className="bg-blue-500 text-white px-2 py-1 rounded shadow hover:bg-blue-700 transition"
                >
                  Download
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Discussion Forum */}
      <div id="discussion-section" className="mt-10 p-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold">Discussion Forum</h2>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Type a message..."
            className="w-full p-3 border rounded-lg"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            onClick={handlePostMessage}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Post
          </button>
        </div>

        {/* Display Messages */}
        <div className="mt-4">
          {discussion.length === 0 ? (
            <p className="text-gray-500">No messages yet.</p>
          ) : (
            <ul className="mt-2">
              {discussion.map((msg) => (
                <li key={msg.id} className="p-3 bg-gray-200 rounded-md mb-2">
                  {msg.text}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Student List Modal */}
      {showStudentList && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">Student List</h2>
            <ul>
              {students.map((student, index) => (
                <li key={index} className="mb-2">
                  {student}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setShowStudentList(false)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Assignments Section (Same Page) */}
      {viewAssignments && (
        <div className="mt-10 p-6 bg-white rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold">Assignments</h2>
          <ul className="mt-4">
            {assignments.map((a) => (
              <li key={a.id} className="p-3 bg-gray-200 rounded-md mb-2">
                <strong>{a.title}</strong> - Due: {a.dueDate}
              </li>
            ))}
          </ul>
          <button
            onClick={() => setViewAssignments(false)}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default ClassroomDetails;
