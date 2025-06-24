"use client";

import PreviewLayout from "@/components/templates/view-layout/PreviewLayout";

// View-only text item
function TextItem(props: { id: string }) {
  return (
    <div className="h-fit inline-flex items-center justify-center bg-yellow-100 text-amber-800 font-semibold 
    rounded-xl border border-yellow-300 shadow-sm select-none p-2">
      {props.id}
    </div>
  );
}

// View-only image item
function ImageItem(props: { src: string; alt: string }) {
  return (
    <img
      src={`/${props.src}`}
      alt={props.alt}
      className="h-20 w-fit object-contain rounded"
    />
  );
}

// Static droppable zone (same visuals, no DnD)
function DroppableZone(props: { children: any }) {
  return (
    <div
      className="min-h-[80px] bg-white rounded-lg p-2 border border-dashed border-gray-300 
      flex flex-wrap gap-2 items-start"
    >
      {props.children}
    </div>
  );
}

export default function SortItemsPreview() {
  
  const dbData = {
    sessionID: "1",
    templateName: "1-SortItems-tmpl",
    title: "Sort object",
    coverImage: "1746025057700_cute-giraffe.jpg",
    description:  "🧠 Drag and drop each item into the correct basket below.\nMake sure every item is sorted before you submit.",
    resultData: {
      Animals: [
        { label: "Cat", type: "text", value: "Cat" },
        { label: "Jiraffe", type: "image", value: "test-images/giraffe.jpg" },
      ],
      Vegetables: [
        { label: "Carrot", type: "text", value: "Carrot" },
      ],
      box: [
        { label: "Potatoe", type: "text", value: "Potatoe" },
      ],
    },
    gradingData: {},
    options: {
      timeLimit: 0,
      isGraded: false,
    }
  };

  return (
    <PreviewLayout dbData={dbData}>
      {/* Box Area */}
      <section className="mb-6 bg-white p-4 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Items to Sort</h2>
        <DroppableZone>
          {dbData.resultData.box.map((item) =>
            item.type === "image" ? (
              <ImageItem key={item.label} src={item.value} alt={item.label} />
            ) : (
              <TextItem key={item.label} id={item.label} />
            )
          )}
        </DroppableZone>
      </section>

      {/* Grouped Baskets */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {Object.keys(dbData.resultData)
          .filter((groupKey) => groupKey !== "box")
          .map((groupKey) => (
            <div
              className="bg-gray-50 border-2 border-dashed border-gray-300 p-4 rounded-xl min-h-[120px]"
              key={groupKey}
            >
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                {groupKey}
              </h3>
              <DroppableZone>
                {// @ts-ignore
                  dbData.resultData[groupKey].map((item) =>
                  item.type === "image" ? (
                    <ImageItem
                      key={item.label}
                      src={item.value}
                      alt={item.label}
                    />
                  ) : (
                    <TextItem key={item.label} id={item.label} />
                  )
                )}
              </DroppableZone>
            </div>
          ))}
      </section>
    </PreviewLayout>
  );
}

