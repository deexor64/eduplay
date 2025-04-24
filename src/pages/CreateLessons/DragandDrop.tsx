import "./DragandDrop.css";


function DragandDropTemplate() {
  return (


  <div className="max-w-6xl mx-auto p-4">
    
    { /* Header */}
    <header className="mb-6">
      <h1 className="text-3xl font-bold">🛠️ Create New Lesson</h1>
    </header>

    { /* Lesson Title */}
    <section className="mb-4 bg-white p-4 rounded-xl shadow-sm">
      <label className="block text-lg font-semibold mb-2" htmlFor="lesson-title">Lesson Title</label>
      <input type="text" id="lesson-title" className="w-full input" placeholder="Enter lesson title..." />
    </section>

    { /* Instructions */}
    <section className="mb-4 bg-white p-4 rounded-xl shadow-sm">
      <label className="block text-lg font-semibold mb-2" htmlFor="instructions">Instructions</label>
      <textarea id="instructions" className="w-full input h-28" placeholder="Write student instructions here..."></textarea>
    </section>

    { /* Image Upload */}
    <section className="mb-4 bg-white p-4 rounded-xl shadow-sm">
      <label className="block text-lg font-semibold mb-2" htmlFor="image-upload">Lesson Image</label>
      <div className="file-upload-area">
        <p className="text-gray-500">Drag and drop an image here, or click to select a file</p>
        <input type="file" id="image-upload" className="file-input" />
      </div>
    </section>

    { /* Labels */}
    <section className="mb-4 bg-white p-4 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Labels</h2>
      <div className="space-y-3" id="label-list">
        <input type="text" className="input" placeholder="e.g., Tail" />
        <input type="text" className="input" placeholder="e.g., Leg" />
        <input type="text" className="input" placeholder="e.g., Ear" />
      </div>
      <button className="mt-4 btn btn-blue">+ Add Label</button>
    </section>

    { /* Preview */}
    <section className="mb-4 bg-white p-4 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Lesson Preview</h2>
      <div className="border rounded-lg p-4 bg-gray-50 text-center text-gray-400">Preview will appear here</div>
    </section>

    { /* Action Buttons */}
    <footer className="flex justify-end gap-4 mt-6">
      <button className="btn btn-gray">Cancel</button>
      <button className="btn btn-green">Save Lesson</button>
    </footer>

  </div>


  );
}

export default DragandDropTemplate;