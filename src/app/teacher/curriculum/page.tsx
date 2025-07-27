"use client";

import React, { useEffect, useState } from "react";
import NavigatorLayout from "@/components/navigator/NavigatorLayout";
import SubjectSection from "@/components/curriculum/SubjectSection";
import TopicSection from "@/components/curriculum/TopicSection";
import ViewActivityItem from "@/components/activity/ViewActivityItem";
import Title from "@/components/shared/headings/Title";
import { ActivityDifficulty, ActivityStatus, Subject } from "@prisma/client";
import cleanParams from "@/lib/utils/cleanParams";
import { updateActivityStatus } from "@/actions/activity/updateActivityStatus";
import toast from "react-hot-toast";

export default function Curriculum() {

  const [dbData, setDbData] = useState<{
    [Sb in Subject]: {
      [key: string]: Array<{
        activityID: string,
        title: string,
        subject: Subject,
        grade?: 1 | 2 | 3 | 4 | 5,
        difficulty: ActivityDifficulty,
        status: ActivityStatus,
        isScored: boolean,
        topic?: string,
      }>
    }
  }>({
    MATHEMATICS: {},
    SCIENCE: {},
    ENGLISH: {},
    COMMON: {}
  });

  function curriculumQuery(): URLSearchParams {
    // params
    const params = cleanParams({
      gradeListType: currentGrade,
    });
    return new URLSearchParams(params);
  }

  async function fetchCurriculum() {

    const params = curriculumQuery();
    const url = `/api/curriculum?${params}`;
    const res = await fetch(url);

    const resData = await res.json();
    setDbData(resData.data);

  }
  
  // For collapsible grade-subject sections
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});
  const [currentGrade, setCurrentGrade] = useState<number>(1);

  function handleToggleSubject(subject: string, grade: number) {

    setOpenSections((prev) => {
      const key = `${subject}-${grade}`;
      const isCurrentlyOpen = !!prev[key];
      if (isCurrentlyOpen) {
        const newState = { ...prev };
        delete newState[key];
        return newState;
      }
      // When opening, close all others and open only this one
      if (currentGrade !== null && currentGrade !== grade) {
        setCurrentGrade(grade);
        return { [key]: true };
      }
      setCurrentGrade(grade);
      return { [key]: true };
    });
  }

  useEffect(() => { 
    fetchCurriculum();
  }, [currentGrade]);
  
  // For collapsible topic sections
  const [openTopics, setOpenTopics] = useState<{ [key: string]: boolean }>({});

  function handleToggleTopic(subject: string, grade: number, topic: string) {
    const key = subject + "-" + topic;
    setOpenTopics((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  async function handleUpdateActivityStatus(activityID: string, status: ActivityStatus) {

    toast.promise(updateActivityStatus(activityID, status), {
      loading: "Updating activity...",
      success: () => {
        fetchCurriculum();
        return "Activity updated successfully";
      },
      error: "Failed to update activity",
    })

  }

  return (
    <NavigatorLayout>
      <div className="mx-auto py-8">

        {/* Title */}
        <Title title="School Curriculum" />

        {/* Grade list */}
        {[1, 2, 3, 4, 5].map((grade) => (
          <div key={grade} className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-green-800">Grade {grade}</h2>
            <div className="flex flex-col gap-1">
            {Object.values(Subject).map((subject) => {

              const subjectData = dbData[subject as Subject];
              const topics = Object.keys(subjectData || {});

              return (

                // Subject section
                <SubjectSection key={subject} subject={subject.charAt(0) + subject.slice(1).toLowerCase()}
                  grade={grade} open={openSections[`${subject}-${grade}`]} onToggle={() => handleToggleSubject(subject, grade)}>
                  <div className="flex flex-col gap-4">
                  {topics.length <= 0 ? (

                    // Empty topic list
                    <p>No activities available for this subject</p> 
                    
                  ) : (

                    // Topic list
                    topics.map((topic) => (

                      // Topic section
                      <TopicSection key={topic} title={topic} open={!!openTopics[subject + "-" + topic]}
                        onToggle={() => handleToggleTopic(subject, parseInt(grade.toString()), topic)}>
                        <div className="flex flex-col gap-2">
                        {subjectData[topic].map((activity: any) => (
                          // Activity item
                          <ViewActivityItem key={activity.activityID} itemData={activity}
                          handleUpdateActivityStatus={handleUpdateActivityStatus} />
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
        ))}

      </div>
    </NavigatorLayout>

  );
}
