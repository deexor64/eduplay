"use client";

import ActivityTitle from "@/components/templates/view/ActivityTitle";
import CoverImage from "@/components/templates/view/CoverImage";
import Footer from "@/components/templates/view/Footer";
import Instructions from "@/components/templates/view/Instructions";
import Guide from "@/components/templates/view/Guide";
import Celebration from "@/components/templates/view/Celebration";
import GuideButton from "@/components/templates/view/GuideButton";
import { useEffect, useState } from "react";
import cleanParams from "@/lib/utils/cleanParams";
import useAuth from "@/hooks/useAuth";
import Assistant from "@/components/student/Assistant";
import { useParams } from "next/navigation";
import { lazy, Suspense, useMemo } from "react";

type ViewActivityLayoutProps = {
  viewMode: "VIEW" | "SAMPLE" | "PROGRESS" | "PREVIEW"
}

export interface ViewActivityProps {
  activityData: any;
  resetActivity: boolean;
  resultIndicator: boolean;
  setResetActivity: React.Dispatch<React.SetStateAction<boolean>>;
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
  const progressID = params.progressID as string;

  // Assistant 
  const [assistantMessage, setAssistantMessage] = useState<{
    show: boolean,
    text: string,
    mood?: "happy" | "angry" | "sad" | "normal" | "scared" | "confused",
    type?: "normal" | "error" | "success" | "warning" | "info",
    question?: boolean,
    onAnswer?: (answer: boolean) => void,
  }>({show: false, text: ""});
  
  // Guide
  const [showGuide, setShowGuide] = useState(false);

  // Celebration
  const [showCelebration, setShowCelebration] = useState(false);
  
  // Data recieved from server
  // This object is used by subcomponents to display the data
  const [dbData, setDbData] = useState<{
    title: string,
    instructions: string,
    activityData: any,
    difficulty: string,
    subject: string,
    grade: number,
    isScored: boolean,
    status: string,
    templateCode: string,
    topic: string,
  }>({title: "", instructions: "", activityData: {}, difficulty: "", subject: "", grade: 0, isScored: false,
     status: "", templateCode: "", topic: ""});
  

  // Only used for fetching a sample activity
  function activityQuery(): URLSearchParams {

    // params
    const params = cleanParams({
      templateCode: templateCode,
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
      const res = await fetch(`/api/templates/sample?${params}`);
      const resData = await res.json();
      setDbData(resData.data.sampleActivity);
    } 
    // view mode is "VIEW"
    else if (props.viewMode === "VIEW" || props.viewMode === "PREVIEW") {
      const res = await fetch(`/api/activities/${activityID}`);
      const resData = await res.json();
      setDbData(resData.data);
    }
    // view mode is "PROGRESS"
    else {
      const res = await fetch(`/api/progress/${progressID}`);
      const resData = await res.json();
      // Construct activity state for progress
      setDbData(resData.data.activity)
      setResultData({
        score: resData.data.score,
        data: resData.data.data
      })
      
      // Show celebration at first for the progress
      setShowCelebration(true);

    }

  }

  useEffect(() => {
    fetchActivity();
  }, []);

  // dynamically load template using template code
  const ViewActivityComponent = useMemo(() => {
    if (!dbData.templateCode) return null;
    return lazy(() => import(`@/templates/${dbData.templateCode}/View.tsx`));
  }, [dbData.templateCode]);
  
  
  // For activity -----------------------------------

  // This is the data that is used by the viewActivityComponent
  const [activityData, setActivityData] = useState<any>();

  // This is used to reset the activity data
  const [resetActivity, setResetActivity] = useState<boolean>(false);

  // The function just returns the correct validation message
  // Function doens't grade and score the activity
  // Only validations like if the student have completed the activity before submission etc
  const [resultValidation, setResultValidation] = useState<{ status: boolean, message: string}>(
    {status: false, message: ""}
  );
  
  // When toggled this enables visual indication in activity elements
  const [resultIndicator, setResultIndicator] = useState<boolean>(false);

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

  // data sent to server
  // under devlopment
  const [formData, setFormData] = useState({
    activityID: activityID,
  });

  
  function validateResultForm(): { status: boolean, message: string } {

    // No validations for common template

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
  
  // Submit is invoked from footer
  // TODO: Implement result indicator for submit
  async function handleSubmit () {

    // validate and show assistant message
    const valid = validateResultForm();
    if (!valid.status) {
      // Assitant opened from footer is used here 
      setAssistantMessage({show: true, text: valid.message});
      return;
    }
    
    // progress or sample or preview cannot be submitted back
    // If forcefully submitted backend validation fails because,
    // Progress and Sample: doesn't contain activityID
    // Preview: is used by teacher and teacher usertype is rejected for progress
    // Also an acitivty cannot be submitted twice regardless of view mode
    if (props.viewMode !== "VIEW") {
      // Assistant is set to true from footer before invoking submit
      // so it must be closed, then celebrate
      setAssistantMessage({show: false, text: ""});
      setResultIndicator(true);
      setShowCelebration(true);
      return;
    }
    
    // Assistant opened by footer is not required from here
    setAssistantMessage({show: false, text: ""});
    
    // submit
    const form = resultForm();
    
    // Progress is saved only for graded activities
    if (dbData.isScored) { 

      const url = `/api/progress`;
      const res = await fetch(url, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: form
      })

      const resData = await res.json();

      if (resData.status) {
        setResultIndicator(true);
        setShowCelebration(true);
        setTimeout(() => {
          setShowCelebration(false);
          setAssistantMessage({show: true, text: resData.data});
        }, 4000)
      } else {
        setAssistantMessage({show: true, text: resData.data});
      }
      
      return;

    }
    
    // Celebration is shown regardless of graded or not
    setResultIndicator(true); 
    setShowCelebration(true);
    
  };

  
  return (
    <>
      <div className="fixed inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/templates/${templateCode || dbData.templateCode}/activity-background.jpeg')`, backgroundAttachment: "fixed"}} >
        
        <div className="max-w-6xl mx-auto h-full overflow-y-auto p-4 pb-4 backdrop-blur-xs bg-transparent">
          
          {/* cover image */}
          <CoverImage templateCode={dbData.templateCode}>
            {/* activity title */}
            <ActivityTitle viewMode={props.viewMode} templateCode={templateCode || dbData.templateCode}>
              { `${dbData.topic ? `${dbData.topic}:` : ""} ${dbData.title}` }
            </ActivityTitle>
            {/* description */}
            <Instructions infoTags={dbData}>{ dbData.instructions }</Instructions>
          </CoverImage>

          {/* Activity content */}
          <Suspense>
          {activityData && ViewActivityComponent ? <ViewActivityComponent
            activityData={activityData}
            resetActivity={resetActivity}
            setResetActivity={setResetActivity}
            setResultValidation={setResultValidation}
            resultIndicator={resultIndicator}
            setResultData={setResultData} /> 
            : (
              <div className="flex items-center justify-center p-8">
                <div className="text-lg text-gray-600">Loading activity...</div>
              </div>
            )
          }
          </Suspense>

          {/* footer */}
          <Footer viewMode={props.viewMode} setResetActivity={setResetActivity} 
          setResultIndicator={setResultIndicator} setAssistantMessage={setAssistantMessage} handleSubmit={handleSubmit} />
        
        </div>

        {/* Assistant */}
        {/* Shown for notifications and error messages */}
        { assistantMessage.show && 
          <Assistant assistantMessage={assistantMessage} setAssistantMessage={setAssistantMessage} /> 
        }

        {/* Guide */}
        {/* Not available for progress and scored activities */}
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
      { ((props.viewMode === "VIEW" || props.viewMode === "PREVIEW") && (!dbData.isScored)) &&
        <GuideButton setShowGuide={setShowGuide} />
      }
     
    </>
  );

}
