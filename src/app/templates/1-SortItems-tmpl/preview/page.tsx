"use client";

import ViewLayout from "@/app/templates/_common-template/view-layout/ViewLayout";
import { useEffect, useState } from "react";

function StaticItem(props: { id: string }) {
  return (
    <div className="inline-block px-4 py-2 bg-yellow-100 text-amber-800 font-semibold rounded-full border border-yellow-300 shadow-sm select-none">
      {props.id}
    </div>
  );
}

function StaticZone(props: { title: string; items: string[] }) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2 text-gray-900">{props.title}</h3>
      <div className="min-h-[80px] bg-white rounded-lg p-2 border border-dashed border-gray-300 flex flex-wrap gap-2 items-start">
        {props.items.map((id) => (
          <StaticItem key={id} id={id} />
        ))}
      </div>
    </div>
  );
}

export default function SortItems() {
  
  const dbData = {
    title: "Sort object",
    coverImage: "1746025057700_cute-giraffe.jpg",
    description:
      "🧠 Drag and drop each item into the correct basket below.\nMake sure every item is sorted before you submit.",
    lessonData: {
      box: [
        { type: "text", value: "Potatoe" }
      ],
      Animals: [
        { type: "text", value: "Cat" },
        { type: "image", value: "test-images/giraffe.jpg", label: "Jiraffe" }
      ],
      Vegetables: [
        { type: "text", value: "Carrot" }
      ],
    },
    options: {
      timeLimit: 0,
      isGraded: false
    },
    message: "✅ You got {number-temp} out of {totalGroups-temp} baskets correct."

  }

  const [items, setItems] = useState<{ [location: string]: string[] }>({});

  function buildActivityFromWorked() {
    if (!dbData || !dbData.lessonData) return;
    setItems(dbData.lessonData);
  }

  useEffect(() => {
    buildActivityFromWorked();
  }, []);

  return (
    <ViewLayout dbData={dbData}>
      <section className="mb-6 bg-white p-4 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Items to Sort</h2>
        <StaticZone title="Unsorted Items" items={items.box || []} />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {Object.keys(items)
          .filter((key) => key !== "box")
          .map((groupTitle) => (
            <div
              key={groupTitle}
              className="bg-gray-50 border-2 border-dashed border-gray-300 p-4 rounded-xl min-h-[120px]"
            >
              <StaticZone title={groupTitle} items={items[groupTitle]} />
            </div>
          ))}
      </section>
    </ViewLayout>
  );
}
