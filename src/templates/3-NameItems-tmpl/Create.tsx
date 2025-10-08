"use client"

import { useEffect, useState } from "react";
import generateHash from "@/lib/utils/generateHash";
import { CreateActivityProps } from "@/components/templates/CreateActivityLayout";

export type ItemType = {
  image: string,
  name: string,
}

export type ActivityDataType = {
  items: Array<ItemType>,
  showAnswerList: boolean,
}

/*
Activity output example

{
  "items": [
    { "image": "https://example.com/dog.jpg", "name": "dog" },
    { "image": "https://example.com/cat.jpg", "name": "cat" }
  ],
  "showAnswerList": true
}
*/

export default function NameItems(props: CreateActivityProps) {
  const { setMediaFiles, setActivityValidation, setActivityFinalizer } = props;

  // Central state for all activity data
  const [activityData, setActivityData] = useState<ActivityDataType>({
    items: [{ image: "", name: "" }],
    showAnswerList: true,
  });

  // For previewing images by file hash
  const [itemImages, setItemImages] = useState<Map<string, File>>(new Map());

  // Validation effect
  useEffect(() => {
    // Each item must have both an image and name
    for (let item of activityData.items) {
      if (!item.image.trim()) {
        setActivityValidation({ status: false, message: "Each item must have an image." });
        return;
      }
      if (!item.name.trim()) {
        setActivityValidation({ status: false, message: "Each item must have a name." });
        return;
      }
    }
    setActivityValidation({ status: true, message: "" });
  }, [activityData, setActivityValidation]);

  // Finalizer effect
  useEffect(() => {
    setActivityFinalizer(() => {
      return (mediaFileUrls: Map<string, string> | false): ActivityDataType => {
        // Deep copy activityData
        const finalizedData: ActivityDataType = JSON.parse(JSON.stringify(activityData));
        if (mediaFileUrls) {
          for (let item of finalizedData.items) {
            if (mediaFileUrls.has(item.image)) {
              item.image = mediaFileUrls.get(item.image)!;
            }
          }
        }
        return finalizedData;
      };
    });
  }, [activityData, setActivityFinalizer]);

  // Add new item
  function addItem() {
    setActivityData(prev => ({
      ...prev,
      items: [...prev.items, { image: "", name: "" }]
    }));
  }

  // Delete an item
  function deleteItem(index: number) {
    setActivityData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  }

  // Handle file upload for an item
  async function handleFileChange(index: number, file: File | null) {
    if (file) {
      const fileHash = await generateHash(file.name);

      // Add to parent state for final upload
      setMediaFiles(prev => {
        const newMap = new Map(prev);
        newMap.set(fileHash, file);
        return newMap;
      });

      // Add to local state for preview
      setItemImages(prev => {
        const newMap = new Map(prev);
        newMap.set(fileHash, file);
        return newMap;
      });

      // Update item data with file hash
      setActivityData(prev => {
        const newItems = [...prev.items];
        newItems[index] = { ...newItems[index], image: fileHash };
        return { ...prev, items: newItems };
      });
    }
  }

  // Handle name change for an item
  function handleNameChange(index: number, name: string) {
    setActivityData(prev => {
      const newItems = [...prev.items];
      newItems[index] = { ...newItems[index], name: name };
      return { ...prev, items: newItems };
    });
  }

  return (
    <section className="mb-6 bg-white p-4 rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Define Items to Name</h2>

      {/* Show Answer List Toggle */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="show-answers"
            checked={activityData.showAnswerList}
            onChange={(e) => setActivityData(prev => ({
              ...prev,
              showAnswerList: e.target.checked
            }))}
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="show-answers" className="text-gray-700 font-medium">
            Show list of possible answers to students
          </label>
        </div>
      </div>

      {/* Items List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {activityData.items.map((item, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200 h-fit">
            <div className="flex justify-between items-start">
              <div className="flex-1 space-y-4">
                {/* Name Input */}
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg bg-white transition-colors duration-300 focus:border-blue-500 focus:outline-none focus:bg-white"
                  placeholder="Enter item name..."
                  value={item.name}
                  onChange={(e) => handleNameChange(index, e.target.value)}
                />

                {/* Image Upload */}
                {!item.image ? (
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full p-2 border border-gray-300 rounded-lg bg-white transition-colors duration-300 focus:border-blue-500 focus:outline-none"
                    onChange={(e) => {
                      const file = e.target.files ? e.target.files[0] : null;
                      handleFileChange(index, file);
                    }}
                  />
                ) : (
                  <div className="relative flex items-center justify-center">
                    <img
                      src={URL.createObjectURL(itemImages.get(item.image)!)}
                      alt={item.name}
                      className="w-full h-40 object-contain rounded border-2 border-gray-400 bg-white"
                    />
                    <button
                      onClick={() => {
                        setActivityData(prev => {
                          const newItems = [...prev.items];
                          newItems[index] = { ...newItems[index], image: "" };
                          return { ...prev, items: newItems };
                        });
                      }}
                      className="absolute top-1 right-1 flex items-center justify-center h-5 w-5 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>

              {/* Delete Item Button */}
              <button
                onClick={() => deleteItem(index)}
                className="ml-4 text-red-500 hover:text-red-700"
                title="Delete item"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Item Button */}
      <div className="w-full">
        <button
          className="mt-4 font-semibold py-2 px-6 rounded-lg transition bg-green-500 text-white hover:bg-green-600"
          onClick={addItem}
        >
          + Add Item
        </button>
      </div>
    </section>
  );
}
