
export default function CoverImage(props: any) {
  
  return (
    
    <section className="mb-6">
      <img
        src={props.coverImage}
        alt="Cover"
        className="w-full h-[2in] object-contain rounded-xl shadow-md border"
      />
    </section>

  )
}
