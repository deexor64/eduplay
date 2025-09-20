"use client"

import React, { useState } from "react";

type PasswordChangeFormProps = {
  updatePasswordHandler: (currentPassword: string, newPassword: string) => Promise<void>;
};

export default function PasswordChangeForm(props: PasswordChangeFormProps) {
  
  const { updatePasswordHandler } = props;
  
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);

  // Handle input changes
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle save changes
  const handleSaveChanges = async () => {
    setIsSaving(true);
    try {
      await updatePasswordHandler(formData.currentPassword, formData.newPassword);
      setIsEditing(false);
    } catch (e) {
      setFormData({
        currentPassword: "",
        newPassword: "",
      });
    }
    setIsSaving(false);
  };

  // Handle cancel changes
  const handleCancelChanges = () => {
    setFormData({
      currentPassword: "",
      newPassword: "",
    });
    setIsEditing(false);
  };

  return (
    <div className="relative bg-gradient-to-br from-blue-200 via-pink-100 to-yellow-200 rounded-3xl p-8 shadow-xl border-4 border-violet-400 overflow-hidden">

      {/* Floating Decorations */}
      <div className="absolute top-2 left-2 w-6 h-6 bg-yellow-400 rounded-full opacity-70 animate-bounce"></div>
      <div className="absolute bottom-4 right-6 w-10 h-10 bg-purple-300 rounded-full opacity-60 animate-pulse"></div>
      <div className="absolute top-10 right-12 w-5 h-5 bg-green-300 rounded-full opacity-70 animate-spin-slow"></div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-extrabold text-purple-800 tracking-wide flex items-center gap-2">
          🔒 Change Password
        </h2>
      </div>

      <div className="space-y-6">
        {/* Current Password */}
        <div>
          <label className="block text-base font-bold text-blue-800 mb-2">
            Current Password
          </label>
          <div className="relative">
            <input
              type={showPasswords ? "text" : "password"}
              value={formData.currentPassword}
              onChange={(e) =>
                handleInputChange("currentPassword", e.target.value)
              }
              disabled={!isEditing}
              className="w-full px-5 py-3 pr-12 border-2 border-purple-400 rounded-2xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 disabled:bg-gray-200 disabled:text-gray-500 text-lg shadow-inner"
              placeholder="Enter current password"
            />
            <button
              type="button"
              onClick={() => setShowPasswords(!showPasswords)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 text-xl"
            >
              {showPasswords ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div>
          <label className="block text-base font-bold text-blue-800 mb-2">
            New Password
          </label>
          <input
            type={showPasswords ? "text" : "password"}
            value={formData.newPassword}
            onChange={(e) => handleInputChange("newPassword", e.target.value)}
            disabled={!isEditing}
            className="w-full px-5 py-3 border-2 border-pink-400 rounded-2xl focus:ring-4 focus:ring-pink-300 focus:border-pink-500 disabled:bg-gray-200 disabled:text-gray-500 text-lg shadow-inner"
            placeholder="Enter new password"
          />
          <p className="text-xs text-gray-600 mt-1">
            Must be at least 6 characters long
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4 pt-4">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-3 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transform hover:scale-105 transition-all font-bold"
            >
              🔑 Change Password
            </button>
          ) : (
            <>
              <button
                onClick={handleSaveChanges}
                disabled={isSaving}
                className="px-6 py-3 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transform hover:scale-105 transition-all font-bold disabled:opacity-50"
              >
                {isSaving ? "💾 Saving..." : "💾 Save"}
              </button>
              <button
                onClick={handleCancelChanges}
                disabled={isSaving}
                className="px-6 py-3 bg-gray-400 text-white rounded-full shadow-lg hover:bg-gray-500 transform hover:scale-105 transition-all font-bold disabled:opacity-50"
              >
                ❌ Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
