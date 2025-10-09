import NavigatorLayout from "@/components/navigator/NavigatorLayout";
import { AuthProvider } from "@/contexts/AuthProvider";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { Toaster } from "react-hot-toast";

export default function TeacherLayout(props: any) {
  return (
    <AuthProvider userType={["TEACHER"]} role={["ADMIN", "TEACHER"]} status={["ACTIVE"]}>
      <Toaster position="top-right" reverseOrder={false}/> {/* Notification provider */}
      <EdgeStoreProvider>
        <div className="teacher-route">
          {props.children}
        </div>
      </EdgeStoreProvider>
    </AuthProvider>
  );
}
