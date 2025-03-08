import React, { useState } from "react";
import { Search, UserPlus, Download, Filter, X } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Students = () => {
  const [students, setStudents] = useState([
    { id: 1, name: "Amit", email: "amit@example.com" },
    { id: 2, name: "Rahul", email: "rahul@example.com" },
    { id: 3, name: "Sita", email: "sita@example.com" },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [newStudent, setNewStudent] = useState({ name: "", email: "" });

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Student List", 14, 15);
    autoTable(doc, {
      startY: 20,
      head: [["ID", "Name", "Email"]],
      body: students.map((s) => [s.id, s.name, s.email]),
    });
    doc.save("students.pdf");
  };

  const handleAddStudent = () => {
    setShowForm(true);
  };

  const handleSaveStudent = () => {
    if (newStudent.name && newStudent.email) {
      setStudents([
        ...students,
        { id: students.length + 1, name: newStudent.name, email: newStudent.email },
      ]);
      setNewStudent({ name: "", email: "" });
      setShowForm(false);
    } else {
      alert("Please enter both name and email!");
    }
  };

  // Filter students based on search query
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="ml-64 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8 mt-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
            Students Management
          </h2>
          <p className="text-gray-600 mt-2">Manage and monitor your student roster efficiently</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm mb-6 border border-gray-100">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="relative flex-1 min-w-[300px]">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all duration-200"
              />
            </div>

            <div className="flex gap-3">
              <button className="px-4 py-3 bg-gray-50 text-gray-700 rounded-xl flex items-center gap-2 hover:bg-gray-100 transition-all duration-200">
                <Filter size={18} />
                Filter
              </button>
              <button 
                onClick={downloadPDF} 
                className="px-4 py-3 bg-blue-50 text-blue-600 rounded-xl flex items-center gap-2 hover:bg-blue-100 transition-all duration-200"
              >
                <Download size={18} />
                Export PDF
              </button>
              <button 
                onClick={handleAddStudent}
                className="px-4 py-3 bg-indigo-600 text-white rounded-xl flex items-center gap-2 hover:bg-indigo-700 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <UserPlus size={18} />
                Add Student
              </button>
            </div>
          </div>
        </div>

        {showForm && (
          <div className="bg-white p-6 rounded-2xl shadow-md mb-6 border border-gray-100 animate-fadeIn">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Add New Student</h3>
              <button 
                onClick={() => setShowForm(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Student Name"
                className="px-4 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all duration-200"
                value={newStudent.name}
                onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
              />
              <input
                type="email"
                placeholder="Student Email"
                className="px-4 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all duration-200"
                value={newStudent.email}
                onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
              />
            </div>
            <div className="mt-4 flex justify-end">
              <button 
                onClick={handleSaveStudent}
                className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Save Student
              </button>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Email</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr 
                    key={student.id} 
                    className="border-t border-gray-50 hover:bg-gray-50 transition-all duration-200"
                  >
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                        #{student.id.toString().padStart(4, "0")}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                          <span className="text-sm font-medium text-indigo-600">
                            {student.name[0]}
                          </span>
                        </div>
                        <span className="font-medium text-gray-900">{student.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{student.email}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
            <span className="text-sm text-gray-600 font-medium">
              Showing {filteredStudents.length} of {students.length} entries
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Students;
