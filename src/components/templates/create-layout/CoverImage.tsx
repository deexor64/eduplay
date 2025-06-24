import { generateHash } from "@/lib/utils/generateRandomString";
import { useState } from "react";

interface CoverImageProps {
  setFormData: Function,
  setForm: Function
}

export default function CoverImage(props: CoverImageProps) {
  
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null);
  
  function setCoverImage(file: File) {
    
    // modify formData and actual form
    props.setFormData(async function (prev: any) { 
      
      // old file hash
      let fileHash = prev.coverImage;
      
      // delete old image from actual form
      if (fileHash.length >= 0) {
        props.setForm(function (prev: any) {
          prev.delete(fileHash);
          return prev;
        });
      }
      
      // new file hash
      fileHash = await generateHash(file.name);
      
      // append new image to actual form
      props.setForm(function (prev: any) {
        prev.append(fileHash, file);
        return prev;
      });
      
      return { ...prev, coverImage: fileHash } 
      
    });
    
    // update preview
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
