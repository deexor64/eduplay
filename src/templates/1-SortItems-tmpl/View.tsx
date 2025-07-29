"use client";

import { ViewActivityProps } from "@/components/templates/ViewActivityLayout";
import { useEffect, useState } from "react";
import { DndContext, rectIntersection, useDroppable, useDraggable } from "@dnd-kit/core";
import { ActivityDataType, BasketItemType } from "./Create";

/*
Activity input example - Fresh activity

{
  "box": [
    { "basket": "Fruits", "type": "text", "value": "Apple" },
    { "basket": "Fruits", "type": "image", "value": "https://example.com/apple.jpg", "label": "Apple" },
    { "basket": "Vegetables", "type": "image", "value": "https://example.com/carrot.jpg", "label": "Carrot" },
    { "basket": "Vegetables", "type": "text", "value": "Carrot" }
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

/*
Activity input example - Student progress

{
  "box": [],
  "baskets": [
    { 
      "basket": "Fruits",
      "items": [
        { "basket": "Fruits", "type": "image", "value": "https://example.com/apple.jpg", "label": "Apple" },
        { "basket": "Vegetables", "type": "image", "value": "https://example.com/carrot.jpg", "label": "Carrot" }
      ]
    },
    {
      "basket": "Vegetables",
      "items": [
        { "basket": "Vegetables", "type": "text", "value": "Carrot" },
        { "basket": "Fruits", "type": "text", "value": "Apple" }
      ]
    }
  ]
}
*/

/*
Activity output example

{
  "box": [],
  "baskets": [
    { 
      "basket": "Fruits",
      "items": [
        { "basket": "Fruits", "type": "text", "value": "Apple" },
        { "basket": "Fruits", "type": "image", "value": "https://example.com/apple.jpg", "label": "Apple" },
      ]
    },
    {
      "basket": "Vegetables",
      "items": [
        { "basket": "Vegetables", "type": "text", "value": "Carrot" },
        { "basket": "Vegetables", "type": "image", "value": "https://example.com/carrot.jpg", "label": "Carrot" }
      ]
    }
  ]
}
*/

// text component
function TextItem(props: { id: string; value: string }) {
  return <span>{props.value}</span>;
}

// image component
function ImageItem(props: { src: string; alt: string }) {
  return (
    <img src={`${props.src}`} alt={props.alt} referrerPolicy="no-referrer"
      className="h-20 w-fit object-contain" />
  );
}

// draggble
function DraggableItem(props: { 
  id: string; 
  type: string; 
  value: string; 
  intendedBasket: string;
  currentBasket?: string;
  resultIndicator?: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });
  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  // Check if item is in correct basket
  const isCorrect = props.currentBasket ? props.intendedBasket === props.currentBasket : true;
  
  // Get styling based on result indicator
  function getItemStyling(): string {
    if (!props.resultIndicator) {
      return "bg-gray-100 text-gray-800 border-gray-600";
    }
    
    // When result indicator is active
    if (!props.currentBasket) {
      // Items in the box (unsorted) - show gray styling
      return "bg-gray-100 text-gray-800 border-gray-600";
    } else if (isCorrect) {
      // Items in correct baskets - show green styling
      return "bg-green-100 text-green-800 border-green-500";
    } else {
      // Items in wrong baskets - show red styling
      return "bg-red-100 text-red-800 border-red-500";
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`h-fit inline-flex items-center justify-center font-semibold 
      rounded-xl border shadow-sm cursor-grab select-none 
      touch-none hover:scale-105 p-2 ${getItemStyling()}`}
    >
      {props.type === "image" ? (
        <ImageItem src={props.value} alt={props.id} />
      ) : (
        <TextItem id={props.id} value={props.value} />
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

  const { activityData, resetActivity, resultIndicator, setResetActivity, setResultValidation, setResultData } = props;

  // Central state for all activity data
  const [basketData, setBasketData] = useState<ActivityDataType>(
    { box: [], baskets: [] }
  );

  // Sync basketData when activityData changes (for async loads)
  useEffect(() => {
    if (activityData && activityData.box && activityData.baskets) {
      setBasketData(JSON.parse(JSON.stringify(activityData)));
    }
  }, [activityData]);

  // Reset effect
  useEffect(() => {
    if (resetActivity) {
      if (activityData && activityData.box && activityData.baskets) {
        setBasketData(JSON.parse(JSON.stringify(activityData)));
      }
      setResetActivity(false);
    }
  }, [resetActivity, activityData, setResetActivity]);

  // Validation effect
  useEffect(() => {
    // Check if all items are used (box is empty)
    const itemsInBox = basketData.box.length;
    if (itemsInBox === 0) {
      setResultValidation({ status: true, message: "All items have been sorted!" });
    } else {
      setResultValidation({ status: false, message: `Please sort all ${itemsInBox} remaining item(s).` });
    }
  }, [basketData, setResultValidation]);

  // Result reporting effect
  useEffect(() => {
    // Calculate score based on correctly sorted items
    let correctItems = 0;
    let incorrectItems = 0;
    
    basketData.baskets.forEach(basket => {
      basket.items.forEach(item => {
        // Item is correct if its intended basket matches the current basket
        if (item.basket === basket.basket) {
          correctItems++;
        } else {
          incorrectItems++;
        }
      });
    });
    
    const notSortedItems = basketData.box.length;
    const totalItems = correctItems + incorrectItems + notSortedItems;
    
    const score = totalItems > 0 ? Math.round((correctItems / totalItems) * 100) : 0;
    
    const summery = `Correctly sorted ${correctItems} \nIncorrectly sorted ${incorrectItems}`;
    
    setResultData({ 
      score: { 
        baseScore: score, 
        maxScore: 100, 
        summery: summery 
      }, 
      data: basketData 
    });
  }, [basketData, setResultData]);

  // Drag-and-drop logic
  function findItemLocation(itemId: string): { type: 'box' | 'basket', basketIdx?: number, itemIdx: number } | null {
    // Search box
    const boxIdx = basketData.box.findIndex(item => (item.basket + '-' + (item.label || item.value)) === itemId);
    if (boxIdx !== -1) return { type: 'box', itemIdx: boxIdx };
    // Search baskets
    for (let b = 0; b < basketData.baskets.length; ++b) {
      const idx = basketData.baskets[b].items.findIndex(item => (item.basket + '-' + (item.label || item.value)) === itemId);
      if (idx !== -1) return { type: 'basket', basketIdx: b, itemIdx: idx };
    }
    return null;
  }

  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (!over) return;
    const itemId = active.id;
    const toId = over.id;
    const fromLoc = findItemLocation(itemId);
    if (!fromLoc) return;

    // If dropped in same place, do nothing
    if ((fromLoc.type === 'box' && toId === 'box') ||
        (fromLoc.type === 'basket' && basketData.baskets[fromLoc.basketIdx!].basket === toId)) {
      return;
    }

    setBasketData(prev => {
      let newBox = prev.box.slice();
      let newBaskets = prev.baskets.map(b => ({ ...b, items: b.items.slice() }));
      let movedItem: BasketItemType | null = null;
      // Remove from old location
      if (fromLoc.type === 'box') {
        movedItem = newBox.splice(fromLoc.itemIdx, 1)[0];
      } else {
        movedItem = newBaskets[fromLoc.basketIdx!].items.splice(fromLoc.itemIdx, 1)[0];
      }
      if (!movedItem) return prev;
      // Add to new location
      if (toId === 'box') {
        newBox.push(movedItem);
      } else {
        // Find basket index
        const basketIdx = newBaskets.findIndex(b => b.basket === toId);
        if (basketIdx !== -1) {
          newBaskets[basketIdx].items.push(movedItem);
        }
      }
      return { box: newBox, baskets: newBaskets };
    });
  }

  return (
    <DndContext collisionDetection={rectIntersection} onDragEnd={handleDragEnd}>
      <section className="mb-6 bg-white p-4 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Items to Sort</h2>
        <DroppableZone id="box">
          <div className="flex flex-wrap gap-4">
            {basketData.box &&
              basketData.box.map((item, idx) => (
                <DraggableItem
                  key={item.basket + '-' + (item.label || item.value)}
                  id={item.basket + '-' + (item.label || item.value)}
                  type={item.type}
                  value={item.value}
                  intendedBasket={item.basket}
                  resultIndicator={resultIndicator}
                />
              ))}
          </div>
        </DroppableZone>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {basketData.baskets.map((basket, basketIdx) => (
          <div
            className="bg-gray-50 border-2 border-dashed border-gray-300 p-4 rounded-xl min-h-[120px]"
            key={basket.basket || basketIdx}
          >
            <h3 className="text-lg font-semibold mb-2 text-gray-900">{basket.basket}</h3>
            <DroppableZone id={basket.basket}>
              {basket.items &&
                basket.items.map((item, idx) => (
                  <DraggableItem
                    key={item.basket + '-' + (item.label || item.value)}
                    id={item.basket + '-' + (item.label || item.value)}
                    type={item.type}
                    value={item.value}
                    intendedBasket={item.basket}
                    currentBasket={basket.basket}
                    resultIndicator={resultIndicator}
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
