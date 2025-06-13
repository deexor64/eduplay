"use client";

import React, { useState } from "react";
import Table, { Row } from "@/components/view-data/table/Table";
import Tab, { TabButton, TabButtons} from "@/components/view-data/Tab";
import Title from "@/components/view-data/Title";
import Filters, { InputFilter, OptionFilter } from "@/components/view-data/filter/Filters";
import { generateUniqueID } from "@/utils/generateRandomID";

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
      <TabButtons>
        <TabButton tabName="admin" selected={selectedTab} setSelected={setSelectedTab} >
          Admins</TabButton>
        <TabButton tabName="teacher" selected={selectedTab} setSelected={setSelectedTab} >
          Teachers</TabButton>
        <TabButton tabName="student" selected={selectedTab} setSelected={setSelectedTab} >
          Students</TabButton>
      </TabButtons>
      
      {/* Filters */}
      <Filters filterTab="admin" selected={selectedTab}>
        <OptionFilter
          filterTab="admin"
          values={{ status: ["All", "Active", "Inactive", "Suspended"] }}
          dbData={dbData}
          filteredData={filteredData}
          setFilteredData={setFilteredData}
        />
        <OptionFilter
          filterTab="admin"
          values={{ id: ["All", "a1", "a2", "a3"] }}
          dbData={dbData}
          filteredData={filteredData}
          setFilteredData={setFilteredData}
        />
      </Filters>
      
      <Filters filterTab="teacher" selected={selectedTab}>
        <OptionFilter
          filterTab="teacher"
          values={{ status: ["All", "Active", "Inactive", "Suspended"] }}
          dbData={dbData}
          filteredData={filteredData}
          setFilteredData={setFilteredData}
        />
        <OptionFilter
          filterTab="teacher"
          values={{ id: ["All", "t1", "t2", "t3"] }}
          dbData={dbData}
          filteredData={filteredData}
          setFilteredData={setFilteredData}
        />
        <InputFilter
          filterTab="teacher"
          filterKey="name"
          dbData={dbData}
          filteredData={filteredData}
          setFilteredData={setFilteredData}
        />
      </Filters>
      
      {/* Info */}
      <Tab>
        <Table>
          <thead> 
          {
            // @ts-ignore
            filteredData[selectedTab].length > 0 &&
            // @ts-ignore
            <Row rowType="head" rowData={Object.keys(filteredData[selectedTab][0])} />
          } 
          </thead>
          <tbody> 
          {
            // @ts-ignore
            filteredData[selectedTab].map(function (item) {
              return <Row rowType="data" rowData={Object.values(item)} key={ generateUniqueID()}/>;
            })
          } 
          </tbody>
        </Table>
      </Tab>

    </>   
  );
}
