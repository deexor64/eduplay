
export default function Footer() {
  return (
    <footer className="sticky bottom-0 left-0 w-full flex justify-center gap-4 p-4 bg-red-200 shadow rounded-lg">
      
      <button
        className="font-semibold py-2 px-6 rounded-lg transition bg-green-500 text-white hover:bg-green-600"
        // onClick={gradeActivity}
      >
        Save and grade
      </button>
    </footer>
  
  )
}