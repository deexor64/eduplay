import React from "react";

type CelebrationProps = {
  showCelebration: boolean,
  setShowCelebration: React.Dispatch<React.SetStateAction<boolean>>,
  score: {
    baseScore: number,
    maxScore: number,
    summery: string
  }
};

export default function Celebration(props: CelebrationProps) {

  var isPerfect = props.score.baseScore === props.score.maxScore;
  var isAboveHalf = props.score.baseScore >= 0.5 * props.score.maxScore && props.score.baseScore < props.score.maxScore;
  var isBelowHalf = props.score.baseScore < 0.5 * props.score.maxScore;

  var confettiCount = isPerfect ? 40 : 12;
  var confettiColors = isPerfect
    ? ["bg-yellow-400", "bg-pink-400", "bg-green-400", "bg-blue-400", "bg-red-400"]
    : ["bg-gray-300", "bg-blue-200", "bg-green-200", "bg-yellow-200"];

  var message = "";
  var messageColor = "";
  if (isPerfect) {
    message = "🎉 Congratulations! 🎉";
    messageColor = "text-green-600";
  } else if (isAboveHalf) {
    message = "👏 Well done! Keep pushing for the top!";
    messageColor = "text-blue-500";
  } else if (isBelowHalf) {
    message = "💪 Keep practicing! You can do it!";
    messageColor = "text-yellow-600";
  }

  function handleClose() {
    props.setShowCelebration(false);
  }

  if (!props.showCelebration) return null;

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "transparent" }} onClick={handleClose}>
      
      {/* Confetti animation: only show if score is at least 50% */}
      { !isBelowHalf && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(confettiCount)].map(function(_, i) {
            var color = confettiColors[i % confettiColors.length];
            var left = Math.random() * 100;
            var delay = Math.random() * 1.5;
            var duration = 1.5 + Math.random() * 1.5;
            return (
              <div
                key={i}
                className={"absolute w-2 h-2 rounded-full " + color}
                style={{
                  left: left + "%",
                  top: "-10px",
                  animation: `fall ${duration}s ${delay}s linear forwards`
                }}
              />
            );
          })}
          <style jsx global>{`
            @keyframes fall {
              0% { transform: translateY(0); opacity: 1; }
              80% { opacity: 1; }
              100% { transform: translateY(90vh); opacity: 0; }
            }
          `}</style>
        </div>
      )}

      {/* Celebration content */}
      <div className="relative bg-white rounded-2xl shadow-2xl px-12 py-10 flex flex-col items-center max-w-md w-full text-center" onClick={function(e) { e.stopPropagation(); }}>
        <div className={"text-4xl font-bold mb-2 " + messageColor}>{message}</div>
        <div className="text-2xl font-semibold text-gray-800 mb-4">You scored</div>
        <div className="text-5xl font-extrabold text-blue-600 mb-2">
          {props.score.baseScore} / {props.score.maxScore}
        </div>
        <div className="text-lg text-gray-700 mb-4">{props.score.summery}</div>
        <button
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
          onClick={function(e) { e.stopPropagation(); handleClose(); }}
        >
          Close
        </button>
      </div>

    </div>
  );
}
