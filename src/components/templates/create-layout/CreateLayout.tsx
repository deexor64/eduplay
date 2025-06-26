import TemplateTitle from "./TemplateTitle";
import Title from "@/components/Title";
import ActivityTitle from "./ActivityTitle";
import CoverImage from "./CoverImage";
import Description from "./Description";
import ActivityOptions from "./ActivityOptions";
import Footer from "./Footer";
import { UserType } from "@/lib/utils/types";
import UploadProgressBar from "@/components/uploader/UploadProgressBar";
import { useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import cleanParams from "@/lib/utils/cleanParams";
import { useEdgeStore } from '@/lib/edgestore';
import { abort } from "process";



type CreateLayoutProps = {
  templateTitle: string,
  validateActivity: () => { status: boolean, message: string},
  getActivityData: () => { activityData: any, mediaFiles: Map<string, File> },
  children: React.ReactNode
}

export default function CreateLayout(props: CreateLayoutProps) {

  const searchParams = useSearchParams();
  const templateCode = searchParams.get("templateCode") as UserType;
  
  const edgestore = useEdgeStore();
  
  // form data
  const [formData, setFormData] = useState({
    title: "",
    coverImage: "",
    description: "",
    activityData: {}, // from children
    options: {
      timeLimit: 0,
      isGraded: false
    }
  });
  
  // media files
  const [mediaFiles, setMediaFiles] = useState<Map<string, File>>(new Map());
  
  // validate
  function validateForm(): { status: boolean, message: string } {
  
    // validate common form
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
    
    // validate activity form
    let validT = props.validateActivity();
    if (!validT.status) {
      return { status: false, message: validT.message };
    }

    return { status: true, message: "Success" };
    
  }
  
  function finalizeForm(): {form: string, files: Map<string, File>, 
    params: URLSearchParams} {
    
    // params
    const params = cleanParams({
      userType: "TEACHER",
    });
    
    // form
    const activityData = props.getActivityData();
    
    const form = {
      ...formData,
      templateCode: templateCode,
      activityData: activityData.activityData,
    }
    
    // files
    const files = new Map<string, File>();
  
    for (const fileHash of mediaFiles.keys()) {
      const file = mediaFiles.get(fileHash);
      if (file) files.set(fileHash, file);
    }
    
    for (const fileHash of activityData.mediaFiles.keys()) {
      const file = activityData.mediaFiles.get(fileHash);
      if (file) files.set(fileHash, file);
    }
    
    return {form: JSON.stringify(form), files: files, 
      params: new URLSearchParams(params)} 
    
  }
  
  const [uploadProgress, setUploadProgress] = useState({
    progress: 0,
    status: "NONE",
  });
  const abortSave = useRef(true);
  
  async function handleSubmit () {
    
    // validate
    const valid = validateForm();
    console.log(valid);
    if (!valid.status) return;
    
    // submit with progress
    const form = finalizeForm();
    
    const url = `/api/school-management/create-activity?${form.params}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
      },
      body: form.form
    })
    
    // edge store
    const files = form.files;
    const abortController = new AbortController();
    
    setUploadProgress((prev) => ({...prev, status: "PENDING"}));
    abortSave.current = false;
    
    for (const fileHash of files.keys()) {
      
      const file = files.get(fileHash);
      if (!file) continue;
      
      const res = await edgestore.edgestore.publicFiles.upload({
        file,
        onProgressChange: (progress) => {
          if (abortSave.current === true) abortController.abort();// abort while uploading
          setUploadProgress((prev) => ({...prev, progress: progress}));
        },
        signal: abortController.signal,
      });
      
      console.log(res)
      
    }
    
    if (abortSave.current === false) {
      abortSave.current = true;
      setUploadProgress({ progress: 100, status: "COMPLETED" });
    }
    
  };
  
  return (
  
    <div className="max-w-6xl mx-auto p-4 pb-14 bg-blue-100">
      
      {/* template title */}
      <TemplateTitle>{props.templateTitle}</TemplateTitle>
      
      {/* activity title */}
      <ActivityTitle setFormData={setFormData} />
      
      {/* cover image */}
      <CoverImage setFormData={setFormData} setMediaFiles={setMediaFiles} />
      
      {/* description */}
      <Description setFormData={setFormData} />
      
      {/* template content */}
      {props.children}

      {/* activity options */}
      <ActivityOptions setFormData={setFormData} />
      
      {/* footer */}
      <Footer handleSubmit={handleSubmit}></Footer>
      
      {/* upload progress */}
      <UploadProgressBar uploadProgress={uploadProgress} setUploadProgress={setUploadProgress}
      abortSave={abortSave}/>
      
    </div>
    
  );
}
