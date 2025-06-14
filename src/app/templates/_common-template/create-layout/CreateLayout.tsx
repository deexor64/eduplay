import { useState } from "react";
import { generateHash } from "@/utils/generateRandomID";
import TemplateTitle from "./TemplateTitle";
import Title from "@/components/Title";
import ActivityTitle from "./ActivityTitle";
import CoverImage from "./CoverImage";
import Description from "./Description";
import ActivityOptions from "./ActivityOptions";
import Footer from "./Footer";

type ValidateLessonTemplateType = { 
  status: boolean, 
  message: string
} 

type GetLessonTemplateDataType = {
  lessonData: any,
  mediaFiles: any
}

type CreateLayoutProps = {
  templateTitle: string,
  validateLessonTemplate: () => ValidateLessonTemplateType,
  getLessonTemplateData: () => GetLessonTemplateDataType,
  children: React.ReactNode
}

export default function CreateLayout(props: CreateLayoutProps) {
  
  // temporary object to hold template data
  const [formData, setFormData] = useState({
    title: "",
    coverImage: "",
    description: "",
    lessonData: "", // from children
    options: JSON.stringify(
      {
        "timeLimit": 0,
        "isGraded": false
      }
    )
  });
  
  // actual form sent to server
  const [form, setForm] = useState(new FormData());
  
  
  // 
  function appendLessonTemplate() {
    
    let lessonTemplateData = props.getLessonTemplateData();
    
    // form data
    setFormData(function (prev) {
      return {
        ...prev,
        templateData: JSON.stringify(lessonTemplateData.lessonData),
      }
    });
    
    // files
    setForm(function (prev) {
      for (const fileHash in lessonTemplateData.mediaFiles.keys()) {
        prev.append(fileHash, lessonTemplateData.mediaFiles[fileHash]);
      }
      return prev;
    });
    
  }
  
  function validateTemplate(): { status: boolean, message: string } {
  
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
    
    // validate lesson template
    let validT = props.validateLessonTemplate();
    if (!validT.status) {
      return { status: false, message: validT.message };
    }

    appendLessonTemplate();
    
    // save form 
    setForm(function (prev) {
      return {
        title: formData.title,
        coverImage: formData.coverImage,
        description:  formData.description,
        lessonData: formData.lessonData,
        options: formData.options,
        ...prev
      }
    });
    
    console.log(formData);

    return { status: true, message: "" };
    
  }
  
  return (
    
    <div className="max-w-6xl mx-auto p-4 pb-14 bg-blue-100">
      
      {/* template title */}
      <TemplateTitle>{props.templateTitle}</TemplateTitle>

      {/* activity title */}
      <ActivityTitle formData={formData} setFormData={setFormData} />
      
      {/* cover image */}
      <CoverImage formData={formData} setFormData={setFormData}
      form={form} setForm={setForm} />
      
      {/* description */}
      <Description formData={formData} setFormData={setFormData} />
      
      {/* template content */}
      {props.children}

      {/* activity options */}
      <ActivityOptions formData={formData} setFormData={setFormData} />
      
      {/* footer */}
      <Footer validateTemplate={validateTemplate}></Footer>
      
    </div>
    
  );
}
