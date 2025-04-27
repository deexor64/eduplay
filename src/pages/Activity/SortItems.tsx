import Layout from "./ui/Layout";
import "./SortItems.css";

function SortItems() {

  function fetchActivityData() {
    // Fetch activity data from API or local storage
  }

  function buildActivityData() {
    // Build activity data based on fetched data
  }

  function validateActivityData() {
    // Validate activity data before submission
  }

  let layoutProps = {
    activityTitle: "Sort the Recyclables",
    coverImageSrc: "",
    activityDescription: "🧠 Drag and drop each item into the correct basket below.\
    Make sure every item is sorted before you submit."
  };

  return (

    <Layout {...layoutProps} >

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

export default SortItems;
