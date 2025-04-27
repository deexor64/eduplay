import { useState } from "react";

// import AlertBox from "../../../ui/AlertBox";

type LayoutProps = {
  templateTitle: string;
  validateTemplate: Function;
  templateData: any;
  children: React.ReactNode;
}

function Layout(props: LayoutProps) {

  // alert box
  // const [visible, setVisible] = useState(true);
  // const [alertData, setAlertData] = useState({
  //   message: "", type: "message",
  //   visible: visible, setVisible: setVisible
  // });

  // form inputs
  const [activityTitle, setActivityTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string>(
    "https://via.placeholder.com/300x200?text=Cover+Preview",
  );

  // validate common inputs
  function validateLayout(): boolean {
    if (!activityTitle.trim()) {
      alert("Title is required.");
      return false;
    }
    if (!description.trim()) {
      alert("Description is required.");
      return false;
    }
    if (!coverImage) {
      alert("Cover Image is required.");
      return false;
    }
    return true;
  }

  // save template
  function handleSave(): void {

    const layoutValid = validateLayout();
    const templateValid = layoutValid ? props.validateTemplate() : false;

    if (layoutValid && templateValid) {
      alert("Saving... All validations passed!");
      // Now you can collect data and proceed to save
    } else {
      console.log("Validation failed.");
    }
  }

  return (

    <div className="max-w-6xl mx-auto p-4 bg-blue-100">

      {/* alert box */}
      {/* {visible && (
        <AlertBox
          message={alertData.message}
          type={alertData.type as "warning" | "error" | "message" | "success"}
        />
      )} */}

      {/* template title */}
      <header className="mb-6">
        <h2 className="text-xl font-semibold mb-4">{props.templateTitle}</h2>
      </header>

      {/* activity title */}
      <section className="mb-4 bg-white p-4 rounded-xl shadow-sm">
        <label htmlFor="lesson-title" className="block text-lg font-semibold mb-2">
          Activity Title
        </label>
        <input
          id="lesson-title"
          type="text"
          className="input"
          placeholder="e.g. Sort the Animals"
          value={activityTitle}
          onChange={function (e) {
            setActivityTitle(e.target.value);
          }}
        />
      </section>

      {/* cover image */}
      <section className="mb-6 bg-white p-4 rounded-xl shadow-sm">
        <label htmlFor="coverImage" className="block text-lg font-semibold mb-2">
          Cover Image
        </label>
        <div className="mb-4">
          <input
            type="file"
            id="coverImage"
            accept="image/*"
            onChange={function (e) {
              const file = e.target.files ? e.target.files[0] : null;
              if (file) {
                setCoverImage(file);
                setCoverImagePreview(URL.createObjectURL(file));
              }
            }}
            className="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 file-input"
          />
        </div>
        {coverImagePreview && (
          <div className="mb-6 w-full max-w-xs overflow-hidden rounded-lg shadow-md border border-gray-200">
            <img
              src={coverImagePreview}
              alt="Cover Preview"
              className="w-auto h-[2in] object-contain mx-auto"
            />
          </div>
        )}
      </section>

      {/* description */}
      <section className="mb-4 bg-white p-4 rounded-xl shadow-sm">
        <label htmlFor="lesson-desc" className="block text-lg font-semibold mb-2">
          Description
        </label>
        <textarea
          id="lesson-desc"
          className="input"
          placeholder="From the box drag all the animals to the correct box."
          value={description}
          onChange={function (e) {
            setDescription(e.target.value);
          }}
        />
      </section>

      {/* template content */}
      {props.children}

      {/* activity options */}
      <section className="mb-6 bg-white p-4 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Activity Options</h2>
        <label className="block font-semibold mb-2">Time Limit</label>
        <input type="number" className="input" placeholder="Time in minutes" />
        <label className="block font-semibold mb-2">Is graded</label>
        <input type="checkbox" className="input" />
      </section>

      {/* footer */}
      <footer className="flex justify-end p-4 bg-white shadow rounded-xl">
        <button
          className="font-semibold py-2 px-6 rounded-lg transition
          bg-green-500 text-white hover:bg-green-600"
          onClick={handleSave}
        >
          Save Lesson
        </button>
      </footer>

    </div>
  );
}

export default Layout;
