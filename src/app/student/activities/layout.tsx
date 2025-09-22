import { AuthProvider } from "@/contexts/AuthProvider";

export default function ActivitiesLayout(props: any) {
  return (
    <AuthProvider userType={["TEACHER", "STUDENT"]} role={["DEMONSTRATOR"]} status={["ACTIVE"]}>
      {props.children}
    </AuthProvider>
  ); 
}
