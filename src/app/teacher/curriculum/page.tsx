"use client";

import React, { useState } from "react";
import NavigatorLayout from "@/components/navigator/NavigatorLayout";
import SubjectSection from "@/components/curriculum/SubjectSection";
import TopicSection from "@/components/curriculum/TopicSection";
import ViewActivityItem from "@/components/activity/ViewActivityItem";
import Title from "@/components/shared/headings/Title";
import { Grade, GradeEnum, SubjectEnum } from "@/lib/utils/types";

const SUBJECTS = ["MATHEMATICS", "SCIENCE", "ENGLISH", "HISTORY"];
const GRADES = [1, 2, 3, 4, 5];

// Mock curriculum data grouped by subject and topic
const mockDbData = {
  MATHEMATICS: {
    "Addition": [
      {
        activityID: "1",
        title: "Simple Addition",
        subject: "MATHEMATICS",
        grade: 3,
        difficulty: "EASY",
        status: "PUBLISHED",
        isScored: true,
        topic: "Addition",
        completed: false,
      },
      {
        activityID: "2",
        title: "Addition with Carry",
        subject: "MATHEMATICS",
        grade: 3,
        difficulty: "MEDIUM",
        status: "UNPUBLISHED",
        isScored: false,
        topic: "Addition",
        completed: true,
        progressID: "p1"
      }
    ],
    "Subtraction": [
      {
        activityID: "3",
        title: "Simple Subtraction",
        subject: "MATHEMATICS",
        grade: 3,
        difficulty: "EASY",
        status: "PUBLISHED",
        isScored: false,
        topic: "Subtraction",
        completed: false,
      }
    ]
  },
  SCIENCE: {
    "Plants": [
      {
        activityID: "4",
        title: "Parts of a Plant",
        subject: "SCIENCE",
        grade: 3,
        difficulty: "EASY",
        status: "PUBLISHED",
        isScored: true,
        topic: "Plants",
        completed: true,
        progressID: "p2"
      }
    ]
  },
  ENGLISH: {
    "Grammar": [
      {
        activityID: "5",
        title: "Nouns and Pronouns",
        subject: "ENGLISH",
        grade: 3,
        difficulty: "MEDIUM",
        status: "PUBLISHED",
        isScored: false,
        topic: "Grammar",
        completed: false,
      }
    ]
  },
  COMMON: {}
};

// Placeholder for future data fetching
async function fetchCurriculum(grade: number) {
  console.log("fetch: grade " + grade)
}

export default function Curriculum() {

  const [dbData] = useState<any>(mockDbData);
  
  // For collapsible grade-subject sections
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});
  const [currentGrade, setCurrentGrade] = useState<number | null>(null);

  function handleToggleSubject(subject: string, grade: number) {
    setOpenSections((prev) => {
      const key = `${subject}-${grade}`;
      const isCurrentlyOpen = !!prev[key];
      if (isCurrentlyOpen) {
        const newState = { ...prev };
        delete newState[key];
        setCurrentGrade(null);
        return newState;
      }
      // When opening, close all others and open only this one
      if (currentGrade !== null && currentGrade !== grade) {
        setCurrentGrade(grade);
        fetchCurriculum(grade);
        return { [key]: true };
      }
      setCurrentGrade(grade);
      return { [key]: true };
    });
  }
  
  // For collapsible topic sections
  const [openTopics, setOpenTopics] = useState<{ [key: string]: boolean }>({});

  function handleToggleTopic(subject: string, grade: number, topic: string) {
    const key = subject + "-" + topic;
    setOpenTopics((prev) => ({ ...prev, [key]: !prev[key] }));
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
              {Object.values(SubjectEnum).map((subject) => {

                const subjectData = dbData[subject as SubjectEnum];
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
                              onUpdateActivityStatus={() => fetchCurriculum(parseInt(grade.toString()))} />
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
