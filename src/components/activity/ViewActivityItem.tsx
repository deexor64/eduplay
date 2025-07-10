// This list item is specially made for viewing lessons
// Attributes are predefined and cannot be changed

"use client";

import Image from "next/image";
import ImagePreview from "@/components/shared/popups/ImagePreview";
import { useState } from "react";
import Link from "next/link";

interface ViewActivityItemProps {
  itemData: {
    sctivityId: string,
    name: string,
    type: string,
    grade: string,
    subject: string,
    date: string, // date yyyy-mm-dd
    templateUrl: string, // url
    coverIcon: string, // url
    previewImage: string // url
  }
}

export function ViewActivityItem(props: ViewActivityItemProps) {
  
  const [showPreview, setShowPreview] = useState(false);
  
  return (

    <Link
      href={props.itemData.templateUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="border border-blue-200 bg-white rounded-lg p-4 
        flex items-center shadow hover:shadow-lg transition
        cursor-pointer hover:bg-blue-50 justify-between relative mb-0.5"
    >
      <div className="flex items-center">
        <Image
          src={props.itemData.coverIcon}
          alt="Cover Icon"
          width={64}    // 16 * 4 (tailwind w-16 is 4rem = 64px)
          height={64}   // same for h-16
          className="mr-4 rounded border border-gray-300 bg-white"
        />
        <div>
          <div className="text-lg font-semibold text-purple-800">{props.itemData.name}</div>
          <div className="text-sm text-yellow-600">
            {props.itemData.type} • Grade {props.itemData.grade} • {props.itemData.subject}
          </div>
          <div className="text-xs text-gray-600">Created on: {props.itemData.date}</div>
        </div>
      </div>
      <div className="flex gap-2">
        <ImagePreview previewImage={props.itemData.previewImage} showPreview={showPreview} />
        <i
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
          onMouseOver={function () { setShowPreview(!showPreview) }}
          onMouseLeave={function () { setShowPreview(!showPreview) }}>
          Preview
        </i>
      </div>
    </Link> 
  )
}
