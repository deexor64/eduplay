import { useState } from "react";
import Layout from "./ui/Layout";
import "./NewSort.css";

function NewSort() {
  const [baskets, setBaskets] = useState([
    { title: "", items: [{ type: "text", value: "" }] },
  ]);

  const addBasket = () => {
    setBaskets([
      ...baskets,
      { title: "", items: [{ type: "text", value: "" }] },
    ]);
  };

  const addItemToBasket = (basketIndex: number, type: "text" | "image") => {
    const updated = [...baskets];
    updated[basketIndex].items.push({ type, value: "", label: "" });
    setBaskets(updated);
  };

  const deleteBasket = (index: number) => {
    setBaskets(baskets.filter((_, i) => i !== index));
  };

  const deleteItem = (basketIndex: number, itemIndex: number) => {
    const updated = [...baskets];
    updated[basketIndex].items = updated[basketIndex].items.filter(
      (_, i) => i !== itemIndex
    );
    setBaskets(updated);
  };

  const handleTitleChange = (basketIndex: number, newTitle: string) => {
    const updated = [...baskets];
    updated[basketIndex].title = newTitle;
    setBaskets(updated);
  };

  const handleItemChange = (
    basketIndex: number,
    itemIndex: number,
    value: string
  ) => {
    const updated = [...baskets];
    updated[basketIndex].items[itemIndex].value = value;
    setBaskets(updated);
  };

  const handleLabelChange = (
    basketIndex: number,
    itemIndex: number,
    label: string
  ) => {
    const updated = [...baskets];
    updated[basketIndex].items[itemIndex].label = label;
    setBaskets(updated);
  };

  return (
    <Layout title="Sort Items">
      <section className="mb-6 bg-white p-4 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Define Baskets</h2>

        <div className="basket-container">
          {baskets.map((basket, index) => (
            <div key={index} className="basket-box">
              <div className="flex justify-between items-center gap-2 mb-2">
                <input
                  type="text"
                  className="input mb-4 text-lg"
                  placeholder={`Basket ${index + 1} Title `}
                  value={basket.title}
                  onChange={(e) => handleTitleChange(index, e.target.value)}
                />
                <button className="delete-btn" onClick={() => deleteBasket(index)}>🗑️</button>
              </div>

              {basket.items.map((item, itemIdx) => (
                <div key={itemIdx} className="flex items-start justify-between gap-2 mb-4">
                  {item.type === "text" ? (
                    <input
                      type="text"
                      className="input"
                      placeholder={`Item ${itemIdx + 1} Text`}
                      value={item.value}
                      onChange={(e) =>
                        handleItemChange(index, itemIdx, e.target.value)
                      }
                    />
                  ) : (
                    <div className="w-full">
                      {/* Text input for image label */}
                      <input
                        type="text"
                        className="input mb-2"
                        placeholder={`Item ${itemIdx + 1} Image Label`}
                        value={item.label || ""}
                        onChange={(e) =>
                          handleLabelChange(index, itemIdx, e.target.value)
                        }
                      />

                      {/* Show file input only if image not yet uploaded */}
                      {!item.value && (
                        <input
                          type="file"
                          accept="image/*"
                          className="input mb-2"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const imageURL = URL.createObjectURL(file);
                              const updated = [...baskets];
                              updated[index].items[itemIdx].value = imageURL;
                              setBaskets(updated);
                            }
                          }}
                        />
                      )}

                      {/* Show image preview if uploaded */}
                      {item.value && (
                        <div className="mt-2">
                          <img
                            src={item.value}
                            alt={item.label || `Item ${itemIdx + 1}`}
                            className="h-[1in] object-contain rounded-md shadow border"
                          />
                        </div>
                      )}
                    </div>
                  )}

                  <button
                    className="delete-btn mt-1"
                    onClick={() => deleteItem(index, itemIdx)}
                  >
                    🗑️
                  </button>
                </div>
              ))}

              <div className="flex gap-2 mt-2">
                <button
                  className="btn btn-blue"
                  onClick={() => addItemToBasket(index, "text")}
                >
                  + Add Text
                </button>
                <button
                  className="btn btn-blue"
                  onClick={() => addItemToBasket(index, "image")}
                >
                  + Add Image
                </button>
              </div>
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
