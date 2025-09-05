import {LeftSidebar, RightSidebar} from "@/components/student/Sidebar";

export default function StudentNavigatorLayout(props: any) {
  return (
    <div className="flex h-screen">

        {/* Main Content */}
        <main className="flex-1 relative bg-transparent">

          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: 'url(/images/work-desk.jpg)' }}>

            {/* Left Side bar */}
            <LeftSidebar />

            {/* Right Side bar */}
            <RightSidebar />

            {/* Middle scrollable area */}
            <div className="fixed top-0 left-28 right-28 h-full overflow-y-auto">
              <div className="min-h-full backdrop-blur-sm p-8 pt-10">

                {/* Content will be added here */}
                {props.children}

              </div>
            </div>
          </div>

        </main>
    </div>)
}
