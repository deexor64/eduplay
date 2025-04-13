import Navbar from './ui/NavBar';
import Sidebar from './ui/Sidebar';
import QuickLinks from './ui/Quicklinks';

const DashboardAdmin = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar userName="Admin John" profileImage="https://via.placeholder.com/40" />
      <div className="flex flex-1">
        <Sidebar links={['Overview', 'Manage Teachers', 'Manage Students', 'Reports', 'Settings']} />
        <main className="flex-1 p-6 bg-gray-50">
          <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="p-4 bg-white shadow rounded-lg">User Reports</div>
            <div className="p-4 bg-white shadow rounded-lg">System Logs</div>
            <div className="p-4 bg-white shadow rounded-lg">Quick Tools</div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardAdmin;
