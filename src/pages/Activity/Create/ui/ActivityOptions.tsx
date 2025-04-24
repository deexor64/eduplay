function ActivityOptions() {
  return (

    <section className="mb-6 bg-white p-4 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Activity Options</h2>

      {/* option 1 */}
      <label className="block font-semibold mb-2">Time Limit</label>
      <input type="number" className="input" placeholder="Time in minutes" />

      {/* option 2 */}
      <label className="block font-semibold mb-2">Is graded</label>
      <input type="checkbox" className="input" />

    </section>
  );
}

export default ActivityOptions;
