import Navbar from '../ui/Dashboard/Navbar';
import Sidebar from '../ui/Dashboard/Sidebar';

function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar userName="Teacher Emma" profileImage="https://via.placeholder.com/40" />
      <div className="flex flex-1">
        <Sidebar links={['Home', 'My Classes', 'Assignments', 'Help', 'Settings']} />
        <main className="flex-1 p-6 bg-gray-50">
          <h2 className="text-2xl font-bold mb-4">Teacher Dashboard</h2>
          {/* quick view */}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
