
export default function Description(props: any) {
  
  return (
    <section className="mb-6 bg-white p-4 rounded-xl shadow-sm">
      <p className="text-lg text-gray-700">
        {props.description}
      </p>
    </section>
  )
}