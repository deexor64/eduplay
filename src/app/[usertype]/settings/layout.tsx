import CommonLayout from "@/components/CommonLayout";

export default function DashboardLayout(props: any) {
  return (
    <CommonLayout>
      {props.children}
    </CommonLayout>
  );
}
