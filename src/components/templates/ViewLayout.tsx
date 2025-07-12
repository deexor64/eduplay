import ActivityTitle from "./view-layout/ActivityTitle";
import CoverImage from "./view-layout/CoverImage";
import Footer from "./view-layout/Footer";
import Description from "./view-layout/Description";
import { TemplateViewMode } from "@/lib/utils/types";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import cleanParams from "@/lib/utils/cleanParams";
import useAuth from "@/hooks/useAuth";

type ViewLayoutProps = {
  setActivityData: React.Dispatch<React.SetStateAction<any>>,
  getResultData: () => any,
  validateResult: () => { status: boolean, message: string},
  gradeResult: () => { grading: {}, examinerDialog: string },
  children: React.ReactNode
}

export default function ViewLayout(props: ViewLayoutProps) {
  
  const { userType, teacherRole } = useAuth();
  
  const searchParams = useSearchParams();
  const viewMode = searchParams.get("viewMode") as TemplateViewMode;
  const templateCode = searchParams.get("templateCode") as string;
  
  // data recieved from server
  const [dbData, setDbData] = useState<{
    title: string,
    instructions: string,
    coverImageUrl: string,
    activityData: any,
  }>({title: "", instructions: "", coverImageUrl: "", activityData: {}});
  
  function activityQuery(): URLSearchParams {

    // params
    const params = cleanParams({
      templateCode: templateCode,
    });

    return new URLSearchParams(params);
    
  }
  
  async function fetchActivity () {

    // fetch
    const params = activityQuery();
    
    const url = viewMode === "SAMPLE" ? `/api/activities/sample?${params}` 
      : `/api/activities/${templateCode}`;
    const res = await fetch(url);
    
    const resData = await res.json();
    setDbData(resData.data.sampleActivity);
    props.setActivityData(resData.data.sampleActivity.activityData);
    
  }
  
  useEffect(() => {
    fetchActivity();
  }, []);

  // data sent to server
  const [formData, setFormData] = useState({
    resultData: {}, // from children
    gradingData: {},
  });
  
  function validateForm(): { status: boolean, message: string } {
    
    // under devlopment
  
    // no validations for common template
    // validate lesson template
    let validT = props.validateResult();
    if (!validT.status) {
      return validT;
    }
    
    return { status: true, message: "Success" };
    
  }
  
  function finalizeForm(): {form: string, params: URLSearchParams} {
    // under devlopment
    
    // form
    const form = {
      ...formData,
    };
    
    // params
    const params = cleanParams({ 
      userType: userType
    })
    
    return {
      form: JSON.stringify(form),
      params: new URLSearchParams(params)
    }
    
  }
  
  async function handleSubmit () {
    // under devlopment
  
    // validate
    const valid = validateForm();
    console.log(valid);
    
    // submit
    const form = finalizeForm();
    
    const url = `/api/signin?${form.params}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
      },
      body: form.form
    })
 
    const resData = await res.json();
    
  };
  
  
  return (
    
    <div
      className="fixed inset-0 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/activity-background.jpg')", 
        backgroundAttachment: "fixed"}} >
      {/* Narrator overlay placeholder */}
      <div id="narrator-overlay" className="absolute inset-0 w-full h-full pointer-events-none z-10" />
      <div className="max-w-6xl mx-auto h-full overflow-y-auto p-4 pb-4 backdrop-blur-xs 
        bg-transparent">
        
        
        {/* cover image */}
        <CoverImage coverImageUrl={ dbData.coverImageUrl } >
          
          {/* activity title */}
          <ActivityTitle viewMode={viewMode} templateCode={templateCode}>
            { dbData.title }</ActivityTitle>
          
          {/* description */}
          <Description>{ dbData.instructions }</Description>
          
        </CoverImage>
  
        
  
        {/* activity content */}
        {props.children}
        
        {/* footer */}
        <Footer viewMode={viewMode} validateTemplate={props.validateResult}/>
        
      </div>
    </div>
  );
}
