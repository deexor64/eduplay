import { useState } from "react";
import Swal from "sweetalert2";

type LayoutProps = {
  templateTitle: string;
  validateTemplate: Function;
  getTemplateInputs: any;
  children: React.ReactNode;
}

function Layout(props: LayoutProps) {

  // layout inputs
  type LayoutInputs = {
    activityTitle: string;
    description: string;
    coverImage: File | null;
  };

  const [layoutInputs, setLayoutInputs] = useState<LayoutInputs>({
    activityTitle: "",
    description: "",
    coverImage: null
  });

  // layout operations
  function setActivityTitle(title: string) {
    setLayoutInputs(function (prev) {
      return {
        ...prev,
        activityTitle: title
      };
    });
  }

  function setDescription(description: string) {
    setLayoutInputs(function (prev) {
      return {
        ...prev,
        description: description
      };
    });
  }

  function setCoverImage(file: File | null) {
    setLayoutInputs(function (prev) {
      return {
        ...prev,
        coverImage: file
      };
    });
  }

  // validate layout inputs
  function validateLayout(): { status: boolean, message: string } {
    if (!layoutInputs.activityTitle.trim()) {
      return { status: false, message: "Title is required." };
    }
    if (!layoutInputs.description.trim()) {
      return { status: false, message: "Description is required." };
    }
    if (!layoutInputs.coverImage) {
      return { status: false, message: "Cover Image is required." };
    }
    return { status: true, message: "" };
  }


  // send Activity
  function sendActivity() {
    const combinedData = {
      layoutData: layoutInputs,
      templateData: props.getTemplateInputs()
    };

    fetch('https://yourserver.com/api/save-template', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(combinedData)
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(function (data) {
        console.log('Success:', data);
        Swal.fire({
          title: "Success",
          text: "Saved successfully",
          icon: "success",
        });
      })
      .catch(function (error) {
        console.error('Error:', error);
        Swal.fire({
          title: "Error",
          text: "Failed to save data.",
          icon: "error",
        });
      });

  }

  // save template
  function handleSave() {

    let valid = validateLayout();

    if (!valid.status) {
      Swal.fire({
        title: "Error",
        text: valid.message,
        icon: "error",
      });
      return;
    }

    valid = props.validateTemplate();

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
              }
            }}
            className="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 file-input"
          />
        </div>
        {layoutInputs.coverImage && (
          <div className="w-full h-[2in] object-contain rounded-xl shadow-md border">
            <img
              src={URL.createObjectURL(layoutInputs.coverImage)}
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
