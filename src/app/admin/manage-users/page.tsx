"use client";

import React, { useState } from "react";
import Table, { Row } from "@/components/view-data/Table";
import Tabs, { Tab } from "@/components/view-data/Tabs";
import Title from "@/components/view-data/Title";


export default function ManageUsers() {

  var [selectedTab, setSelectedTab] = useState("Teachers");

  var users: any = {
    Admins: [
      { id: "a1", name: "Principal Mensah", email: "pmensah@school.edu", status: "Active" },
      { id: "a2", name: "Admin Ama", email: "ama@school.edu", status: "Active" },
    ],
    Teachers: [
      { id: "t1", name: "Mr. Kwabena", email: "kwabena@school.edu", class: "Grade 6A", status: "Active" },
      { id: "t2", name: "Ms. Juliet", email: "juliet@school.edu", class: "Grade 4B", status: "Suspended" },
    ],
    Parents: [
      { id: "p1", name: "Mrs. Sarpong", email: "sarpong@gmail.com", status: "Active" },
      { id: "p2", name: "Mr. Boateng", email: "boateng@yahoo.com", status: "Active" },
    ],
    Students: [
      { id: "s1", name: "Kwame A.", email: "kwame@student.com", class: "Grade 4B", status: "Active" },
      { id: "s2", name: "Akosua D.", email: "akosua@student.com", class: "Grade 6A", status: "Active" },
    ]
  };


  return (
    <>
      {/* Title */}
      <Title title="User Management"/>

      {/* Tabs Menu */}
      <Tabs>
        <Tab tabName="Admins" selected={selectedTab} setSelected={setSelectedTab} >
          Admins</Tab>
        <Tab tabName="Teachers" selected={selectedTab} setSelected={setSelectedTab} >
          Teachers</Tab>
        <Tab tabName="Students" selected={selectedTab} setSelected={setSelectedTab} >
          Students</Tab>
      </Tabs>
      
      {/* Filters */}
      <></>
      
      {/* Info */}
      {selectedTab == "Admins" && (
        <Table>
          <Row RowType="head" RowData={["adfuidv", "hsvdey"]} />
          <Row RowType="data" RowData={["fuck", "hey"]} />
        </Table>)
      }
      {selectedTab == "Teachers" && (
        <Table>
          <Row RowType="head" RowData={["fuck", "hey"]}/>
          <Row RowType="data" RowData={["fuck", "hey"]}/>
        </Table>)
      }
      
    </>
    
  );
}
