interface InstructionsProps {
  setFormData: Function;
}

export default function Instructions(props: InstructionsProps) {
  
  function setInstructions(instructions: string) {
    props.setFormData(function (prev: any) { 
      return { 
        ...prev, 
        instructions: instructions.trim()
      } 
    });
  }
  
  return (
    <section className="mb-4 bg-white/40 backdrop-blur p-6 rounded-xl shadow-md">
      <label htmlFor="lesson-desc" className="block text-lg font-semibold mb-3 text-gray-800">
        Instructions
      </label>
      <textarea
        id="lesson-desc"
        className="w-full p-3 border border-gray-300 rounded-lg bg-white/80 backdrop-blur transition-all duration-300 focus:border-blue-500 focus:outline-none focus:bg-white focus:shadow-md min-h-[100px] resize-vertical"
        placeholder="From the box drag all the animals to the correct box."
        onChange={function (e) { setInstructions(e.target.value) }}
      />
    </section>
  )
}