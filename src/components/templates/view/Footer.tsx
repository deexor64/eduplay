import { ActivityViewMode } from "@/components/templates/ViewActivityLayout";


type FooterProps = {
  viewMode: ActivityViewMode,
  setResetActivity: React.Dispatch<React.SetStateAction<boolean>>,
  setResultIndicator: React.Dispatch<React.SetStateAction<boolean>>,
  setAssistantMessage: React.Dispatch<React.SetStateAction<{
    show: boolean,
    text: string,
    mood?: "happy" | "angry" | "sad" | "normal" | "scared" | "confused"
    type?: "normal" | "error" | "success" | "warning" | "info",
    question?: boolean,
    onAnswer?: (answer: boolean) => void,
  }>>,
  handleSubmit: Function,
}

export default function Footer(props: FooterProps) {

  function handleSubmit() {

    props.setAssistantMessage({
      show: true,
      text: "Let's check your answers. Ready ?",
      question: true,
      onAnswer: (answer: boolean) => {
        if (answer) {
          props.handleSubmit();
          return;
        }
        props.setAssistantMessage({show: false, text: ""});
      }
    })
  }
  
  // ISSUE: for progress, activity reset make it reset to progress data, not original activity data
  function handleActivityReset() {

    props.setAssistantMessage({
      show: true,
      text: "Are you sure you want to reset activity ? ",
      question: true,
      onAnswer: (answer: boolean) => {
        if (answer) {
          props.setResetActivity(true);
          props.setResultIndicator(false);
        }
        props.setAssistantMessage({show: false, text: ""});
      }
    })
  }

  return (
    <footer className="sticky bottom-0 left-0 w-full flex flex-col items-center gap-2 p-3 bg-yellow-950/20 backdrop-blur-md 
    shadow-2xl rounded-full z-20">
      <div className="flex gap-3">
        <button
          className="cursor-pointer flex items-center gap-2 font-semibold py-1.5 px-5 rounded-full transition-all duration-75 
          bg-green-600 text-white shadow-[0_4px_0_#15803d] active:shadow-[0_1px_0_#15803d] active:translate-y-[3px] 
          hover:bg-green-700 text-base"
          onClick={() => handleSubmit()}
        >
          {props.viewMode === "VIEW" ? 
            <span>Submit</span>
            : 
            <span>Check</span>
          }
        </button>
        <button
          className="cursor-pointer flex items-center gap-2 font-semibold py-1.5 px-5 rounded-full transition-all duration-75 
          bg-red-500 text-white shadow-[0_4px_0_#b91c1c] active:shadow-[0_1px_0_#b91c1c] active:translate-y-[3px] 
          hover:bg-red-600 text-base"
          onClick={() => handleActivityReset()}
        >
          <span>Reset</span>
        </button>
      </div>
    </footer>
  );
}
