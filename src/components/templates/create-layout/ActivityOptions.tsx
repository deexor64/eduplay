// activity options are predfined
type ActivityOptionsProps = {
  setFormData: Function;
}

export default function ActivityOptions(props: ActivityOptionsProps) {
  
  function setOptions(option: any, value: any) {
    props.setFormData(function (prev: any) {
      let options = prev.options;
      options[option] = value;
      return { ...prev, options: options }
    }); 
  }
  
  return (
    <section className="mb-6 bg-white/40 backdrop-blur p-6 rounded-xl shadow-md">
      
      <h2 className="text-lg font-semibold mb-6 text-gray-800">Activity Options</h2>
      
      {/* time limit */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <label className="block font-semibold text-gray-700 min-w-[120px]">Time Limit</label>
        <input
          type="number"
          min={0}
          className="flex-1 p-3 border border-gray-300 rounded-lg bg-white/80 backdrop-blur transition-all duration-300 focus:border-blue-500 focus:outline-none focus:bg-white focus:shadow-md"
          placeholder="Time in minutes"
          onChange={function (e) { 
            setOptions("timeLimit", Number.parseInt(e.target.value));
          }}
        />
      </div>
      
      {/* is graded */}
      <div className="flex flex-row justify-between items-center gap-4">
        <label className="block font-semibold text-gray-700">Is graded</label>
        <input
          type="checkbox"
          value="true"
          className="w-5 h-5 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          onChange={function (e) {
            setOptions("isGraded", e.target.value);
          }}
        />
      </div>
      
    </section>
  )
}