import { AuthProvider } from "@/contexts/AuthProvider";

export default function StudentLayout(props: any) {
  return (
    <AuthProvider userType={["TEACHER", "STUDENT"]} role={["ADMIN", "TEACHER", "DEMONSTRATOR"]} status={[]}>
      <div className="student-route">
        {props.children}
      </div>
    </AuthProvider>
  ); 
}
