import Navbar from './ui/NavBar';
import Sidebar from './ui/Sidebar';
import QuickLinks from './ui/Quicklinks';
const DashboardTeacher = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar userName="Teacher Emma" profileImage="https://via.placeholder.com/40" />
      <div className="flex flex-1">
        <Sidebar links={['Home', 'My Classes', 'Assignments', 'Help', 'Settings']} />
        <main className="flex-1 p-6 bg-gray-50">
          <h2 className="text-2xl font-bold mb-4">Teacher Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="p-4 bg-white shadow rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Upcoming Assignments</h3>
              <p>View and manage the assignments for your classes.</p>
            </div>
            <div className="p-4 bg-white shadow rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Overall Progress</h3>
              <p>Track your students' academic progress here.</p>
            </div>
            <div className="p-4 bg-white shadow rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Quick Links to Classes</h3>
              <p>Jump straight to class pages and materials.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardTeacher;
