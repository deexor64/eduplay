import Layout from "./ui/Layout";
import "./NewSort.css";

function NewSort() {
  return (

    <Layout title="Sort the Recyclables">

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

    </Layout >

  );
}

export default NewSort;
