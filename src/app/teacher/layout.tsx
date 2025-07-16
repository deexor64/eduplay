import NavigatorLayout from "@/layouts/NavigatorLayout";
import AuthWrapper from "@/contexts/AuthWrapper";

export default function AdminLayout(props: any) {
  return (
    <AuthWrapper allowedUserTypes={["TEACHER"]}>
      <NavigatorLayout>
        {props.children}
      </NavigatorLayout>
    </AuthWrapper>
  );
}
