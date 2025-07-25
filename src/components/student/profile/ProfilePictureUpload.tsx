"use client"

import React, { useState, useRef } from "react";
import useFileStoreUploader from "@/hooks/useFileStoreUploader";
import { updateStudentInfo } from "@/actions/student/updateStudentInfo";
import generateHash from "@/lib/utils/generateHash";

interface ProfilePictureUploadProps {
  currentImage: string;
  studentName: string;
  updateStudentInfo: (update: any) => Promise<void>;
}

// Child-friendly profile picture upload component
export default function ProfilePictureUpload({ currentImage, studentName, updateStudentInfo }: ProfilePictureUploadProps) {
  // State for the currently selected image (in memory, not yet uploaded)
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  // State for drag-and-drop UI
  const [isDragging, setIsDragging] = useState(false);
  // Ref for the hidden file input
  const fileInputRef = useRef<HTMLInputElement>(null);
  // State for upload progress and status
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  // Ref to allow aborting the upload (not used in this UI)
  const abortSave = useRef(false);
  // File uploader hook
  const fileStoreUploader = useFileStoreUploader();
  // State for the file to upload
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);

  // Handle file selection from input or drag-and-drop
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

  // Handle file input change event
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  // Handle drag over event for drag-and-drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  // Handle drag leave event for drag-and-drop
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  // Handle drop event for drag-and-drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  // Handle click on the upload button (opens file input)
  const handleUploadClick = () => {
    fileInputRef.current?.click();
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
      <h2 className="text-xl font-bold text-blue-700 mb-4">Profile Picture</h2>
      
      <div className="flex flex-col items-center space-y-4">
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

        {/* Upload Area */}
        <div
          className={`w-full max-w-md p-6 border-2 border-dashed rounded-xl text-center cursor-pointer transition-colors ${
            isDragging
              ? "border-blue-400 bg-blue-50"
              : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={!selectedImage ? handleUploadClick : undefined}
        >
          <div className="text-4xl mb-2">📁</div>
          <p className="text-gray-600 mb-2">
            {isDragging ? "Drop your image here!" : "Click to upload or drag and drop"}
          </p>
          <p className="text-sm text-gray-500">PNG, JPG up to 5MB</p>
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          className="hidden"
        />

        {/* Action Buttons */}
        <div className="flex space-x-3">
          {!selectedImage && (
            <button
              onClick={handleUploadClick}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
              disabled={uploading}
            >
              Choose Photo
            </button>
          )}
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
    </div>
  );
} 