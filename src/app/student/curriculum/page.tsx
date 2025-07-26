"use client";

import React, { useState } from "react";
import StudentNavigatorLayout from "@/components/student/StudentNavigatorLayout";
import Title from "@/components/shared/headings/Title";
import SubjectSection from "@/components/student/curriculum/SubjectSection";
import TopicSection from "@/components/student/curriculum/TopicSection";
import StudentViewActivityItem from "@/components/student/activity/StudentViewActivityItem";
import { SubjectEnum } from "@/lib/utils/types";

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
        isScored: false,
        topic: "Grammar",
        completed: false,
      }
    ]
  },
  COMMON: {}
};

export default function Curriculum() {


  const [dbData] = useState<any>(mockDbData);
  
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
