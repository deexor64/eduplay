import Navbar from './ui/NavBar';
import Sidebar from './ui/Sidebar';

const DashboardStudent = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar userName="Student Sam" profileImage="https://via.placeholder.com/40" />
      <div className="flex flex-1">
        <Sidebar links={['Home', 'My Lessons', 'Quizzes', 'Assignments', 'Help']} />
        <main className="flex-1 p-6 bg-gray-50">
          <h2 className="text-2xl font-bold mb-4">Student Dashboard</h2>
          {/* quick view */}
        </main>
      </div>
    </div>
  );
};

export default DashboardStudent;
