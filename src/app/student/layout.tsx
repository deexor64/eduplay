import { AuthProvider } from "@/contexts/AuthProvider";
import { Toaster } from "react-hot-toast";

export default function StudentLayout(props: any) {
  return (
    <AuthProvider userType={["TEACHER", "STUDENT"]} role={["ADMIN", "TEACHER", "DEMONSTRATOR"]} status={[]}>
      {props.children}
    </AuthProvider>
  ); 
}
