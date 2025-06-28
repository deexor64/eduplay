import Image from "next/image";

export default function CoverImage(props: any) {
  
  return (
    
    props.coverImageUrl && 
    <section className="mb-6">
      <Image
        src={props.coverImageUrl}
        alt="Cover"
        className="w-full h-[2in] object-contain rounded-xl shadow-md border"
        width={600}
        height={600}
      />
    </section>

  )
}
