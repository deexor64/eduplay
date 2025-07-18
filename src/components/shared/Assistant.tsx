import React, { useEffect, useState } from "react";

// Assistant is used to show system wide help messages to user.
// Assistant is basically a replacement to regular notification feedback.

/*

  const [showAssistant, setShowAssistant] = useState<boolean>(true);
  const [assistantMessage, setAssistantMessage] = useState<{
    text: string,
    mood?: "happy" | "angry" | "sad" | "normal" | "scared" | "confused"
  }>({text: "", mood: "normal"});

*/

type AssistantProps = {
  showAssistant: boolean,
  setShowAssistant: React.Dispatch<React.SetStateAction<boolean>>,
  message: {
    text: string,
    mood?: "happy" | "angry" | "sad" | "normal" | "scared" | "confused"
    type?: "normal" | "error" | "success" | "warning" | "info"
  },
};

export default function Assistant(props: AssistantProps) {
  // Animate guide pop up
  const [animate, setAnimate] = useState(false);
  const [visible, setVisible] = useState(props.showAssistant);

  useEffect(() => {
    if (props.showAssistant) {
      setVisible(true);
      setTimeout(() => {
        setAnimate(true);
      }, 30);
    } else {
      setAnimate(false);
      setVisible(false);
    }
  }, [props.showAssistant]);

  if (!visible) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
        style={{ WebkitBackdropFilter: "blur(4px)", backdropFilter: "blur(4px)" }}
        onClick={function() { props.setShowAssistant(false); }}
      />

      {/* Message box at top center */}
      <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center">
        <div className="bg-white/95 rounded-xl shadow-lg px-10 py-6 flex items-center gap-4 max-w-2xl min-w-[350px] border border-gray-200">
          <span className="text-2xl font-semibold text-gray-900 text-center" style={{ lineHeight: 1.3 }}>
            {props.message.text}
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
          style={{}}
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
