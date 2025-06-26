"use client";

import Title from "@/components/Title";
import FilterWrapper from "@/components/shared/filter/FilterWrapper";
import InputFilter from "@/components/shared/filter/InputFilter";
import OptionFilter from "@/components/shared/filter/OptionFilter";
import FilterControls from "@/components/shared/filter/FilterControls";
import Paginator from "@/components/shared/pagination/Paginator";
import ItemListWrapper from "@/components/shared/item-list/ItemListWrapper";
import ViewTemplateItem from "@/components/shared/item-list/ViewTemplateItem";
import SyncTemplateButton from "@/components/templates/SyncTemplatesButton";
import React, { useEffect, useState } from "react";
import { UserType } from "@/lib/utils/types";
import cleanParams from "@/lib/utils/cleanParams";

interface TemplateListProps {
  userType: UserType
}

export default function TemplateList(props: TemplateListProps) {
  
  const [dbData, setDbData] = useState<{
    templates: Array<{
      templateCode: string,
      title: string,
      description: string,
      templateType: string
    }>,
    total: number;
  }>({ templates: [], total: 0 });

  const [filter, setFilter] = useState({
    templateType: undefined,
    title: undefined,
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
  
  function finalizeFetchQuery(): URLSearchParams {

    // params
    const params = cleanParams({
      userType: props.userType,
      ...filter,
      ...pagination,
    });

    return new URLSearchParams(params);
    
  }
  
  async function handleFetch () {

    // fetch
    const params = finalizeFetchQuery();
    
    const url = `/api/school-management/template-list?${params}`;
    const res = await fetch(url);
    
    const resData = await res.json();
    console.log(resData);
    setDbData(JSON.parse(resData.data));
  
  }

  async function syncTemplates() {
    if (props.userType !== "ADMIN") return;
    const url = `/api/school-management/sync-templates?userType=${props.userType}`;
    const res = await fetch(url);
    console.log(res.body);
    handleFetch();
  }
  
  return (
    <>
      
      {/* Title */}
      <Title title="Activity Templates" />

      {/* Filters */}
      <FilterWrapper>
        <OptionFilter
          filterKey="templateType"
          values={["Drag and Drop", "Match", "Fill Blanks"]}
          setFilter={setFilter}
        >Type</OptionFilter>
        <InputFilter
          filterKey="title"
          setFilter={setFilter}
        >Title</InputFilter>
        <div className="ml-auto">
          <FilterControls setFilter={setFilter} setTriggerFilter={setTriggerFilter}/>
        </div>
        {/* sync button. shown only to admins */}
        {
          props.userType === "ADMIN" && (
            <SyncTemplateButton syncTemplates={syncTemplates} />
          )
        }
      </FilterWrapper>
      
      {/* Info */}
      <ItemListWrapper>
        {
          dbData.templates.map(function (item) {
            return <ViewTemplateItem userType={props.userType} itemData={item} key={item.templateCode}/>;
          })
        }
      </ItemListWrapper>
  
      {/* paginator */}
      <Paginator totalItems={dbData.total} pagination={pagination} setPagination={setPagination}/>

    </>
    
  );
}
