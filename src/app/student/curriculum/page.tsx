"use client";

import React, { useEffect, useState } from "react";
import StudentNavigatorLayout from "@/components/student/StudentNavigatorLayout";
import Title from "@/components/student/Title";
import SubjectSection from "@/components/student/curriculum/SubjectSection";
import TopicSection from "@/components/student/curriculum/TopicSection";
import StudentViewActivityItem from "@/components/student/activity/ViewActivityItem";
import { ActivityDifficulty, Subject, SubjectEnum } from "@/lib/utils/types";

export default function Curriculum() {

  const [dbData, setDbData] = useState<{
    [Sb in Subject]: {
      [key: string]: Array<{
        activityID: string,
        title: string,
        topic?: string,
        subject: Subject,
        grade?: 1 | 2 | 3 | 4 | 5,
        difficulty: ActivityDifficulty,
        isScored: boolean,
        completed: boolean,
        progressID?: string,
      }>
    }
  }>({
    MATHEMATICS: {},
    SCIENCE: {},
    ENGLISH: {},
    COMMON: {}
  });

  async function fetchCurriculum() {

    const url = `/api/curriculum`;
    const res = await fetch(url);

    const resData = await res.json();
    setDbData(resData.data);

  }

  useEffect(() => { 
    fetchCurriculum();
  }, []);
  
  // For collapsible subject sections
  const [openSubjects, setOpenSubjects] = useState<{ [subject: string]: boolean }>({});

  function handleToggleSubject(subject: string) {
    setOpenSubjects((prev) => ({ ...prev, [subject]: !prev[subject] }));
  }
  
  // For collapsible topic sections
  const [openTopics, setOpenTopics] = useState<{ [key: string]: boolean }>({});

  function handleToggleTopic(subject: string, topic: string) {
    const key = subject + "-" + topic;
    setOpenTopics((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <StudentNavigatorLayout>
      <div className=" mx-auto">
 
        {/* Title */}
        <Title title="My Curriculum" />
        
        {/* Subject list */}
        <div className="flex flex-col gap-6">
          {(Object.values(SubjectEnum) as [string, ...string[]]).map((subject) => {
            
            const subjectData = dbData[subject as SubjectEnum];
            const topics = Object.keys(subjectData);
            
            return (

              // Subject section
              <SubjectSection title={subject.charAt(0) + subject.slice(1).toLowerCase()}
                open={!!openSubjects[subject]} onToggle={() => handleToggleSubject(subject)} key={subject}>
                <div className="flex flex-col gap-4">
                { topics.length <= 0 ? (

                  // Empty topic list
                  <p>Nothing here yet</p>
                  
                ) : ( 

                  // Topic list
                  topics.map((topic) => (

                    // Topic section
                    <TopicSection title={topic} open={!!openTopics[subject + "-" + topic]}
                      onToggle={() => handleToggleTopic(subject, topic)} key={topic}>
                      <div className="flex flex-col gap-2">
                      {subjectData[topic].map((activity: any) => (
                        // Activity item
                        <StudentViewActivityItem itemData={activity} key={activity.activityID} />
                      ))}
                      </div>
                    </TopicSection>

                  ))

                )}

                </div>
                
              </SubjectSection>

            );

          })}
        </div>

      </div>
    </StudentNavigatorLayout>

  );
} 
