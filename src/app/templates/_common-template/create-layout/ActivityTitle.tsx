interface ActivityTitleProps {
  formData: { [key: string]: any };
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
    <section className="mb-4 bg-white p-4 rounded-xl shadow-sm">
      <label htmlFor="lesson-title" className="block text-lg font-semibold mb-2">
        Activity Title
      </label>
      <input
        id="lesson-title"
        type="text"
        className="w-full p-2 border border-slate-300 rounded-lg bg-slate-50 
        transition-colors duration-300 focus:border-blue-500 focus:outline-none focus:bg-white"
        placeholder="e.g. Sort the Animals"
        onChange={setActivityTitle}
        value={props.formData.title || "" }
      />
    </section>
  );
}
