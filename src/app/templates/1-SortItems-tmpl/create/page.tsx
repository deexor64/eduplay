"use client"

import { useState } from "react";
import {generateHash} from "@/utils/generateRandomID";
import CreateLayout from "@/app/templates/_common-template/create-layout/CreateLayout";

export default function SortItems() {
  
  // common
  function validateActivity() {
    
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
  
  // common
  function getActivityData() {
    return {
      templateName: "1-SortItems-tmpl",
      activityData: baskets,
      mediaFiles: mediaFiles
    };
  }

  
  type BasketItem = {
    type: "text" | "image";
    value: string;
    label?: string;
  };

  type Basket = {
    title: string;
    items: BasketItem[];
  };

  const [baskets, setBaskets] = useState<Basket[]>([
    { title: "", items: [{ type: "text", value: "" }] },
  ]);

  const [mediaFiles, setMediaFiles] = useState<Map<string, File>>(new Map());

  function addBasket() {
    const updatedBaskets = baskets.concat({
      title: "",
      items: [{ type: "text", value: "" }],
    });
    setBaskets(updatedBaskets);
  }

  function addItemToBasket(basketIndex: number, type: "text" | "image") {
    const updated = baskets.slice();
    updated[basketIndex].items.push(
      type == "text" ? { type: type, value: "" } :
        { type: type, value: "", label: "" }
    );
    setBaskets(updated);
  }

  function deleteBasket(index: number) {
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

  async function handleFileChange(basketIndex: number, itemIndex: number, file: File | null): Promise<void> {
    if (file) {
      const fileHash = await generateHash(file.name);
      setMediaFiles(new Map(mediaFiles.set(fileHash, file)));
      const updated = baskets.slice();
      updated[basketIndex].items[itemIndex].value = fileHash;
      setBaskets(updated);
    }
  }
  
  
  return (
    
  <CreateLayout templateTitle= {"Sort Items"} 
    validateActivity={validateActivity} 
    getActivityData={getActivityData}>
      
      <section className="mb-6 bg-white p-4 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Define Baskets</h2>

        <div className="flex flex-col gap-6">
          {baskets.map(function (basket: Basket, index: number) {
            return (
              <div key={index} className="bg-slate-100 p-4 rounded-xl border border-slate-300">
                <div className="flex justify-between items-center gap-2 mb-2">
                  <input
                    type="text"
                    className="w-full p-2 border border-slate-300 rounded-lg bg-slate-50 transition-colors duration-300 focus:border-blue-500 focus:outline-none focus:bg-white mb-4 text-lg"
                    placeholder={"Basket " + (index + 1) + " Title "}
                    value={basket.title}
                    required
                    onChange={function (e) {
                      handleTitleChange(index, e.target.value);
                    }}
                  />
                  <button
                    className="bg-transparent border-none text-red-500 text-2xl cursor-pointer hover:text-red-600"
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
                          className="w-full p-2 border border-slate-300 rounded-lg bg-slate-50 transition-colors duration-300 focus:border-blue-500 focus:outline-none focus:bg-white"
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
                            className="w-full p-2 border border-slate-300 rounded-lg bg-slate-50 transition-colors duration-300 focus:border-blue-500 focus:outline-none focus:bg-white mb-2"
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
                              className="w-full p-2 border border-slate-300 rounded-lg bg-slate-50 transition-colors duration-300 focus:border-blue-500 focus:outline-none focus:bg-white mb-2"
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
                        className="bg-transparent border-none text-red-500 text-2xl cursor-pointer hover:text-red-600 mt-1"
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
                    className="font-semibold py-2 px-6 rounded-lg transition bg-blue-500 text-white hover:bg-blue-600"
                    onClick={function () {
                      addItemToBasket(index, "text");
                    }}
                  >
                    + Add Text
                  </button>
                  <button
                    className="font-semibold py-2 px-6 rounded-lg transition bg-blue-500 text-white hover:bg-blue-600"
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

        <button className="font-semibold py-2 px-6 rounded-lg transition bg-green-500 text-white hover:bg-green-600 mt-4" onClick={addBasket}>
          + Add Basket
        </button>
      </section>
      
    </CreateLayout>
    
  );
}
