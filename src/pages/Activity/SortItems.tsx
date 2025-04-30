import { useEffect, useState } from "react";
import { DndContext, rectIntersection, useDroppable, useDraggable } from "@dnd-kit/core";

import Layout from "./ui/Layout";
import "./SortItems.css";

function DraggableItem(props: { id: string; children: string }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });

  const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="sort-item"
    >
      {props.children}
    </div>
  );
}

function DroppableZone(props: { id: string; children: any }) {
  const { setNodeRef } = useDroppable({ id: props.id });

  return (
    <div ref={setNodeRef} className="basket-content min-h-[80px] bg-slate-100 p-2 rounded">
      {props.children}
    </div>
  );
}

function SortItems() {
  const [activityData, setActivityData] = useState<any>(null);
  const [items, setItems] = useState<{ [location: string]: string[] }>({});

  useEffect(() => {
    const data = {
      title: "Sort object",
      coverImage: "1746025057700_cute-giraffe.jpg",
      description: "🧠 Drag and drop each item into the correct basket below.\nMake sure every item is sorted before you submit.",
      templateData: [
        {
          title: "Animals",
          items: [
            { type: "text", value: "Cat" },
            { type: "image", value: "1746025125166_cute-giraffe.jpg", label: "Jiraffe" }
          ]
        },
        {
          title: "Vegetables",
          items: [
            { type: "text", value: "Carrot" },
            { type: "text", value: "Potatoe" }
          ]
        }
      ],
      options: {
        timeLimit: 0,
        isGraded: false
      }
    };

    setActivityData(data);

    const initialItems: { [location: string]: string[] } = { box: [] };

    data.templateData.forEach((group) => {
      const basketId = group.title;
      initialItems[basketId] = [];

      group.items.forEach((item) => {
        const label = item.label || item.value;
        initialItems.box.push(label);
      });
    });

    setItems(initialItems);
  }, []);

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (!over) return;
    const from = findContainer(active.id);
    const to = over.id;

    if (from && to && from !== to) {
      setItems((prev) => {
        const newFrom = prev[from].filter((id) => id !== active.id);
        const newTo = [...prev[to], active.id];
        return { ...prev, [from]: newFrom, [to]: newTo };
      });
    }
  }

  function findContainer(itemId: string): string | null {
    for (let key in items) {
      if (items[key].includes(itemId)) return key;
    }
    return null;
  }

  if (!activityData) return <div>Loading...</div>;

  let layoutProps = {
    activityTitle: activityData.title,
    coverImageSrc: activityData.coverImage,
    activityDescription: activityData.description,
  };

  return (
    <Layout {...layoutProps}>

      <DndContext collisionDetection={rectIntersection} onDragEnd={handleDragEnd}>
        {/* Items Box */}
        <section className="mb-6 bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Items to Sort</h2>
          <DroppableZone id="box">
            <div className="flex flex-wrap gap-4">
              {items.box.map((id) => (
                <DraggableItem key={id} id={id}>{id}</DraggableItem>
              ))}
            </div>
          </DroppableZone>
        </section>

        {/* Baskets */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {activityData.templateData.map((group: any) => (
            <div className="basket-box" key={group.title}>
              <h3 className="basket-title">{group.title}</h3>
              <DroppableZone id={group.title}>
                {items[group.title].map((id) => (
                  <DraggableItem key={id} id={id}>{id}</DraggableItem>
                ))}
              </DroppableZone>
            </div>
          ))}
        </section>
      </DndContext>
    </Layout>
  );
}

export default SortItems;
