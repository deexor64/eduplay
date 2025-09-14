import { AuthProvider } from "@/contexts/AuthProvider";
import { Toaster } from "react-hot-toast";

export default function TeacherLayout(props: any) {
  return (
    <AuthProvider userType={["TEACHER"]} role={["ADMIN", "TEACHER"]} status={["ACTIVE"]}>
      <Toaster position="top-right" reverseOrder={false}/> {/* Notification provider */}
      {props.children}
    </AuthProvider>
  );
}
