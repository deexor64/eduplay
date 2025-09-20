"use client"

import React, { useState, useEffect } from "react";

interface PersonalInfoData {
  firstName: string;
  lastName: string;
  email: string;
}

interface PersonalInfoFormProps {
  data: PersonalInfoData;
  updateStudentInfo: (update: PersonalInfoData) => Promise<void>;
}

// Child-friendly personal information form
export default function PersonalInfoForm(props: PersonalInfoFormProps) {

  const { data, updateStudentInfo } = props;
  
  const [formData, setFormData] = useState<PersonalInfoData>(data);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  // Handle input changes
  const handleInputChange = (field: keyof PersonalInfoData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle save changes
  async function handleSaveChanges() {
    setIsSaving(true);
    await updateStudentInfo(formData);
    setIsSaving(false);
    setIsEditing(false);
  };

  // Handle cancel changes
  function handleCancelChanges() {
    setFormData(data);
    setIsEditing(false);
  };

  return (
    <div className="relative bg-gradient-to-br from-pink-200 via-yellow-100 to-green-200 rounded-3xl p-8 shadow-xl border-4 border-violet-400 overflow-hidden">
    
      {/* Floating Decorations */}
      <div className="absolute top-2 left-2 w-6 h-6 bg-yellow-400 rounded-full opacity-70 animate-bounce"></div>
      <div className="absolute bottom-4 right-6 w-10 h-10 bg-purple-300 rounded-full opacity-60 animate-pulse"></div>
      <div className="absolute top-10 right-12 w-5 h-5 bg-blue-300 rounded-full opacity-70 animate-spin-slow"></div>
    
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-extrabold text-purple-800 tracking-wide flex items-center gap-2">
          👤 Personal Info
        </h2>
      </div>
    
      <div className="space-y-6">
        
        {/* First Name */}
        <div>
          <label className="block text-base font-bold text-blue-800 mb-2">
            First Name
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            disabled={!isEditing}
            className="w-full px-5 py-3 border-2 border-purple-400 rounded-2xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 disabled:bg-gray-200 disabled:text-gray-500 text-lg shadow-inner"
            placeholder="Enter your first name"
          />
        </div>
    
        {/* Last Name */}
        <div>
          <label className="block text-base font-bold text-blue-800 mb-2">
            Last Name
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            disabled={!isEditing}
            className="w-full px-5 py-3 border-2 border-pink-400 rounded-2xl focus:ring-4 focus:ring-pink-300 focus:border-pink-500 disabled:bg-gray-200 disabled:text-gray-500 text-lg shadow-inner"
            placeholder="Enter your last name"
          />
        </div>
    
        {/* Email */}
        <div>
          <label className="block text-base font-bold text-blue-800 mb-2">
            Email (To change your email please contact your teacher)
          </label>
          <div className="w-full px-5 py-3 border-2 border-green-400 bg-gray-200 text-gray-500 rounded-2xl focus:ring-4 focus:ring-green-300 focus:border-green-500 disabled:bg-gray-200 disabled:text-gray-500 text-lg shadow-inner">
            {formData.email}
          </div>
        </div>
    
        {/* Action Buttons */}
        <div className="flex space-x-4 pt-4">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-3 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transform hover:scale-105 transition-all font-bold"
            >
              ✏️ Edit Info
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