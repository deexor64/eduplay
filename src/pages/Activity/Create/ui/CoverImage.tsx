import { useState } from "react";

const [coverImage, setCoverImage] = useState<File | null>(null);
const [coverImagePreview, setCoverImagePreview] = useState<string>(
  "https://via.placeholder.com/300x200?text=Cover+Preview",
);

function CoverImage() {
  return (

    <section className="mb-6 bg-white p-4 rounded-xl shadow-sm">
      {/* Upload Cover Image */}
      <label htmlFor="coverImage" className="block font-semibold mb-2">
        Upload Cover Image
      </label>
      <div className="mb-4">
        <input
          type="file"
          id="coverImage"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setCoverImage(file);
              setCoverImagePreview(URL.createObjectURL(file));
            }
          }}
          className="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 file-input"
        />
      </div>

      {/* Image Preview */}
      {coverImagePreview && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Preview:
          </label>
          <div className="w-full max-w-xs overflow-hidden rounded-lg shadow-md border border-gray-200">
            <img
              src={coverImagePreview}
              alt="Cover Preview"
              className="w-auto h-[2in] object-contain mx-auto"
            />
          </div>
        </div>
      )}
    </section>
  );
}

export default CoverImage;
