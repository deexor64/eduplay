import { useParams } from "react-router";

import TeacherProfile from "../Teacher/(TeacherProfile)";
import ParentProfile from "../Parent/(ParentProfile)";
// import StudentProfile from "../Student/(StudentProfile)";

function Profile(props: any) {

  // check valid user type -----
  var params = useParams();
  var userType = params.userType;
  var allowedUserTypes = ["admin", "teacher", "parent", "student"];
  if (!userType || allowedUserTypes.indexOf(userType) === -1) {
    return;
  }
  // end check -----------------

  return (
    <>
      {userType === "teacher" && <TeacherProfile />}
      {userType === "parent" && <ParentProfile />}
      {/* { userType === "parent" && <AdminDashboard />} */}
    </>
  );
}

export default Profile;
