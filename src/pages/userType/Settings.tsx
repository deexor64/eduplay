import { useParams } from "react-router";

import AdminSettings from "../Admin/(AdminSettings)";
import TeacherSettings from "../Teacher/(TeacherSettings)";
import ParentSettings from "../Parent/(ParentSettings)";

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
      {userType === "admin" && <AdminSettings />}
      {userType === "teacher" && <TeacherSettings />}
      {userType === "parent" && <ParentSettings />}
    </>
  );
}

export default Settings;
