import "./DragandDrop.css";

function DragandDrop() {
  return (

  <div className="max-w-6xl mx-auto p-4">
    
    {/* Header */}
    <header className="flex items-center justify-between mb-6">
      <h1 className="text-3xl font-bold">Label the Animal Body Parts</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500">Lesson 1 of 5</span>
        <div className="w-40 bg-gray-300 h-2 rounded-full">
          <div className="bg-green-500 h-2 rounded-full w-1/5"></div>
        </div>
      </div>
    </header>

    {/* Instructions */}
    <section className="mb-4 bg-white p-4 rounded-xl shadow-sm">
      <p className="text-lg">🧠 Drag the correct label to each body part of the animal shown below.</p>
    </section>

    {/* Media Content */}
    <section className="mb-4 bg-white p-4 rounded-xl shadow-sm">
      <img src="https://via.placeholder.com/600x300?text=Animal+Image" alt="Animal Diagram" className="rounded-xl mx-auto" />
    </section>

    {/* Interactive Section */}
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">

      {/* Drop Zones */}
      <div className="bg-white p-4 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Drop Zones</h2>
        <div className="space-y-4">
          <div className="drop-zone">Drop Zone 1</div>
          <div className="drop-zone">Drop Zone 2</div>
        </div>
      </div>

      {/* Draggable Items */}
      <div className="bg-white p-4 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Labels</h2>
        <div className="flex flex-wrap gap-4">
          <div className="drag-item">Tail</div>
          <div className="drag-item">Ear</div>
          <div className="drag-item">Leg</div>
        </div>
      </div>

    </section>

    {/* Feedback Message */}
    <section className="mb-4 bg-white p-4 rounded-xl shadow-sm">
      <p className="text-lg text-yellow-600">⬅️ Drag all labels to their correct positions before submitting.</p>
    </section>

    {/* Footer Navigation */}
    <footer className="flex justify-between items-center mt-8">
      <button className="btn btn-gray">⬅ Back</button>
      <button className="btn btn-green">Submit</button>
      <button className="btn btn-blue">Next ➡</button>
    </footer>

  </div>

  );
}

export default DragandDrop;