import Footer from "./ui/Footer";

import "./NewSort.css";

function NewSort() {
  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Title */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Sort the Recyclables
        </h1>
      </header>

      {/* Cover Image */}
      <section className="mb-6">
        <img
          src="https://via.placeholder.com/600x200?text=Lesson+Cover+Image"
          alt="Cover"
          className="w-full h-[2in] object-contain rounded-xl shadow-md border"
        />
      </section>

      {/* Description */}
      <section className="mb-6 bg-white p-4 rounded-xl shadow-sm">
        <p className="text-lg text-gray-700">
          🧠 Drag and drop each item into the correct basket below. Make sure
          every item is sorted before you submit.
        </p>
      </section>

      {/* Items Box */}
      <section className="mb-6 bg-white p-4 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Items to Sort</h2>
        <div className="flex flex-wrap gap-4">
          <div className="sort-item">Plastic Bottle</div>
          <div className="sort-item">Banana Peel</div>
          <div className="sort-item">Glass Jar</div>
          <div className="sort-item">Newspaper</div>
          <div className="sort-item">Aluminum Can</div>
        </div>
      </section>

      {/* Baskets */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="basket-box">
          <h3 className="basket-title">Recyclables</h3>
          <div className="basket-content">
            {/* Dropped items will go here */}
          </div>
        </div>
        <div className="basket-box">
          <h3 className="basket-title">Organic Waste</h3>
          <div className="basket-content">
            {/* Dropped items will go here */}
          </div>
        </div>
        <div className="basket-box">
          <h3 className="basket-title">Non-Recyclables</h3>
          <div className="basket-content">
            {/* Dropped items will go here */}
          </div>
        </div>
      </section>

      {/* Footer Navigation */}
      <Footer />
    </div>
  );
}

export default NewSort;
