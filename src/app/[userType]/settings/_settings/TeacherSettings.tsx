import React, { useState } from "react";

function TeacherSettings() {

  const [emailNotif, setEmailNotif] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [showEmailToStudents, setShowEmailToStudents] = useState(true);
  const [fontSize, setFontSize] = useState("medium");

  return (
    <div className="max-w-6xl mx-auto min-h-screen bg-gradient-to-br from-yellow-100 to-purple-100 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow rounded-xl p-6">

        <div className="text-2xl font-bold text-blue-900 mb-4">Settings</div>

        {/* Notification Settings */}
        <div className="mb-6">
          <div className="text-lg font-semibold text-blue-800 mb-2">Notifications</div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm text-blue-700">Email Notifications</label>
            <input
              type="checkbox"
              checked={emailNotif}
              onChange={function (e) { setEmailNotif(e.target.checked); }}
              className="w-5 h-5"
            />
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="mb-6">
          <div className="text-lg font-semibold text-blue-800 mb-2">Appearance</div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm text-blue-700">Dark Mode</label>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={function (e) { setDarkMode(e.target.checked); }}
              className="w-5 h-5"
            />
          </div>
          <div className="mt-2">
            <label className="text-sm text-blue-700">Font Size</label>
            <select
              value={fontSize}
              onChange={function (e) { setFontSize(e.target.value); }}
              className="block mt-1 border p-2 rounded"
            >
              <option value="small">Small</option>
              <option value="medium">Medium (Default)</option>
              <option value="large">Large</option>
            </select>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="mb-6">
          <div className="text-lg font-semibold text-blue-800 mb-2">Privacy</div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm text-blue-700">Show Email to Students</label>
            <input
              type="checkbox"
              checked={showEmailToStudents}
              onChange={function (e) { setShowEmailToStudents(e.target.checked); }}
              className="w-5 h-5"
            />
          </div>
        </div>

        {/* Danger Zone */}
        <div className="border-t pt-4 mt-6">
          <div className="text-lg font-semibold text-red-700 mb-2">Danger Zone</div>
          <button className="text-sm text-red-600 hover:underline">Request Account Deactivation</button>
        </div>
      </div>
    </div>
  );
}

export default TeacherSettings;
