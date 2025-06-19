
export default function GroupTitle(props: any) {
  return (
    <>
      <hr className="mt-6 text-gray-500 mb-2"/>
      <p className="text-lg font-semibold text-gray-800 mt-2 mb-6">
        {props.children}
      </p>
      
    </>
  );
}
