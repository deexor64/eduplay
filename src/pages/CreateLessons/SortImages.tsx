import "./SortImages.css";


function SortImages() {
  return (
    <div className="max-w-6xl mx-auto p-4">
      
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Create "Sort Into Baskets" Lesson</h1>
      </header>

      {/* Lesson Info */}
      <section className="mb-6 bg-white p-4 rounded-xl shadow-sm">
        <label htmlFor="lesson-title" className="block font-semibold mb-2">Lesson Title</label>
        <input
          id="lesson-title"
          type="text"
          className="input"
          placeholder="e.g. Sort Fruits and Vegetables"
        />

        <label htmlFor="instructions" className="block font-semibold mt-4 mb-2">Instructions</label>
        <textarea
          id="instructions"
          rows={3}
          className="input"
          placeholder="Describe what students need to do..."
        ></textarea>
      </section>

      {/* Add Items */}
      <section className="mb-6 bg-white p-4 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Upload Sortable Items</h2>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <input type="file" accept="image/*" className="file-input" />
            <input type="text" placeholder="Label (e.g. Apple)" className="input flex-1" />
          </div>
          <div className="flex items-center gap-4">
            <input type="file" accept="image/*" className="file-input" />
            <input type="text" placeholder="Label (e.g. Carrot)" className="input flex-1" />
          </div>
        </div>
        <button className="btn btn-blue mt-4">+ Add More Items</button>
      </section>

      {/* Define Baskets */}
      <section className="mb-6 bg-white p-4 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Define Baskets</h2>
        <div className="flex flex-col gap-4">
          <input type="text" className="input" placeholder="Basket Name (e.g. Fruits)" />
          <input type="text" className="input" placeholder="Basket Name (e.g. Vegetables)" />
        </div>
        <button className="btn btn-blue mt-4">+ Add More Baskets</button>
      </section>

      {/* Save Lesson */}
      <footer className="flex justify-end">
        <button className="btn btn-green">Save Lesson</button>
      </footer>

    </div>
  );
}

export default SortImages;
