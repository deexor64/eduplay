import { useState, useEffect } from "react";

function SignupLayout() {

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-6">signup</h2>
      <form onSubmit={function(e) {}} className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm">
        

      <label className="block mb-1 mt-4 font-medium text-gray-700">Username</label>
      <input
        type="text"
        name="username"
        required
        onChange={function(e) {}}
        className="border border-gray-300 w-full p-2 rounded"/>
      <p className={ "mt-1 text-red-600 p-2 rounded shadow hidden"}>
        warning text
      </p>

      <label className="block mb-1 mt-4 font-medium text-gray-700">Password</label>
      <input
        type="password"
        name="password"
        required
        onChange={function(e) {}}
        className="border border-gray-300 w-full p-2 rounded"/>
      <p className={ "mt-1 text-red-600 p-2 rounded shadow"}>
        warning text
      </p>

        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Submit
        </button>
      </form>
    </div>
    
  );
}

export default SignupLayout;
