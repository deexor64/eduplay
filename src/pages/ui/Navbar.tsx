import { useNavigate } from "react-router";

function Navbar(props: any) {

  var navigate = useNavigate();

  function goToDashboard() {
    navigate("/" + props.userType + "/dashboard");
  }

  return (
    <div className="w-full h-16 bg-blue-600 flex justify-between
      items-center px-4 shadow-md fixed z-20">
      <div className="text-white font-bold cursor-pointer" onClick={goToDashboard}>
        <span className="text-xl">EduSoft</span>
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-white">Logout</button>
        <img src="/profile.png" className="w-8 h-8 rounded-full" alt="Profile" />
        <button className="text-white">🔔</button>
      </div>
    </div>
  );
}

export default Navbar;
