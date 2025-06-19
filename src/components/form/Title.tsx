export default function Title(props: any) {
  return( 
    <h2 className="text-2xl font-bold mb-10 text-center text-gray-800">
      { props.children}
    </h2>
  )
}