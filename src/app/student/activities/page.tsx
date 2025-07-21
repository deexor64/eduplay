"use client";

import Title from "@/components/shared/headings/Title";
import FilterWrapper from "@/components/shared/filter/FilterWrapper";
import InputFilter from "@/components/shared/filter/InputFilter";
import OptionFilter from "@/components/shared/filter/OptionFilter";
import Paginator from "@/components/shared/pagination/Paginator";
import StudentViewActivityItem from "@/components/student/activity/StudentViewActivityItem";
import React, { useEffect, useState } from "react";
import cleanParams from "@/lib/utils/cleanParams";
import { ActivityDifficultyEnum, ActivityGradeEnum, ActivityStatusEnum, SubjectEnum } from "@/lib/utils/types";
import StudentNavigatorLayout from "@/components/student/StudentNavigatorLayout";

export default function Activities() {

  const [dbData, setDbData] = useState<{
    activities: Array<{
      activityID: string,  
      title: string,
      status: string,
      subject: string,
      grade: number,
      timeLimit: number,
      isGraded: boolean,
      difficulty: string,
    }>,
    total: number;
  }>({ activities: [], total: 0 });

  const [filter, setFilter] = useState({
    title: undefined,
    status: undefined,
    grade: undefined,
    difficulty: undefined,
    subject: undefined,
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
    const res = await fetch(url);

    const resData = await res.json();
    setDbData(resData.data);

    console.log(resData.data);

  }

  useEffect(() => { 
    setTriggerFilter(false);
    fetchActivities();
  }, [triggerFilter, pagination]);

  // Filter to only show published activities for students
  const publishedActivities = dbData.activities.filter(activity => activity.status === "PUBLISHED");

    return (

    <StudentNavigatorLayout>
  
      {/* Title */}
      <Title title="🎮 Fun Learning Activities" />

      {/* Filters */}
      <FilterWrapper>
        <InputFilter
          filterKey="title"
          setFilter={setFilter}
          setTriggerFilter={setTriggerFilter}
        >Search Activities</InputFilter>
        <OptionFilter
          filterKey="subject"
          values={Object.values(SubjectEnum)}
          setFilter={setFilter}
          setTriggerFilter={setTriggerFilter}
        >Subject</OptionFilter>
        <OptionFilter
          filterKey="grade"
          values={Object.values(ActivityGradeEnum)}
          setFilter={setFilter}
          setTriggerFilter={setTriggerFilter}
        >Grade Level</OptionFilter>
        <OptionFilter
          filterKey="difficulty"
          values={Object.values(ActivityDifficultyEnum)}
          setFilter={setFilter}
          setTriggerFilter={setTriggerFilter}
        >Difficulty</OptionFilter>
      </FilterWrapper>

      {/* Activity List */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        {publishedActivities.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <div className="text-6xl mb-4">😴</div>
            <div className="text-gray-600 text-lg mb-2">No activities available right now</div>
            <div className="text-gray-500">Check back later for new learning adventures!</div>
          </div>
        ) : (
          publishedActivities.map(function (item) {
            return <StudentViewActivityItem itemData={item} key={item.activityID}/>;
          })
        )}
      </div>

      {/* paginator */}
      <Paginator totalItems={publishedActivities.length} pagination={pagination} setPagination={setPagination}/>

    </StudentNavigatorLayout>
  );
} 