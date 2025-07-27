"use client"

import React, { useState, useRef } from "react";
import useFileStoreUploader from "@/hooks/useFileStoreUploader";
import generateHash from "@/lib/utils/generateHash";

type ProfilePictureUploadProps = {
  currentImage: string;
  studentName: string;
  updateStudentInfo: (update: any) => Promise<void>;
  studentInfo: {
    indexNumber: string;
    email: string;
    grade: number;
    class: string;
    status: string;
  };
}

export default function ProfilePictureUpload(props: ProfilePictureUploadProps) {
  
  const { currentImage, studentName, updateStudentInfo, studentInfo } = props;

  const fileStoreUploader = useFileStoreUploader();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const abortSave = useRef(false);
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);

  // Handle file selection
  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setFileToUpload(file); // Save file for upload
    }
  };

  // Handle file input change
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("File input change event triggered");
    const file = e.target.files?.[0];
    if (file) {
      console.log("File selected:", file.name);
      handleFileSelect(file);
    } else {
      console.log("No file selected");
    }
    // Reset the input value so the same file can be selected again
    e.target.value = '';
  };

  // Discard the selected image and file (reset to original state)
  const handleDiscardChanges = () => {
    setSelectedImage(null);
    setFileToUpload(null);
  };

  // Handle save changes (upload the selected image and update DB)
  const handleSaveChanges = async () => {
    if (!fileToUpload) return;
    setUploading(true);
    setUploadProgress(0);
    try {
      // Generate a unique hash for the filename
      const hash = await generateHash(studentName + Date.now().toString());
      const uniqueKey = `profile-${hash}`;
      var files = new Map();
      files.set(uniqueKey, fileToUpload);
      const urlMap = await fileStoreUploader(files, abortSave, function(progress) {
        setUploadProgress(progress);
      });
      const url = urlMap.get(uniqueKey);
      if (url) {
        await updateStudentInfo({ displayPicUrl: url });
      }
      setUploading(false);
      setFileToUpload(null);
      setSelectedImage(null); // Hide Save Changes button after upload
    } catch (e) {
      setUploading(false);
      // Optionally show error
    }
  };

  // The image to display in the preview (selected or current)
  const displayImage = selectedImage || currentImage;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
      <h2 className="text-xl font-bold text-blue-700 mb-4">Profile Information</h2>
      <div className="flex flex-col lg:flex-row items-center lg:items-stretch space-y-6 lg:space-y-0 lg:space-x-8 ">
        
        {/* Profile Picture section*/}
        <div className="flex flex-col items-center space-y-4 lg:justify-center ">
          
          {/* Profile Picture Preview */}
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-200 shadow-lg">
              <img
                src={displayImage}
                alt={`${studentName}'s profile picture`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Choose file button*/}
          <div className="relative">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => handleFileInputChange(e)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              id="profile-picture-input"
            />
            <label
              htmlFor="profile-picture-input"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold cursor-pointer inline-block"
            >
              Choose Photo
            </label>
          </div>

          {/* Upload action buttons */}
          <div className="flex space-x-3">
            {selectedImage && !uploading && (
              <>
                <button
                  onClick={handleDiscardChanges}
                  className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold"
                >
                  Discard Changes
                </button>
                <button
                  onClick={handleSaveChanges}
                  className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold"
                >
                  Save Changes
                </button>
              </>
            )}
            {uploading && (
              <div className="flex items-center space-x-2">
                <span className="text-blue-700 font-semibold">Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
            )}
          </div>
        </div>

        {/* Student Information section*/}
        <div className="flex-1 w-full lg:w-auto lg:flex lg:flex-col">
          <div className="bg-blue-50 rounded-xl p-4 space-y-3  flex flex-col justify-center">
            
            {/* Index number */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center space-x-2">
                <span className="text-blue-600">🎓</span>
                <div>
                  <p className="text-xs text-gray-500">Index Number</p>
                  <p className="font-semibold text-gray-800">{studentInfo.indexNumber}</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center space-x-2">
                <span className="text-blue-600">📧</span>
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="font-semibold text-gray-800">{studentInfo.email}</p>
                </div>
              </div>

              {/* Grade */}
              <div className="flex items-center space-x-2">
                <span className="text-blue-600">📚</span>
                <div>
                  <p className="text-xs text-gray-500">Grade</p>
                  <p className="font-semibold text-gray-800">Grade {studentInfo.grade}</p>
                </div>
              </div>

              {/* Class */}
              <div className="flex items-center space-x-2">
                <span className="text-blue-600">🏫</span>
                <div>
                  <p className="text-xs text-gray-500">Class</p>
                  <p className="font-semibold text-gray-800">Class {studentInfo.class}</p>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center space-x-2">
                <span className="text-blue-600">📊</span>
                <div>
                  <p className="text-xs text-gray-500">Status</p>
                  <p className="font-semibold text-gray-800">{studentInfo.status}</p>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
} 