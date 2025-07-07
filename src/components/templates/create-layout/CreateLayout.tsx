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
import useFileStoreUploader from "@/hooks/useFileStoreUploader";


type CreateLayoutProps = {
  templateTitle: string,
  validateActivity: () => { status: boolean, message: string },
  activityMediaFiles: Map<string, File>;
  finalizeActivity: (fileUrlMap: Map<string, string>) => string,
  children: React.ReactNode
}

export default function CreateLayout(props: CreateLayoutProps) {

  const searchParams = useSearchParams();
  const templateCode = searchParams.get("templateCode") as UserType;
  
  const fileStoreUploader = useFileStoreUploader();
  
  // form data
  const [formData, setFormData] = useState({
    title: "",
    coverImageUrl: "",
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
    if (!formData.coverImageUrl) {
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
  
  function finalizeForm(mediaFileUrls: Map<string, string>,
    activityMediaFileUrls: Map<string, string>): {form: string} {
      
    // form
    const form = {
      ...formData,
      templateCode: templateCode,
      coverImageUrl: mediaFileUrls.get(formData.coverImageUrl),
      activityData: (props.finalizeActivity(activityMediaFileUrls)),
      options: JSON.stringify(formData.options)
    }
  
    return {form: JSON.stringify(form)} 
    
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
    setUploadProgress((prev) => ({...prev, status: "PENDING"}));
    abortSave.current = false;
    
      // files
    const mediaFileUrls = await fileStoreUploader(mediaFiles, abortSave, (progress) => {
      setUploadProgress((prev) => ({...prev, progress}));
    });
    const activityMediaFileUrls = await fileStoreUploader(props.activityMediaFiles, abortSave, (progress) => {
      setUploadProgress((prev) => ({...prev, progress}));
    });
    
    if (abortSave.current === false) {
      setUploadProgress((prev) => ({ ...prev, status: "COMPLETED" }));
      abortSave.current = true;
    } else {
      setUploadProgress((prev) => ({ ...prev, status: "ABORTED" }));
    }
    
      // form
    const form = finalizeForm(mediaFileUrls, activityMediaFileUrls);
    
    const url = `/api/activities`;
    const res = await fetch(url, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
      },
      body: form.form
    })
    
    console.log(await res.json());
    
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
