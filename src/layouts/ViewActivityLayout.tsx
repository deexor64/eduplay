"use client";

import ActivityTitle from "@/components/templates/view/ActivityTitle";
import CoverImage from "@/components/templates/view/CoverImage";
import Footer from "@/components/templates/view/Footer";
import Description from "@/components/templates/view/Description";
import Narrator from "@/components/templates/view/Narrator";
import NarratorButton from "@/components/templates/view/NarratorButton";
import { TemplateViewMode } from "@/lib/utils/types";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import cleanParams from "@/lib/utils/cleanParams";
import useAuth from "@/hooks/useAuth";


type ViewActivityLayoutProps = {
  viewActivityComponent: React.LazyExoticComponent<React.ComponentType<any>>;
}

export default function ViewActivityLayout(props: ViewActivityLayoutProps) {
  
  const { userType, teacherRole } = useAuth();
  
  const searchParams = useSearchParams();
  const viewMode = searchParams.get("viewMode") as TemplateViewMode;
  const templateCode = searchParams.get("templateCode") as string;
  const activityID = searchParams.get("activityID") as string;
  
  // Data recieved from server
  // This object is used by subcomponents to display the data
  const [dbData, setDbData] = useState<{
    title: string,
    instructions: string,
    activityData: any,
    timeLimit: number,
    difficulty: string,
    subject: string,
    grade: number,
    isGraded: boolean,
    status: string,
  }>({title: "", instructions: "", activityData: {}, timeLimit: 0, difficulty: "", subject: "", grade: 0, isGraded: false, status: ""});
  

  // Only used for fetching a sample activity
  function activityQuery(): URLSearchParams {

    // params
    const params = cleanParams({
      templateCode: templateCode,
      activityId: activityID,
    });

    return new URLSearchParams(params);
    
  }
  
  // Fetch activity data from server
  // Activity can be a smaple activity included in Template itself
  // or an activity created by teacher
  // or a progress of an activity made by student
  // or a preview activiy stored in sessionStorage for temporary view
  async function fetchActivity () {

    // fetch
    const params = activityQuery();

    // view mode is "SAMPLE"
    if (viewMode === "SAMPLE") {
      const url = `/api/activities/sample?${params}`;
      const res = await fetch(url);
      const resData = await res.json();
      setDbData(resData.data.sampleActivity);
    } 
    // view mode is "VIEW"
    else if (viewMode === "VIEW") {
      const url = `/api/activities/${activityID}`;
      const res = await fetch(url);
      const resData = await res.json();
      setDbData({...resData.data, 
        activityData: JSON.parse(resData.data.activityData)});
    }
    // view mode is "PROGRESS"
    else {
      // const url = `/api/activities/progress?${params}`;
      // const res = await fetch(url);
      // const resData = await res.json();
      // setDbData(resData.data);
    }

  }

  useEffect(() => {
    fetchActivity();
  }, []);
  
  
  // For activity -----------------------------------

  // This is the data that is used by the viewActivityComponent
  const [activityData, setActivityData] = useState<any>();

  // Result validation logic is specific to each template
  // The function just returns the correct validation message
  // Function doens't grade and score the activity
  // Only validations like if the student have completed the activity before submission etc
  const [resultValidator, setResultValidator] = useState<Function>(
    () => {return {status: false, message: ""}}
  );

  // Gives the score and grading of the activity based on the current state of the activity
  // Grading is used as the score and an input to the narrator to give a feedback
  const [resultGrader, setResultGrader] = useState<Function>(
    () => {return {grading: {}, examinerDialog: "", impression: "HELP"}}
  );

  // This function just give the current state of the activity
  // It is used to restore the activity state for viewing progress
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
    <>ViewActivityLayout
      <div className="fixed inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/activity-background.jpg')", backgroundAttachment: "fixed"}} >
        
        {/* Narrator */}
        { showNarrator && 
          <Narrator showNarrator={showNarrator} text="Hello, how are you?" /> 
        }
        
        <div className="max-w-6xl mx-auto h-full overflow-y-auto p-4 pb-4 backdrop-blur-xs bg-transparent">
          
          {/* cover image */}
          <CoverImage templateCode={templateCode}>
            {/* activity title */}
            <ActivityTitle viewMode={viewMode} templateCode={templateCode}>
              { dbData.title }
            </ActivityTitle>
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

      {/* Narrator toggle button  */}
      <NarratorButton setShowNarrator={setShowNarrator}/>
     
    </>
  );

}
