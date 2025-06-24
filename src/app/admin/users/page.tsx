"use client";

import Title from "@/components/Title";
import FilterWrapper from "@/components/filter/FilterWrapper";
import InputFilter from "@/components/filter/InputFilter";
import OptionFilter from "@/components/filter/OptionFilter";
import FilterControls from "@/components/filter/FilterControls";
import Paginator from "@/components/pagination/Paginator";
import ItemListWrapper from "@/components/item-list/ItemListWrapper";
import ViewUserItem from "@/components/item-list/ViewUserItem";
import React, { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import { generateUniqueID } from "@/lib/utils/generateRandomString";

export default function Users() {
  
  const userType = "ADMIN";
  const searchParams = useSearchParams();
  const userListType = searchParams.get("userListType");
 
  const [dbData, setDbData] = useState<{
    users: Array<{
      indexNumber?: string,
      email: string,
      user: {
        fullName: string,
        displayPicUrl: string,
        status: string
      }
    }>,
    total: number;
  }>({ users: [], total: 0 });

  const [filter, setFilter] = useState({
    indexNumber: undefined,
    fullName: undefined,
    email: undefined,
    status: undefined
  });
  
  const [pagination, setPagination] = useState({
    page: 1, 
    limit: 10
  });
  
  const [triggerFilter, setTriggerFilter] = useState(false);
  
  useEffect(() => {
    if (!triggerFilter) return;
    setTriggerFilter(false);
    handleFetch();
  }, [triggerFilter]);
  
  useEffect(() => { 
    handleFetch();
  }, [userListType, pagination]);
  
  function finalizeQueryString(): URLSearchParams{

    const tempParam = {
      userType: userType,
      userListType: userListType,
      ...filter,
      ...pagination,
    };
    
    const cleanParams: Record<string, string> = {};
    
    // remove undefined or empty fields
    for (const [key, value] of Object.entries(tempParam)) {
      if (value != null) {
        cleanParams[key] = String(value);
      }
    }
  
    return new URLSearchParams(cleanParams);
    
  }

  
  async function handleFetch () {
    
    const params = finalizeQueryString();
    
    const url = `/api/user-management/user-list?${params}`;
    const res = await fetch(url);
    
    const data = await res.json();
    if (data.status) {
      console.log(data.data);
      setDbData(JSON.parse(data.data));
    }
  
  }
  
  return (
    <>
      
      {/* Title */}
      {(userListType === "admin") && <Title title="Manage Admins" />}
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
      <ItemListWrapper>
        {
          dbData.users.map(function (item) {
            return <ViewUserItem itemData={item} key={item.indexNumber + item.email}/>;
          })
        } 
      </ItemListWrapper>
  
      {/* paginator */}
      <Paginator totalItems={dbData.total} pagination={pagination} setPagination={setPagination}/>

    </>
    
  );
}
