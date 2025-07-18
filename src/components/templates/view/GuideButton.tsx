import React from "react";

/*

  const [showGuide, setShowGuide] = useState(true);

*/

type GuideButtonProps = {
  setShowGuide: React.Dispatch<React.SetStateAction<boolean>>,
}

export default function GuideButton(props: GuideButtonProps) {
  
  function handleClick() {
    props.setShowGuide((prev) => {return !prev});
  }

  return (
    <button
      onClick={handleClick}
      className="fixed right-10 bottom-10 z-[60] w-16 h-16 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-2xl 
      flex items-center justify-center text-2xl transition-all duration-200 border-4 border-white focus:outline-none focus:ring-4 focus:ring-blue-300"
      aria-label="Show Guide"
    >
      <span role="img" aria-label="Guide">💬</span>
    </button>
  );
}
