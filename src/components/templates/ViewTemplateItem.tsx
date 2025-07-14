// This list item is specially made for viewing templates
// Attributes are predefined and cannot be changed

"use client";

import ImagePreview from "@/components/shared/popups/ImagePreview";
import { useState } from "react";
import Link from "next/link";
import InfoBadge from "@/components/shared/badges/InfoBadge";
import ViewItemActionButton from "@/components/shared/buttons/ViewItemActionButton";

interface ViewTemplateItemProps {
  itemData: {
    templateCode: string,
    title: string,
    description: string,
    templateType: string
  }
}

export default function ViewTemplateItem(props: ViewTemplateItemProps) {

  const itemData  = props.itemData;
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="border border-blue-200 bg-white rounded-xl p-4 flex items-center shadow hover:shadow-lg transition 
    hover:bg-blue-50 justify-between relative mb-0.5 mt-2 min-h-[96px]">

      {/* Item info */}
        <div className="min-w-0">

          {/* Clickable link */}
          <div className="flex items-center gap-2">
            <Link
              href={`/template?viewMode=SAMPLE&templateCode=${itemData.templateCode}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold text-pink-700 truncate focus:outline-none focus:ring-2 
              focus:ring-blue-200 cursor-pointer no-underline hover:text-pink-900"
              style={{ textDecoration: 'none' }}
            >
              {itemData.title}
            </Link>
            <InfoBadge text={itemData.templateCode} colorTheme="default" />
          </div>

          {/* Badge and description */}
          <div className="flex items-center gap-2 mt-1 text-xs">
            <InfoBadge text={itemData.templateType} colorTheme="blue" />
            <span className="text-blue-600 truncate">{itemData.description}</span>
          </div>
        </div>
     
      {/* Action buttons */}
      <div className="flex flex-row items-end gap-2  ml-4">
        <div onMouseLeave={() => setShowPreview(false)}>
          <ViewItemActionButton text="Preview" colorTheme="blue"
            onAction={() => setShowPreview(true)} />
        </div>
      </div>

      {/* Image preview */}
      <ImagePreview previewImage="/images/avatar.png" showPreview={showPreview} />
    
    </div>
  );
}
