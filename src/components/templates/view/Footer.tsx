import { ActivityViewMode, ActivityViewModeEnum, UserType } from "@/lib/utils/types";

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
      text: "Are you sure you want to submit? ",
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
    <footer className="sticky bottom-0 left-0 w-full flex flex-col items-center gap-2 p-3 bg-white/30 backdrop-blur-md shadow-2xl rounded-full z-20">
      <div className="flex gap-3">
        <button
          className="flex items-center gap-2 font-semibold py-1.5 px-5 rounded-full transition bg-green-600 text-white hover:bg-green-700 shadow text-base"
          onClick={() => handleSubmit()}
        >
          {
            props.viewMode === ActivityViewModeEnum.VIEW ? 
            <span>Submit</span>
            : 
            <span>Check</span>
          }
        </button>
        <button
          className="flex items-center gap-2 font-semibold py-1.5 px-5 rounded-full transition bg-red-500 text-white hover:bg-red-600 shadow text-base"
          onClick={() => handleActivityReset()}
        >
          <span>Reset</span>
        </button>
      </div>
    </footer>
  );
}