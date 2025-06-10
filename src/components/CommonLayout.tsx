'use client';

import { useState } from "react";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function CommonLayout(props: any) {

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  return (
    <div className="flex flex-col h-min">
      {/* Nav bar and Spacer for Navbar height */}
      <Navbar/>
      <div className="w-full h-16" />
      {/* main content */}
      <div className="flex flex-grow" >
        {/* Sidebar with passed toggle function */}
        <Sidebar toggleSidebar={function() { setIsSidebarOpen(!isSidebarOpen) }} />
        {/* layout content */}
        <section className="flex-grow transition-all duration-300 bg-yellow-100
          w-full h-fit mx-auto p-6"
          style={{ marginLeft: isSidebarOpen ? "12rem" : "4rem" }} >
          {props.children}
        </section>
      </div>
    </div>
  );
}
