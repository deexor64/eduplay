import { getSectionList } from "@/actions/activity/getSectionList";
import { Subject } from "@prisma/client";
import { useEffect, useState } from "react";

type ActivitySectionProps = {
  options: any;
  setFormData: Function;
  handleGetSectionList: () => Promise<Array<{grade: number, subject: Subject, section: string}>>
}
  
export default function ActivitySection(props: ActivitySectionProps) {
  
  // Sections list
  const [sectionList, setSectionList] = useState<Array<{
    subject: Subject, grade: number, section: string}>>([]);
  
  const [inputValue, setInputValue] = useState(""); // For filtering section

  useEffect(() => {
    const sectionL = props.handleGetSectionList();
    sectionL.then((list) => setSectionList(list));
  }, []);
  
  // Set activity section
  function setActivitySection(e: React.ChangeEvent<HTMLInputElement>) {
    props.setFormData((prev: any) => {
      return {
        ...prev,
        section: e.target.value.trim() || null
      };
    });
  }

  return (
    <section className="mb-4 bg-white/40 backdrop-blur p-6 rounded-xl shadow-md">
      
      <label htmlFor="section-list" className="block text-lg font-semibold mb-3 text-gray-800">
        Section
      </label>

      {/* Section input */}
      <input
        id="section-input"
        type="text"
        list="section-list" 
        className="w-full p-3 border border-gray-300 rounded-lg bg-white/80 backdrop-blur
        transition-all duration-300 focus:border-blue-500 focus:outline-none focus:bg-white 
        focus:shadow-md disabled:bg-gray-200 disabled:cursor-not-allowed"
        placeholder="e.g.'1. Environment'"
        onChange={(e) => setActivitySection(e)}
      />

      {/* Topic list */}
      <datalist id="section-list">
        {sectionList.filter(value => {
          if (!inputValue) return true;
            return value.section.toLowerCase().includes(inputValue.toLowerCase());
          })
          .map(value => (
            <option value={value.section} key={value.section} >{value.section} (Grade: {value.grade}, Subject {value.subject})</option>
          )
        )}
      </datalist>
    
      
    </section>
  );
}
  