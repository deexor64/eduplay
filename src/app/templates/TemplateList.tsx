"use client";

import Title from "@/components/Title";
import FilterWrapper from "@/components/filter/FilterWrapper";
import InputFilter from "@/components/filter/InputFilter";
import OptionFilter from "@/components/filter/OptionFilter";
import FilterControls from "@/components/filter/FilterControls";
import Paginator from "@/components/pagination/Paginator";
import ItemListWrapper from "@/components/item-list/ItemListWrapper";
import ViewTemplateItem from "@/components/item-list/ViewTemplateItem";
import SyncTemplateButton from "@/components/templates/SyncTemplatesButton";
import React, { useEffect, useState } from "react";
import { UserType } from "@/lib/utils/types";

interface TemplateListProps {
  userType: UserType
}

export default function TemplateList(props: TemplateListProps) {
  
  const userType = props.userType;
 
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
    
    const url = `/api/school-management/template-list?${params}`;
    const res = await fetch(url);
    
    const data = await res.json();
    if (data.status) {
      console.log(data.data);
      setDbData(JSON.parse(data.data));
    }
  
  }
  
  async function syncTemplates() {
    if (userType !== "ADMIN") return;
    const url = `/api/school-management/sync-templates?userType=${userType}`;
    const res = await fetch(url);
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
          userType === "ADMIN" && (
            <SyncTemplateButton syncTemplates={syncTemplates} />
          )
        }
      </FilterWrapper>
      
      {/* Info */}
      <ItemListWrapper>
        {
          dbData.templates.map(function (item) {
            return <ViewTemplateItem itemData={item} key={item.templateCode}/>;
          })
        }
      </ItemListWrapper>
  
      {/* paginator */}
      <Paginator totalItems={dbData.total} pagination={pagination} setPagination={setPagination}/>

    </>
    
  );
}
