import { useParams } from "react-router";

import CommonLayout from "../ui/CommonLayout";
import TeacherProfile from "../Teacher/(TeacherProfile)";
import ParentProfile from "../Parent/(ParentProfile)";
// import StudentProfile from "../Student/(StudentProfile)";

function Profile(props: any) {

  // user type check
  var userType = useParams().userType;
  if (!["admin", "teacher", "parent"]
    .includes("" + userType)) return;

  return (
    <CommonLayout>
      {userType === "teacher" && <TeacherProfile />}
      {userType === "parent" && <ParentProfile />}
      {/* { userType === "parent" && <AdminDashboard />} */}
    </CommonLayout>
  );
}

export default Profile;
