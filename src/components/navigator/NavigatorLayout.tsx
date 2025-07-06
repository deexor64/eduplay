"use client"

import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";


export default function NavigatorLayout(props: any) {
  
  const [isOpen, setIsOpen] = useState(true);
  
  return (
    <div className="flex flex-col h-full">
      {/* Nav bar and Spacer for Navbar height */}
      <Navbar/>
      {/* main content */}
      <div className="flex flex-grow" >
        {/* Sidebar with passed toggle function */}
        <Sidebar isOpen={isOpen } setIsOpen={setIsOpen}/>
        {/* layout content */}
        <section className={`flex-grow transition-all duration-300 bg-yellow-100
          w-full h-full p-6  ${isOpen ? "ml-50" : "ml-18"}`}>
          {props.children}
        </section>
      </div>
    </div>
  );
}
