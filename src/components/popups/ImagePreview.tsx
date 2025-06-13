interface ImagePreviewProps {
  previewImage: string,
  showPreview: boolean
}

export default function ImagePreview(props: ImagePreviewProps) {
  
  return (
    
    props.showPreview && (
      <div
        className="absolute z-50 bg-white border border-gray-300 rounded shadow-lg"
        style={{
          top: 0,
          right: "100px",
          width: "192px",
          height: "192px",
          padding: "4px"
        }}
      >
        <img
          src={props.previewImage}
          alt="Preview"
          className="w-full h-full object-contain"
        />
      </div>
    )
  )
}