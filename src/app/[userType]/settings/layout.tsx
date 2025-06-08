import CommonLayout from "@/components/CommonLayout";

export default function SettingsLayout(props: any) {
  return (
    <CommonLayout>
      {props.children}
    </CommonLayout>
  );
}
