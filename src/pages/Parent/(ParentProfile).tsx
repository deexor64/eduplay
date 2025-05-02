import React, { useState } from "react";

function ParentProfile() {
  const [parentInfo, setParentInfo] = useState({
    name: "Fatou Diallo",
    username: "fatou_d",
    email: "fatou@example.com",
    avatar: "/avatars/avatar6.png",
    phone: "+221-123-456-789",
    address: "Dakar, Senegal",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-purple-100 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-6">
        <div className="text-2xl font-bold text-blue-900 mb-6">Parent Profile</div>

        {/* Profile Image */}
        <div className="flex items-center space-x-6 mb-6">
          <img
            src={parentInfo.avatar}
            alt="Parent Avatar"
            className="w-20 h-20 rounded-full border border-gray-300"
          />
          <button className="text-blue-600 hover:underline text-sm">Update Image</button>
        </div>

        {/* Info */}
        <div className="space-y-4">
          <div>
            <label className="block font-medium text-blue-700">Full Name</label>
            <input
              type="text"
              value={parentInfo.name}
              className="w-full border rounded px-3 py-2"
              readOnly
            />
          </div>

          <div>
            <label className="block font-medium text-blue-700">Username</label>
            <input
              type="text"
              value={parentInfo.username}
              className="w-full border rounded px-3 py-2"
              readOnly
            />
          </div>

          <div>
            <label className="block font-medium text-blue-700">Email</label>
            <input
              type="email"
              value={parentInfo.email}
              className="w-full border rounded px-3 py-2"
              readOnly
            />
          </div>

          <div>
            <label className="block font-medium text-blue-700">Phone Number</label>
            <input
              type="text"
              value={parentInfo.phone}
              className="w-full border rounded px-3 py-2"
              readOnly
            />
          </div>

          <div>
            <label className="block font-medium text-blue-700">Address</label>
            <input
              type="text"
              value={parentInfo.address}
              className="w-full border rounded px-3 py-2"
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ParentProfile;
