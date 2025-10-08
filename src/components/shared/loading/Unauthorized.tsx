"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-100 text-center p-6">
      {/* Interactive Animation */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        whileHover={{ rotate: 5, scale: 1.05 }}
        className="w-40 h-40 bg-red-100 rounded-full flex items-center justify-center shadow-lg mb-8"
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-6xl"
        >
          🚫
        </motion.span>
      </motion.div>

      {/* Message */}
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Unauthorized Access
      </h1>
      <p className="text-gray-600 mb-6 max-w-md">
        You don’t have permission to view this page.  
        Please log in with the correct account or contact your administrator.
      </p>

      {/* Action Button */}
      <Link
        href="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Go Back Home
      </Link>
    </div>
  );
}
