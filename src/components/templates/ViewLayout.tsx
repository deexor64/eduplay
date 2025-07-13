"use client";

import ActivityTitle from "./view-layout/ActivityTitle";
import CoverImage from "./view-layout/CoverImage";
import Footer from "./view-layout/Footer";
import Description from "./view-layout/Description";
import Narrator from "./view-layout/Narrator";
import { TemplateViewMode } from "@/lib/utils/types";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import cleanParams from "@/lib/utils/cleanParams";
import useAuth from "@/hooks/useAuth";


type ViewLayoutProps = {
  viewActivityComponent: React.LazyExoticComponent<React.ComponentType<any>>;
}

export default function ViewLayout(props: ViewLayoutProps) {
  
  const { userType, teacherRole } = useAuth();
  
  const searchParams = useSearchParams();
  const viewMode = searchParams.get("viewMode") as TemplateViewMode;
  const templateCode = searchParams.get("templateCode") as string;
  const activityCode = searchParams.get("activityCode") as string;
  
  // Data recieved from server
  // This object is used by subcomponents to display the data
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
      : `/api/activities/${activityCode}`;
    const res = await fetch(url);
    
    const resData = await res.json();
    setDbData(resData.data.sampleActivity);

  }

  useEffect(() => {
    fetchActivity();
  }, []);
  
  
  // For activity -----------------------------------

  const [activityData, setActivityData] = useState<any>();
  const [resultValidator, setResultValidator] = useState<Function>(
    () => {return {status: false, message: ""}}
  );
  const [resultGrader, setResultGrader] = useState<Function>(
    () => {return {grading: {}, examinerDialog: "", impression: "HELP"}}
  );
  const [resultData, setResultData] = useState<any>();

  useEffect(() => {
    setActivityData(dbData.activityData);
  }, [dbData]);

  // ------------------------------------------------

  // data sent to server
  const [formData, setFormData] = useState({
    resultData: {}, // from children
    gradingData: {},
  });

  
  function validateResultForm(): { status: boolean, message: string } {
    
    // under devlopment
  
    // no validations for common template
    // validate lesson template
    let validT = resultValidator();
    if (!validT.status) {
      return validT;
    }
    
    return { status: true, message: "Success" };
    
  }
  
  function resultForm(): {form: string, params: URLSearchParams} {
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
    const valid = validateResultForm();
    console.log(valid);
    
    // submit
    const form = resultForm();
    
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


  // narrator
  const [showNarrator, setShowNarrator] = useState(false);
  
  
  return (
    
    <div
      className="fixed inset-0 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/activity-background.jpg')", 
        backgroundAttachment: "fixed"}} >
      
      {/* Narrator overlay */}
      <Narrator isVisible={showNarrator} zIndex={50}>
        {/* Narrator content will go here */}
      </Narrator>
      
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
        {activityData ? <props.viewActivityComponent 
          activityData={activityData} 
          setResultValidator={setResultValidator} 
          setResultGrader={setResultGrader} 
          setResultData={setResultData} /> 
          : (
            <div className="flex items-center justify-center p-8">
              <div className="text-lg text-gray-600">Loading activity data...</div>
            </div>
          )
        }
        
        {/* footer */}
        <Footer viewMode={viewMode} validateTemplate={resultValidator}/>
        
      </div>
    </div>
  );
}
