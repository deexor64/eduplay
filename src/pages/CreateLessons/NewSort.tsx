import "./NewSort.css";
import { useState } from "react";

function NewSort() {
  const [baskets, setBaskets] = useState([{ items: [""] }]);

  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string>("https://via.placeholder.com/300x200?text=Cover+Preview");


  const addBasket = () => {
    setBaskets([...baskets, { items: [""] }]);
  };

  const addItemToBasket = (basketIndex: number) => {
    const updated = [...baskets];
    updated[basketIndex].items.push("");
    setBaskets(updated);
  };

  const deleteBasket = (index: number) => {
    const updatedBaskets = baskets.filter((_, i) => i !== index);
    setBaskets(updatedBaskets);
  };

  const deleteItem = (basketIndex: number, itemIndex: number) => {
    const updatedBaskets = [...baskets];
    updatedBaskets[basketIndex].items = updatedBaskets[basketIndex].items.filter((_, i) => i !== itemIndex);
    setBaskets(updatedBaskets);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      
      {/* Page Title */}
      <header className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Sort Items</h2>
      </header>

      {/* Lesson Title */}
      <section className="mb-4 bg-white p-4 rounded-xl shadow-sm">
        <label htmlFor="lesson-title" className="block font-semibold mb-2">Lesson Title</label>
        <input id="lesson-title" type="text" className="input" placeholder="e.g. Sort the Animals" />
      </section>

      {/* Upload Cover Image */}
      <section className="mb-6 bg-white p-4 rounded-xl shadow-sm">
      <div className="mb-4">
        <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700 mb-1">
          Upload Cover Image
        </label>
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Preview:</label>
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


      {/* Basket Builder */}
      <section className="mb-6 bg-white p-4 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Define Baskets</h2>

        <div className="basket-container">
          {baskets.map((basket, index) => (
            <div key={index} className="basket-box">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold mb-2">Basket {index + 1}</h3>
                <button className="delete-btn" onClick={() => deleteBasket(index)}>
                  🗑️
                </button>
              </div>

              {basket.items.map((_, itemIdx) => (
                <div key={itemIdx} className="flex justify-between items-center">
                  <input
                    type="text"
                    className="input mb-2"
                    placeholder={`Item ${itemIdx + 1}`}
                  />
                  <button className="delete-btn" onClick={() => deleteItem(index, itemIdx)}>
                    🗑️
                  </button>
                </div>
              ))}

              <button className="btn btn-blue mt-2" onClick={() => addItemToBasket(index)}>
                + Add Item
              </button>
            </div>
          ))}
        </div>

        <button className="btn btn-green mt-4" onClick={addBasket}>
          + Add Basket
        </button>
      </section>

      {/* Lesson Options */}
      <section className="mb-6 bg-white p-4 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Lesson Options</h2>
        <label className="block font-semibold mb-2">Time Limit</label>
        <input type="number" className="input" placeholder="Time in minutes" />
      </section>

      {/* Save Button */}
      <footer className="flex justify-end">
        <button className="btn btn-green">Save Lesson</button>
      </footer>
    </div>
  );
}

export default NewSort;
