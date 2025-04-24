import { useState } from "react";

import Layout from "./ui/Layout";
import "./NewSort.css";

function NewSort() {

  /*
  Array of objects representing baskets with items
  {
    id: string;
    title: string;
    items: string[];
  }
  */
  const [baskets, setBaskets] = useState([{ items: [""] }]);

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
    updatedBaskets[basketIndex].items = updatedBaskets[
      basketIndex
    ].items.filter((_, i) => i !== itemIndex);
    setBaskets(updatedBaskets);
  };

  return (

    <Layout title="Sort Items">

      {/* Basket Builder */}
      <section className="mb-6 bg-white p-4 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Define Baskets</h2>

        <div className="basket-container">
          {baskets.map((basket, index) => (
            <div key={index} className="basket-box">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold mb-2">Basket {index + 1}</h3>
                <button
                  className="delete-btn"
                  onClick={() => deleteBasket(index)}
                >
                  🗑️
                </button>
              </div>

              {basket.items.map((_, itemIdx) => (
                <div
                  key={itemIdx}
                  className="flex justify-between items-center"
                >
                  <input
                    type="text"
                    className="input mb-2"
                    placeholder={`Item ${itemIdx + 1}`}
                  />
                  <button
                    className="delete-btn"
                    onClick={() => deleteItem(index, itemIdx)}
                  >
                    🗑️
                  </button>
                </div>
              ))}

              <button
                className="btn btn-blue mt-2"
                onClick={() => addItemToBasket(index)}
              >
                + Add Item
              </button>
            </div>
          ))}
        </div>

        <button className="btn btn-green mt-4" onClick={addBasket}>
          + Add Basket
        </button>
      </section>

    </Layout>

  );
}

export default NewSort;
