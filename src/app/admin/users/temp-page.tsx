"use client";

import React, { useState } from "react";
import Title from "@/components/Title";
import TabButton from "@/components/tab/TabButton";
import TabButtonWrapper from "@/components/tab/TabButtonWrapper";
import TabWrapper from "@/components/tab/TabWrapper";
import FilterWrapper from "@/components/client-filter/FilterWrapper";
import InputFilter from "@/components/client-filter/InputFilter";
import OptionFilter from "@/components/client-filter/OptionFilter";
import TableWrapper from "@/components/table/TableWrapper";
import TableRow from "@/components/table/TableRow";
import { generateUniqueID } from "@/lib/utils/generateRandomString";
import Paginator from "@/components/pagination/Paginator";
import useAuth from "@/hooks/useAuth";

export default function ManageUsers() {
  
  // dbData format 
  // tabName : [ {row1}, {row2}, ...{rowN}]
 
  const { userType, setUserType } = useAuth();
  
  const dbData = {
    ADMIN: [
      { id: "a1", name: "Principal Mensah", email: "pmensah@school.edu", status: "Active" },
      { id: "a2", name: "Admin Ama", email: "ama@school.edu", status: "Active" },
      { id: "a3", name: "Samuel Boateng", email: "sboateng@school.edu", status: "Inactive" },
      { id: "a4", name: "Esi Nyarko", email: "esi.nyarko@school.edu", status: "Active" },
      { id: "a5", name: "Daniel Owusu", email: "daniel.owusu@school.edu", status: "Suspended" },
      { id: "a6", name: "Martha Appiah", email: "m.appiah@school.edu", status: "Active" },
    ],
    TEACHER: [
      { id: "t1", name: "Mr. Kwabena", email: "kwabena@school.edu", class: "Grade 6A", status: "Active" },
      { id: "t2", name: "Ms. Juliet", email: "juliet@school.edu", class: "Grade 4B", status: "Suspended" },
      { id: "t3", name: "Ms. Juliet", email: "juliet@school.edu", class: "Grade 4B", status: "Suspended" },
    ],
    STUDENT: [
      { id: "s1", name: "Kwame A.", email: "kwame@student.com", class: "Grade 4B", status: "Active" },
      { id: "s2", name: "Akosua D.", email: "akosua@student.com", class: "Grade 6A", status: "Active" },
    ],
    PARENT: [
      { id: "p1", name: "John Doe", email: "john.doe@school.edu", child: "Kwame A.", status: "Active" },
      { id: "p2", name: "Jane Smith", email: "jane.smith@school.edu", child: "Akosua D.", status: "Active" },
    ],
  };
  
  var [filteredData, setFilteredData] = useState(dbData);
 
  var [selectedTab, setSelectedTab] = useState<string>("TEACHER");
  
  
  async function handleFetch () {
    
    const params = new URLSearchParams({ userType: userType, pagination: ""});
    const url = `/api/manage-users${params}`;
    const res = await fetch(url);
    const data = await res.json();
    if (!res.ok) console.log(data)
    
    return data;
  }
  
  return (
    <>
      
      {/* Title */}
      <Title title="User Management"/>

      {/* Tabs Menu */}
      <TabButtonWrapper>
        <TabButton tabName="ADMIN" selected={selectedTab} setSelected={setSelectedTab} >
          Admins</TabButton>
        <TabButton tabName="TEACHER" selected={selectedTab} setSelected={setSelectedTab} >
          Teachers</TabButton>
        <TabButton tabName="STUDENT" selected={selectedTab} setSelected={setSelectedTab} >
          Students</TabButton>
      </TabButtonWrapper>
      
      {/* Filters */}
      <FilterWrapper filterTab="ADMIN" selected={selectedTab}>
        <OptionFilter
          filterTab="ADMIN"
          values={{ status: ["All", "Active", "Inactive", "Suspended"] }}
          originalData={dbData}
          setFilteredData={setFilteredData}
        />
        <OptionFilter
          filterTab="ADMIN"
          values={{ id: ["All", "a1", "a2", "a3"] }}
          originalData={dbData}
          setFilteredData={setFilteredData}
        />
      </FilterWrapper>
      
      <FilterWrapper filterTab="TEACHER" selected={selectedTab}>
        <OptionFilter
          filterTab="TEACHER"
          values={{ status: ["All", "Active", "Inactive", "Suspended"] }}
          originalData={dbData}
          setFilteredData={setFilteredData}
        />
        <OptionFilter
          filterTab="TEACHER"
          values={{ id: ["All", "t1", "t2", "t3"] }}
          originalData={dbData}
          setFilteredData={setFilteredData}
        />
        <InputFilter
          filterTab="TEACHER"
          filterKey="name"
          originalData={dbData}
          setFilteredData={setFilteredData}
        />
      </FilterWrapper>
      
      {/* Info */}
      <TabWrapper>
        <TableWrapper>
          <thead> 
          {
            // @ts-ignore
            filteredData[selectedTab].length > 0 &&
            // @ts-ignore
            <TableRow rowType="HEAD" rowData={filteredData[selectedTab][0]} />
          } 
          </thead>
          <tbody> 
          {
            // @ts-ignore
            filteredData[selectedTab].map(function (item) {
              return <TableRow rowType="DATA" rowData={item} key={ generateUniqueID()}/>;
            })
          } 
          </tbody>
        </TableWrapper>
      </TabWrapper>
      
      {/* <PaginationBar
        totalItems={256}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={(page) => setCurrentPage(page)}
        onItemsPerPageChange={(limit) => {
          setItemsPerPage(limit);
          setCurrentPage(1); // reset to page 1
        }}
      /> */}

    </>   
  );
}
