import { useState } from "react";
import ActivityTitle from "./ActivityTitle";
import CoverImage from "./CoverImage";
import Footer from "./Footer";
import Description from "./Description";

type ViewLayoutProps = {
  dbData: any,
  gradeLesson: () => { status: boolean, message: string},
  getLessonData: () => any,
  children: React.ReactNode
}

export default function ViewLayout(props: ViewLayoutProps) {
  
  // actual form sent to server
  const [form, setForm] = useState(new FormData());
  
  function validateTemplate(): { status: boolean, message: string } {

    // validate lesson template
    let validT = props.gradeLesson();
    if (!validT.status) {
      return validT;
    }
    
  // append lesson template data to form
    setForm(function (prev) {
      return {
        lessonData: props.getLessonData(),
        ...props.dbData,
      }
    });
    
    console.log(form);

    return validT;
    
  }
  
  return (
    
    <div className="max-w-6xl mx-auto p-4 pb-14 bg-blue-100">
      
      {/* activity title */}
      <ActivityTitle>{ props.dbData.title }</ActivityTitle>

      {/* cover image */}
      <CoverImage coverImage={ props.dbData.coverImage} />

      {/* description */}
      <Description>{ props.dbData.description }</Description>

      {/* activity content */}
      {props.children}
      
      {/* footer */}
      <Footer validateTemplate={validateTemplate}></Footer>
      
    </div>
  );
}
