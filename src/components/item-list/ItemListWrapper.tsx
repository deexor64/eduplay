
// wrapper
export default function ItemListWrapper(props: any) {
  return (
    <div className="w-full table-auto text-left">
      {props.children}
    </div>   
  )
}
