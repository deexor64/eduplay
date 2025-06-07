"use client";

import React, { useState, useRef, useEffect } from "react";
import { useParams } from 'next/navigation';

import CommonLayout from "@/components/CommonLayout";

type Template = {
  templateID: string;
  name: string;
  type: string;
  coverIcon: string;
  previewImage: string;
};

function CreateActivity() {

  if (useParams().userType != "teacher") return;

  const [filterType, setFilterType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [previewPosition, setPreviewPosition] = useState<{ top: number; left: number } | null>(null);
  const [selectedTemplateID, setSelectedTemplateID] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const templates: Template[] = [
    {
      templateID: "1",
      name: "Match the Animals",
      type: "Drag and Drop",
      coverIcon: "/icons/animal-match.png",
      previewImage: "/previews/animal-match-preview.png",
    },
    {
      templateID: "2",
      name: "Solve the Puzzle",
      type: "Puzzle",
      coverIcon: "/icons/puzzle.png",
      previewImage: "/previews/puzzle-preview.png",
    },
    {
      templateID: "3",
      name: "Fill in the Blanks",
      type: "Fill Blanks",
      coverIcon: "/icons/fill-blanks.png",
      previewImage: "/previews/fill-blanks-preview.png",
    },
    {
      templateID: "4",
      name: "Match the Colors",
      type: "Drag and Drop",
      coverIcon: "/icons/color-match.png",
      previewImage: "/previews/color-match-preview.png",
    },
    {
      templateID: "5",
      name: "Match the Colors 2 ",
      type: "Drag and Drop",
      coverIcon: "/icons/color-match.png",
      previewImage: "/previews/color-match-preview-2.png",
    },
    {
      templateID: "6",
      name: "Match the Colors 3",
      type: "Drag and Drop",
      coverIcon: "/icons/color-match.png",
      previewImage: "/previews/color-match-preview-3.png",
    }
  ];

  function handleFilterChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setFilterType(event.target.value);
  }

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value.toLowerCase());
  }

  function getFilteredTemplates() {
    return templates.filter(function (template) {
      const matchesType = filterType === "" || template.type === filterType;
      const matchesSearch = template.name.toLowerCase().includes(searchTerm);
      return matchesType && matchesSearch;
    });
  }

  function togglePreview(imageUrl: string, buttonElement: HTMLButtonElement) {
    if (previewImage === imageUrl) {
      setPreviewImage("");
      closePreview();
    } else {
      const rect = buttonElement.getBoundingClientRect();
      const newPosition = {
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX - 200,
      };
      setPreviewImage(imageUrl);
      setPreviewPosition(newPosition);
    }
  }

  function closePreview() {
    setPreviewPosition(null);
  }

  function handleSelect(templateID: string) {
    setSelectedTemplateID(templateID);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (previewRef.current && !previewRef.current.contains(event.target as Node)) {
        closePreview();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (

    <CommonLayout>

      <div className="max-w-6xl mx-auto p-4 pb-14 min-h-full bg-gradient-to-br
      bg-blue-100 to-pink-100 relative flex justify-center">

        {/* Main Content */}
        <div className="w-4/5 p-6">
          {/* Filter and Search Bar */}
          <div className="mb-6 flex items-center gap-4">
            <label htmlFor="typeFilter" className="font-medium text-blue-800">
              Filter by Type:
            </label>
            <select
              id="typeFilter"
              className="border rounded px-3 py-1 bg-white text-blue-700"
              value={filterType}
              onChange={handleFilterChange}
            >
              <option value="">All</option>
              <option value="Drag and Drop">Drag and Drop</option>
              <option value="Puzzle">Puzzle</option>
              <option value="Fill Blanks">Fill Blanks</option>
            </select>

            <input
              type="text"
              placeholder="Search templates..."
              className="border rounded px-3 py-1 bg-white text-blue-700 w-64"
              onChange={handleSearchChange}
            />
          </div>

          {/* Template Cards */}
          <div className="space-y-4">
            {getFilteredTemplates().map(function (template) {
              return (
                <div
                  key={template.templateID}
                  className={`border ${selectedTemplateID === template.templateID
                    ? "border-pink-500 ring-2 ring-pink-300"
                    : "border-blue-200"
                    } bg-white rounded-lg p-4 flex items-center shadow hover:shadow-lg transition
                  cursor-pointer hover:bg-blue-50 justify-between relative`}
                  onClick={function () {
                    handleSelect(template.templateID);
                  }}
                >
                  <div className="flex items-center">
                    <img
                      src={template.coverIcon}
                      alt="Cover Icon"
                      className="w-16 h-16 mr-4 rounded border border-gray-300 bg-white"
                    />
                    <div>
                      <div className="text-lg font-semibold text-pink-700">
                        {template.name}
                      </div>
                      <div className="text-sm text-blue-600">{template.type}</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                      onClick={function (e) {
                        e.stopPropagation();
                        togglePreview(template.previewImage, e.currentTarget);
                      }}
                    >
                      Preview
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Inline Popup Preview */}
          {previewImage !== "" && previewPosition && (
            <div
              ref={previewRef}
              className="absolute z-50 bg-white border border-gray-300 rounded shadow-lg"
              style={{
                top: previewPosition.top,
                left: previewPosition.left,
                width: "192px",
                height: "192px",
                padding: "4px"
              }}
            >
              <img
                src={previewImage}
                alt="Preview"
                className="w-full h-full object-contain"
              />
            </div>
          )}
        </div>
      </div>

    </CommonLayout>

  );
}

export default CreateActivity;
