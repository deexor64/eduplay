"use client";

import Title from "@/components/shared/headings/Title";
import FilterWrapper from "@/components/shared/filter/FilterWrapper";
import InputFilter from "@/components/shared/filter/InputFilter";
import OptionFilter from "@/components/shared/filter/OptionFilter";
import Paginator from "@/components/shared/pagination/Paginator";
import ViewTemplateItem from "@/components/templates/ViewTemplateItem";
import SyncTemplateButton from "@/components/templates/SyncTemplatesButton";
import React, { useEffect, useState } from "react";
import cleanParams from "@/lib/utils/cleanParams";
import useAuth from "@/hooks/useAuth";
import NavigatorLayout from "@/components/navigator/NavigatorLayout";
import { syncTemplates } from "@/actions/templates/syncTemplates";
import toast from "react-hot-toast";
import { TeacherRole } from "@prisma/client";

export default function Templates() {
  
  const { userType, teacherRole } = useAuth();
  
  const [dbData, setDbData] = useState<{
    templates: Array<{
      templateCode: string,
      title: string,
      description: string,
      templateType: string
    }>,
    templateTypes: Array<string>,
    total: number,
  }>({ templates: [], templateTypes: [], total: 0 });

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

  function handleSyncTemplates() {

    toast.promise(syncTemplates(), {
      loading: "Syncing Templates...",
      success: () => {
        fetchTemplates();
        return "Templates synced successfully";
      },
      error: "Failed to sync Templates",
    })

  }

  return (
    <NavigatorLayout>
      
      {/* Title */}
      <Title title="Activity Templates" />

      {/* Filters */}
      <FilterWrapper>
        <OptionFilter
          filterKey="templateType"
          values={dbData.templateTypes}
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
          ["MASTER", "ADMIN"].includes(teacherRole as TeacherRole)  && (
            <SyncTemplateButton handleSyncTemplates={handleSyncTemplates} />
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
