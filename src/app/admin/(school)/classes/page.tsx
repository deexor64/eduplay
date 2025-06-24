"use client";

import Title from "@/components/Title";
import FilterWrapper from "@/components/filter/FilterWrapper";
import InputFilter from "@/components/filter/InputFilter";
import OptionFilter from "@/components/filter/OptionFilter";
import FilterControls from "@/components/filter/FilterControls";
import Paginator from "@/components/pagination/Paginator";
import ItemListWrapper from "@/components/item-list/ItemListWrapper";
import ViewClassItem from "@/components/item-list/ViewClassItem";
import React, { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';

export default function Classes() {
  
  const userType = "ADMIN";
  // const searchParams = useSearchParams();
  // const userListType = searchParams.get("userListType");
 
  const [dbData, setDbData] = useState<{
    classes: Array<{
      name?: string,
      grade: number,
      classLetter: string,
      teacher: {
        user: {
          fullName: string
        }
      }
    }>,
    total: number;
  }>({ classes: [], total: 0 });

  const [filter, setFilter] = useState({
    grade: undefined,
    classLetter: undefined,
    teacherName: undefined,
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
    
    const url = `/api/school-management/class-list?${params}`;
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
      <Title title="Manage Classes" />

      {/* Filters */}
      <FilterWrapper>
        <OptionFilter
          filterKey="grade"
          values={["1", "2", "3", "4", "5"]}
          setFilter={setFilter}
        >Grade</OptionFilter>
        <OptionFilter
          filterKey="classLetter"
          values={["A", "B", "C", "D", "E", "T", "N"]}
          setFilter={setFilter}
        >Class Letter</OptionFilter>
        <InputFilter
          filterKey="teacherName"
          setFilter={setFilter}
        >Teacher Name</InputFilter>
        <div className="ml-auto">
          <FilterControls setFilter={setFilter} setTriggerFilter={setTriggerFilter}/>
        </div>
      </FilterWrapper>
      
      {/* Info */}
      <ItemListWrapper>
        {
          dbData.classes.map(function (item) {
            return <ViewClassItem itemData={item} key={item.grade + item.classLetter + item.name}/>;
          })
        } 
      </ItemListWrapper>
  
      {/* paginator */}
      <Paginator totalItems={dbData.total} pagination={pagination} setPagination={setPagination}/>

    </>
    
  );
}
