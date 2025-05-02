import { useParams } from "react-router";

import TeacherDashboard from "../../Teacher/(TeacherDashboard)";
import AdminDashboard from "../../Admin/(AdminDashboard)";
import ParentDashboard from "../../Parent/(ParentDashboard)";

function Dashboard(props: any) {

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
      {userType === "teacher" && <TeacherDashboard />}
      {userType === "parent" && <AdminDashboard />}
      {userType === "admin" && <ParentDashboard />}
    </>
  );
}

export default Dashboard;
