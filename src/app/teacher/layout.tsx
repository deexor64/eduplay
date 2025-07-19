import AuthWrapper from "@/contexts/AuthWrapper";

export default function AdminLayout(props: any) {
  return (
    <AuthWrapper allowedUserTypes={["TEACHER"]}>
        {props.children}
    </AuthWrapper>
  );
}
