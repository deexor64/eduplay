import { AuthProvider } from "@/contexts/AuthProvider";

export default function StudentLayout(props: any) {
  return (
    <AuthProvider userType={["TEACHER", "STUDENT"]} role={["DEMONSTRATOR"]} status={["ACTIVE"]}>
      <div className="student-page">
        {props.children}
      </div>
    </AuthProvider>
  ); 
}
