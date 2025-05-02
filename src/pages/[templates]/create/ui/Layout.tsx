import { useState } from "react";
import Swal from "sweetalert2";

import generateRandomHash from "../../../utils/generateRandomHash";

type templateProps = {
  title: string,
  validateTemplate: Function,
  getTemplateData: Function,
  children: React.ReactNode,
}

type templateForm = {
  title: string,
  coverImage: string, // image hash string
  description: string,
  templateData: string, // json string
  options: string // json string
}

function Layout(props: templateProps) {

  // form data
  // formData variable is used instead of FormData class
  // Otherwise the type checking is a bit hard
  // all the media files are appended to the form varible
  // formData is appended to the form varible after
  // all the type checkings are done
  const [formData, setFormData] = useState<templateForm>({
    title: "",
    coverImage: "",
    description: "",
    templateData: "",
    options: JSON.stringify(
      {
        "timeLimit": 0,
        "isGraded": false
      }
    )
  });

  const [form, setForm] = useState(new FormData());

  // form operations
  // all form operation are done inside a seperate function
  function setTitle(title: string) {
    setFormData(function (prev) { return { ...prev, title: title.trim() } });
  }

  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null);
  function setCoverImage(file: File) {
    // delete old image
    let fileHash = formData.coverImage;
    if (fileHash.length >= 0) {
      setForm(function (prev) {
        prev.delete(fileHash);
        return prev;
      });
    }
    // add new image
    fileHash = generateRandomHash(file.name);

    setFormData(function (prev) { return { ...prev, coverImage: fileHash } });
    setForm(function (prev) {
      prev.append(fileHash, file);
      return prev;
    });
    setCoverImagePreview(URL.createObjectURL(file));

  }

  function setDescription(description: string) {
    setFormData(function (prev) { return { ...prev, description: description.trim() } });
  }

  function setTemplateData(templateData: any) {
    setFormData(function (prev) {
      return {
        ...prev,
        templateData: JSON.stringify(templateData.templateData),
      }
    });
    setForm(function (prev) {
      for (const fileHash in templateData.mediaFiles.keys()) {
        prev.append(fileHash, templateData.mediaFiles[fileHash]);
      }
      return prev;
    });

  }

  function setOptions(option: string, value: any) {
    let options = JSON.parse(formData.options);
    options[option] = value;
    setFormData(function (prev) {
      return { ...prev, options: JSON.stringify(options) }
    });
  }

  // validate template inputs
  function validateTemplate(): { status: boolean, message: string } {

    if (!formData.title) {
      return { status: false, message: "Title is required." };
    }
    if (!formData.coverImage) {
      return { status: false, message: "Cover Image is required." };
    }
    if (!formData.description) {
      return { status: false, message: "Description is required." };
    }

    let validT = props.validateTemplate();
    if (!validT.status) {
      return { status: false, message: validT.message };
    }

    if (!formData.options) { // this check is not required
      return { status: false, message: "Options are required." };
    }

    return { status: true, message: "" };

  }

  // save template
  function handleSave() {

    // validate form
    let valid = validateTemplate();

    if (!valid.status) {
      Swal.fire({
        title: "Error",
        text: valid.message,
        icon: "error",
      });
      return;
    }

    // append template data
    setTemplateData(props.getTemplateData());

    // create form
    setForm(function (prev) {
      prev.append("title", formData.title);
      prev.append("coverImage", formData.coverImage);
      prev.append("description", formData.description);
      prev.append("templateData", formData.templateData);
      prev.append("options", formData.options);
      return prev;
    });

    // request to backend
    // fetch(form);

    Swal.fire({
      title: "Success",
      text: "Saved successfully",
      icon: "success",
    });

    console.log(formData);

  }

  return (

    <div className="max-w-6xl mx-auto p-4 bg-blue-100">
      {/* template title */}
      <header className="mb-6">
        <h2 className="text-xl font-semibold mb-4">{props.title}</h2>
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
          onChange={function (e) { setTitle(e.target.value) }}
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
            onChange={(e) => {
              const file = e.target.files ? e.target.files[0] : null;
              if (file) {
                setCoverImage(file);
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
          onChange={function (e) { setDescription(e.target.value) }}
        />
      </section>

      {/* template content */}
      {props.children}

      {/* activity options */}
      <section className="mb-4 bg-white p-4 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Activity Options</h2>

        <div className="flex flex-row justify-between align-middle text-nowrap gap-4 mt-4">
          <label className="block font-semibold mb-2">Time Limit</label>
          <input
            type="number"
            min="0"
            className="input"
            placeholder="Time in minutes"
            onChange={function (e) { setOptions("timeLimit", e.target.value) }}
          />
        </div>

        <div className="flex flex-row justify-between align-middle text-nowrap gap-4">
          <label className="block font-semibold mb-2">Is graded</label>
          <input
            type="checkbox"
            value="true"
            onChange={function (e) {
              setOptions("isGraded", e.target.value);
            }}
          />
        </div>
      </section>

      {/* footer */}
      <footer className="sticky bottom-0 left-0 w-full flex justify-center gap-4 p-4
        bg-red-200 shadow rounded-lg">
        <button className="font-semibold py-2 px-6 rounded-lg transition
            bg-green-500 text-white hover:bg-green-600">
          Preview
        </button>
        <button className="font-semibold py-2 px-6 rounded-lg transition
          bg-green-500 text-white hover:bg-green-600"
          onClick={handleSave}>
          Save
        </button>
      </footer>
    </div>
  );
}

export default Layout;
