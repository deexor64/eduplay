import Sidebar from "@/components/student/Sidebar";
import StudentNavbar from "@/components/student/Navbar";


export default function StudentNavigatorLayout(props:any) {
  return (
  <div className="flex h-screen">
    <div className="flex-1 flex flex-col bg-transparent">

      {/* Nav bar */}
      <StudentNavbar />

      {/* Main Content */}
      <main className="flex-1 relative bg-transparent">
        
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/images/work-desk.jpg)' }}>

          {/* Side bar */}
          <Sidebar />
          
          {/* Middle scrollable area */}
          <div className="fixed top-0 left-28 right-0 h-full overflow-y-auto">
            <div className="min-h-full bg-white/20 backdrop-blur-sm p-8 pt-20 mr-28">
              
            {/* Content will be added here */}
            {props.children}

            </div>
          </div>
        </div>

      </main>
    </div>
  </div>)
}