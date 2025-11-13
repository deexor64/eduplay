import { Subject } from "@prisma/client";
import { useEffect, useState, useRef, useCallback } from "react";

type SectionItem = { grade: number; subject: Subject; section: string };

type ActivitySectionProps = {
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  handleGetSectionList: () => Promise<SectionItem[]>;
};

export default function ActivitySection({
  setFormData,
  handleGetSectionList,
}: ActivitySectionProps) {
  const [sectionList, setSectionList] = useState<SectionItem[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch sections
  useEffect(() => {
    handleGetSectionList().then(setSectionList);
  }, [handleGetSectionList]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter suggestions
  const filteredSections = sectionList.filter((item) =>
    item.section.toLowerCase().includes(inputValue.toLowerCase())
  );

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setIsOpen(true); // Show suggestions when typing
    setFormData((prev: any) => ({ ...prev, section: value.trim() || null }));
  };

  // Handle suggestion click
  const handleSuggestionClick = (section: string) => {
    setInputValue(section);
    setFormData((prev: any) => ({ ...prev, section }));
    setIsOpen(false);
  };

  // Handle focus
  const handleInputFocus = () => {
    if (filteredSections.length > 0) setIsOpen(true);
  };

  return (
    <section className="mb-4 bg-white/40 backdrop-blur p-6 rounded-xl shadow-md">
      <label htmlFor="section-input" className="block text-lg font-semibold mb-3 text-gray-800">
        Section
      </label>

      <div className="relative" ref={dropdownRef}>
        <input
          id="section-input"
          type="text"
          className="w-full p-3 border border-gray-300 rounded-lg bg-white/80 backdrop-blur
            transition-all duration-300 focus:border-blue-500 focus:outline-none focus:bg-white 
            focus:shadow-md disabled:bg-gray-200 disabled:cursor-not-allowed"
          placeholder="e.g. '1. Environment'"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          autoComplete="off"
        />

        {/* Custom Dropdown */}
        {isOpen && filteredSections.length > 0 && (
          <ul className="w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
            {filteredSections.map((item) => (
              <li
                key={`${item.grade}-${item.subject}-${item.section}`}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center transition-colors"
                onClick={() => handleSuggestionClick(item.section)}
              >
                {/* Section title */}
                <span className="font-semibold text-gray-800">{item.section}</span>
        
                {/* Grade & subject as pill/badge */}
                <span className="ml-auto mr-1 text-sm bg-yellow-200 text-gray-700 px-2 py-0.5 rounded-full font-medium flex-shrink-0">
                  Subject {item.subject}
                </span>
                <span className="text-sm bg-green-200 text-gray-700 px-2 py-0.5 rounded-full font-medium flex-shrink-0">
                  Grade {item.grade}
                </span>
              </li>
            ))}
          </ul>
        )}

      </div>
    </section>
  );
}
