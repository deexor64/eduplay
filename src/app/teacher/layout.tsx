import AuthWrapper from "@/contexts/AuthWrapper";
import { Toaster } from "react-hot-toast";

export default function TeacherLayout(props: any) {
  return (
    <AuthWrapper allowedUserTypes={["TEACHER"]}>
      <Toaster position="top-right" reverseOrder={false}/> {/* Notification provider */}
        {props.children}
    </AuthWrapper>
  );
}
