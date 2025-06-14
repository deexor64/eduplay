import { generateHash } from "@/utils/generateRandomID";
import { useState } from "react";

interface CoverImageProps {
  formData: Object, 
  setFormData: Function,
  form: FormData, // actual form object
  setForm: Function
}

export default function CoverImage(props: CoverImageProps) {
  
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null);

  async function setCoverImage(file: File) {
    
    // old file hash
    // @ts-ignore
    let fileHash = props.formData.coverImage;
    
    // delete old image
    if (fileHash.length >= 0) {
      props.setForm(function (prev: any) {
        prev.delete(fileHash);
        return prev;
      });
    }
    
    // new file hash
    fileHash = await generateHash(file.name);
    
    // modify formData and form
    props.setFormData(function (prev: any) { return { ...prev, coverImage: fileHash } });
    props.setForm(function (prev: any) {
      prev.append(fileHash, file);
      return prev;
    });
    
    // set preview
    setCoverImagePreview(URL.createObjectURL(file));
    
  }


  return (
    
    <section className="mb-6 bg-white p-4 rounded-xl shadow-sm">
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
