import React, { useState } from "react";
import { Code, Terminal, Rocket, Brain, X } from "lucide-react";
import jsPDF from "jspdf";

const challenges = [
  {
    id: 1,
    title: "Data Structures & Algorithms Challenge",
    category: "DSA",
    difficulty: "Hard",
    status: "Ongoing",
    teacher: "Dr. Manisha Gade",
    date: "March 15, 2025",
    timeSpan: "March 15 - March 30",
    icon: <Code size={24} className="text-blue-600" />,
  },
  {
    id: 2,
    title: "Full-Stack Web Dev Sprint",
    category: "Web Development",
    difficulty: "Medium",
    status: "Upcoming",
    teacher: "Prof. Rohit Mehta",
    date: "April 1, 2025",
    timeSpan: "April 1 - April 20",
    icon: <Terminal size={24} className="text-green-600" />,
  },
  {
    id: 3,
    title: "AI/ML Model Optimization",
    category: "AI/ML",
    difficulty: "Expert",
    status: "Ongoing",
    teacher: "Dr. Anjali Rao",
    date: "March 10, 2025",
    timeSpan: "March 10 - March 25",
    icon: <Brain size={24} className="text-purple-600" />,
  },
  {
    id: 4,
    title: "Competitive Coding Marathon",
    category: "Competitive Programming",
    difficulty: "Hard",
    status: "Completed",
    teacher: "Prof. Ramesh Sharma",
    date: "Jan 10, 2024",
    timeSpan: "Jan 10 - Jan 25",
    icon: <Rocket size={24} className="text-orange-600" />,
  },
];

const Challenges = ({ setSidebarVisible }) => {
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [formData, setFormData] = useState({ fullName: "", email: "", contact: "", year: "" });
  const [ticketId, setTicketId] = useState(null);

  const handleApply = (challenge) => {
    setSelectedChallenge(challenge);
    setSidebarVisible(false); // Hide sidebar when modal opens
  };

  const closeModal = () => {
    setSelectedChallenge(null);
    setFormData({ fullName: "", email: "", contact: "", year: "" });
    setTicketId(null);
    setSidebarVisible(true); // Show sidebar again when modal closes
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateTicket = () => {
    const uniqueId = `TICKET-${Date.now()}`;
    setTicketId(uniqueId);
  };

  const downloadTicketPDF = () => {
    if (!ticketId) return;
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Challenge Ticket", 80, 20);
    doc.setFontSize(14);
    doc.text(`Ticket ID: ${ticketId}`, 20, 40);
    doc.text(`Name: ${formData.fullName}`, 20, 50);
    doc.text(`Email: ${formData.email}`, 20, 60);
    doc.text(`Contact: ${formData.contact}`, 20, 70);
    doc.text(`Year: ${formData.year}`, 20, 80);
    doc.text(`Challenge: ${selectedChallenge.title}`, 20, 90);
    doc.text(`Date: ${selectedChallenge.date}`, 20, 100);
    doc.text(`Duration: ${selectedChallenge.timeSpan}`, 20, 110);
    doc.save("Challenge_Ticket.pdf");
  };

  return (
    <div className="p-8 bg-white shadow-lg rounded-lg max-w-6xl mx-auto mt-5">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Coding Challenges</h2>
      <div className="grid grid-cols-2 gap-6">
        {challenges.map((challenge) => (
          <div key={challenge.id} className="p-5 border rounded-lg shadow-sm bg-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-200 rounded-full">{challenge.icon}</div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{challenge.title}</h3>
                <p className="text-gray-600">{challenge.category} - <span className="font-medium">{challenge.difficulty}</span></p>
                <p className="text-gray-500 text-sm">{challenge.date}</p>
                <p className="text-gray-500 text-sm">{challenge.timeSpan}</p>
              </div>
            </div>
            {challenge.status === "Upcoming" && (
              <button onClick={() => handleApply(challenge)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Apply</button>
            )}
          </div>
        ))}
      </div>

      {selectedChallenge && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
            <button onClick={closeModal} className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"><X size={24} /></button>
            <h3 className="text-2xl font-bold text-gray-900">Apply for {selectedChallenge.title}</h3>
            <p className="text-gray-600">Date: {selectedChallenge.date}</p>
            <p className="text-gray-600">Duration: {selectedChallenge.timeSpan}</p>
            <input type="text" name="fullName" placeholder="Full Name" className="w-full border p-2 mt-2" value={formData.fullName} onChange={handleInputChange} />
            <input type="email" name="email" placeholder="Email" className="w-full border p-2 mt-2" value={formData.email} onChange={handleInputChange} />
            <input type="text" name="contact" placeholder="Contact No" className="w-full border p-2 mt-2" value={formData.contact} onChange={handleInputChange} />
            <input type="text" name="year" placeholder="Year of Study" className="w-full border p-2 mt-2" value={formData.year} onChange={handleInputChange} />
            <button onClick={generateTicket} className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Generate Ticket</button>
            {ticketId && (
              <div className="mt-4 p-3 border rounded-lg bg-gray-100 text-center">
                <p><strong>ID:</strong> {ticketId}</p>
                <button onClick={downloadTicketPDF} className="mt-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">Download Ticket</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Challenges;
