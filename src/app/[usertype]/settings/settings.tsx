import { useParams } from "react-router";

import CommonLayout from "../ui/CommonLayout";
import AdminSettings from "./(settings)/(AdminSettings)";
import TeacherSettings from "./(settings)/(TeacherSettings)";
import ParentSettings from "./(settings)/(ParentSettings)";

function Settings(props: any) {

  // user type check
  var userType = useParams().userType;
  if (!["admin", "teacher", "parent"]
    .includes("" + userType)) return;

  return (
    <CommonLayout>
      {userType === "admin" && <AdminSettings />}
      {userType === "teacher" && <TeacherSettings />}
      {userType === "parent" && <ParentSettings />}
    </CommonLayout>
  );
}

export default Settings;
