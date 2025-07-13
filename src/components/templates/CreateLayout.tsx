import TemplateTitle from "./create-layout/TemplateTitle";
import ActivityTitle from "./create-layout/ActivityTitle";
import Instructions from "./create-layout/Instructions";
import ActivityOptions from "./create-layout/ActivityOptions";
import Footer from "./create-layout/Footer";
import ActivityUploadProgress from "./ActivityUploadProgress";
import { UserType } from "@/lib/utils/types";
import { useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import useFileStoreUploader from "@/hooks/useFileStoreUploader";

type CreateLayoutProps = {
  createActivityComponent: React.LazyExoticComponent<React.ComponentType<any>>;
}

export default function CreateLayout(props: CreateLayoutProps) {

  const searchParams = useSearchParams();
  const viewMode = searchParams.get("viewMode") as UserType;
  const templateCode = searchParams.get("templateCode") as UserType;


  // For template -----------------------------------

  // Only the particular template knows how to validate the activity
  // template should validate the activity as it wish and just return the status
  const [activityValidator, setActivityValidator] = useState<Function>(
    () => { return {status: false, message: ""} }
  );

  // As we are using edge store, the template cannot get a valid url while
  // editing the template. Urls are only generated after submitting the files
  // So the template just save their files temporaly in the state
  const [mediaFiles, setMediaFiles] = useState<Map<string, File>>(new Map());

  // But only the template knows how to replace the file hashes with the actual urls
  // So we need to upload files first and then pass the media files urls 
  // back to the template and let it replace the file hashes with the actual urls
  // Then it sends the valid activity info as json string (json structure depends on 
  // implementation of individual template)
  // If set false activity data is output without replacing filehashes
  const [activityFinerlizer, setActivityFinerlizer] = useState<Function>(
    (fileUrlMap: Map<string, File> | false): string => {return ""}
  );

  // ------------------------------------------------
  
  // fileStore handler
  const fileStoreUploader = useFileStoreUploader();
  
  // Activity is stored in this format.
  // Options have default values unless changed by the user 
  // and they get flattend to the top level at the server
  // This object is used by subcomponents to add their values
  const [formData, setFormData] = useState({
    templateCode: templateCode,
    title: "",
    instructions: "",
    activityData: "",
    options: {
      timeLimit: 0,
      isGraded: false,
      grade: 1,
      difficulty: 1,
    }
  });
  
  
  // Common fields like title, instructions are validated as well as 
  // the activity specific fields
  function validateActivityForm(): { status: boolean, message: string } {
  
    // validate common fields
    if (!formData.title) {
      return { status: false, message: "Title is required." };
    }
    if (!formData.instructions) {
      return { status: false, message: "Instructions are required." };
    }
    
    // validate activity
    return activityValidator();
    
  }
  
  // Create the final form combining the common and activity specific fields
  // Then return the combined form as a json string
  function activityForm(mediaFileUrls: Map<string, string>): string {
      
    // form
    const form = {
      ...formData,
      activityData: activityFinerlizer(mediaFileUrls),
    }
  
    return JSON.stringify(form);
    
  }
  
  // Needed by the uploader component
  const [uploadProgress, setUploadProgress] = useState({
    progress: 0,
    status: "NONE",
  });
  const abortSave = useRef(true);
  

  // Validations are called inside
  // If validations fails user is notified and the form is not submitted
  async function handleSubmit () {
    
    // validate
    const valid = validateActivityForm();
    console.log(valid);
    if (!valid.status) return; // display message
    
    // set progress to pending
    setUploadProgress({ progress: 0, status: "PENDING"});
    abortSave.current = false;
    
    // send any media files from the state to the edge store
    // then take their urls and pass it to the activityFinerlizer
    const mediaFileUrls = await fileStoreUploader(mediaFiles, abortSave, (progress) => {
      setUploadProgress((prev) => ({...prev, progress}));
    });
    
    // Detect if upload was finished by completion or abort
    if (abortSave.current) {
      setUploadProgress((prev) => ({ ...prev, status: "ABORTED" }));
      return;
    }
    
    // send the form data
    const form = activityForm(mediaFileUrls);
    
    const url = `/api/activities`;
    const res = await fetch(url, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
      },
      body: form
    })
    
    const resData = await res.json();
    console.log(resData) // display message

    // if not okay setUploadProgress({ ...prev, status: "ERROR" });

    setUploadProgress({ progress: 100, status: "COMPLETED" });
    abortSave.current = true;
    
  };
  
  return (
  
    <div className="fixed inset-0 bg-cover bg-center overflow-y-auto"
      style={{ backgroundImage: "url('/images/activity-background.jpg')", 
        backgroundAttachment: "fixed"}} >
      
      <div className="max-w-6xl mx-auto h-full overflow-y-auto p-4 pb-4 backdrop-blur-xs 
        bg-transparent">
        
        {/* template title */}
        <TemplateTitle templateCode={templateCode}>{templateCode}</TemplateTitle>
        
        {/* activity title */}
        <ActivityTitle setFormData={setFormData} />
        
        {/* instructions */}
        <Instructions setFormData={setFormData} />
        
        {/* template content */}
        {<props.createActivityComponent
          setActivityValidator={setActivityValidator}
          setMediaFiles={setMediaFiles}
          setActivityFinerlizer={setActivityFinerlizer}
        />}

        {/* activity options */}
        <ActivityOptions setFormData={setFormData} />
        
        {/* footer */}
        <Footer handleSubmit={handleSubmit}></Footer>
        
      </div>
      
      {/* upload progress */}
      <ActivityUploadProgress uploadProgress={uploadProgress} setUploadProgress={setUploadProgress}
      abortSave={abortSave}/>
      
    </div>
    
  );
}
