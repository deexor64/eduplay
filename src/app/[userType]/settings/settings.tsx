import { useParams } from "next/navigation";

import AdminSettings from "./_settings/AdminSettings";
import TeacherSettings from "./_settings/TeacherSettings";
import ParentSettings from "./_settings/ParentSettings";

function Settings(props: any) {

  // user type check
  var userType = useParams().userType;

  return (
    <>
      {userType === "admin" && <AdminSettings />}
      {userType === "teacher" && <TeacherSettings />}
      {userType === "parent" && <ParentSettings />}
    </>
  );
}

export default Settings;
