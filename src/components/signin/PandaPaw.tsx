export default function PandaPaw() {
  return (
    <>
      {/* Left Paw */}
      <div className="absolute top-[30rem] left-[10rem] w-[3.12rem] h-[3.12rem] bg-[#3f3554] border-[0.18rem] border-[#2e0d30] rounded-[2.5rem_2.5rem_1.2rem_1.2rem] z-100">
        <div className="absolute top-[1.12rem] left-[0.55rem] w-[1.75rem] h-[1.37rem] bg-white rounded-[1.56rem_1.56rem_0.6rem_0.6rem]"></div>
        <div className="absolute top-[0.31rem] left-[1.12rem] w-2 h-2 bg-white rounded-full shadow-[0.87rem_0.37rem_#ffffff,-0.87rem_0.37rem_#ffffff]"></div>
      </div>
      {/* Right Paw */}
      <div className="absolute top-[30rem] right-[10rem] w-[3.12rem] h-[3.12rem] bg-[#3f3554] border-[0.18rem] border-[#2e0d30] rounded-[2.5rem_2.5rem_1.2rem_1.2rem] z-100">
        <div className="absolute top-[1.12rem] left-[0.55rem] w-[1.75rem] h-[1.37rem] bg-white rounded-[1.56rem_1.56rem_0.6rem_0.6rem]"></div>
        <div className="absolute top-[0.31rem] left-[1.12rem] w-2 h-2 bg-white rounded-full shadow-[0.87rem_0.37rem_#ffffff,-0.87rem_0.37rem_#ffffff]"></div>
      </div>
    </>
  );
}
