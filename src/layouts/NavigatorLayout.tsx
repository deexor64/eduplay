"use client"

import { useState } from "react";
import Navbar from "../components/navigator/Navbar";
import Sidebar from "../components/navigator/Sidebar";


export default function NavigatorLayout(props: any) {
  
  const [isOpen, setIsOpen] = useState(true);
  
  return (
    <div className="flex flex-col h-full">
      {/* Nav bar and Spacer for Navbar height */}
      <Navbar/>
      {/* main content */}
      <div className="flex flex-grow" 
        style={{
          backgroundImage: 'url(/images/navigator-background.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Sidebar with passed toggle function */}
        <Sidebar isOpen={isOpen } setIsOpen={setIsOpen}/>
        {/* layout content */}
        <section className={`flex-grow transition-all duration-300
          w-full h-full p-6  ${isOpen ? "ml-50" : "ml-16"}`}>
          {props.children}
        </section>
      </div>
    </div>
  );
}
