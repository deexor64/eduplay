"use client";

import Title from "@/components/shared/headings/Title";
import FilterWrapper from "@/components/shared/filter/FilterWrapper";
import InputFilter from "@/components/shared/filter/InputFilter";
import OptionFilter from "@/components/shared/filter/OptionFilter";
import FilterControls from "@/components/shared/filter/FilterControls";
import Paginator from "@/components/shared/pagination/Paginator";
import ViewUserItem from "@/components/users/ViewUserItem";
import React, { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import cleanParams from "@/lib/utils/cleanParams";

export default function UserList() {
  
  const searchParams = useSearchParams();
  const userListType = searchParams.get("userListType");
 
  const [dbData, setDbData] = useState<{
    users: Array<{
      indexNumber?: string,
      user: {
        firstName: string,
        lastName: string,
        displayPicUrl: string,
        status: string
      }
    }>,
    total: number;
  }>({ users: [], total: 0 });

  const [filter, setFilter] = useState({
    indexNumber: undefined,
    fullName: undefined,
    status: undefined
  });
  
  const [pagination, setPagination] = useState({
    page: 1, 
    limit: 10
  });
  
  const [triggerFilter, setTriggerFilter] = useState(false);
  
  function finalizeFetchQuery(): URLSearchParams {

    // params
    const params = cleanParams({
      userListType: userListType,
      ...filter,
      ...pagination,
    });

    return new URLSearchParams(params);
    
  }

  async function handleFetch () {

    // fetch
    const params = finalizeFetchQuery();
    
    const url = `/api/users?${params}`;
    const res = await fetch(url);
    
    const resData = await res.json();
    setDbData(resData.data);
  
  }
  
  useEffect(() => {
    if (!triggerFilter) return;
    setTriggerFilter(false);
    handleFetch();
  }, [triggerFilter]);
  
  useEffect(() => { 
    handleFetch();
  }, [userListType, pagination]);
  
  return (
    <>
      
      {/* Title */}
      {(userListType === "teacher") && <Title title="Manage Teachers" />}
      {(userListType === "student") && <Title title="Manage Students" />}
      {(userListType === "parent") && <Title title="Manage Parents" />}

      {/* Filters */}
      <FilterWrapper>
        <InputFilter
          filterKey="fullName"
          setFilter={setFilter}
        >Full Name</InputFilter>
        {
          userListType !== "parent" && 
          <InputFilter
            filterKey="indexNumber"
            setFilter={setFilter}
          >Index NUmber</InputFilter>
        }
        <InputFilter
          filterKey="email"
          setFilter={setFilter}
        >Email</InputFilter>
        <OptionFilter
          filterKey="status"
          values={["PENDING", "ACTIVE", "INACTIVE", "SUSPENDED"]}
          setFilter={setFilter}
        >Status</OptionFilter>
        <div className="ml-auto">
          <FilterControls setFilter={setFilter} setTriggerFilter={setTriggerFilter}/>
        </div>
      </FilterWrapper>
      
      {/* Info */}
      <div className="w-full table-auto text-left">
        {
          dbData.users.map(function (item) {
            return <ViewUserItem itemData={item} key={item.indexNumber + item.user.firstName}/>;
          })
        } 
      </div>
  
      {/* paginator */}
      <Paginator totalItems={dbData.total} pagination={pagination} setPagination={setPagination}/>

    </>
    
  );
}
