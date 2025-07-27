"use client";

import Title from "@/components/shared/headings/Title";
import FilterWrapper from "@/components/shared/filter/FilterWrapper";
import InputFilter from "@/components/shared/filter/InputFilter";
import OptionFilter from "@/components/shared/filter/OptionFilter";
import Paginator from "@/components/shared/pagination/Paginator";
import ViewActivityItem from "@/components/activity/ViewActivityItem";
import React, { useEffect, useState } from "react";
import cleanParams from "@/lib/utils/cleanParams";
import NavigatorLayout from "@/components/navigator/NavigatorLayout";
import toast from "react-hot-toast";
import { ActivityDifficulty, ActivityStatus, Subject } from "@prisma/client";
import { updateActivityStatus } from "@/actions/activity/updateActivityStatus";

export default function Activities() {

  const [dbData, setDbData] = useState<{
    activities: Array<{
      activityID: string,  
      title: string,
      status: ActivityStatus,
      subject: Subject,
      grade?: 1 | 2 | 3 | 4 | 5,
      isScored: boolean,
      difficulty?: ActivityDifficulty,
      topic?: string,
    }>,
    total: number;
  }>({ activities: [], total: 0 });

  const [filter, setFilter] = useState({
    topic: undefined,
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

  async function handleUpdateActivityStatus(activityID: string, status: ActivityStatus) {

    toast.promise(updateActivityStatus(activityID, status), {
      loading: "Updating activity...",
      success: () => {
        fetchActivities();
        return "Activity updated successfully";
      },
      error: "Failed to update activity",
    })

  }

  return (
    <NavigatorLayout>

      {/* Title */}
      <Title title="Manage Activities" />

      {/* Filters */}
      <FilterWrapper>
      <InputFilter
          filterKey="topic"
          setFilter={setFilter}
          setTriggerFilter={setTriggerFilter}
        >Topic</InputFilter>
        <InputFilter
          filterKey="title"
          setFilter={setFilter}
          setTriggerFilter={setTriggerFilter}
        >Title</InputFilter>
        <OptionFilter
          filterKey="subject"
          values={Object.values(Subject)}
          setFilter={setFilter}
          setTriggerFilter={setTriggerFilter}
        >Subject</OptionFilter>
        <OptionFilter
          filterKey="grade"
          values={["1", "2", "3", "4", "5"]}
          setFilter={setFilter}
          setTriggerFilter={setTriggerFilter}
        >Grade</OptionFilter>
        <OptionFilter
          filterKey="difficulty"
          values={Object.values(ActivityDifficulty)}
          setFilter={setFilter}
          setTriggerFilter={setTriggerFilter}
        >Difficulty</OptionFilter>
        <OptionFilter
          filterKey="status"
          values={Object.values(ActivityStatus)}
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
            return <ViewActivityItem itemData={item} handleUpdateActivityStatus={handleUpdateActivityStatus} 
            key={item.activityID}/>;
          })
        )}
      </div>

      {/* paginator */}
      <Paginator totalItems={dbData.total} pagination={pagination} setPagination={setPagination}/>
   
    </NavigatorLayout>
  );

} 
