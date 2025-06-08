import CommonLayout from "@/components/CommonLayout";

export default function AdminLayout(props: any) {
  return (
    <CommonLayout>
      {props.children}
    </CommonLayout>
  );
}
