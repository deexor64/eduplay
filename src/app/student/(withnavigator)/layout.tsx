import StudentNavigatorLayout from "@/components/student/StudentNavigatorLayout";
import { AuthProvider } from "@/contexts/AuthProvider";
import { EdgeStoreProvider } from "@/lib/edgestore";

export default function StudentLayout(props: any) {
  return (
    <AuthProvider userType={["TEACHER", "STUDENT"]} role={["DEMONSTRATOR"]} status={["ACTIVE", "SUSPENDED"]}>
      <EdgeStoreProvider>
      <StudentNavigatorLayout>
        <div className="student-page">
          {props.children}
        </div>
      </StudentNavigatorLayout>
      </EdgeStoreProvider>
    </AuthProvider>
  ); 
}
