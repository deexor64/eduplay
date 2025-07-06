"use client";

import Title from "@/components/Title";
import FilterWrapper from "@/components/shared/filter/FilterWrapper";
import InputFilter from "@/components/shared/filter/InputFilter";
import OptionFilter from "@/components/shared/filter/OptionFilter";
import FilterControls from "@/components/shared/filter/FilterControls";
import Paginator from "@/components/shared/pagination/Paginator";
import ItemListWrapper from "@/components/shared/item-list/ItemListWrapper";
import ViewClassItem from "@/components/shared/item-list/ViewClassItem";
import React, { useEffect, useState } from "react";
import cleanParams from "@/lib/utils/cleanParams";
import useAuth from "@/hooks/useAuth";
import QuickActionButton from "@/components/shared/ActionButton";
import { faPen } from "@fortawesome/free-solid-svg-icons";

export default function ClassList() {
  
  const { userType, permissionLevel } = useAuth();
 
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
  
  function finalizeFetchQuery(): URLSearchParams {

    // params
    const params = cleanParams({
      ...filter,
      ...pagination,
    });

    return new URLSearchParams(params);
    
  }

  async function handleFetch () {

    // fetch
    const params = finalizeFetchQuery();
    
    const url = `/api/classes?${params}`;
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
  }, [pagination]);
  
  return (
    <>
      
      {/* Title */}
      {userType === "ADMIN" &&
        <Title title="Manage Classes" >
          <QuickActionButton href="/admin/classes/create" icon={faPen} label="create class" />
        </Title>}
      
      {(userType === "TEACHER" || userType === "STUDENT") && <Title title="Select your Class" />}

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
