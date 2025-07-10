// This list item is specially made for viewing templates
// Attributes are predefined and cannot be changed

"use client";

import Image from "next/image";
import ImagePreview from "@/components/shared/popups/ImagePreview";
import { useState } from "react";
import Link from "next/link";

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
    <div
      className="border border-blue-200 bg-white rounded-xl p-4 flex items-center shadow hover:shadow-lg transition hover:bg-blue-50 justify-between relative mb-0.5 mt-2 min-h-[96px]"
    >
      {/* Avatar and template info */}
      <div className="flex items-center gap-4 min-w-0">
        <Image
          src="/images/avatar.png"
          alt="Cover Icon"
          width={64}
          height={64}
          className="rounded-full border border-gray-200 bg-white shadow-sm object-cover w-16 h-16"
        />
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <Link
              href={`/template?viewMode=SAMPLE&templateCode=${itemData.templateCode}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold text-pink-700 truncate focus:outline-none focus:ring-2 focus:ring-blue-200 cursor-pointer no-underline hover:text-pink-900"
              style={{ textDecoration: 'none' }}
            >
              {itemData.title}
            </Link>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full border text-xs font-mono font-semibold bg-gray-100 text-gray-700 border-gray-300 shadow-sm" title="Template Code">{itemData.templateCode}</span>
          </div>
          <div className="text-xs text-blue-600 mt-1 truncate">
            {itemData.description}
          </div>
        </div>
      </div>
      {/* Template type badge and preview button */}
      <div className="flex flex-col items-end gap-2 min-w-[120px] ml-4">
        <TemplateTypeBadge templateType={itemData.templateType} />
        <div className="flex gap-2 items-center">
          <ImagePreview previewImage="/images/avatar.png" showPreview={showPreview} />
          <button
            className="flex items-center gap-1 px-3 py-1 rounded-full border border-blue-300 text-blue-700 bg-white hover:bg-blue-50 text-xs font-medium shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-200 cursor-pointer"
            onMouseOver={() => setShowPreview(true)}
            onMouseLeave={() => setShowPreview(false)}
            type="button"
            title="Preview"
            aria-label="Preview"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
            <span className="hidden sm:inline">Preview</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function TemplateTypeBadge(props: any) {

  const templateType = props.templateType;

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full border text-xs font-semibold uppercase shadow-sm 
        bg-blue-100 text-blue-800 border-blue-300`}
      aria-label={`Type: ${templateType}`}
      title={`Type: ${templateType}`}>
      {templateType}
    </span>
  );
}
