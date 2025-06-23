"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import Title from "@/components/Title";
import FilterWrapper from "@/components/server-filter/FilterWrapper";
import InputFilter from "@/components/server-filter/InputFilter";
import OptionFilter from "@/components/server-filter/OptionFilter";
import { generateUniqueID } from "@/lib/utils/generateRandomString";
import Paginator from "@/components/pagination/Paginator";
import ItemListWrapper from "@/components/item-list/ItemListWrapper";
import { ViewUserItem } from "@/components/item-list/viewUserItem";
import FilterControls from "@/components/server-filter/FilterControls";

export default function Admins() {
  
  const userType = "ADMIN";
  const searchParams = useSearchParams();
  const userListType = searchParams.get("userListType");
 
  const [dbData, setDbData] = useState<{
    users: Array<{
      indexNumber: string,
      email: string,
      profileUrl: string,
      displayPic: string,
      user: {
        fullName: string,
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
  }, [pagination]);
  
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
      <Title title="Manage Admins"/>

      {/* Filters */}
      <FilterWrapper>
        <InputFilter
          filterKey="fullName"
          setFilter={setFilter}
        />
        <InputFilter
          filterKey="indexNumber"
          setFilter={setFilter}
        />
        <InputFilter
          filterKey="email"
          setFilter={setFilter}
        />
        <OptionFilter
          filterKey="status"
          values={["PENDING", "ACTIVE", "INACTIVE", "SUSPENDED"]}
          setFilter={setFilter}
        />
        <div className="ml-auto">
          <FilterControls setFilter={setFilter} setTriggerFilter={setTriggerFilter}/>
        </div>
      </FilterWrapper>
      
      {/* Info */}
      <ItemListWrapper>
        {
          dbData.users.map(function (item) {
            return <ViewUserItem itemData={item} key={item.indexNumber}/>;
          })
        } 
      </ItemListWrapper>
  
      {/* paginator */}
      <Paginator totalItems={dbData.total} pagination={pagination} setPagination={setPagination}/>

    </>   
  );
}
