"use client";

import Title from "@/components/shared/headings/Title";
import FilterWrapper from "@/components/shared/filter/FilterWrapper";
import InputFilter from "@/components/shared/filter/InputFilter";
import OptionFilter from "@/components/shared/filter/OptionFilter";
import Paginator from "@/components/shared/pagination/Paginator";
import ViewTemplateItem from "@/components/templates/ViewTemplateItem";
import SyncTemplateButton from "@/components/templates/SyncTemplatesButton";
import React, { useEffect, useState } from "react";
import { TeacherRoleEnum } from "@/lib/utils/types";
import cleanParams from "@/lib/utils/cleanParams";
import useAuth from "@/hooks/useAuth";
import NavigatorLayout from "@/components/navigator/NavigatorLayout";
import { syncTemplates } from "@/actions/templates/syncTemplates";
import toast from "react-hot-toast";

export default function TemplateList() {
  
  const { userType, teacherRole } = useAuth();
  
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
  
  function templatesQuery(): URLSearchParams {

    // params
    const params = cleanParams({
      ...filter,
      ...pagination,
    });

    return new URLSearchParams(params);
    
  }
  
  async function fetchTemplates() {

    // fetch
    const params = templatesQuery();
    
    const url = `/api/templates?${params}`;
    const res = await fetch(url);
    
    const resData = await res.json();
    setDbData(resData.data);
  
  }

  useEffect(() => { 
    setTriggerFilter(false);
    fetchTemplates();
  }, [triggerFilter, pagination]);

  console.log(teacherRole)

  return (
    <NavigatorLayout>
      
      {/* Title */}
      <Title title="Activity Templates" />

      {/* Filters */}
      <FilterWrapper>
        <OptionFilter
          filterKey="templateType"
          values={["Drag and Drop", "Match", "Fill Blanks"]}
          setFilter={setFilter}
          setTriggerFilter={setTriggerFilter}
        >Type</OptionFilter>
        <InputFilter
          filterKey="title"
          setFilter={setFilter}
          setTriggerFilter={setTriggerFilter}
        >Title</InputFilter>
        {/* sync button. shown only to admins */}
        {
          [TeacherRoleEnum.MASTER, TeacherRoleEnum.ADMIN].includes(teacherRole as TeacherRoleEnum)  && (
            <SyncTemplateButton onSyncTemplates={fetchTemplates} />
          )
        }
      </FilterWrapper>
      
      {/* Info */}
      <div className="w-full table-auto text-left">
        {dbData.templates.length === 0 ? (
          <div className="text-center text-gray-500 py-8">Nothing to display</div>
        ) : (
          dbData.templates.map(function (item) {
            return <ViewTemplateItem itemData={item} key={item.templateCode}/>;
          })
        )}
      </div>
  
      {/* paginator */}
      <Paginator totalItems={dbData.total} pagination={pagination} setPagination={setPagination}/>

    </NavigatorLayout>
    
  );
}
