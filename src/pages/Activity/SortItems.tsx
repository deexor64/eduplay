import Layout from "./ui/Layout";
import "./SortItems.css";

function SortItems() {

  function fetchActivityData() {
    // Fetch activity data from API or local storage
    let t = {
      title: "Sort object",
      coverImage: "1746025057700_cute-giraffe.jpg",
      description: "🧠 Drag and drop each item into the correct basket below.\n\
      Make sure every item is sorted before you submit.",
      templateData: [
        {
          "title": "Animals",
          "items": [
            {
              "type": "text",
              "value": "Cat"
            },
            {
              "type": "image",
              "value": "1746025125166_cute-giraffe.jpg",
              "label": "Jiraffe"
            }
          ]
        },
        {
          "title": "Vegetables",
          "items": [
            {
              "type": "text",
              "value": "Carrot"
            },
            {
              "type": "text",
              "value": "Potatoe"
            }
          ]
        }
      ],
      options: {
        "timeLimit": 0,
        "isGraded": false
      }
    }

  }

  // function buildActivityData() {
  //   // Build activity data based on fetched data
  // }

  // function validateActivityData() {
  //   // Validate activity data before submission
  // }

  let layoutProps = {
    activityTitle: "Sort the Objects",
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
