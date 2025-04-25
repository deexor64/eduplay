function Description() {
  return (
    <section className="mb-4 bg-white p-4 rounded-xl shadow-sm">
      <label htmlFor="lesson-title" className="block text-lg font-semibold mb-2">
        Description
      </label>
      <textarea
        id="lesson-title"
        className="input"
        placeholder="From the box drag all the animals to the correct box."
      />
    </section>
  );
}

export default Description;
