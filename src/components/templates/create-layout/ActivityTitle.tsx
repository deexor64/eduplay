interface ActivityTitleProps {
  setFormData: Function;
}

export default function ActivityTitle(props: ActivityTitleProps) {
  
  function setActivityTitle(e: React.ChangeEvent<HTMLInputElement>) {
    props.setFormData(function(prev: any) {
      return {
        ...prev,
        title: e.target.value.trim()
      };
    });
  }
  
  return (
    <section className="mb-4 bg-white/40 backdrop-blur p-6 rounded-xl shadow-md">
      <label htmlFor="lesson-title" className="block text-lg font-semibold mb-3 text-gray-800">
        Activity Title
      </label>
      <input
        id="lesson-title"
        type="text"
        className="w-full p-3 border border-gray-300 rounded-lg bg-white/80 backdrop-blur
        transition-all duration-300 focus:border-blue-500 focus:outline-none focus:bg-white focus:shadow-md"
        placeholder="e.g. Sort the Animals"
        onChange={setActivityTitle}
      />
    </section>
  );
}
