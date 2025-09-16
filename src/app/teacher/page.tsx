import { redirect } from "next/navigation";

export default function Dashboard(props: any) {
  redirect("/teacher/activities");
}
