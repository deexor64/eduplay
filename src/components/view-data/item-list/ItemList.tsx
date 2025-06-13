
// wrapper
export default function ItemList(props: any) {
  return (
    <div className="w-full table-auto text-left">
      {props.children}
    </div>   
  )
}
