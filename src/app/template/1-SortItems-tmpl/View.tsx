"use client";

import { ViewActivityProps } from "@/lib/utils/types";
import { useEffect, useState } from "react";
import { DndContext, rectIntersection, useDroppable, useDraggable } from "@dnd-kit/core";

type BasketItem = {
  type: "text" | "image";
  value: string;
  label?: string;
};

type Basket = {
  title: string;
  items: BasketItem[];
};

// text component
function TextItem(props: { id: string }) {
  return <span>{props.id}</span>;
}

// image component
function ImageItem(props: { src: string; alt: string }) {
  return (
    <img src={`${props.src}`} alt={props.alt} referrerPolicy="no-referrer"
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


function SortItems(props: ViewActivityProps) {

  const { activityData, setResultValidation, setResultData } = props;

  const [items, setItems] = useState<{
    [location: string]: { label: string; type: string; value: string }[];
  }>({ box: [] })

  // Build structure from activityData or reconstruct from resultData
  useEffect(() => {
    if (activityData && Array.isArray(activityData)) {
      buildStructure(activityData);
    }
  }, [activityData]);

  function buildStructure(data: any) {
    const initialItems: {
      [location: string]: { label: string; type: string; value: string }[];
    } = { box: [] };

    // Build structure from activityData format
    data.forEach((group: any) => {
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
    
    setItems(initialItems);
  }

  // result validation
  useEffect(() => {
    setResultValidation({ status: true, message: "" });
  }, [activityData, setResultValidation]);

  // Return resultData in same format as activityData
  useEffect(() => {

      const resultData: any[] = [];
      
      for (let key in items) {
        if (key !== 'box') {
          resultData.push({
            title: key,
            items: items[key].map((item) => ({
              label: item.label,
              type: item.type,
              value: item.value,
            }))
          });
        }
      }
      
      setResultData({score: {}, data: resultData});

    }, [items, setResultData]);

  

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
        {activityData && Array.isArray(activityData) && activityData.map((group: any) => (
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

  );
}

export default SortItems;
