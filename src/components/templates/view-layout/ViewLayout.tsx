import ActivityTitle from "./ActivityTitle";
import CoverImage from "./CoverImage";
import Footer from "./Footer";
import Description from "./Description";
import { TemplateViewMode, UserType } from "@/lib/utils/types";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { dmmfToRuntimeDataModel } from "@prisma/client/runtime/library";
import cleanParams from "@/lib/utils/cleanParams";

type ViewLayoutProps = {
  setDbData: Function,
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
      userType: userType,
    });

    return new URLSearchParams(params);
    
  }
  
  async function handleFetch () {

    // fetch
    const params = finalizeFetchQuery();
    
    const url = `/api/school-management/view-activity?${params}`;
    const res = await fetch(url);
    
    console.log(res.body);
    setDbData(JSON.parse(await res.json()));
  
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
  
    // no validations for common template
    // validate lesson template
    let validT = props.validateResult();
    if (!validT.status) {
      return validT;
    }
    
    return { status: true, message: "Success" };
    
  }
  
  function finalizeForm(): {form: string, params: URLSearchParams} {
    
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
    
    // ----- new
    const resData = await res.json();
    console.log(resData);
    setDbData(JSON.parse(resData.data));
    
  };
  
  
  return (
    
    <div className="max-w-6xl mx-auto p-4 pb-14 bg-blue-100">
      
      {/* activity title */}
      { 
        userType === "TEACHER" && viewMode === "INSPECT" ?
        <ActivityTitle goToTemplate={true}> { dbData.title }</ActivityTitle>
        : <ActivityTitle goToTemplate={false}> { dbData.title }</ActivityTitle>
      }
      
      {/* cover image */}
      <CoverImage coverImage={ dbData.coverImageUrl} />

      {/* description */}
      <Description>{ dbData.description }</Description>

      {/* activity content */}
      {props.children}
      
      {/* footer */}
      {
        ["ADMIN", "TEACHER"].includes(userType) && 
        <Footer validateTemplate={props.validateResult}/>
      }
      {
        userType === "STUDENT" &&
        <Footer validateTemplate={props.validateResult}/>
      }
      
    </div>
  );
}


// samle db dbData
// 
// {
//   activityID: "1",
//   templateName: "1-SortItems-tmpl",
//   title: "Sort object",
//   coverImage: "1746025057700_cute-giraffe.jpg",
//   description:
//     "🧠 Drag and drop each item into the correct basket below.\nMake sure every item is sorted before you submit.",
//   activityData: [
//     {
//       title: "Animals",
//       items: [
//         { type: "text", value: "Cat" },
//         { type: "image", value: "test-images/giraffe.jpg", label: "Jiraffe" },
//       ],
//     },
//     {
//       title: "Vegetables",
//       items: [
//         { type: "text", value: "Carrot" },
//         { type: "text", value: "Potatoe" },
//       ],
//     },
//   ],
//   options: {
//     timeLimit: 0,
//     isGraded: false,
//   },
// };
