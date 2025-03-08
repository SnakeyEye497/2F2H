import React from "react";
import { Trophy, BookOpenText,Calendar} from "lucide-react"; // Importing only necessary icons

const announcements = [
  { id: 1, message: "Upcoming exam", date: "March 10, 2025", icon: <BookOpenText size={20} /> },
  { id: 2, message: "Assignment submission", date: "March 12, 2025", icon: <Trophy size={20} /> },
  { id: 3, message: "Guest lecture on AI by Dr. A. Sharma", date: "March 14, 2025", icon: <Calendar size={20} /> },
];

const Announcements = () => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg mt-5">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        Announcements
      </h2>
      <ul className="space-y-3">
        {announcements.map((announcement) => (
          <li key={announcement.id} className="border-b pb-3 flex items-start gap-3">
            {announcement.icon && <span className="text-black">{announcement.icon}</span>}
            <div>
              <p className="text-gray-700">{announcement.message}</p>
              <span className="text-sm text-red-500 ">{announcement.date}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Announcements;
