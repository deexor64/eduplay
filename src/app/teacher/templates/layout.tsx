import { AuthProvider } from "@/contexts/AuthProvider";

export default function TemplatesLayout(props: any) {
  return (
    <AuthProvider userType={["TEACHER"]} role={["ADMIN"]} status={["ACTIVE"]}>
      {props.children}
    </AuthProvider>
  );
}
