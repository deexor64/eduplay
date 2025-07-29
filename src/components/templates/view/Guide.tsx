import React, { useEffect, useState } from "react";

type GuideProps = {
  showGuide: boolean,
  setShowGuide: React.Dispatch<React.SetStateAction<boolean>>,
  resultData: {
    score: {
        baseScore: number;
        maxScore: number;
        summery: string;
    };
    data: any;
  },
};

export default function Guide(props: GuideProps) {

  // Animate guide pop up
  const [animate, setAnimate] = useState(false);
  const [visible, setVisible] = useState(props.showGuide);

  useEffect(() => {
    if (props.showGuide) {
      setVisible(true);
      setTimeout(() => {
        setAnimate(true);
      }, 30);
    } else {
      setAnimate(false);
      setVisible(false);
    }
  }, [props.showGuide]);

  // Guide text
  const [guideText, setGuideText] = useState("");
  
  // Fech guide text
  // Each time result data chnages, the guide gives a guide or hint
  async function fetchGuideText() {

    setGuideText(props.resultData.score.summery);

    // const url = `/api/chatbot/guide`;
    // const res = await fetch(url, {
    //   method: "POST",
    //   headers: { 
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(props.resultData)
    // });
    // const resData = await res.json();
    // setGuideText(resData.data);

  }

  useEffect(() => {
    fetchGuideText();
  }, [props.resultData]);

  if (!visible) return null;

  return (

    <div className="fixed inset-0 w-full h-full pointer-events-auto z-50" onClick={function() { props.setShowGuide(false) }}>
      <div className="absolute top-2 bottom-7 right-8 flex flex-col items-end max-h-[100vh]">
        
        {/* Guide box */}
        <div className="bg-black/30 rounded-2xl shadow-2xl p-8 pr-10 flex flex-col items-end min-w-[400px] max-w-[500px] h-full w-full justify-end"
          style={{backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)"}}
          onClick={function(e) { e.stopPropagation() }}>

          {/* Dialogue box */}
          <div className="flex-1 w-full bg-white/95 rounded-xl px-8 py-5 shadow-md text-[1.1rem] text-[#222] mb-6 overflow-y-auto flex items-start justify-start">
            {/* Dialogue will go here */}
            {guideText}
          </div>
          
          {/* Guide character image */}
          <img
            src="/images/guide.png"
            alt="Guide"
            className={
              "h-[50vh] max-h-[50vh] w-auto self-end transition-transform duration-400" +
              (animate ? " guide-genie-in" : " guide-genie-out")
            }
            style={{}}
          />

        </div>
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

    </div>
  );
} 
