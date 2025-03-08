import React from "react";
import { HelpCircle, Mail, Phone, MessageSquare, Info } from "lucide-react"; // Importing icons

const Help = () => {
  return (
    <div className="p-8 bg-white shadow-lg rounded-lg max-w-5xl mx-auto mt-3"> {/* Increased max width */}
      {/* Header Section */}
      <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2 mb-6">
        <HelpCircle size={32} className="text-blue-600" /> Help & Support
      </h2>
      <p className="text-lg text-gray-700 leading-relaxed mb-6">
        We’re here to assist you. Whether you need help navigating the platform, 
        understanding features, or resolving technical issues, you’ll find answers to common questions below. 
        If you require further support, feel free to contact our team.
      </p>

      {/* FAQs Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
          <Info size={24} className="text-blue-500" /> Frequently Asked Questions
        </h3>
        <div className="grid grid-cols-2 gap-6"> {/* Two-column layout for wider screens */}
          <div>
            <h4 className="font-medium text-gray-900">How do I join a classroom?</h4>
            <p className="text-gray-600 leading-relaxed">
              To join a classroom, go to <span className="font-semibold">‘My Classrooms’</span> 
              and enter the class code provided by your instructor.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900">Where can I access course materials?</h4>
            <p className="text-gray-600 leading-relaxed">
              Course materials, including notes, assignments, and resources, are available 
              under the <span className="font-semibold">‘Files’</span> section of your class dashboard.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900">How do I track my performance?</h4>
            <p className="text-gray-600 leading-relaxed">
              You can monitor your progress and rankings by visiting the <span className="font-semibold">‘Leaderboard’</span> section, 
              where you’ll find detailed insights on your performance.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900">How do I contact support?</h4>
            <p className="text-gray-600 leading-relaxed">
              You can reach out to us via <span className="font-semibold">email, phone, or live chat</span> for quick assistance.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Support Section */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">📞 Need Assistance?</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          If you require further help, our support team is available to assist you. 
          Feel free to reach out via email, phone, or live chat during our service hours.
        </p>
        <div className="grid grid-cols-2 gap-4"> {/* Two-column layout for wider design */}
          <p className="text-gray-700 flex items-center gap-2">
            <Mail size={20} className="text-blue-500" /> <span className="font-medium">support@yourplatform.com</span>
          </p>
          <p className="text-gray-700 flex items-center gap-2">
            <Phone size={20} className="text-green-500" /> <span className="font-medium">+91 98765 43210</span>
          </p>
          <p className="text-gray-700 flex items-center gap-2">
            <MessageSquare size={20} className="text-orange-500" /> <span className="font-medium">Live Chat: 9 AM - 6 PM IST</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Help;
