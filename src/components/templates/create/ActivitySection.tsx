import { getSectionList } from "@/actions/activity/getSectionList";
import { Subject } from "@prisma/client";
import { useEffect, useState } from "react";

type ActivitySectionProps = {
  options: any;
  setFormData: Function;
}
  
export default function ActivitySection(props: ActivitySectionProps) {
  
  // Sections list
  const [sectionList, setSectionList] = useState<Array<{
    subject: Subject, grade: number | null, section: string | null}> | []>([]);
  
  // Get sections list from server
  async function handleGetSectionList() {
    const sectionL = await getSectionList();
    sectionL instanceof Error ?
      setSectionList([]) : setSectionList(sectionL)
  }

  useEffect(() => {
    handleGetSectionList();
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
        id="section-list" type="text"
        className="w-full p-3 border border-gray-300 rounded-lg bg-white/80 backdrop-blur
        transition-all duration-300 focus:border-blue-500 focus:outline-none focus:bg-white 
        focus:shadow-md disabled:bg-gray-200 disabled:cursor-not-allowed"
        placeholder="e.g.'1. Environment'"
        onChange={(e) => setActivitySection(e)}
      />

      {/* Topic list */}
      {/* ISSUE: Topic list doesn't appear */}
      <datalist id="section-list" className="z-50">
        {sectionList.filter(function(value) {
          return value.section && value.subject === props.options.subject && 
            value.grade === props.options.grade;
        })
        .map(function(value) {
          return <option value={value.section!} key={value.section}>{value.section}</option>;
        })}
      </datalist>
      
    </section>
  );
}
  