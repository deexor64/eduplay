"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUser, faSignOut } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  return (
    <header className="w-full flex items-center justify-between z-50 absolute">

      {/* Left Section */}
      <div className="flex w-60 h-16 items-center bg-gradient-to-r from-blue-900 to-green-800 px-6 py-3 rounded-r-full shadow-lg space-x-4">
        <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center mr-3">
          <span className="text-white font-bold text-lg">🎓</span>
        </div>
        <h1 className="text-xl font-bold text-white">Learning Hub</h1>
      </div>

      {/* Middle Section - Transparent */}
      <div className="flex-1"></div>

      {/* Right Section */}
      <div className="flex w-80 h-16 items-center bg-gradient-to-l from-blue-900 to-green-800 px-6 py-3 rounded-l-full shadow-lg">
        
        {/* Notifications */}
        <button className="relative p-2 text-green-200 hover:text-green-300 hover:bg-green-700/30 rounded-lg transition-colors duration-200">
          <FontAwesomeIcon icon={faBell} className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
            3
          </span>
        </button>

        {/* Avatar */}
        <div className="flex items-center space-x-3 ml-4">
          <img 
            src="/images/avatar.png" 
            alt="Student Avatar" 
            className="w-8 h-8 rounded-full border-2 border-green-400"
          />
          <div className="hidden sm:block">
            <div className="text-sm font-medium text-white">Student Name</div>
            <div className="text-xs text-green-200">Grade 5</div>
          </div>
        </div>

        {/* Logout */}
        <button className="p-2 text-green-200 hover:text-red-300 hover:bg-red-700/30 rounded-lg transition-colors duration-200 ml-auto">
          <FontAwesomeIcon icon={faSignOut} className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
} 