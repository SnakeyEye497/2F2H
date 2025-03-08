import React from "react";
import { motion } from "framer-motion";

const DashboardCard = ({ title, value, icon: Icon, color }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.15)" }}
      whileTap={{ scale: 0.95 }}
      className={`relative bg-${color}-100 dark:bg-${color}-900 p-5 rounded-lg shadow-md flex items-center overflow-hidden transition-all duration-300`}
    >
      {/* Glow Effect */}
      <div className={`absolute inset-0 opacity-10 bg-${color}-400 dark:bg-${color}-700 blur-xl rounded-lg`} />

      {/* Icon */}
      <Icon size={35} className={`text-${color}-600 dark:text-${color}-300 mr-4`} />

      {/* Content */}
      <div className="relative">
        <h4 className="text-gray-700 dark:text-gray-300 font-semibold">{title}</h4>
        <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
      </div>
    </motion.div>
  );
};

export default DashboardCard;
