import { useParams } from "react-router";

import TeacherSettings from "../Teacher/(TeacherSettings)";
import ParentSettings from "../Parent/(ParentSettings)";
// import StudentSettings from "../Student/(StudentSettings)";

function Settings(props: any) {

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
      {userType === "teacher" && <TeacherSettings />}
      {userType === "parent" && <ParentSettings />}
      {/* {userType === "parent" && <AdminDashboard />} */}
    </>
  );
}

export default Settings;
