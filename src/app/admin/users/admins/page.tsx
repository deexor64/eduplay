"use client";

import React, { useEffect, useState } from "react";
import Title from "@/components/Title";
import FilterWrapper from "@/components/server-filter/FilterWrapper";
import InputFilter from "@/components/server-filter/InputFilter";
import OptionFilter from "@/components/server-filter/OptionFilter";
import { generateUniqueID } from "@/lib/utils/generateRandomString";
import Paginator from "@/components/pagination/Paginator";
import useAuth from "@/hooks/useAuth";
import ItemListWrapper from "@/components/item-list/ItemListWrapper";
import { ViewUserItem } from "@/components/item-list/viewUserItem";
import FilterControls from "@/components/server-filter/FilterControls";

export default function Admins() {
  
  const { userType, setUserType } = useAuth();
  
  const dbData = {
    admin: [
      {
        name: "Samuel Boateng",
        indexNumber: "A001",
        email: "sboateng@school.edu",
        grade: undefined,
        profileUrl: "/users/a001",
        displayPic: "/images/users/a001.jpg",
        status: "ACTIVE",
      },
      {
        name: "Juliet Mensah",
        indexNumber: "T102",
        email: "jmensah@school.edu",
        grade: "Grade 6",
        profileUrl: "/users/t102",
        displayPic: "/images/users/t102.jpg",
        status: "PENDING",
      },
      {
        name: "Kwame Appiah",
        indexNumber: "S201",
        email: "kappiah@student.com",
        grade: "Grade 4",
        profileUrl: "/users/s201",
        displayPic: "/images/users/s201.jpg",
        status: "ACTIVE",
      },
      {
        name: "Akosua Dede",
        indexNumber: "S202",
        email: "adede@student.com",
        grade: "Grade 6",
        profileUrl: "/users/s202",
        displayPic: "/images/users/s202.jpg",
        status: "INACTIVE",
      },
      {
        name: "Martha Nyarko",
        indexNumber: "P301",
        email: "mnyarko@parent.com",
        grade: undefined,
        profileUrl: "/users/p301",
        displayPic: "/images/users/p301.jpg",
        status: "SUSPENDED",
      },
      {
        name: "Isaac Ofori",
        indexNumber: "T105",
        email: "iofori@school.edu",
        grade: "Grade 3",
        profileUrl: "/users/t105",
        displayPic: "/images/users/t105.jpg",
        status: "ACTIVE",
      },
      {
        name: "Ama Kusi",
        indexNumber: "P303",
        email: "akusi@parent.com",
        grade: undefined,
        profileUrl: "/users/p303",
        displayPic: "/images/users/p303.jpg",
        status: "ACTIVE",
      },
      {
        name: "Daniel Owusu",
        indexNumber: "A004",
        email: "dowusu@school.edu",
        grade: undefined,
        profileUrl: "/users/a004",
        displayPic: "/images/users/a004.jpg",
        status: "PENDING",
      },
    ],
    total: 23,
  }

  const [filter, setFilter] = useState({
    indexNumber: undefined,
    name: undefined,
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
      ...filter,
      ...pagination,
    };
    
    const cleanParams: Record<string, string> = {};
    
    for (const [key, value] of Object.entries(tempParam)) {
      if (value != null) {
        cleanParams[key] = String(value);
      }
    }
  
    return new URLSearchParams(cleanParams);
    
  }

  
  async function handleFetch () {
    
    const params = finalizeQueryString();
    
    const url = `/api/admin/admins?${params}`;
    const res = await fetch(url);
    // const data = await res.json();
    // if (!res.ok) console.log(data)
    
    // return data;
    
  }
  
  return (
    <>
      
      {/* Title */}
      <Title title="Manage Admins"/>

      {/* Filters */}
      <FilterWrapper filterTab="DEFAULT" selected={"DEFAULT"}>
        <OptionFilter
          filterKey="status"
          values={["All", "Active", "Inactive", "Suspended"]}
          setFilter={setFilter}
        />
        <InputFilter
          filterKey="name"
          setFilter={setFilter}
        />
        <div className="ml-auto">
          <FilterControls setFilter={setFilter} setTriggerFilter={setTriggerFilter}/>
        </div>
      </FilterWrapper>
      
      {/* Info */}
      <ItemListWrapper>
        {
          dbData.admin.map(function (item) {
            return <ViewUserItem itemData={item} key={item.indexNumber}/>;
          })
        } 
      </ItemListWrapper>
  
      {/* paginator */}
      <Paginator totalItems={dbData.total} pagination={pagination} onChange={setPagination}/>

    </>   
  );
}
