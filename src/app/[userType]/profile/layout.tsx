import CommonLayout from "@/components/CommonLayout";

export default function ProfileLayout(props: any) {
  return (
    <CommonLayout>
      {props.children}
    </CommonLayout>
  );
}
