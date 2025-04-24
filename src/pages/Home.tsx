import React from 'react';
import { Link } from 'react-router';
import './Home.css';

function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      
      <h1 className="text-4xl font-bold text-gray-800 mb-2">NAKANO</h1>
      <h2 className="text-2xl text-gray-600 mb-8">Interactive Learning Software</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-md w-full">
        <Link to="/signup/admin" className="login-card hover:scale-105">
          <div className="p-6 text-center text-lg font-semibold text-gray-700">
            Admin Login
          </div>
        </Link>

        <Link to="/signup/teacher" className="login-card hover:scale-105">
          <div className="p-6 text-center text-lg font-semibold text-gray-700">
            Teacher Login
          </div>
        </Link>

        <Link to="/signup/student" className="login-card hover:scale-105">
          <div className="p-6 text-center text-lg font-semibold text-gray-700">
            Student Login
          </div>
        </Link>

        <Link to="/signup/parent" className="login-card hover:scale-105">
          <div className="p-6 text-center text-lg font-semibold text-gray-700">
            Parent Login
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
