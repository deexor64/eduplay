import { useEffect } from "react"; 
import Chart from 'chart.js/auto';
import "./Dashboard.css";

const Dashboard = () => {

  // useEffect(() => {
  //   const ctx = document.getElementById("timeChart") as HTMLCanvasElement | null;
  //   if (ctx) {
  //     new Chart(ctx, {
  //       type: "bar",
  //       data: {
  //         labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  //         datasets: [{
  //           label: "Hours Spent",
  //           data: [1, 2, 1.5, 2.5, 1],
  //           backgroundColor: "#7e57c2"
  //         }]
  //       },
  //       options: {
  //         responsive: true,
  //         plugins: {
  //           legend: {
  //             display: false
  //           }
  //         },
  //         scales: {
  //           y: {
  //             beginAtZero: true,
  //             max: 3
  //           }
  //         }
  //       }
  //     });
  //   }
  // }, []);

  return (
    <>
      {/* Navigation Bar */}
      <nav className="flex justify-between items-center bg-blue-600 text-white px-6 py-3 shadow">
        <div className="text-xl font-bold">🏫 School LMS</div>
        <div className="flex gap-4">
          <a href="#">Dashboard</a>
          <a href="#">Student Progress</a>
          <a href="#">Messages</a>
          <a href="#">Logout</a>
        </div>
      </nav>

      {/* Header */}
      <p className="bg-gray-100 p-4 text-lg text-center notice z-10">
        👋 Welcome Back, Emma! Ready to Learn Something New Today?
      </p>

      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* My Courses Section */}
        <div className="card bg-white shadow p-4 rounded-lg">
          <h3 className="mb-4 font-semibold text-lg">📘 My Courses</h3>
          <div className="grid-cols-4 gap-2">
            <div className="bg-blue-100 px-18 py-16 rounded">Science</div>
            <div className="bg-blue-100 px-18 py-16 rounded">Math</div>
            <div className="bg-blue-100 px-18 py-16 rounded">English</div>
          </div>
        </div>

        {/* Calendar Section */}
        <div className="calendar-container bg-white shadow p-4 rounded-lg col-span-1">
          <h3 className="text-center mb-3 font-semibold text-lg">📅 Calendar</h3>
          <iframe
            src="https://calendar.google.com/calendar/embed?src=en.indian%23holiday%40group.v.calendar.google.com&ctz=Asia%2FColombo"
            className="w-full h-64 border rounded"
            title="Google Calendar"
          ></iframe>
        </div>

        {/* Charts Section */}
        <div className="charts-container col-span-1 flex flex-col gap-6">
          <div className="chart-card bg-white shadow p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-4">📈 Time Spent on LMS</h3>
            <canvas id="timeChart" className="w-full h-40"></canvas>
          </div>

          <div className="chart-card bg-white shadow p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-4">📊 Subject Progress</h3>
            <p>Science</p>
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-green-300 mb-3">80%</div>
            <p>Math</p>
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-orange-200 mb-3">70%</div>
            <p>English</p>
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-yellow-200 mb-3">90%</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
