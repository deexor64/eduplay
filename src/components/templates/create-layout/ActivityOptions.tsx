// activity options are predfined
type ActivityOptionsProps = {
  setFormData: Function;
}

export default function ActivityOptions(props: ActivityOptionsProps) {
  
  function setOptions(option: any, value: any) {
    props.setFormData(function (prev: any) {
      let options = JSON.parse(prev.options);
      options[option] = value;
      return { ...prev, options: JSON.stringify(options) }
    }); 
  }
  
  return (
    <section className="mb-4 bg-white p-4 rounded-xl shadow-sm">
      
      <h2 className="text-lg font-semibold mb-4">Activity Options</h2>
      
      {/* time limit */}
      <div className="flex flex-row justify-between items-center text-nowrap gap-4 mt-4">
        <label className="block font-semibold mb-2">Time Limit</label>
        <input
          type="number"
          min={0}
          className="w-full p-2 border border-slate-300 rounded-lg bg-slate-50 transition-colors duration-300 focus:border-blue-500 focus:outline-none focus:bg-white"
          placeholder="Time in minutes"
          onChange={function (e) { 
            setOptions("timeLimit", Number.parseInt(e.target.value));
          }}
        />
      </div>
      
      {/* is graded */}
      <div className="flex flex-row justify-between items-center text-nowrap gap-4 mt-4">
        <label className="block font-semibold mb-2">Is graded</label>
        <input
          type="checkbox"
          value="true"
          onChange={function (e) {
            setOptions("isGraded", e.target.value);
          }}
        />
      </div>
      
    </section>
  )
}