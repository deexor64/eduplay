// This table component is only for text rowData
// Image previews, dynamic content are not supported
// Must be used solely for text data output from a database

// table wrapper
export default function TableWrapper(props: any) {
  return (
    <table className="w-full table-auto text-left">
      {props.children}
    </table>   
  )
}
