"use client";

import { useEffect, useState } from "react";
import { DndContext, rectIntersection, useDroppable, useDraggable } from "@dnd-kit/core";
import ViewLayout from "@/components/templates/view-layout/ViewLayout";
import { dmmfToRuntimeDataModel } from "@prisma/client/runtime/library";

// text component
function TextItem(props: { id: string }) {
  return <span>{props.id}</span>;
}

// image component
function ImageItem(props: { src: string; alt: string }) {
  return (
    <img src={`/${props.src}`} alt={props.alt}
      className="h-20 w-fit object-contain" />
  );
}

// draggble
function DraggableItem(props: { id: string; type: string; value: string }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });
  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="h-fit inline-flex items-center justify-center bg-yellow-100 text-amber-800 font-semibold 
      rounded-xl border border-yellow-300 shadow-sm cursor-grab select-none 
      touch-none hover:scale-105 p-2"
    >
      {props.type === "image" ? (
        <ImageItem src={props.value} alt={props.id} />
      ) : (
        <TextItem id={props.id} />
      )}
    </div>
  );
}

// droppable
function DroppableZone(props: { id: string; children: any }) {
  const { setNodeRef } = useDroppable({ id: props.id });
  return (
    <div
      ref={setNodeRef}
      className="min-h-[80px] bg-white rounded-lg p-2 border border-dashed border-gray-300 
      flex flex-wrap gap-2 items-start"
    >
      {props.children}
    </div>
  );
}


function SortItems() {
  
  // data recieved from server
  const [dbData, setDbData] = useState<any>();
  
  // common
  function getResultData() {
    const workedData: {
      [key: string]: { label: string; type: string; value: string }[];
    } = {};

    for (let key in items) {
      workedData[key] = items[key].map((item) => ({
        label: item.label,
        type: item.type,
        value: item.value,
      }));
    }
    return workedData;
  }
  
  // common
  function validateResult(): { status: boolean, message: string } {
    return { status: true, message: "" }
  }
  
  // common
  function gradeResult() {
    
    const workedData = getResultData();
    let correctCount = 0;
    let totalGroups = dbData.activityData.length;

    dbData.activityData.forEach((group: any) => {
      const correctLabels = group.items.map((item: any) => item.label || item.value);
      const userLabels = (workedData[group.title] || []).map((i) => i.label);

      const sortedCorrect = [...correctLabels].sort();
      const sortedUser = [...userLabels].sort();

      if (JSON.stringify(sortedCorrect) === JSON.stringify(sortedUser)) {
        correctCount += 1;
      }
    });

    const passed = correctCount === totalGroups;
    const message = `${passed ? "🎉 Great job! Everything is sorted correctly.\n" :
      ""}✅ You got ${correctCount} out of ${totalGroups} baskets correct.`;

    return { grading: {},
      examinerDialog: message };
    
  }
  
  
  
  
  const [items, setItems] = useState<{
    [location: string]: { label: string; type: string; value: string }[];
  }>({ box: [] });

  function buildActivity() {
    const initialItems: {
      [location: string]: { label: string; type: string; value: string }[];
    } = { box: [] };

    if (dbData.activityData) {
      dbData.activityData.forEach((group: any) => {
        const basketId = group.title;
        initialItems[basketId] = [];

        group.items.forEach((item: any) => {
          const label = item.label || item.value;
          initialItems.box.push({
            label: label,
            type: item.type,
            value: item.value,
          });
        });
      });
    }

    setItems(initialItems);
  }

  useEffect(() => {
    buildActivity();
  }, []);

  function findContainer(label: string): string | null {
    for (let key in items) {
      if (items[key].some((item) => item.label === label)) return key;
    }
    return null;
  }

  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (!over) return;

    const from = findContainer(active.id);
    const to = over.id;

    if (from && to && from !== to) {
      setItems((prev) => {
        const activeItem = prev[from].find((item) => item.label === active.id);
        if (!activeItem) return prev;

        const newFrom = prev[from].filter((item) => item.label !== active.id);
        const newTo = [...(prev[to] || []), activeItem];
        return { ...prev, [from]: newFrom, [to]: newTo };
      });
    }
  }

  return (
    <ViewLayout setDbData={setDbData} getResultData={getResultData} 
      validateResult={validateResult} gradeResult={gradeResult}>
      <DndContext collisionDetection={rectIntersection} onDragEnd={handleDragEnd}>
        <section className="mb-6 bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Items to Sort</h2>
          <DroppableZone id="box">
            <div className="flex flex-wrap gap-4">
              {items.box &&
                items.box.map((item) => (
                  <DraggableItem
                    key={item.label}
                    id={item.label}
                    type={item.type}
                    value={item.value}
                  />
                ))}
            </div>
          </DroppableZone>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {dbData.activityData.map((group: any) => (
            <div
              className="bg-gray-50 border-2 border-dashed border-gray-300 p-4 rounded-xl min-h-[120px]"
              key={group.title}
            >
              <h3 className="text-lg font-semibold mb-2 text-gray-900">{group.title}</h3>
              <DroppableZone id={group.title}>
                {items[group.title] &&
                  items[group.title].map((item) => (
                    <DraggableItem
                      key={item.label}
                      id={item.label}
                      type={item.type}
                      value={item.value}
                    />
                  ))}
              </DroppableZone>
            </div>
          ))}
        </section>
      </DndContext>
    </ViewLayout>
  );
}

export default SortItems;


// preview data

// const dbData = {
//   sessionID: "1",
//   templateName: "1-SortItems-tmpl",
//   title: "Sort Animal and Vegetable",
//   coverImage: "1746025057700_cute-giraffe.jpg",
//   description:  "🧠 Drag and drop each item into the correct basket below.\nMake sure every item is sorted before you submit.",
//   resultData: {
//     Animals: [
//       { label: "Cat", type: "text", value: "Cat" },
//       { label: "Jiraffe", type: "image", value: "test-images/giraffe.jpg" },
//     ],
//     Vegetables: [
//       { label: "Carrot", type: "text", value: "Carrot" },
//     ],
//     box: [
//       { label: "Potatoe", type: "text", value: "Potatoe" },
//     ],
//   },
//   gradingData: {},
//   options: {
//     timeLimit: 0,
//     isGraded: false,
//   }
// };