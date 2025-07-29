import { getTopicList } from "@/actions/activity/getTopicList";
import { Subject } from "@prisma/client";
import { useEffect, useState } from "react";

type ActivityTopicProps = {
  options: any;
  setFormData: Function;
}
  
export default function ActivityTopic(props: ActivityTopicProps) {
  
  // Topic list
  const [topicList, setTopicList] = useState<Array<{
    subject: Subject, grade: number | null, topic: string | null}> | []>([]);
  
  // Get topic list from server
  async function handleGetTopicList() {
    const topicL = await getTopicList();
    topicL instanceof Error ?
      setTopicList([]) : setTopicList(topicL)
  }

  useEffect(() => {
    handleGetTopicList();
  }, []);
  
  // Enable if criteria is satisfied
  const [topicEnabled, setTopicEnabled] = useState<boolean>(false);

  useEffect(() => {
    (props.options.grade && props.options.subject) ?
      setTopicEnabled(true) : setTopicEnabled(false);
  }, [props.options]);
  
  // Set activity topic
  function setActivityTopic(e: React.ChangeEvent<HTMLInputElement>) {
    props.setFormData((prev: any) => {
      return {
        ...prev,
        topic: e.target.value.trim() || null
      };
    });
  }

  return (
    <section className="mb-4 bg-white/40 backdrop-blur p-6 rounded-xl shadow-md">
      
      <label htmlFor="topic-list" className="block text-lg font-semibold mb-3 text-gray-800">
        Topic
      </label>

      {/* Criteria */}
      <p className="flex flex-row justify-between items-center gap-4 mb-6">
        Activity topic should align with the curriculum topic. You must select
        Grade and Subject first.
      </p>

      {/* Topic input */}
      <input
        id="topic-list" type="text"
        className="w-full p-3 border border-gray-300 rounded-lg bg-white/80 backdrop-blur
        transition-all duration-300 focus:border-blue-500 focus:outline-none focus:bg-white 
        focus:shadow-md disabled:bg-gray-200 disabled:cursor-not-allowed"
        placeholder="e.g. Section 1.2 Environment"
        onChange={(e) => setActivityTopic(e)}
        disabled={!topicEnabled}
      />

      {/* Topic list */}
      {/* ISSUE: Topic list doesn't appear */}
      <datalist id="topic-list" className="z-50">
        {topicList.filter(function(value) {
          return value.topic && value.subject === props.options.subject && 
            value.grade === props.options.grade;
        })
        .map(function(value) {
          return <option value={value.topic!} key={value.topic}>{value.topic}</option>;
        })}
      </datalist>
      
    </section>
  );
}
  