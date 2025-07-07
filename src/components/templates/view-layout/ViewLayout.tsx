import ActivityTitle from "./ActivityTitle";
import CoverImage from "./CoverImage";
import Footer from "./Footer";
import Description from "./Description";
import { TemplateViewMode, UserType } from "@/lib/utils/types";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { dmmfToRuntimeDataModel } from "@prisma/client/runtime/library";
import cleanParams from "@/lib/utils/cleanParams";
import { faClose } from "@fortawesome/free-solid-svg-icons";

type ViewLayoutProps = {
  setActivityData: React.Dispatch<React.SetStateAction<any>>,
  getResultData: () => any,
  validateResult: () => { status: boolean, message: string},
  gradeResult: () => { grading: {}, examinerDialog: string },
  children: React.ReactNode
}

export default function ViewLayout(props: ViewLayoutProps) {
  
  const searchParams = useSearchParams();
  const userType = searchParams.get("userType") as UserType;
  const viewMode = searchParams.get("viewMode") as TemplateViewMode;
  const templateCode = searchParams.get("templateCode") as string;
  
  // data recieved from server
  const [dbData, setDbData] = useState<{
    title: string,
    description: string,
    coverImageUrl: string,
    activityData: any,
  }>({title: "", description: "", coverImageUrl: "", activityData: {}});
  
  function finalizeFetchQuery(): URLSearchParams {

    // params
    const params = cleanParams({
      templateCode: templateCode,
    });

    return new URLSearchParams(params);
    
  }
  
  async function handleFetch () {

    // fetch
    const params = finalizeFetchQuery();
    
    const url = viewMode === "SAMPLE" ? `/api/activities/sample?${params}` 
      : `/api/activities/${templateCode}?${params}`;
    const res = await fetch(url);
    
    const resData = await res.json();
    setDbData(resData.data.sampleActivity);
    props.setActivityData(resData.data.sampleActivity.activityData);
    
  }
  
  useEffect(() => {
    handleFetch();
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
    
    <div className="max-w-6xl mx-auto p-4 pb-14 bg-blue-100">
      
      {/* activity title */}
      <ActivityTitle viewMode={viewMode} templateCode={templateCode}>
        { dbData.title }</ActivityTitle>

      {/* cover image */}
      <CoverImage coverImageUrl={ dbData.coverImageUrl } />

      {/* description */}
      <Description>{ dbData.description }</Description>

      {/* activity content */}
      {props.children}
      
      {/* footer */}
      <Footer viewMode={viewMode} validateTemplate={props.validateResult}/>
      
    </div>
  );
}
