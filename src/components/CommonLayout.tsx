'use client';

import { useState } from "react";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function CommonLayout(props: any) {

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  function toggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen);
  }

  return (
    <div className="flex flex-col h-min">
      {/* Nav bar and Spacer for Navbar height */}
      <Navbar/>
      <div className="w-full h-16" />
      {/* main content */}
      <div className="flex flex-grow" >
        {/* Sidebar with passed toggle function */}
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        {/* layout content */}
        <section className="flex-grow transition-all duration-300 bg-sky-300
          max-w-6xl mx-auto p-6"
          style={{ marginLeft: isSidebarOpen ? "12rem" : "4rem" }} >
          {props.children}
        </section>
      </div>
    </div>
  );
}
