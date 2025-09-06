import { faTimes, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

type TitleProps = {
  title: string,
  back?: boolean,
  addUser?: string,
}

export default function Title(props: TitleProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between p-4 border-l-4 border-blue-700 bg-white rounded shadow-sm">
        
        {/*Text*/}
        <h1 className="text-2xl font-bold text-blue-900">{props.title}</h1>
    
        {/* Add User Button  */}
        {props.addUser && (
          <Link href={`register?userType=${props.addUser.toUpperCase()}`} rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium 
                        rounded-lg shadow-md transition-colors
                        bg-blue-600 text-white hover:bg-blue-700"
          >
            <FontAwesomeIcon icon={faUserPlus} className="text-sm" />
          </Link>
        )}
  
        {/* Back Button */}
        {props.back && (
          <button type="button" onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium 
                        rounded-lg shadow-md transition-colors
                        bg-red-500 text-white hover:bg-red-600"
          >
            <FontAwesomeIcon icon={faTimes} className="text-sm" />
          </button>
        )}
  
      </div>
    </div>
  );
}
