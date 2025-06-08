import { useParams } from "next/navigation";

import TeacherProfile from "./_profile/TeacherProfile";
import ParentProfile from "./_profile/ParentProfile";
// import AdminProfile from "../_profile/(AdminProfile)";

function Profile(props: any) {

  // user type check
  var userType = useParams().userType;
  if (!["admin", "teacher", "parent"]
    .includes("" + userType)) return;

  return (
    <>
      {userType === "teacher" && <TeacherProfile />}
      {userType === "parent" && <ParentProfile />}
      {/* { userType === "parent" && <AdminDashboard />} */}
    </>
  );
}

export default Profile;
