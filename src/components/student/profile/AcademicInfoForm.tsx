"use client"

import { updateStudentInfo } from "@/actions/student/updateStudentInfo";
import React, { useState, useEffect } from "react";

interface AcademicInfoFormProps {
  data: {
    email?: string;
    grade?: number;
    class?: string;
    indexNumber: string;
  },
  onUpdateAcademicInfo: Function;
}

// Child-friendly academic information form
export default function AcademicInfoForm(props: AcademicInfoFormProps) {
  
  const { data, onUpdateAcademicInfo } = props;

  const [formData, setFormData] = useState<any>(data);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  // Handle input changes
  const handleInputChange = (field: keyof any, value: string | number) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle save changes
  async function handleSaveChanges() {
    setIsSaving(true);
    await updateStudentInfo(formData);
    onUpdateAcademicInfo();
    setIsSaving(false);
    setIsEditing(false);
  };

  // Handle cancel changes
  function handleCancelChanges() {
    setFormData(data);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-blue-700">Academic Information</h2>
        <div className="text-2xl">🎓</div>
      </div>

      <div className="space-y-4">
        {/* Student ID (Read-only) */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Student ID
          </label>
          <input
            type="text"
            value={formData.indexNumber}
            disabled={true}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
          />
          <p className="text-xs text-gray-500 mt-1">This cannot be changed</p>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
            placeholder="Enter your email address"
          />
        </div>

        {/* Grade */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Grade Level
          </label>
          <select
            value={formData.grade}
            onChange={(e) => handleInputChange('grade', parseInt(e.target.value))}
            disabled={!isEditing}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(grade => (
              <option key={grade} value={grade}>
                Grade {grade}
              </option>
            ))}
          </select>
        </div>

        {/* Class */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Class
          </label>
          <select
            value={formData.class}
            onChange={(e) => handleInputChange('class', e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
          >
            {['A', 'B', 'C', 'D', 'E', 'F'].map(className => (
              <option key={className} value={className}>
                Class {className}
              </option>
            ))}
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-4">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
            >
              Edit Information
            </button>
          ) : (
            <>
              <button
                onClick={handleSaveChanges}
                disabled={isSaving}
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold disabled:opacity-50"
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                onClick={handleCancelChanges}
                disabled={isSaving}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold disabled:opacity-50"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 