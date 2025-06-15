import ActivityTitle from "./ActivityTitle";
import CoverImage from "./CoverImage";
import Description from "./Description";
import Footer from "./Footer";
import { useState } from "react";

type PreviewLayoutProps = {
  dbData: any,
  children: React.ReactNode
}

export default function ViewLayout(props: PreviewLayoutProps) {
  
  // data recieved from server
  const dbData = props.dbData;
  
  return (
    
    <div className="max-w-6xl mx-auto p-4 pb-14 bg-blue-100">
      
      {/* activity title */}
      <ActivityTitle> { dbData.title }</ActivityTitle>

      {/* cover image */}
      <CoverImage coverImage={ dbData.coverImage} />

      {/* description */}
      <Description>{ dbData.description }</Description>

      {/* activity content */}
      {props.children}
      
      {/* footer */}
      {/* <Footer validateTemplate={validateTemplate}></Footer> */}
      
    </div>
    
  );
}
