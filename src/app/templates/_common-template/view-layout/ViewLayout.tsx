import { useState } from "react";
import ActivityTitle from "./ActivityTitle";
import CoverImage from "./CoverImage";
import Footer from "./Footer";

type ViewLayoutProps = {
  dbData: any,
  gradeActivity?: Function
  children: React.ReactNode
}

export default function ViewLayout(props: ViewLayoutProps) {
  
  return (
    
    <div className="max-w-6xl mx-auto p-4 pb-14 bg-blue-100">
      
      {/* activity title */}
      <ActivityTitle>{ props.dbData.title }</ActivityTitle>

      {/* cover image */}
      <CoverImage coverImage={ props.dbData.coverImage} />

      {/* description */}
      <section className="mb-6 bg-white p-4 rounded-xl shadow-sm">
        <p className="text-lg text-gray-700">
          {props.dbData.description}
        </p>
      </section>

      {/* activity content */}
      {props.children}
      
      {/* footer */}
      <Footer></Footer>
      
    </div>
  );
}
