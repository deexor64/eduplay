import { TemplateViewMode, UserType } from "@/lib/utils/types";
import Link from "next/link";

interface ActivityTitleProps {
  viewMode: TemplateViewMode,
  templateCode: string,
  children: React.ReactNode
}

export default function ActivityTitle(props: any) {
  
  return (
    <header className="mb-6 bg-white p-4 rounded-xl shadow-sm sticky 
      top-2 flex items-center">
      
      <h1 className="text-xl font-bold text-gray-800">
      {props.viewMode === "VIEW" ? 
        ( `${props.children}` ) : ( `${props.children} - [${props.viewMode}]` )}
      </h1>
      
      { (props.viewMode === "SAMPLE") && (
      <Link href={`/template?userType=${props.userType}&viewMode=CREATE&templateCode=${props.templateCode}`} 
        className="ml-auto"
        target="_parent"
        rel="noopener noreferrer"
      >
        <i className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded">
          Go to Template
        </i>
      </Link>
      )}
      
    </header>
  );
}
