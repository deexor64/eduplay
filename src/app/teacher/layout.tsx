import CommonLayout from "@/components/navigator/NavigatorLayout";

export default function AdminLayout(props: any) {
  return (
    <CommonLayout>
      {props.children}
    </CommonLayout>
  );
}
