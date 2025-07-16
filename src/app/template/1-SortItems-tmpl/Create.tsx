"use client"

import { useEffect, useState } from "react";
import generateHash  from "@/lib/utils/generateHash";
import { CreateActivityProps } from "@/layouts/CreateActivityLayout";

export type BasketItemType = {
  basket: string,
  type: "text" | "image",
  value: string,
  label?: string,
}

export type Basket = {
  basket: string,
  items: Array<BasketItemType>,
}

export type ActivityDataType = {
  box: Array<BasketItemType>,
  baskets: Array<Basket>,
}

/*
Activity output example

{
  "box": [
    { "basket": "Fruits", "type": "text", "value": "Apple" },
    { "basket": "Fruits", "type": "image", "value": "https://example.com/apple.jpg", "label": "Apple" }
    { "basket": "Vegetables", "type": "text", "value": "Carrot" },
    { "basket": "Vegetables", "type": "image", "value": "https://example.com/carrot.jpg", "label": "Carrot" }
  ],
  "baskets": [
    { 
      "basket": "Fruits",
      "items": []
    },
    {
      "basket": "Vegetables",
      "items": []
    }
  ]
}
*/


export default function SortItems(props: CreateActivityProps) {

  const { setMediaFiles, setActivityValidation, setActivityFinalizer } = props;

  // Central state for all activity data
  const [basketData, setBasketData] = useState<ActivityDataType>({
    box: [
      { basket: "", type: "text", value: "" }
    ],
    baskets: [
      { basket: "", items: [] }
    ],
  });

  // For previewing images by file hash
  const [itemImages, setItemImages] = useState<Map<string, File>>(new Map());

  // Validation effect
  useEffect(() => {

    // All baskets must have a non-empty title
    for (let basket of basketData.baskets) {
      if (!basket.basket.trim()) {
        setActivityValidation({ status: false, message: "Each basket must have a title." });
        return;
      }
    }
    // All items must have a non-empty value, and image items must have a label
    for (let item of basketData.box) {
      if (!item.value.trim()) {
        setActivityValidation({ status: false, message: "Each item must have a value." });
        return;
      }
      if (item.type === "image" && (!item.label || !item.label.trim())) {
        setActivityValidation({ status: false, message: "Each image item must have a label." });
        return;
      }
    }
    setActivityValidation({ status: true, message: "" });
  }, [basketData, setActivityValidation]);

  // Finalizer effect
  useEffect(() => {
    setActivityFinalizer(() => {
      return (mediaFileUrls: Map<string, string> | false): ActivityDataType => {
        // Deep copy basketData
        const finalizedData: ActivityDataType = JSON.parse(JSON.stringify(basketData));
        if (mediaFileUrls) {
          for (let item of finalizedData.box) {
            if (item.type === "image" && mediaFileUrls.has(item.value)) {
              item.value = mediaFileUrls.get(item.value)!;
            }
          }
        }
        return finalizedData;
      };
    });
  }, [basketData, setActivityFinalizer]);

  // Add a new basket
  function addBasket() {
    setBasketData(prev => ({
      ...prev,
      baskets: prev.baskets.concat({ basket: "", items: [] })
    }));
  }

  // Add a new item to a basket
  function addItemToBasket(basketIndex: number, type: "text" | "image") {
    const basketName = basketData.baskets[basketIndex]?.basket || "";
    const newItem: BasketItemType =
      type === "text"
        ? { basket: basketName, type: "text", value: "" }
        : { basket: basketName, type: "image", value: "", label: "" };
    setBasketData(prev => ({
      ...prev,
      box: prev.box.concat(newItem)
    }));
  }

  // Delete a basket and all its items
  function deleteBasket(index: number) {
    const basketName = basketData.baskets[index]?.basket;
    setBasketData(prev => ({
      baskets: prev.baskets.filter((_, i) => i !== index),
      box: prev.box.filter(item => item.basket !== basketName)
    }));
  }

  // Delete an item from box
  function deleteItem(itemIndex: number): void {
    setBasketData(prev => ({
      ...prev,
      box: prev.box.filter((_, i) => i !== itemIndex)
    }));
  }

  // Change basket title and update all items referencing it
  function handleTitleChange(basketIndex: number, newTitle: string): void {
    const oldTitle = basketData.baskets[basketIndex]?.basket;
    setBasketData(prev => {
      const newBaskets = prev.baskets.slice();
      newBaskets[basketIndex] = { ...newBaskets[basketIndex], basket: newTitle };
      const newBox = prev.box.map(item =>
        item.basket === oldTitle ? { ...item, basket: newTitle } : item
      );
      return { baskets: newBaskets, box: newBox };
    });
  }

  // Change item value
  function handleItemChange(itemIndex: number, value: string): void {
    setBasketData(prev => {
      const newBox = prev.box.slice();
      newBox[itemIndex] = { ...newBox[itemIndex], value };
      return { ...prev, box: newBox };
    });
  }

  // Change item label
  function handleLabelChange(itemIndex: number, label: string): void {
    setBasketData(prev => {
      const newBox = prev.box.slice();
      newBox[itemIndex] = { ...newBox[itemIndex], label };
      return { ...prev, box: newBox };
    });
  }

  // Change item basket (for moving item to another basket)
  function handleItemBasketChange(itemIndex: number, newBasket: string): void {
    setBasketData(prev => {
      const newBox = prev.box.slice();
      newBox[itemIndex] = { ...newBox[itemIndex], basket: newBasket };
      return { ...prev, box: newBox };
    });
  }

  // Handle file/image upload
  async function handleFileChange(itemIndex: number, file: File | null): Promise<void> {
    if (file) {
      const fileHash = await generateHash(file.name);
      setMediaFiles(prev => {
        const newMap = new Map(prev);
        newMap.set(fileHash, file);
        return newMap;
      });
      setItemImages(prev => {
        const newMap = new Map(prev);
        newMap.set(fileHash, file);
        return newMap;
      });
      setBasketData(prev => {
        const newBox = prev.box.slice();
        newBox[itemIndex] = { ...newBox[itemIndex], value: fileHash };
        return { ...prev, box: newBox };
      });
    }
  }

  return (
    <section className="mb-6 bg-white p-4 rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Define Baskets</h2>
      <div className="flex flex-col gap-6">
        {basketData.baskets.map(function (basket: Basket, basketIdx: number) {
          return (
            <div key={basketIdx} className="bg-slate-100 p-4 rounded-xl border border-slate-300">
              <div className="flex justify-between items-center gap-2 mb-2">
                <input
                  type="text"
                  className="w-full p-2 border border-slate-300 rounded-lg bg-slate-50 transition-colors duration-300 focus:border-blue-500 focus:outline-none focus:bg-white mb-4 text-lg"
                  placeholder={"Basket " + (basketIdx + 1) + " Title "}
                  value={basket.basket}
                  required
                  onChange={function (e) {
                    handleTitleChange(basketIdx, e.target.value);
                  }}
                />
                <button
                  className="bg-transparent border-none text-red-500 text-2xl cursor-pointer hover:text-red-600"
                  onClick={function () {
                    deleteBasket(basketIdx);
                  }}
                >
                  🗑️
                </button>
              </div>
              {/* Items for this basket */}
              {basketData.box
                .map((item, itemIdx) => ({ item, itemIdx }))
                .filter(({ item }) => item.basket === basket.basket)
                .map(({ item, itemIdx }) => (
                  <div key={itemIdx} className="flex items-start justify-between gap-2 mb-4">
                    {item.type === "text" ? (
                      <input
                        type="text"
                        className="w-full p-2 border border-slate-300 rounded-lg bg-slate-50 transition-colors duration-300 focus:border-blue-500 focus:outline-none focus:bg-white"
                        placeholder={"Item Text"}
                        value={item.value}
                        required
                        onChange={function (e) {
                          handleItemChange(itemIdx, e.target.value);
                        }}
                      />
                    ) : (
                      <div className="w-full">
                        <input
                          type="text"
                          className="w-full p-2 border border-slate-300 rounded-lg bg-slate-50 transition-colors duration-300 focus:border-blue-500 focus:outline-none focus:bg-white mb-2"
                          placeholder={"Image Label"}
                          value={item.label || ""}
                          required
                          onChange={function (e) {
                            handleLabelChange(itemIdx, e.target.value);
                          }}
                        />
                        {!item.value && (
                          <input
                            type="file"
                            accept="image/*"
                            className="w-full p-2 border border-slate-300 rounded-lg bg-slate-50 transition-colors duration-300 focus:border-blue-500 focus:outline-none focus:bg-white mb-2"
                            required
                            onChange={function (e) {
                              const file = e.target.files ? e.target.files[0] : null;
                              handleFileChange(itemIdx, file);
                            }}
                          />
                        )}
                        {item.value && itemImages.has(item.value) && (
                          <div className="mt-2">
                            <img
                              src={URL.createObjectURL(itemImages.get(item.value)!)}
                              alt={item.label || "Item"}
                              className="h-[1in] object-contain rounded-md shadow border"
                            />
                          </div>
                        )}
                      </div>
                    )}
                    <button
                      className="bg-transparent border-none text-red-500 text-2xl cursor-pointer hover:text-red-600 mt-1"
                      onClick={function () {
                        deleteItem(itemIdx);
                      }}
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              <div className="flex gap-2 mt-2">
                <button
                  className="font-semibold py-2 px-6 rounded-lg transition bg-blue-500 text-white hover:bg-blue-600"
                  onClick={function () {
                    addItemToBasket(basketIdx, "text");
                  }}
                >
                  + Add Text
                </button>
                <button
                  className="font-semibold py-2 px-6 rounded-lg transition bg-blue-500 text-white hover:bg-blue-600"
                  onClick={function () {
                    addItemToBasket(basketIdx, "image");
                  }}
                >
                  + Add Image
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <button
        className="font-semibold py-2 px-6 rounded-lg transition bg-green-500 text-white hover:bg-green-600 mt-4"
        onClick={addBasket}
      >
        + Add Basket
      </button>
    </section>
  );
}
