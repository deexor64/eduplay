export default function PandaHand(props: any) {
  
  const { isPasswordFocused } = props;

  return (
    <>
      {/* Left Hand */}
      <div
        className={`absolute w-[2.5rem] bg-[#3f3554] border-[0.18rem] border-[#2e0d30] rounded-[0.6rem_0.6rem_2.18rem_2.18rem] transition-all duration-1000 z-100 ${
          isPasswordFocused
            ? 'h-[6.56rem] top-[3.87rem] left-[11.75rem] transform -rotate-[155deg]'
            : 'h-[2.81rem] top-[8.4rem] left-[7.5rem] transform rotate-0'
        }`}
      ></div>
      {/* Right Hand */}
      <div
        className={`absolute w-[2.5rem] bg-[#3f3554] border-[0.18rem] border-[#2e0d30] rounded-[0.6rem_0.6rem_2.18rem_2.18rem] transition-all duration-1000 z-100 ${
          isPasswordFocused
            ? 'h-[6.56rem] top-[3.87rem] right-[11.75rem] transform rotate-[155deg]'
            : 'h-[2.81rem] top-[8.4rem] right-[7.5rem] transform rotate-0'
        }`}
      ></div>
    </>
  );
};
