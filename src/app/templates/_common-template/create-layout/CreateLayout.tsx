import TemplateTitle from "./TemplateTitle";
import Title from "@/components/Title";
import ActivityTitle from "./ActivityTitle";
import CoverImage from "./CoverImage";
import Description from "./Description";
import ActivityOptions from "./ActivityOptions";
import Footer from "./Footer";
import { useState } from "react";
import { generateHash } from "@/lib/utils/generateRandomString";

type CreateLayoutProps = {
  templateTitle: string,
  validateActivity: () => { status: boolean, message: string},
  getActivityData: () => { templateName: string, activityData: any, mediaFiles: any },
  children: React.ReactNode
}

export default function CreateLayout(props: CreateLayoutProps) {
  
  // data sent to server 
  const [formData, setFormData] = useState({
    templateName: "",
    title: "",
    coverImage: "",
    description: "",
    activityData: {}, // from children
    options: JSON.stringify({
      timeLimit: 0,
      isGraded: false
    })
  });
  
  // actual form sent to server
  const [form, setForm] = useState(new FormData());
  

  function validateActivity(): { status: boolean, message: string } {
  
    // validate common template
    if (!formData.title) {
      return { status: false, message: "Title is required." };
    }
    if (!formData.coverImage) {
      return { status: false, message: "Cover Image is required." };
    }
    if (!formData.description) {
      return { status: false, message: "Description is required." };
    } 
    if (!formData.options) {
      return { status: false, message: "Options are required." };
    }
    
    // validate activity template
    let validT = props.validateActivity();
    if (!validT.status) {
      return { status: false, message: validT.message };
    }

    return { status: true, message: "" };
    
  }
  
  function finalizeActivity() {
    
    let activityData = props.getActivityData();
    
    // static info
    setForm(function (prev) {
      return {
        title: formData.title,
        coverImage: formData.coverImage,
        description:  formData.description,
        templateName: activityData.templateName,
        activityData: JSON.stringify(activityData.activityData),
        options: formData.options,
        ...prev
      }
    });
    
    // files
    setForm(function (prev) {
      for (const fileHash in activityData.mediaFiles.keys()) {
        prev.append(fileHash, activityData.mediaFiles[fileHash]);
      }
      return prev;
    });
    
  }
  
  return (
    
    <div className="max-w-6xl mx-auto p-4 pb-14 bg-blue-100">
      
      {/* template title */}
      <TemplateTitle>{props.templateTitle}</TemplateTitle>

      {/* activity title */}
      <ActivityTitle setFormData={setFormData} />
      
      {/* cover image */}
      <CoverImage setFormData={setFormData} setForm={setForm} />
      
      {/* description */}
      <Description setFormData={setFormData} />
      
      {/* template content */}
      {props.children}

      {/* activity options */}
      <ActivityOptions setFormData={setFormData} />
      
      {/* footer */}
      <Footer validateActivity={validateActivity}></Footer>
      
    </div>
    
  );
}
