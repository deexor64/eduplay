import { redirect } from "next/navigation";

export default function DevLayout(props: any) {
  
  if (process.env.NODE_ENV === "production") redirect("/unauthorized");

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="space-y-8 max-w-xl">
        <h1 className="text-2xl font-bold">🛠 Developer Settings</h1>
        {props.children}
      </div>
    </div>
  );
}
