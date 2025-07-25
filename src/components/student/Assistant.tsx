import React, { useEffect, useState } from "react";

// Assistant is used to show system wide help messages to user.
// Assistant is basically a replacement to regular notification feedback.

/*

  const [assistantMessage, setAssistantMessage] = useState<{
    show: boolean,
    text: string,
    mood?: "happy" | "angry" | "sad" | "normal" | "scared" | "confused",
    type?: "normal" | "error" | "success" | "warning" | "info",
    question?: boolean,
    onAnswer?: (answer: boolean) => void,
  }>({show: false, text: ""});

*/

export type AssistantProps = {
  assistantMessage: {
    show: boolean,
    text: string,
    mood?: "happy" | "angry" | "sad" | "normal" | "scared" | "confused"
    type?: "normal" | "error" | "success" | "warning" | "info",
    question?: boolean,
    onAnswer?: (answer: boolean) => void,
  },
  setAssistantMessage: React.Dispatch<React.SetStateAction<{
    show: boolean,
    text: string,
    mood?: "happy" | "angry" | "sad" | "normal" | "scared" | "confused"
    type?: "normal" | "error" | "success" | "warning" | "info",
    question?: boolean,
    onAnswer?: (answer: boolean) => void,
  }>>,
};

export default function Assistant(props: AssistantProps) {
  
  // Animate guide pop up
  const [animate, setAnimate] = useState(false);
  const [visible, setVisible] = useState(props.assistantMessage.show);
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    if (props.assistantMessage.show) {
      setVisible(true);
      setAnswered(false);
      setTimeout(() => {
        setAnimate(true);
      }, 30);
    } else {
      setAnimate(false);
      setVisible(false);
    }
  }, [props.assistantMessage.show]);

  // Only allow closing if not a question or already answered
  function handleOverlayClick() {
    if (!props.assistantMessage.question || answered) {
      props.setAssistantMessage({...props.assistantMessage, show: false});
    }
  }

  function handleAnswer(answer: boolean) {
    setAnswered(true);
    if (props.assistantMessage.onAnswer) props.assistantMessage.onAnswer(answer);
  }

  if (!visible) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
        style={{ WebkitBackdropFilter: "blur(1px)", backdropFilter: "blur(1px)" }}
        onClick={handleOverlayClick}
      />

      {/* Message box at top center */}
      <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center">
        <div className="bg-gradient-to-br from-pink-100 via-blue-100 to-yellow-100 rounded-3xl shadow-2xl px-12 py-8 flex items-center gap-4 max-w-2xl min-w-[350px] border-2 border-pink-200">
          <span className="text-2xl font-bold text-blue-900 text-center font-[Comic Sans MS, Comic Sans, cursive]" style={{ lineHeight: 1.4 }}>
            {props.assistantMessage.text}
            {props.assistantMessage.question && !answered && (
              <span className="ml-6 inline-flex gap-4 mt-4">
                <button
                  className="flex items-center gap-2 bg-green-400 hover:bg-green-500 active:bg-green-600 text-white text-lg font-bold py-2 px-6 rounded-full shadow-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-200 border-2 border-green-300"
                  onClick={function() { handleAnswer(true) }}
                >
                  <span role="img" aria-label="Yes">👍</span> Yes
                </button>
                <button
                  className="flex items-center gap-2 bg-red-400 hover:bg-red-500 active:bg-red-600 text-white text-lg font-bold py-2 px-6 rounded-full shadow-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-red-200 border-2 border-red-300"
                  onClick={function() { handleAnswer(false) }}
                >
                  <span role="img" aria-label="No">👎</span> No
                </button>
              </span>
            )}
          </span>
        </div>
      </div>

      {/* Assistant character at bottom left */}
      <div className="fixed bottom-10 left-20 z-50 p-6 flex items-end">
        <img
          src="/images/assistant-normal.png"
          alt="Assistant"
          className={
            "h-[70vh] max-h-[680px] w-auto transition-transform duration-400" +
            (animate ? " guide-genie-in" : " guide-genie-out")
          }
        />
      </div>

      {/* Genie animation CSS */}
      <style jsx global>{`
        .guide-genie-in {
          animation: guide-genie-in-anim 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .guide-genie-out {
          animation: guide-genie-out-anim 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes guide-genie-in-anim {
          0% {
            opacity: 0;
            transform: translate(-60px, 60px) scale(0.3);
          }
          70% {
            opacity: 1;
            transform: translate(10px, -10px) scale(1.05);
          }
          100% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
          }
        }
        @keyframes guide-genie-out-anim {
          0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(-60px, 60px) scale(0.3);
          }
        }
      `}</style>
    </>
  );
} 
