import Navbar from './ui/Navbar';
import Sidebar from './ui/Sidebar';

const DashboardAdmin = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar userName="Admin John" profileImage="https://via.placeholder.com/40" />
      <div className="flex flex-1">
        <Sidebar links={['Overview', 'Manage Teachers', 'Manage Students', 'Reports', 'Settings']} />
        <main className="flex-1 p-6 bg-gray-50">
          <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
          {/* quick view */}
        </main>
      </div>
    </div>
  );
};

export default DashboardAdmin;
