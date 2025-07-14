"use client";

import Title from "@/components/shared/headings/Title";
import FilterWrapper from "@/components/shared/filter/FilterWrapper";
import InputFilter from "@/components/shared/filter/InputFilter";
import OptionFilter from "@/components/shared/filter/OptionFilter";
import FilterControls from "@/components/shared/filter/FilterControls";
import Paginator from "@/components/shared/pagination/Paginator";
import ViewActivityItem from "@/components/activity/ViewActivityItem";
import React, { useEffect, useState } from "react";
import cleanParams from "@/lib/utils/cleanParams";
import { ActivityDifficultyEnum, ActivityGradeEnum, ActivityStatusEnum, SubjectEnum } from "@/lib/utils/types";

export default function Activities() {


  const [dbData, setDbData] = useState<{
    activities: Array<{
      activityID: string,  
      title: string,
      status?: string,
      subject: string,
      grade: number,
      timeLimit: number,
      isGraded: boolean,
      difficulty: string
      templateCode: string,
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
    if (!triggerFilter) return;
    setTriggerFilter(false);
    fetchActivities();
  }, [triggerFilter]);

  useEffect(() => { 
    fetchActivities();
  }, [pagination]);

  return (
    <>
      {/* Title */}
      <Title title="Manage Activities" />

      {/* Filters */}
      <FilterWrapper>
        <InputFilter
          filterKey="title"
          setFilter={setFilter}
        >Activity Title</InputFilter>
        <OptionFilter
          filterKey="subject"
          values={Object.values(SubjectEnum)}
          setFilter={setFilter}
        >Subject</OptionFilter>
        <OptionFilter
          filterKey="grade"
          values={Object.values(ActivityGradeEnum)}
          setFilter={setFilter}
        >Grade</OptionFilter>
        <OptionFilter
          filterKey="difficulty"
          values={Object.values(ActivityDifficultyEnum)}
          setFilter={setFilter}
        >Difficulty</OptionFilter>
        <OptionFilter
          filterKey="status"
          values={Object.values(ActivityStatusEnum)}
          setFilter={setFilter}
        >Status</OptionFilter>
        <div className="ml-auto">
          <FilterControls setFilter={setFilter} setTriggerFilter={setTriggerFilter}/>
        </div>
      </FilterWrapper>

      {/* Info */}
      <div className="w-full table-auto text-left">
        {
          dbData.activities.map(function (item: any) {
            return <ViewActivityItem itemData={item} key={item.activityID}/>;
          })
        } 
      </div>

      {/* paginator */}
      <Paginator totalItems={dbData.total} pagination={pagination} setPagination={setPagination}/>
   
   
    </>
  );
} 