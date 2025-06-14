import Image from "next/image";

interface ImagePreviewProps {
  previewImage: string, // url
  showPreview: boolean // toggle
}

export default function ImagePreview(props: ImagePreviewProps) {
  
  return (
    props.showPreview && (
      <div
        className="absolute z-50 bg-white border border-gray-300 rounded shadow-lg"
        style={{ top: 0, right: "100px", width: "408px", height: "408px", padding: "4px"}}
      >
        <Image
          src={props.previewImage}
          width={400}
          height={400}
          alt="Preview"
          className="w-full h-full object-contain"
        />
      </div>
    )
  )
}