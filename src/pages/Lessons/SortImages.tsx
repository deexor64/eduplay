import "./SortImages.css";

function SortImages() {
  return (
    <div className="max-w-6xl mx-auto p-4">
      
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Sort the Items into Baskets</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">Lesson 2 of 5</span>
          <div className="w-40 bg-gray-300 h-2 rounded-full">
            <div className="bg-green-500 h-2 rounded-full w-2/5"></div>
          </div>
        </div>
      </header>

      {/* Instructions */}
      <section className="mb-4 bg-white p-4 rounded-xl shadow-sm">
        <p className="text-lg">🧺 Drag each image into the correct basket (e.g., Fruits, Vegetables).</p>
      </section>

      {/* Image Area */}
      <section className="mb-4 bg-white p-4 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Items</h2>
        <div className="flex flex-wrap gap-6 justify-center">
          <div className="image-item">
            <img src="https://via.placeholder.com/100x100?text=Apple" alt="Apple" />
          </div>
          <div className="image-item">
            <img src="https://via.placeholder.com/100x100?text=Carrot" alt="Carrot" />
          </div>
          <div className="image-item">
            <img src="https://via.placeholder.com/100x100?text=Banana" alt="Banana" />
          </div>
        </div>
      </section>

      {/* Baskets */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="basket-zone">
          <h3 className="text-lg font-bold mb-2">🍎 Fruit Basket</h3>
          <div className="basket-drop">Drop fruits here</div>
        </div>
        <div className="basket-zone">
          <h3 className="text-lg font-bold mb-2">🥕 Veggie Basket</h3>
          <div className="basket-drop">Drop vegetables here</div>
        </div>
      </section>

      {/* Footer */}
      <footer className="flex justify-between items-center mt-8">
        <button className="btn btn-gray">⬅ Back</button>
        <button className="btn btn-green">Submit</button>
        <button className="btn btn-blue">Next ➡</button>
      </footer>

    </div>
  );
}

export default SortImages;
