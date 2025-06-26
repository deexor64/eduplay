import { TemplateViewMode, UserType } from "@/lib/utils/types";
import Link from "next/link";

interface ActivityTitleProps {
  goToTemplate: boolean,
  children: React.ReactNode
}

export default function ActivityTitle(props: any) {
  
  return (
    <header className="mb-6 bg-white p-4 rounded-xl shadow-sm sticky 
      top-2 flex items-center">
      <h1 className="text-3xl font-bold text-gray-800">
        {props.children}
      </h1>
      {props.goToTemplate && (
      <Link href="templates" className="ml-auto">
        <i className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded">
          Go to Template
        </i>
      </Link>
      )}
    </header>
  );
}
