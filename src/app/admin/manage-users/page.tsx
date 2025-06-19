"use client";

import React, { useState } from "react";
import Title from "@/components/Title";
import TabButton from "@/components/tab/TabButton";
import TabButtonWrapper from "@/components/tab/TabButtonWrapper";
import TabWrapper from "@/components/tab/TabWrapper";
import FilterWrapper from "@/components/filter/FilterWrapper";
import InputFilter from "@/components/filter/InputFilter";
import OptionFilter from "@/components/filter/OptionFilter";
import TableWrapper from "@/components/table/TableWrapper";
import TableRow from "@/components/table/TableRow";
import { generateUniqueID } from "@/lib/utils/generateRandomString";

export default function ManageUsers() {
  
  // dbData format 
  // tabName : [ {row1}, {row2}, ...{rowN}]
  
  const dbData = {
    admin: [
      { id: "a1", name: "Principal Mensah", email: "pmensah@school.edu", status: "Active" },
      { id: "a2", name: "Admin Ama", email: "ama@school.edu", status: "Active" },
      { id: "a3", name: "Samuel Boateng", email: "sboateng@school.edu", status: "Inactive" },
      { id: "a4", name: "Esi Nyarko", email: "esi.nyarko@school.edu", status: "Active" },
      { id: "a5", name: "Daniel Owusu", email: "daniel.owusu@school.edu", status: "Suspended" },
      { id: "a6", name: "Martha Appiah", email: "m.appiah@school.edu", status: "Active" },
    ],
    teacher: [
      { id: "t1", name: "Mr. Kwabena", email: "kwabena@school.edu", class: "Grade 6A", status: "Active" },
      { id: "t2", name: "Ms. Juliet", email: "juliet@school.edu", class: "Grade 4B", status: "Suspended" },
      { id: "t3", name: "Ms. Juliet", email: "juliet@school.edu", class: "Grade 4B", status: "Suspended" },
    ],
    student: [
      { id: "s1", name: "Kwame A.", email: "kwame@student.com", class: "Grade 4B", status: "Active" },
      { id: "s2", name: "Akosua D.", email: "akosua@student.com", class: "Grade 6A", status: "Active" },
    ]
  };
  
  var [filteredData, setFilteredData] = useState(dbData);
 
  var [selectedTab, setSelectedTab] = useState<string>("teacher");
  
  return (
    <>
      
      {/* Title */}
      <Title title="User Management"/>

      {/* Tabs Menu */}
      <TabButtonWrapper>
        <TabButton tabName="admin" selected={selectedTab} setSelected={setSelectedTab} >
          Admins</TabButton>
        <TabButton tabName="teacher" selected={selectedTab} setSelected={setSelectedTab} >
          Teachers</TabButton>
        <TabButton tabName="student" selected={selectedTab} setSelected={setSelectedTab} >
          Students</TabButton>
      </TabButtonWrapper>
      
      {/* Filters */}
      <FilterWrapper filterTab="admin" selected={selectedTab}>
        <OptionFilter
          filterTab="admin"
          values={{ status: ["All", "Active", "Inactive", "Suspended"] }}
          originalData={dbData}
          setFilteredData={setFilteredData}
        />
        <OptionFilter
          filterTab="admin"
          values={{ id: ["All", "a1", "a2", "a3"] }}
          originalData={dbData}
          setFilteredData={setFilteredData}
        />
      </FilterWrapper>
      
      <FilterWrapper filterTab="teacher" selected={selectedTab}>
        <OptionFilter
          filterTab="teacher"
          values={{ status: ["All", "Active", "Inactive", "Suspended"] }}
          originalData={dbData}
          setFilteredData={setFilteredData}
        />
        <OptionFilter
          filterTab="teacher"
          values={{ id: ["All", "t1", "t2", "t3"] }}
          originalData={dbData}
          setFilteredData={setFilteredData}
        />
        <InputFilter
          filterTab="teacher"
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
            <TableRow rowType="head" rowData={filteredData[selectedTab][0]} />
          } 
          </thead>
          <tbody> 
          {
            // @ts-ignore
            filteredData[selectedTab].map(function (item) {
              return <TableRow rowType="data" rowData={item} key={ generateUniqueID()}/>;
            })
          } 
          </tbody>
        </TableWrapper>
      </TabWrapper>

    </>   
  );
}
