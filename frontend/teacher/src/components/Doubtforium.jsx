import React, { useState } from "react";
import { MessageSquare, PlusCircle, Send } from "lucide-react";

const DoubtForum = () => {
  const [doubts, setDoubts] = useState([
    { id: 1, title: "How does recursion work in JavaScript?", student: "Amit Kumar", replies: [] },
    { id: 2, title: "Best resources to learn Data Structures?", student: "Priya Sharma", replies: [] },
  ]);

  const [replyText, setReplyText] = useState({});

  const handleReplyChange = (id, text) => {
    setReplyText((prev) => ({ ...prev, [id]: text }));
  };

  const handleReplySubmit = (id) => {
    if (!replyText[id]) return;

    setDoubts((prevDoubts) =>
      prevDoubts.map((doubt) =>
        doubt.id === id ? { ...doubt, replies: [...doubt.replies, replyText[id]] } : doubt
      )
    );
    
    setReplyText((prev) => ({ ...prev, [id]: "" }));
  };

  return (
    <div className="max-w-4xl mt-22 mx-auto bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-xl shadow-lg mt-8 ms-[450px]">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Doubt Forum</h2>
      </div>

      {/* Doubts List */}
      <div className="space-y-6">
        {doubts.length > 0 ? (
          doubts.map((doubt) => (
            <div
              key={doubt.id}
              className="p-6 border border-gray-300 rounded-lg bg-gray-100 dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{doubt.title}</h3>
              <p className="text-gray-700 dark:text-gray-400">Asked by {doubt.student}</p>
              
              {/* Replies Section */}
              <div className="mt-4">
                {doubt.replies.length > 0 ? (
                  doubt.replies.map((reply, index) => (
                    <div key={index} className="mt-2 p-3 bg-gray-200 dark:bg-gray-700 rounded-lg">
                      <p className="text-gray-800 dark:text-gray-300">💡 {reply}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 italic">No replies yet.</p>
                )}
              </div>

              {/* Reply Input */}
              <div className="mt-4 flex items-center">
                <input
                  type="text"
                  value={replyText[doubt.id] || ""}
                  onChange={(e) => handleReplyChange(doubt.id, e.target.value)}
                  placeholder="Type your reply..."
                  className="flex-1 p-2 border rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                />
                <button
                  onClick={() => handleReplySubmit(doubt.id)}
                  className="ml-2 px-4 py-2 bg-blue-700 text-white rounded-lg shadow-lg hover:bg-blue-800 transition"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 dark:text-gray-300 text-center">No doubts available.</p>
        )}
      </div>
    </div>
  );
};

export default DoubtForum;
