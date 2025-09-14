"use client";

import Title from "@/components/student/Title";
import FilterWrapper from "@/components/student/activity/FilterWrapper";
import InputFilter from "@/components/student/activity/InputFilter";
import OptionFilter from "@/components/student/activity/OptionFilter";
import Paginator from "@/components/student/activity/Paginator";
import ViewActivityItem from "@/components/student/activity/ViewActivityItem";
import React, { useContext, useEffect, useState } from "react";
import cleanParams from "@/lib/utils/cleanParams";
import StudentNavigatorLayout from "@/components/student/StudentNavigatorLayout";
import { ActivityDifficulty, Subject } from "@prisma/client";
import { AuthContext } from "@/contexts/AuthProvider";

export default function Activities() {
  
  const { userID, email, userType, role, status, user } = useContext(AuthContext);

  const [dbData, setDbData] = useState<{
    activities: Array<{
      activityID: string,
      title: string,
      subject: Subject,
      section: string,
      grade: 1 | 2 | 3 | 4 | 5,
      isScored: boolean,
      difficulty: ActivityDifficulty,
      completed: boolean,
      progressID?: string,
    }>,
    total: number;
  }>({ activities: [], total: 0 });

  const [filter, setFilter] = useState({
    section: undefined,
    title: undefined,
    grade: undefined,
    difficulty: undefined,
    subject: undefined,
    completed: undefined,
  });
  
  const [pagination, setPagination] = useState({
    page: 1, 
    limit: 10
  });
  
  const [triggerFilter, setTriggerFilter] = useState(false);

  function activitiesQuery(): URLSearchParams {
    // params
    const params = cleanParams({
      ...filter,
      ...pagination,
    });
    return new URLSearchParams(params);
  }

  async function fetchActivities() {

    const params = activitiesQuery();
    const url = `/api/activities?${params}`;
    const token = await user?.getIdToken();
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    const resData = await res.json();
    setDbData(resData.data);

  }

  useEffect(() => { 
    setTriggerFilter(false);
    fetchActivities();
  }, [triggerFilter, pagination]);

  return (

    <StudentNavigatorLayout>
  
      {/* Title */}
      <Title title="Fun Learning Activities" imageUrl="/images/student/title-activities.png" />

      {/* Filters */}
      <FilterWrapper>
        <InputFilter
          filterKey="section"
          setFilter={setFilter}
          setTriggerFilter={setTriggerFilter}
        >Section</InputFilter>
        <InputFilter
          filterKey="title"
          setFilter={setFilter}
          setTriggerFilter={setTriggerFilter}
        >Title</InputFilter>
        <OptionFilter
          filterKey="grade"
          values={['1', '2', '3', '4', '5']}
          setFilter={setFilter}
          setTriggerFilter={setTriggerFilter}
        >Grade</OptionFilter>
        <OptionFilter
          filterKey="subject"
          values={Object.values(Subject)}
          setFilter={setFilter}
          setTriggerFilter={setTriggerFilter}
        >Subject</OptionFilter>
        <OptionFilter
          filterKey="difficulty"
          values={Object.values(ActivityDifficulty)}
          setFilter={setFilter}
          setTriggerFilter={setTriggerFilter}
        >Difficulty</OptionFilter>
        <OptionFilter
          filterKey="completed"
          values={["Completed", "Not Completed"]}
          setFilter={setFilter}
          setTriggerFilter={setTriggerFilter}
        >Completed</OptionFilter>
      </FilterWrapper>

      {/* Activity List */}
      <div className="w-full min-h-[calc(100vh-390px)] grid grid-cols-1 md:grid-cols-2 gap-4">
        {dbData.activities.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <div className="text-6xl mb-4">😴</div>
            <div className="text-gray-600 text-lg mb-2">No activities available right now</div>
            <div className="text-gray-500">Check back later for new learning adventures!</div>
          </div>
        ) : (
          dbData.activities.map(function (item) {
            return <ViewActivityItem itemData={item} key={item.activityID}/>;
          })
        )}
      </div>

      {/* paginator */}
      <Paginator totalItems={dbData.activities.length} pagination={pagination} setPagination={setPagination}/>

    </StudentNavigatorLayout>
  );
} 
