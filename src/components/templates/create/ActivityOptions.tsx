import { getTopicList } from "@/actions/activity/getTopicList";
import { ActivityDifficultyEnum, ActivityGradeEnum, Grade, SubjectEnum } from "@/lib/utils/types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// Activity options are predefined

type ActivityOptionsProps = {
  setFormData: Function;
}

export default function ActivityOptions(props: ActivityOptionsProps) {
  
  function setOptions(option: any, value: any) {
    props.setFormData(function (prev: any) {
      let options = prev.options;
      options[option] = value;
      return { ...prev, options: options }
    }); 
  }

  const [isScored, setIsScored] = useState(false);
  const [topicList, setTopicList] = useState<Array<{subject: SubjectEnum, grade: Grade, topic: string}>>([]);
  const [grade, setGrade] = useState(0);
  const [subject, setSubject] = useState(SubjectEnum.COMMON);
  
  async function fetchTopicList() {
    const resData = await getTopicList();
    if (resData.status) {
      setTopicList(resData.data);
    } else {
      console.log(resData.data);
    }
  }

  useEffect(() => {
    fetchTopicList();
  }, []);


  return (
    <section className="mb-6 bg-white/40 backdrop-blur p-6 rounded-xl shadow-md">
      
      <h2 className="text-lg font-semibold mb-6 text-gray-800">Activity Options</h2>
      
      {/* is scored */}
      <div className="flex flex-row items-center gap-4 mb-6">
        <label className="block font-semibold text-gray-700 min-w-[140px]">Scored</label>
        <input
          type="checkbox"
          className="w-5 h-5 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          onChange={function (e) {
            setOptions("isScored", e.target.checked === true);
            setIsScored(e.target.checked === true);
          }} />
      </div>

      {/* difficulty */}
      <div className="flex flex-row justify-between items-center gap-4 mb-6">
        <label className="block font-semibold text-gray-700 min-w-[140px]">Difficulty</label>
        <select
          className="flex-1 p-3 border border-gray-300 rounded-lg bg-white/80 backdrop-blur transition-all duration-300 focus:border-blue-500 focus:outline-none focus:bg-white focus:shadow-md"
          onChange={function (e) { 
            setOptions("difficulty", e.target.value);
          }}
        >
          {Object.values(ActivityDifficultyEnum).map(function(value: string) {
            return ( <option value={value} key={value}>{value}</option>);
          })}
        </select>
      </div>

      {/* grade */}
      <div className="flex flex-row justify-between items-center gap-4 mb-6">
        <label className="block font-semibold text-gray-700 min-w-[140px]">Grade</label>
        <select
          className="flex-1 p-3 border border-gray-300 rounded-lg bg-white/80 backdrop-blur transition-all duration-300 focus:border-blue-500 focus:outline-none focus:bg-white focus:shadow-md"
          onChange={function (e) { 
            setOptions("grade", e.target.value);
            setGrade(e.target.value === "ALL" ? 0 : parseInt(e.target.value));
          }}
        >
          {Object.values(ActivityGradeEnum).map(function(value: string) {
            return (
              <option value={value} key={value}>
                {value}
              </option>
            );
          })}
        </select>
      </div>

      {/* subject */}
      <div className="flex flex-row justify-between items-center gap-4 mb-6">
        <label className="block font-semibold text-gray-700 min-w-[140px]">Subject</label>
        <select
          className="flex-1 p-3 border border-gray-300 rounded-lg bg-white/80 backdrop-blur transition-all duration-300 focus:border-blue-500 focus:outline-none focus:bg-white focus:shadow-md"
          onChange={function (e) { 
            setOptions("subject", e.target.value);
            setSubject(e.target.value as SubjectEnum);
          }}
        >
          {Object.values(SubjectEnum).map(function(value: string) {
            return ( <option value={value} key={value}>{value}</option>);
          })}
        </select>
      </div>

      {/* Topic */}
      <div className="flex flex-row justify-between items-center gap-4 mb-6">
        <label className="block font-semibold text-gray-700 min-w-[140px]">Topic</label>
        <input
          list="topic-list"
          className="flex-1 p-3 border border-gray-300 rounded-lg bg-white/80 backdrop-blur transition-all duration-300 focus:border-blue-500 focus:outline-none focus:bg-white focus:shadow-md"
          placeholder="Type or select a topic"
          onChange={function (e) { setOptions("topic", e.target.value); }}
        />
        <datalist id="topic-list">
          {topicList.map(function(value) {
            if (value.subject === subject && (grade === 0 || value.grade === grade)) {
              return ( <option value={value.topic} key={value.topic}>{value.topic}</option>);
            }
          })}
        </datalist>
      </div>

    </section>
  )
}