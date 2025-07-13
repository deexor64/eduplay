interface DescriptionProps {
  setFormData: Function;
}

export default function Description(props: DescriptionProps) {
  
  function setDescription(description: string) {
    props.setFormData(function (prev: any) { 
      return { 
        ...prev, 
        instructions: description.trim() 
      } 
    });
  }
  
  return (
    <section className="mb-4 bg-white p-4 rounded-xl shadow-sm">
      <label htmlFor="lesson-desc" className="block text-lg font-semibold mb-2">
        Description
      </label>
      <textarea
        id="lesson-desc"
        className="w-full p-2 border border-slate-300 rounded-lg bg-slate-50 transition-colors duration-300 focus:border-blue-500 focus:outline-none focus:bg-white"
        placeholder="From the box drag all the animals to the correct box."
        onChange={function (e) { setDescription(e.target.value) }}
      />
    </section>
  )
}