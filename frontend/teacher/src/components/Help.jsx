import React from "react";
import { HelpCircle, Mail, Phone, MessageSquare, Info } from "lucide-react";

const Help = () => {
  return (
    <div className="p-10 mt-22 bg-white shadow-lg rounded-lg max-w-5xl mx-auto mt-6 space-y-8 ml-90">
      {/* Header Section */}
      <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2 mb-6">
        <HelpCircle size={32} className="text-blue-600" /> Help & Support for Teachers
      </h2>
      <p className="text-lg text-gray-700 leading-relaxed">
        Need assistance with managing your classroom, responding to student doubts, or tracking performance? 
        Explore our frequently asked questions or contact our support team for further help.
      </p>

      {/* FAQs Section */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <Info size={24} className="text-blue-500" /> Frequently Asked Questions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-4 bg-gray-50 rounded-lg shadow">
            <h4 className="font-medium text-gray-900">How do I create and manage quizzes?</h4>
            <p className="text-gray-600 leading-relaxed">
              Navigate to the <span className="font-semibold">‘Quizzes’</span> section, where you can create, edit, and assign quizzes to your students.
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg shadow">
            <h4 className="font-medium text-gray-900">How do I track student progress?</h4>
            <p className="text-gray-600 leading-relaxed">
              Use the <span className="font-semibold">‘Leaderboard’</span> and student analytics sections to monitor individual and class performance.
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg shadow">
            <h4 className="font-medium text-gray-900">How do I respond to student doubts?</h4>
            <p className="text-gray-600 leading-relaxed">
              Visit the <span className="font-semibold">‘Doubt Forum’</span> to view and reply to student queries in real-time.
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg shadow">
            <h4 className="font-medium text-gray-900">How do I manage my classroom settings?</h4>
            <p className="text-gray-600 leading-relaxed">
              Access the <span className="font-semibold">‘Settings’</span> page to configure your class structure, add students, and adjust permissions.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Support Section */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-sm space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">📞 Need Further Assistance?</h3>
        <p className="text-gray-700 leading-relaxed">
          If you require additional help, our support team is available for guidance. 
          Reach out via email, phone, or live chat.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-white rounded-lg shadow flex items-center gap-3">
            <Mail size={20} className="text-blue-500" />
            <span className="font-medium">support@quizmorphs.com</span>
          </div>
          <div className="p-4 bg-white rounded-lg shadow flex items-center gap-3">
            <Phone size={20} className="text-green-500" />
            <span className="font-medium">+91 98765 43210</span>
          </div>
          <div className="p-4 bg-white rounded-lg shadow flex items-center gap-3">
            <MessageSquare size={20} className="text-orange-500" />
            <span className="font-medium">Live Chat: 9 AM - 6 PM IST</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;