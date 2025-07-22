"use client";

import Title from "@/components/shared/headings/Title";
import FilterWrapper from "@/components/shared/filter/FilterWrapper";
import InputFilter from "@/components/shared/filter/InputFilter";
import OptionFilter from "@/components/shared/filter/OptionFilter";
import Paginator from "@/components/shared/pagination/Paginator";
import ViewActivityItem from "@/components/activity/ViewActivityItem";
import React, { useEffect, useState } from "react";
import cleanParams from "@/lib/utils/cleanParams";
import { ActivityDifficultyEnum, ActivityGradeEnum, ActivityStatusEnum, SubjectEnum } from "@/lib/utils/types";
import NavigatorLayout from "@/components/layouts/NavigatorLayout";

export default function Activities() {

  const [dbData, setDbData] = useState<{
    activities: Array<{
      activityID: string,  
      title: string,
      status: string,
      subject: string,
      grade: number,
      isScored: boolean,
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

  return (
    <NavigatorLayout>
      {/* Title */}
      <Title title="Manage Activities" />

      {/* Filters */}
      <FilterWrapper>
        <InputFilter
          filterKey="title"
          setFilter={setFilter}
          setTriggerFilter={setTriggerFilter}
        >Activity Title</InputFilter>
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
        >Grade</OptionFilter>
        <OptionFilter
          filterKey="difficulty"
          values={Object.values(ActivityDifficultyEnum)}
          setFilter={setFilter}
          setTriggerFilter={setTriggerFilter}
        >Difficulty</OptionFilter>
        <OptionFilter
          filterKey="status"
          values={Object.values(ActivityStatusEnum)}
          setFilter={setFilter}
          setTriggerFilter={setTriggerFilter}
        >Status</OptionFilter>
      </FilterWrapper>

      {/* Info */}
       <div className="w-full table-auto text-left">
        {dbData.activities.length === 0 ? (
          <div className="text-center text-gray-500 py-8">Nothing to display</div>
        ) : (
          dbData.activities.map(function (item) {
            return <ViewActivityItem itemData={item} onUpdateActivityStatus={fetchActivities} key={item.activityID}/>;
          })
        )}
      </div>

      {/* paginator */}
      <Paginator totalItems={dbData.total} pagination={pagination} setPagination={setPagination}/>
   
    </NavigatorLayout>
  );
} 