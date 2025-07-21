import AuthWrapper from "@/contexts/AuthWrapper";
import { Toaster } from "react-hot-toast";

export default function StudentLayout(props: any) {
  return (
    <AuthWrapper allowedUserTypes={["STUDENT"]}>
      <Toaster position="top-right" reverseOrder={false}/> {/* Notification provider */}
        {props.children}
    </AuthWrapper>
  );
}
