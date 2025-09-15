export default function PandaFace(props: any) {
  
  const { isEmailFocused } = props;
  
  return (
    <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[8.4rem] h-[7.5rem] bg-white border-[0.18rem] border-[#2e0d30] rounded-[7.5rem_7.5rem_5.62rem_5.62rem] z-10">
      {/* Blush Left */}
      <div className="absolute top-16 left-4 w-5 h-4 bg-[#ff8bb1] rounded-full transform rotate-25 z-20"></div>
      {/* Blush Right */}
      <div className="absolute top-16 right-4 w-5 h-4 bg-[#ff8bb1] rounded-full transform -rotate-25 z-20"></div>
      {/* Eye Left */}
      <div className="absolute top-[2.18rem] left-[1.37rem] w-8 h-[2.18rem] bg-[#3f3554] rounded-full transform -rotate-20 z-30">
        <div
          className="absolute w-[0.6rem] h-[0.6rem] bg-white rounded-full transition-all duration-1000"
          style={{
            left: isEmailFocused ? '0.75rem' : '0.6rem',
            top: isEmailFocused ? '1.12rem' : '0.6rem',
            transform: 'rotate(20deg)',
          }}
        ></div>
      </div>
      {/* Eye Right */}
      <div className="absolute top-[2.18rem] right-[1.37rem] w-8 h-[2.18rem] bg-[#3f3554] rounded-full transform rotate-20 z-30">
        <div
          className="absolute w-[0.6rem] h-[0.6rem] bg-white rounded-full transition-all duration-1000"
          style={{
            right: isEmailFocused ? '0.75rem' : '0.6rem',
            top: isEmailFocused ? '1.12rem' : '0.6rem',
            transform: 'rotate(-20deg)',
          }}
        ></div>
      </div>
      {/* Nose */}
      <div className="absolute top-[4.37rem] left-1/2 -translate-x-1/2 w-4 h-4 bg-[#3f3554] rounded-[1.2rem_0_0_0.25rem] transform rotate-45 z-20">
        <div className="absolute top-3 left-4 w-[0.1rem] h-[0.6rem] bg-[#3f3554] transform -rotate-45"></div>
      </div>
      {/* Mouth */}
      <div className="absolute top-[5.31rem] left-[3.12rem] w-[0.93rem] h-[0.75rem] bg-transparent rounded-full shadow-[0_0.18rem_#3f3554]">
        <div className="absolute left-[0.87rem] w-[0.93rem] h-[0.75rem] bg-transparent rounded-full shadow-[0_0.18rem_#3f3554]"></div>
      </div>
    </div>
  )
}
