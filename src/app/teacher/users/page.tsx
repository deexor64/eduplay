"use client";

import Title from "@/components/shared/headings/Title";
import FilterWrapper from "@/components/shared/filter/FilterWrapper";
import InputFilter from "@/components/shared/filter/InputFilter";
import OptionFilter from "@/components/shared/filter/OptionFilter";
import Paginator from "@/components/shared/pagination/Paginator";
import ViewUserItem from "@/components/users/ViewUserItem";
import React, { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import cleanParams from "@/lib/utils/cleanParams";
import NavigatorLayout from "@/components/layouts/NavigatorLayout";

export default function UserList() {
  
  const searchParams = useSearchParams();
  const userListType = searchParams.get("userListType");
 
  const [dbData, setDbData] = useState<{
    users: Array<{
      indexNumber?: string,
      grade?: number,
      class?: string,
      user: {
        userID: string,
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
  
  function usersQuery(): URLSearchParams {

    // params
    const params = cleanParams({
      userListType: userListType,
      ...filter,
      ...pagination,
    });

    return new URLSearchParams(params);
    
  }

  async function fetchUsers () {

    // fetch
    const params = usersQuery();
    
    const url = `/api/users?${params}`;
    const res = await fetch(url);
    
    const resData = await res.json();
    setDbData(resData.data);
  
  }
  
  useEffect(() => {
    setTriggerFilter(false);
    fetchUsers();
  }, [pagination, triggerFilter]);
  
  return (
    <NavigatorLayout>
      
      {/* Title */}
      {(userListType === "teacher") && <Title title="Manage Teachers" />}
      {(userListType === "student") && <Title title="Manage Students" />}
      {(userListType === "parent") && <Title title="Manage Parents" />}

      {/* Filters */}
      <FilterWrapper>
        <InputFilter
          filterKey="fullName"
          setFilter={setFilter}
          setTriggerFilter={setTriggerFilter}
        >Full Name</InputFilter>
        {
          userListType !== "parent" && 
          <InputFilter
            filterKey="indexNumber"
            setFilter={setFilter}
            setTriggerFilter={setTriggerFilter}
          >Index NUmber</InputFilter>
        }
        <InputFilter
          filterKey="email"
          setFilter={setFilter}
          setTriggerFilter={setTriggerFilter}
        >Email</InputFilter>
        <OptionFilter
          filterKey="status"
          values={["PENDING", "ACTIVE", "INACTIVE", "SUSPENDED"]}
          setFilter={setFilter}
          setTriggerFilter={setTriggerFilter}
        >Status</OptionFilter>
      </FilterWrapper>
      
      {/* Info */}
      <div className="w-full table-auto text-left">
        {dbData.users.length === 0 ? (
          <div className="text-center text-gray-500 py-8">Nothing to display</div>
        ) : (
          dbData.users.map(function (item) {
            return <ViewUserItem itemData={item} onUpdateUserStatus={fetchUsers} key={item.indexNumber}/>;
          })
        )}
      </div>
  
      {/* paginator */}
      <Paginator totalItems={dbData.total} pagination={pagination} setPagination={setPagination}/>

    </NavigatorLayout>
    
  );
}
