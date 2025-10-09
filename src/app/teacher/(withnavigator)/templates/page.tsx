"use client";

import Title from "@/components/shared/headings/Title";
import FilterWrapper from "@/components/shared/filter/FilterWrapper";
import InputFilter from "@/components/shared/filter/InputFilter";
import OptionFilter from "@/components/shared/filter/OptionFilter";
import Paginator from "@/components/shared/pagination/Paginator";
import ViewTemplateItem from "@/components/templates/ViewTemplateItem";
import React, { useContext, useEffect, useState } from "react";
import cleanParams from "@/lib/utils/cleanParams";
import NavigatorLayout from "@/components/navigator/NavigatorLayout";
import { syncTemplates } from "@/actions/templates/syncTemplates";
import toast from "react-hot-toast";
import { TeacherRole, UserStatus } from "@prisma/client";
import { AuthContext } from "@/contexts/AuthProvider";
import { ListLoading } from "@/components/shared/loading/ListLoading";
import Unauthorized from "@/components/shared/loading/Unauthorized";

export default function Templates() {
  
  const { userID, email, userType, role, status, user } = useContext(AuthContext);
  if (status != UserStatus.ACTIVE) {
    return <Unauthorized />;
  }
  
  const [dbData, setDbData] = useState<{
    templates: Array<{
      templateCode: string,
      title: string,
      description: string,
      templateType: string
    }>,
    templateTypes: Array<string>,
    total: number,
  } | null>(null);

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
    const token = await user?.getIdToken();
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    
    const resData = await res.json();
    if (!resData.status) {
      console.log(resData.data);
      return;
    }
    setDbData(resData.data);
  
  }

  useEffect(() => { 
    setTriggerFilter(false);
    fetchTemplates();
  }, [triggerFilter, pagination]);

  async function handleSyncTemplates() {
    
    const token = await user?.getIdToken();

    toast.promise(syncTemplates(token!), {
      loading: "Syncing Templates...",
      success: () => {
        fetchTemplates();
        return "Templates synced successfully";
      },
      error: "Failed to sync Templates",
    })

  }

  return (
    <>
      
      {/* Title */}
      {
        ["ADMIN"].includes(role as TeacherRole)  ? (
          <Title title="Activity Templates" syncTemplates={true} handleSyncTemplates={handleSyncTemplates}/>
        ) :
        <Title title="Activity Templates" />
      }

      {/* Filters */}
      <FilterWrapper>
        <OptionFilter
          filterKey="templateType"
          values={dbData ? dbData.templateTypes : []}
          setFilter={setFilter}
          setTriggerFilter={setTriggerFilter}
        >Type</OptionFilter>
        <InputFilter
          filterKey="title"
          setFilter={setFilter}
          setTriggerFilter={setTriggerFilter}
        >Title</InputFilter>
      </FilterWrapper>
      
      {/* Info */}
      <div className="w-full min-h-[calc(100vh-380px)] table-auto text-left">
        {!dbData ? (
          <ListLoading />
        ) : dbData.templates.length === 0 ? (
          <div className="text-center text-gray-500 py-8">Nothing to display</div>
        ) : (
          dbData.templates.map(function (item) {
            return <ViewTemplateItem itemData={item} key={item.templateCode}/>;
          })
        )}
      </div>
  
      {/* paginator */}
      <Paginator totalItems={dbData ? dbData.total : 0} pagination={pagination} setPagination={setPagination}/>

    </>
    
  );
}
