import Swal from "sweetalert2";

interface FooterProps {
  validateActivity: Function,
}

export default function Footer(props: FooterProps) {
  
  function handleSave() {
    
    let valid = props.validateActivity();

    if (!valid.status) {
      
      Swal.fire({
        title: "Error",
        text: valid.message,
        icon: "error",
      });
      return;
    }

    Swal.fire({
      title: "Success",
      text: "Saved successfully",
      icon: "success",
    });
    
  }

  return (
    <footer className="sticky bottom-0 left-0 w-full flex justify-center gap-4 p-4 bg-red-200 shadow rounded-lg">
      <button className="font-semibold py-2 px-6 rounded-lg transition bg-green-500 text-white hover:bg-green-600">
        Preview
      </button>
      <button
        className="font-semibold py-2 px-6 rounded-lg transition bg-green-500 text-white hover:bg-green-600"
        onClick={handleSave}
      >
        Save
      </button>
    </footer>
  )
}
