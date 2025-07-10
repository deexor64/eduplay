// This list item is specially made for viewing templates
// Attributes are predefined and cannot be changed

"use client";

import Image from "next/image";
import ImagePreview from "@/components/shared/popups/ImagePreview";
import { useState } from "react";
import Link from "next/link";
import { UserType } from "@/lib/utils/types";

interface ViewTemplateItemProps {
  itemData: {
    templateCode: string,
    title: string,
    description: string,
    templateType: String
  }
}

export default function ViewTemplateItem(props: ViewTemplateItemProps) {
  
  const [showPreview, setShowPreview] = useState(false); 

  return (

    <Link
      href={`/template?viewMode=SAMPLE&templateCode=${props.itemData.templateCode}`}
      target="_blank"
      rel="noopener noreferrer"
      className="border border-blue-200 bg-white rounded-lg p-4 
        flex items-center shadow hover:shadow-lg transition
        cursor-pointer hover:bg-blue-50 justify-between relative mb-0.5"
    >
      <div className="flex items-center">
        <Image
          src="/images/avatar.png"
          alt="Cover Icon"
          width={64}    // 16 * 4 (tailwind w-16 is 4rem = 64px)
          height={64}   // same for h-16
          className="mr-4 rounded border border-gray-300 bg-white"
        />
        <div>
          <div className="text-lg font-semibold text-pink-700">
            {props.itemData.title}
          </div>
          <div className="text-sm text-blue-600">{props.itemData.templateType}</div>
        </div>
      </div>
      <div className="flex gap-2">
        <ImagePreview previewImage="/images/avatar.png" showPreview={showPreview} />
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
