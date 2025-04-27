import { useState } from "react";

import Layout from "./ui/Layout";
import "./SortItems.css";

function SortItems() {

  // --------------------------------------default------------------------------------

  // layout props
  let layoutProps = {
    templateTitle: "Sort Items",
    validateTemplate: validateTemplate,
    getTemplateInputs: getTemplateInputs,
    children: null
  }

  // validate template
  function validateTemplate(): { status: boolean, message: string } {

    for (let basket of baskets) {
      if (!basket.title.trim()) {
        return { status: false, message: "Each basket must have a title." };
      }
      for (let item of basket.items) {
        if (!item.value.trim()) {
          return { status: false, message: "Each item must have a value." };
        }
      }
    }
    return { status: true, message: "" };

  }

  // template data
  function getTemplateInputs(): any {
    return {
      templateData: JSON.stringify(baskets),
      mediaFiles: mediaFiles
    };
  }

  // --------------------------------------end default------------------------------------

  // baskets
  type BasketItem = {
    type: "text" | "image";
    value: string;  // This will store the image hash or text
    label?: string;
  };

  type Basket = {
    title: string;
    items: BasketItem[];
  };

  // Separate state for media files
  const [mediaFiles, setMediaFiles] = useState<Map<string, File>>(new Map());

  const [baskets, setBaskets] = useState<Basket[]>([
    { title: "", items: [{ type: "text", value: "" }] },
  ]);

  // basket operations
  function addBasket(): void {
    const updatedBaskets = baskets.concat({
      title: "",
      items: [{ type: "text", value: "" }],
    });
    setBaskets(updatedBaskets);
  }

  function addItemToBasket(basketIndex: number, type: "text" | "image"): void {
    const updated = baskets.slice();
    updated[basketIndex].items.push({ type: type, value: "", label: "" });
    setBaskets(updated);
  }

  function deleteBasket(index: number): void {
    const updated: Basket[] = [];
    for (let i = 0; i < baskets.length; i++) {
      if (i !== index) {
        updated.push(baskets[i]);
      }
    }
    setBaskets(updated);
  }

  function deleteItem(basketIndex: number, itemIndex: number): void {
    const updated = baskets.slice();
    const newItems: BasketItem[] = [];
    for (let i = 0; i < updated[basketIndex].items.length; i++) {
      if (i !== itemIndex) {
        newItems.push(updated[basketIndex].items[i]);
      }
    }
    updated[basketIndex].items = newItems;
    setBaskets(updated);
  }

  function handleTitleChange(basketIndex: number, newTitle: string): void {
    const updated = baskets.slice();
    updated[basketIndex].title = newTitle;
    setBaskets(updated);
  }

  function handleItemChange(basketIndex: number, itemIndex: number, value: string): void {
    const updated = baskets.slice();
    updated[basketIndex].items[itemIndex].value = value;
    setBaskets(updated);
  }

  function handleLabelChange(basketIndex: number, itemIndex: number, label: string): void {
    const updated = baskets.slice();
    updated[basketIndex].items[itemIndex].label = label;
    setBaskets(updated);
  }

  function handleFileChange(basketIndex: number, itemIndex: number, file: File | null): void {
    if (file) {
      const fileHash = `${Date.now()}_${file.name}`;
      setMediaFiles(new Map(mediaFiles.set(fileHash, file)));

      const updated = baskets.slice();
      updated[basketIndex].items[itemIndex].value = fileHash;  // Store file hash
      setBaskets(updated);
    }
  }

  return (
    <Layout {...layoutProps}>

      <section className="mb-6 bg-white p-4 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Define Baskets</h2>

        <div className="basket-container">
          {baskets.map(function (basket: Basket, index: number) {
            return (
              <div key={index} className="basket-box">
                <div className="flex justify-between items-center gap-2 mb-2">
                  <input
                    type="text"
                    className="input mb-4 text-lg"
                    placeholder={"Basket " + (index + 1) + " Title "}
                    value={basket.title}
                    required
                    onChange={function (e) {
                      handleTitleChange(index, e.target.value);
                    }}
                  />
                  <button
                    className="delete-btn"
                    onClick={function () {
                      deleteBasket(index);
                    }}
                  >
                    🗑️
                  </button>
                </div>

                {basket.items.map(function (item: BasketItem, itemIdx: number) {
                  return (
                    <div
                      key={itemIdx}
                      className="flex items-start justify-between gap-2 mb-4"
                    >
                      {item.type === "text" ? (
                        <input
                          type="text"
                          className="input"
                          placeholder={"Item " + (itemIdx + 1) + " Text"}
                          value={item.value}
                          required
                          onChange={function (e) {
                            handleItemChange(index, itemIdx, e.target.value);
                          }}
                        />
                      ) : (
                        <div className="w-full">
                          <input
                            type="text"
                            className="input mb-2"
                            placeholder={"Item " + (itemIdx + 1) + " Image Label"}
                            value={item.label || ""}
                            required
                            onChange={function (e) {
                              handleLabelChange(index, itemIdx, e.target.value);
                            }}
                          />

                          {!item.value && (
                            <input
                              type="file"
                              accept="image/*"
                              className="input mb-2"
                              required
                              onChange={function (e) {
                                const file = e.target.files ? e.target.files[0] : null;
                                handleFileChange(index, itemIdx, file);
                              }}
                            />
                          )}

                          {item.value && (
                            <div className="mt-2">
                              <img
                                src={URL.createObjectURL(mediaFiles.get(item.value)!)}
                                alt={item.label || "Item " + (itemIdx + 1)}
                                className="h-[1in] object-contain rounded-md shadow border"
                              />
                            </div>
                          )}
                        </div>
                      )}

                      <button
                        className="delete-btn mt-1"
                        onClick={function () {
                          deleteItem(index, itemIdx);
                        }}
                      >
                        🗑️
                      </button>
                    </div>
                  );
                })}

                <div className="flex gap-2 mt-2">
                  <button
                    className="btn btn-blue"
                    onClick={function () {
                      addItemToBasket(index, "text");
                    }}
                  >
                    + Add Text
                  </button>
                  <button
                    className="btn btn-blue"
                    onClick={function () {
                      addItemToBasket(index, "image");
                    }}
                  >
                    + Add Image
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <button className="btn btn-green mt-4" onClick={addBasket}>
          + Add Basket
        </button>
      </section>
    </Layout>
  );
}

export default SortItems;
