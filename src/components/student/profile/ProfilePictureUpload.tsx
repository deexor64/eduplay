"use client"

import React, { useState, useRef } from "react";
import localFont from "next/font/local";
import toSentenceCase from "@/lib/utils/toSentenceCase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashRestore, faUserPlus } from "@fortawesome/free-solid-svg-icons";

type ProfilePictureUploadProps = {
  updateProfilePictureHandler: (file: File) => Promise<void>;
  studentInfo: {
    currentImage: string;
    studentName: string;
    indexNumber: string;
    email: string;
    grade: number;
    status: string;
  };
}

const SpaceNova = localFont({
  src: "../../../assets/fonts/SpaceNova.otf",
  weight: "400",
  style: "normal",
});

export default function ProfilePictureUpload(props: ProfilePictureUploadProps) {
  
  const { updateProfilePictureHandler, studentInfo } = props;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  // Handle file input change
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  
    const file = e.target.files?.[0];

    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setSelectedImageUrl(e.target?.result as string);
      reader.readAsDataURL(file);
      setSelectedImage(file); // Save file for upload
    }

    e.target.value = '';
    
  };

  // Discard the selected image and file (reset to original state)
  const handleDiscardChanges = () => {
    setSelectedImageUrl(null);
    setSelectedImage(null);
  };

  // Handle save changes (upload the selected image and update DB)
  const handleSaveChanges = async () => {
    if (!selectedImage) return;
    setUploading(true);
    await updateProfilePictureHandler(selectedImage);
    setUploading(false);
    setSelectedImage(null);
    setSelectedImageUrl(null);
  };

  const displayImage = selectedImageUrl || studentInfo.currentImage;
  const statusColor = studentInfo.status === "ACTIVE" ? "bg-green-500" : "bg-red-500";

  return (
    <div className="relative w-full max-w-6xl mx-auto bg-gradient-to-br from-purple-400 via-pink-300 to-yellow-200 rounded-3xl shadow-2xl overflow-hidden flex items-center p-6">
    
      {/* Profile Picture */}
      <div className="relative w-1/3 flex-shrink-0">
        <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto">
          
          {/* Image */}
          <img
            src={displayImage}
            alt="Profile picture"
            className="w-full h-full object-cover"
          />
          
          {/* Overlay for upload */}
          <div className={`absolute inset-0 flex items-center justify-center bg-white/30 
            ${selectedImageUrl || uploading ? "opacity-40" : "opacity-0"} hover:opacity-100 transition-opacity`}>
            
            {!selectedImageUrl && !uploading && (
              <>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileInputChange}
                  className="hidden"
                  id="profile-picture-input"
                />
                <label htmlFor="profile-picture-input"
                  className="px-4 py-2 bg-purple-700 text-white rounded-lg font-bold cursor-pointer hover:bg-purple-800"
                >
                  <FontAwesomeIcon icon={faUserPlus} />
                </label>
              </>
            )}
    
            {selectedImageUrl && !uploading && (
              <div className="flex space-x-2">
                <button onClick={handleDiscardChanges} className="px-3 py-1 bg-gray-400 text-white rounded-lg hover:bg-gray-500 font-bold">
                  <FontAwesomeIcon icon={faTrashRestore} />
                </button>
                <button onClick={handleSaveChanges} className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 font-bold">
                  <FontAwesomeIcon icon={faSave} />
                </button>
              </div>
            )}
    
            {uploading && <span className="text-blue-900 font-bold">Uploading...</span>}
          
            </div>
        </div>
    
        {/* Accent stars */}
        <div className="absolute -top-4 -left-4 w-6 h-6 bg-yellow-400 rounded-full animate-bounce"></div>
        <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-pink-400 rounded-full animate-pulse"></div>
      
      </div>
    
      {/* Info Section */}
      <div className="ml-6 flex-1 flex flex-col justify-center items-start">
        
        {/* Name */}
        <h1 className={`${SpaceNova.className} text-5xl font-extrabold text-blue-900 uppercase`}>
          {studentInfo.studentName}
        </h1>
    
        {/* Grade */}
        <h2 className={`${SpaceNova.className} text-3xl font-bold text-orange-600 mt-2`}>
          GRADE {studentInfo.grade.toString().padStart(2, "0")}
        </h2>
    
        {/* Index & Status */}
        <div className="flex items-center mt-4 space-x-4">
          <div className="bg-white/80 px-3 py-1 rounded-full shadow-md font-bold text-blue-900">
            #{studentInfo.indexNumber}
          </div>
          <div className={`h-6 w-6 rounded-full ${statusColor} shadow-lg ring-2 ring-white`} title={toSentenceCase(studentInfo.status)}></div>
        </div>
    
      </div>
    
    </div>


  );
}
