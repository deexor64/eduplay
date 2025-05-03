import { useParams } from "react-router";

import CommonLayout from "../ui/CommonLayout";
import TeacherDashboard from "../Teacher/(TeacherDashboard)";
import AdminDashboard from "../Admin/(AdminDashboard)";
import ParentDashboard from "../Parent/(ParentDashboard)";

function Dashboard(props: any) {

  // user type check
  var userType = useParams().userType;
  if (!["admin", "teacher", "parent"]
    .includes("" + userType)) return;

  return (
    <CommonLayout>
      {userType === "teacher" && <TeacherDashboard />}
      {userType === "admin" && <AdminDashboard />}
      {userType === "parent" && <ParentDashboard />}
    </CommonLayout>
  );
}

export default Dashboard;
