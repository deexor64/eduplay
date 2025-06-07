import React, { useState } from "react";

function ParentSettings() {
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("english");

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-purple-100 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-6">
        <div className="text-2xl font-bold text-blue-900 mb-6">Settings</div>

        {/* Notification Preference */}
        <div className="mb-6">
          <label className="block font-medium text-blue-700 mb-2">Receive Notifications</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={notifications ? "yes" : "no"}
            onChange={function (e) {
              setNotifications(e.target.value === "yes");
            }}
          >
            <option value="yes">Yes - Email & SMS</option>
            <option value="no">No - Don't notify me</option>
          </select>
        </div>

        {/* Language Setting */}
        <div className="mb-6">
          <label className="block font-medium text-blue-700 mb-2">Preferred Language</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={language}
            onChange={function (e) { setLanguage(e.target.value); }}
          >
            <option value="english">English</option>
            <option value="french">French</option>
            <option value="swahili">Swahili</option>
          </select>
        </div>

        {/* Future Options Placeholder */}
        <div className="text-sm text-blue-600">More settings coming soon...</div>
      </div>
    </div>
  );
}

export default ParentSettings;
