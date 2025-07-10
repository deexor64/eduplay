import Image from "next/image";

//Cover image recieves title and description as children

type CoverImageProps = {
  coverImageUrl: string,
  children: React.ReactNode,
}

export default function CoverImage(props: CoverImageProps) {
  
  return (
    
    props.coverImageUrl && 
    <div className="max-w-6xl mx-auto sticky top-2">
      <section
        className="mb-6 w-full overflow-hidden rounded-xl bg-cover bg-center 
        relative aspect-[11/3]"
        style={{ backgroundImage: "url('/templates/1-SortItems-tmpl/coverImage.jpg')"}}>
        <div className="relative z-10  p-4 ">
          {props.children}
        </div>
      </section>
    </div>

  )
}
