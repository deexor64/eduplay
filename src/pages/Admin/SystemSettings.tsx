// pages/admin/SystemSettingsPage.tsx

import React, { useState } from "react";

function SystemSettings() {
  var [settings, setSettings] = useState({
    schoolName: "Nakano International School",
    academicYear: "2024-2025",
    maxStudentsPerClass: 30,
    darkTheme: false,
    dataRetentionMonths: 12,
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    var name = event.target.name;
    var value = event.target.type === "checkbox"
      ? event.target.checked
      : event.target.value;

    setSettings(function (prev) {
      return { ...prev, [name]: value };
    });
  }

  function handleSave() {
    console.log("Saved settings:", settings);
    alert("Settings saved successfully!");
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold text-blue-800">System Settings</h1>

      {/* General Settings */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-blue-700 mb-4">General Settings</h2>
        <label className="block mb-3">
          <span className="text-sm">School Name</span>
          <input
            type="text"
            name="schoolName"
            value={settings.schoolName}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
          />
        </label>
        <label className="block mb-3">
          <span className="text-sm">Academic Year</span>
          <input
            type="text"
            name="academicYear"
            value={settings.academicYear}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
          />
        </label>
        <label className="inline-flex items-center space-x-2 mt-3">
          <input
            type="checkbox"
            name="darkTheme"
            checked={settings.darkTheme}
            onChange={handleChange}
          />
          <span className="text-sm">Enable Dark Theme</span>
        </label>
      </div>

      {/* Class Settings */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-blue-700 mb-4">Class Management</h2>
        <label className="block mb-3">
          <span className="text-sm">Max Students per Class</span>
          <input
            type="number"
            name="maxStudentsPerClass"
            value={settings.maxStudentsPerClass}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
          />
        </label>
      </div>

      {/* Privacy Settings */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-blue-700 mb-4">Data & Privacy</h2>
        <label className="block mb-3">
          <span className="text-sm">Data Retention (months)</span>
          <input
            type="number"
            name="dataRetentionMonths"
            value={settings.dataRetentionMonths}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
          />
        </label>
      </div>

      {/* Save Button */}
      <div className="text-right">
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}

export default SystemSettings;
