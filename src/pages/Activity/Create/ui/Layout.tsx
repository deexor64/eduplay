import { useState } from "react";
import Swal from "sweetalert2";

type LayoutProps = {
  templateTitle: string;
  validateTemplate: Function;
  getTemplateInputs: Function;
  children: React.ReactNode;
}

function Layout(props: LayoutProps) {

  // form data
  let formData = new FormData();

  formData.append("activityTitle", "");
  formData.append("coverImage", ""); // image hash
  formData.append("description", "");
  formData.append("templateData", ""); // json (contains text and image hashes)
  formData.append("activityOptions", ""); // json
  /* additionally contains all File objects */

  // form operations
  function setActivityTitle(title: string) {
    formData.set("activityTitle", title);
  }

  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null);
  function setCoverImage(file: File) {

    // delete image
    let fileHash = formData.get("coverImage")!.toString();
    if (fileHash.length <= 0) {
      formData.delete(fileHash);
    }
    // add new image
    fileHash = `${Date.now()}_${file.name}`;
    formData.set("coverImage", fileHash);
    formData.append(fileHash, file); // append file to formData
  }

  function setDescription(description: string) {
    formData.set("description", description);
  }

  function setTemplateInputs(templateInputs: any) {
    formData.set("templateInputs", JSON.stringify(templateInputs.templateData));
    for (const file in templateInputs.mediaFiles.keys()) {
      formData.append(file, templateInputs.mediaFiles[file]);
    }
  }

  function setActivityOptions(options: string) {
    formData.set("activityOptions", options);
  }

  // validate layout inputs
  function validateForm(): { status: boolean, message: string } {

    if (!formData.get("activityTitle")!.toString().trim()) { // not null assertion
      return { status: false, message: "Title is required." };
    }
    if (!formData.get("description")!.toString().trim()) {
      return { status: false, message: "Description is required." };
    }
    if (!formData.get("coverImage")!.toString().trim()) {
      return { status: false, message: "Cover Image is required." };
    }

    let vt = props.validateTemplate()
    if (!vt.status) {
      return { status: false, message: vt.message };
    }

    return { status: true, message: "" };

  }

  // save template
  function handleSave() {

    // validate form
    let valid = validateForm();

    if (!valid.status) {
      Swal.fire({
        title: "Error",
        text: valid.message,
        icon: "error",
      });
      return;
    } else {
      Swal.fire({
        title: "Success",
        text: "Saved successfully",
        icon: "success",
      });
    }

    // append template data
    setTemplateInputs(props.getTemplateInputs());

    // send form


  }

  return (

    <div className="max-w-6xl mx-auto p-4 bg-blue-100">

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
          <div className="w-full h-[2in] object-contain rounded-xl shadow-md border">
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
          onChange={function (e) {
            setDescription(e.target.value);
          }}
        />
      </section>

      {/* template content */}
      {props.children}

      {/* activity options */}
      <section className="mb-16 bg-white p-4 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Activity Options</h2>
        <label className="block font-semibold mb-2">Time Limit</label>
        <input type="number" className="input" placeholder="Time in minutes" />
        <label className="block font-semibold mb-2">Is graded</label>
        <input type="checkbox" className="input" />
      </section>

      {/* footer */}
      <footer className="fixed bottom-0 left-0 w-full flex justify-end p-4 bg-white shadow">
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
