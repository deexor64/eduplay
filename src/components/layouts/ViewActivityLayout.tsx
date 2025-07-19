"use client";

import ActivityTitle from "@/components/templates/view/ActivityTitle";
import CoverImage from "@/components/templates/view/CoverImage";
import Footer from "@/components/templates/view/Footer";
import Description from "@/components/templates/view/Description";
import Guide from "@/components/templates/view/Guide";
import Celebration from "@/components/templates/view/Celebration";
import GuideButton from "@/components/templates/view/GuideButton";
import { ActivityViewMode } from "@/lib/utils/types";
import { useEffect, useState } from "react";
import cleanParams from "@/lib/utils/cleanParams";
import useAuth from "@/hooks/useAuth";
import Assistant from "@/components/shared/Assistant";
import { useParams } from "next/navigation";
import { lazy, Suspense, useMemo } from "react";

type ViewActivityLayoutProps = {
  viewMode: ActivityViewMode
}

export interface ViewActivityProps {
  activityData: any;
  setResultValidation: React.Dispatch<React.SetStateAction<{ status: boolean, message: string}>>,
  setResultData: React.Dispatch<React.SetStateAction<{
    score: {
      baseScore: number,
      maxScore: number,
      summery: string,
    },
    data: any
  }>>,
}

export default function ViewActivityLayout(props: ViewActivityLayoutProps) {
  
  const { userType, teacherRole } = useAuth();

  const params = useParams();
  const templateCode = params.templateCode as string;
  const activityID = params.activityID as string;

  const [showAssistant, setShowAssistant] = useState<boolean>(false);
  const [assistantMessage, setAssistantMessage] = useState<{
    text: string,
    mood?: "happy" | "angry" | "sad" | "normal" | "scared" | "confused",
    type?: "normal" | "error" | "success" | "warning" | "info"
  }>({text: ""});
  
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
    templateCode: string,
  }>({title: "", instructions: "", activityData: {}, timeLimit: 0, difficulty: "", subject: "", grade: 0, isGraded: false, status: "", templateCode: ""});
  

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
    if (props.viewMode === "SAMPLE") {
      const url = `/api/activities/sample?${params}`;
      const res = await fetch(url);
      const resData = await res.json();
      setDbData(resData.data.sampleActivity);
    } 
    // view mode is "VIEW"
    else if (props.viewMode === "VIEW") {
      const url = `/api/activities/${activityID}`;
      const res = await fetch(url);
      const resData = await res.json();
      setDbData(resData.data);
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

  // dynamically load template using template code
  const ViewActivityComponent = useMemo(() => {
    return lazy(() => import(`@/templates/${dbData.templateCode}/View.tsx`));
  }, [dbData.templateCode]);
  
  
  // For activity -----------------------------------

  // This is the data that is used by the viewActivityComponent
  const [activityData, setActivityData] = useState<any>();

  // The function just returns the correct validation message
  // Function doens't grade and score the activity
  // Only validations like if the student have completed the activity before submission etc
  const [resultValidation, setResultValidation] = useState<{ status: boolean, message: string}>(
    {status: false, message: ""}
  );

  // This function just give the current state of the activity and the scoring
  // It is used to restore the activity state for viewing progress
  const [resultData, setResultData] = useState<{
    score: { baseScore: number, maxScore: number, summery: string },
    data: any
  }>(
    {score: { baseScore: 0, maxScore: 0, summery: "" }, data: {}}
  );

  useEffect(() => {
    setActivityData(dbData.activityData);
  }, [dbData]);

  // ------------------------------------------------

  // Guide
  const [showGuide, setShowGuide] = useState(false);

  // Celebration
  const [showCelebration, setShowCelebration] = useState(false);

  // data sent to server
  // under devlopment
  const [formData, setFormData] = useState({
    activityID: activityID,
    score: {
      baseScore: 0,
      maxScore: 0,
      summery: ""
    },
    data: {},
    timeTaken: 0,
  });

  
  function validateResultForm(): { status: boolean, message: string } {
    
    // under devlopment
  
    // validations for common template

    // validate lesson template
    let validT = resultValidation;
    if (!validT.status) return validT;
    
    return { status: true, message: "Success" };
    
  }
  
  function resultForm(): string {
    
    // form
    const form = {
      ...formData,
      ...resultData,
    };
    
    return JSON.stringify(form);
    
  }
  
  async function handleSubmit () {
    // under devlopment
  
    // validate and show assistant message
    const valid = validateResultForm();
    if (!valid.status) {
      setAssistantMessage({text: valid.message});
      setShowAssistant(true);
      return;
    }
    
    // submit
    const form = resultForm();
    
    // Progress is saved only for graded activities
    if (dbData.isGraded) { 

      const url = `/api/progress`;
      const res = await fetch(url, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: form
      })

      const resData = await res.json();
      setAssistantMessage({text: resData.data});
      setShowAssistant(true);

    }
    
    // Celebration is shown regardless of graded or not
    setShowCelebration(true);
    
  };

  
  return (
    <>
      <div className="fixed inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/activity-background.jpg')", backgroundAttachment: "fixed"}} >
        
        <div className="max-w-6xl mx-auto h-full overflow-y-auto p-4 pb-4 backdrop-blur-xs bg-transparent">
          
          {/* cover image */}
          <CoverImage templateCode={dbData.templateCode}>
            {/* activity title */}
            <ActivityTitle viewMode={props.viewMode} templateCode={dbData.templateCode}>
              { dbData.title }
            </ActivityTitle>
            {/* description */}
            <Description>{ dbData.instructions }</Description>
          </CoverImage>
          
          {/* activity content */}
          <Suspense>
          {activityData ? <ViewActivityComponent
            activityData={activityData} 
            setResultValidation={setResultValidation}
            setResultData={setResultData} /> 
            : (
              <div className="flex items-center justify-center p-8">
                <div className="text-lg text-gray-600">Loading activity data...</div>
              </div>
            )
          }
          </Suspense>

          {/* footer */}
          <Footer viewMode={props.viewMode} handleSubmit={handleSubmit} />
        
        </div>

        {/* Assistant */}
        { showAssistant && 
          <Assistant showAssistant={showAssistant} setShowAssistant={setShowAssistant} 
            message={assistantMessage} /> 
        }

        {/* Guide */}
        { showGuide && 
          <Guide showGuide={showGuide} setShowGuide={setShowGuide} 
          resultData={resultData}/> 
        }

        {/* Celebration */}
        { showCelebration && 
          <Celebration showCelebration={showCelebration} setShowCelebration={setShowCelebration}
            score={resultData.score}/>
        }

      </div>

      {/* Guide toggle button  */}
      <GuideButton setShowGuide={setShowGuide} />
     
    </>
  );

}
