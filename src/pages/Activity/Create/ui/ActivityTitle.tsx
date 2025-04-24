function ActivityTitle() {
  return (
    <section className="mb-4 bg-white p-4 rounded-xl shadow-sm">
      <label htmlFor="lesson-title" className="block font-semibold mb-2">
        Activity Title
      </label>
      <input id="lesson-title" type="text" className="input"
        placeholder="e.g. Sort the Animals"
      />
    </section>
  );
}

export default ActivityTitle;
