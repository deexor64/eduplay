"use client";

import ImagePreview from "@/components/popups/ImagePreview";
import { useState } from "react";

interface CreateLessonItemProps {
  itemData: {templateId: string, name: string, type: string,
    coverIcon: string, previewImage: string}
}


export function CreateLessonItem(props: CreateLessonItemProps) {
  
  const [showPreview, setShowPreview] = useState(false);
  
  return (

    <div
      className="border border-blue-200 bg-white rounded-lg p-4 
      flex items-center shadow hover:shadow-lg transition
      cursor-pointer hover:bg-blue-50 justify-between relative mb-0.5"
    >
      <div className="flex items-center">
        <img
          src={props.itemData.coverIcon}
          alt="Cover Icon"
          className="w-16 h-16 mr-4 rounded border border-gray-300 bg-white"
        />
        <div>
          <div className="text-lg font-semibold text-pink-700">
            {props.itemData.name}
          </div>
          <div className="text-sm text-blue-600">{props.itemData.type}</div>
        </div>
      </div>
      <div className="flex gap-2">
        <ImagePreview previewImage={props.itemData.previewImage} showPreview={showPreview} />
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
          onClick={function () { setShowPreview(!showPreview) }}>
          Preview
        </button>
      </div>
    </div> 
  )
}
