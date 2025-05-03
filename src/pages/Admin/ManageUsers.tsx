import React, { useState } from "react";

// Dummy User Data Types

function ManageUsers() {
  var [selectedTab, setSelectedTab] = useState("Teachers");

  var users: any = {
    Admins: [
      { id: "a1", name: "Principal Mensah", email: "pmensah@school.edu", status: "Active" },
      { id: "a2", name: "Admin Ama", email: "ama@school.edu", status: "Active" },
    ],
    Teachers: [
      { id: "t1", name: "Mr. Kwabena", email: "kwabena@school.edu", class: "Grade 6A", status: "Active" },
      { id: "t2", name: "Ms. Juliet", email: "juliet@school.edu", class: "Grade 4B", status: "Suspended" },
    ],
    Parents: [
      { id: "p1", name: "Mrs. Sarpong", email: "sarpong@gmail.com", status: "Active" },
      { id: "p2", name: "Mr. Boateng", email: "boateng@yahoo.com", status: "Active" },
    ],
    Students: [
      { id: "s1", name: "Kwame A.", email: "kwame@student.com", class: "Grade 4B", status: "Active" },
      { id: "s2", name: "Akosua D.", email: "akosua@student.com", class: "Grade 6A", status: "Active" },
    ],
    Pending: [
      { id: "pt1", name: "Ms. Linda", email: "linda@school.edu", role: "Teacher" },
      { id: "pa1", name: "Mr. Nelson", email: "nelson@school.edu", role: "Admin" },
    ],
  };

  function renderTable(role: any) {
    return (
      <table className="w-full table-auto text-left border-t">
        <thead>
          <tr className="text-sm text-gray-600">
            <th className="py-2">Name</th>
            <th className="py-2">Email</th>
            {role === "Teachers" || role === "Students" ? <th className="py-2">Class</th> : null}
            <th className="py-2">Status</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users[role].map(function (user: any) {
            return (
              <tr key={user.id} className="border-t hover:bg-gray-50">
                <td className="py-2">{user.name}</td>
                <td className="py-2">{user.email}</td>
                {role === "Teachers" || role === "Students" ? (
                  <td className="py-2">{user.class}</td>
                ) : null}
                <td className="py-2">{user.status}</td>
                <td className="py-2">
                  <button className="text-blue-600 text-sm mr-2">Edit</button>
                  <button className="text-red-500 text-sm">Disable</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  function renderPendingApproval() {
    return (
      <div>
        {users.Pending.map(function (user: any) {
          return (
            <div key={user.id} className="flex justify-between items-center border-t py-3">
              <div>
                <div className="font-medium text-gray-800">{user.name}</div>
                <div className="text-sm text-gray-500">{user.email} — {user.role}</div>
              </div>
              <div>
                <button className="bg-green-500 text-white px-3 py-1 rounded text-sm mr-2">Approve</button>
                <button className="bg-red-500 text-white px-3 py-1 rounded text-sm">Reject</button>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  var tabs = ["Admins", "Teachers", "Parents", "Students", "Pending"];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-2xl font-bold text-blue-900 mb-4">User Management</div>

      {/* Tab Menu */}
      <div className="flex space-x-4 mb-6">
        {tabs.map(function (tab) {
          return (
            <button
              key={tab}
              onClick={function () { setSelectedTab(tab); }}
              className={
                "px-4 py-2 rounded-full text-sm font-medium " +
                (selectedTab === tab
                  ? "bg-blue-600 text-white"
                  : "bg-blue-100 text-blue-800 hover:bg-blue-200")
              }
            >
              {tab}
            </button>
          );
        })}
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        {selectedTab === "Pending" ? renderPendingApproval() : renderTable(selectedTab)}
      </div>
    </div>
  );
}

export default ManageUsers;
