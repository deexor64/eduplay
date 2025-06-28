import { generateHash } from "@/lib/utils/generateRandomString";
import { useState } from "react";

interface CoverImageProps {
  setFormData: Function,
  setMediaFiles: Function
}

export default function CoverImage(props: CoverImageProps) {
  
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null);
  
  async function setCoverImage(file: File) {
    
    const newFileHash = await generateHash(file.name);
    
    props.setFormData(function (prev: any) { 
      
      const oldFileHash = prev.coverImageUrl;
      
      // delete old file hash and append new
      if (oldFileHash.length >= 0) {
        props.setMediaFiles(function (prev: Map<string, Blob>) {
          const tempFileList = new Map(prev);
          tempFileList.delete(oldFileHash);
          tempFileList.set(newFileHash, file);
          return tempFileList;
        });
      }
      
      return { ...prev, coverImageUrl: newFileHash } 
      
    });
    
    setCoverImagePreview(URL.createObjectURL(file));
    
  }

  return (
    
    <section className="mb-6 bg-white p-4 rounded-xl shadow-sm">
      
      {/* image */}
      <label htmlFor="coverImage" className="block text-lg font-semibold mb-2">
        Cover Image
      </label>
      <div className="mb-4">
        <input
          type="file"
          id="coverImage"
          accept="image/*"
          onChange={function (e) {
            const file = e.target.files ? e.target.files[0] : null;
            if (file) {
              setCoverImage(file);
            }
          }}
          className="block text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-200 p-1 file:p-1 file:rounded-md file:border file:border-gray-300 file:bg-gray-100"
        />
      </div>
      
      {/* preview */}
      {coverImagePreview && (
        <div className="w-full h-[2in] object-contain rounded-xl shadow-md border">
          <img
            src={coverImagePreview}
            alt="Cover Preview"
            className="w-auto h-[2in] object-contain mx-auto"
          />
        </div>
      )}
      
    </section>

  )
}
