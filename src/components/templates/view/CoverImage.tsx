type CoverImageProps = {
  templateCode: string,
  children: React.ReactNode,
}

export default function CoverImage(props: CoverImageProps) {
  return (
    <div className="max-w-6xl mx-auto sticky top-0">
      <section
        className="mb-6 w-full overflow-hidden rounded-xl bg-center relative transition-all duration-300"
        style={{ backgroundImage: `url('/templates/${props.templateCode}/cover-image.jpg')` }}>

        {/* Overlay for darkening the image for better text contrast */}
        <div className="absolute inset-0 bg-white/10" />

        {/* Content */}
        <div className="relative z-10 p-4 flex flex-col gap-2">
          {props.children}
        </div>
        
      </section>
    </div>
  )
}
