import CommonLayout from "@/components/navigator/NavigatorLayout";
import AuthWrapper from "@/contexts/AuthWrapper";

export default function AdminLayout(props: any) {
  return (
    <AuthWrapper allowedUserTypes={["TEACHER"]}>
      <CommonLayout>
        {props.children}
      </CommonLayout>
    </AuthWrapper>
  );
}
