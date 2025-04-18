function QuickLinks() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      <div className="p-4 bg-white shadow rounded-lg hover:shadow-md cursor-pointer">
        <h3 className="text-lg font-semibold">Upcoming Assignments</h3>
        <p className="text-sm text-gray-500">View deadlines and submissions.</p>
      </div>
      <div className="p-4 bg-white shadow rounded-lg hover:shadow-md cursor-pointer">
        <h3 className="text-lg font-semibold">Overall Progress</h3>
        <p className="text-sm text-gray-500">Track child's academic performance.</p>
      </div>
      <div className="p-4 bg-white shadow rounded-lg hover:shadow-md cursor-pointer">
        <h3 className="text-lg font-semibold">Quick Links to Classes</h3>
        <p className="text-sm text-gray-500">Jump into ongoing classes.</p>
      </div>
    </div>
  );
};

export default QuickLinks;
  