import { useState } from "react";
import ActivityTitle from "./ActivityTitle";
import CoverImage from "./CoverImage";
import Footer from "./Footer";
import Description from "./Description";

type ViewLayoutProps = {
  dbData: any,
  getResultData: () => any,
  validateResult: () => { status: boolean, message: string},
  gradeResult: () => { grading: {}, examinerDialog: string },
  children: React.ReactNode
}

export default function ViewLayout(props: ViewLayoutProps) {
  
  // data recieved from server
  const dbData = props.dbData;
  
  // data sent to server
  const [formData, setFormData] = useState({
    activityID: dbData.activityID,
    resultData: {}, // from children
    gradingData: {},
  });
  
  // actual form sent to server
  const [form, setForm] = useState(new FormData());
  
  function validateResult(): { status: boolean, message: string } {
    
    // no validations for common template

    // validate lesson template
    let validT = props.validateResult();
    if (!validT.status) {
      return validT;
    }
    
    return { status: true, message: "" };
    
  }
  
  function finalizeResult() {
    
    // static info
    setForm(function (prev) {
      return {
        activityID: formData.activityID,
        resultData: JSON.stringify(props.getResultData()),
        gradingData: JSON.stringify(props.gradeResult()),
        ...prev
      }
    });
    
  }
  
  
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
      <Footer />
      
    </div>
  );
}
