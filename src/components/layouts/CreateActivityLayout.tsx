import TemplateTitle from "@/components/templates/create/TemplateTitle";
import ActivityTitle from "@/components/templates/create/ActivityTitle";
import Instructions from "@/components/templates/create/Instructions";
import ActivityOptions from "@/components/templates/create/ActivityOptions";
import Footer from "@/components/templates/create/Footer";
import ActivityUploadProgress from "@/components/templates/ActivityUploadProgress";
import { UserType } from "@/lib/utils/types";
import { useRef, useState } from "react";
import useFileStoreUploader from "@/hooks/useFileStoreUploader";
import { useParams } from "next/navigation";
import { lazy, Suspense, useMemo } from "react";

export interface CreateActivityProps {
  setMediaFiles: React.Dispatch<React.SetStateAction<Map<string, File>>>,
  setActivityValidation: React.Dispatch<React.SetStateAction<{ status: boolean, message: string}>>,
  setActivityFinalizer: React.Dispatch<React.SetStateAction<(fileUrlMap: Map<string, string> | false) => Object>>,
}

export default function CreateActivityLayout() {

  const params = useParams();
  const templateCode = params.templateCode as string;
  
  // dynamically load template using template code
  const CreateActivityComponent = useMemo(() => {
    return lazy(() => import(`@/templates/${templateCode}/Create.tsx`));
  }, [templateCode]);

  // For template -----------------------------------

  // As we are using edge store, the template cannot get a valid url while
  // editing the template. Urls are only generated after submitting the files
  // So the template just save their files temporaly in the state
  const [mediaFiles, setMediaFiles] = useState<Map<string, File>>(new Map());

  // Only the particular template knows how to validate the activity
  // template should validate the activity as it wish and just return the status
  const [activityValidation, setActivityValidation] = useState<{ status: boolean, message: string}>(
    {status: false, message: ""}
  );

  // But only the template knows how to replace the file hashes with the actual urls
  // So we need to upload files first and then pass the media files urls 
  // back to the template and let it replace the file hashes with the actual urls
  // Then it sends the valid activity info as json string (json structure depends on 
  // implementation of individual template)
  // If set false activity data is output without replacing filehashes
  const [activityFinalizer, setActivityFinalizer] = useState<((fileUrlMap: Map<string, string> | false) => Object)>(
    (fileUrlMap: Map<string, string> | false): Object => {return {}}
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
      grade: "ALL",
      difficulty: "EASY",
      subject: "COMMON",
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
    return activityValidation;
    
  }
  
  // Create the final form combining the common and activity specific fields
  // Then return the combined form as a json string
  function activityForm(finalizedActivityData: any): string {
      
    // form
    const form = {
      ...formData,
      activityData: finalizedActivityData,
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
    const finalizedActivityData = activityFinalizer(mediaFileUrls)
    const form = activityForm(finalizedActivityData);
    
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
        <Suspense>
          <CreateActivityComponent
            setMediaFiles={setMediaFiles}
            setActivityValidation={setActivityValidation}
            setActivityFinalizer={setActivityFinalizer}
          />
        </Suspense>

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
