import React, { useState } from "react";

function TeacherProfile() {
  const [profileImage, setProfileImage] = useState("/avatars/avatar1.png");
  const [name, setName] = useState("Ms. Angela Dsouza");
  const [username, setUsername] = useState("angela.dsouza");
  const [email, setEmail] = useState("angela@example.com");
  const [phone, setPhone] = useState("123-456-7890");
  const [department, setDepartment] = useState("Mathematics");
  const [designation, setDesignation] = useState("Senior Lecturer");
  const [bio, setBio] = useState("Passionate about helping students love math through real-world examples and interactive learning.");

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    var file = event.target.files?.[0];
    if (file) {
      var reader = new FileReader();
      reader.onload = function (e) {
        if (e.target && typeof e.target.result === "string") {
          setProfileImage(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <div className="max-w-6xl mx-auto min-h-screen bg-gradient-to-br from-yellow-100 to-purple-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow rounded-xl p-6">

        {/* Header */}
        <div className="text-2xl font-bold text-blue-900 mb-4">Teacher Profile</div>

        {/* Profile Image */}
        <div className="flex items-center mb-6">
          <img
            src={profileImage}
            alt="Profile"
            className="w-24 h-24 rounded-full border border-gray-300 mr-6"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="text-sm text-gray-600"
          />
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm text-blue-700 mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={function (e) { setName(e.target.value); }}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block text-sm text-blue-700 mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={function (e) { setUsername(e.target.value); }}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block text-sm text-blue-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={function (e) { setEmail(e.target.value); }}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block text-sm text-blue-700 mb-1">Phone</label>
            <input
              type="text"
              value={phone}
              onChange={function (e) { setPhone(e.target.value); }}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block text-sm text-blue-700 mb-1">Department</label>
            <input
              type="text"
              value={department}
              onChange={function (e) { setDepartment(e.target.value); }}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block text-sm text-blue-700 mb-1">Designation</label>
            <input
              type="text"
              value={designation}
              onChange={function (e) { setDesignation(e.target.value); }}
              className="w-full border rounded p-2"
            />
          </div>
        </div>

        {/* Bio */}
        <div className="mb-4">
          <label className="block text-sm text-blue-700 mb-1">About / Bio</label>
          <textarea
            value={bio}
            onChange={function (e) { setBio(e.target.value); }}
            className="w-full border rounded p-2 h-24"
          ></textarea>
        </div>

        {/* Account Actions */}
        <div className="flex items-center justify-between mt-6">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Save Changes
          </button>
          <button className="text-red-600 hover:underline text-sm">
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default TeacherProfile;
