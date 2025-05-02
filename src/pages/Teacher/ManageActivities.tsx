import React, { useState, useRef, useEffect } from "react";

type Activity = {
  activityID: string;
  name: string;
  type: string;
  grade: string;
  subject: string;
  date: string; // Format: "YYYY-MM-DD"
  coverIcon: string;
  previewImage: string;
};

function ManageActivities() {

  const [filterType, setFilterType] = useState("");
  const [filterGrade, setFilterGrade] = useState("");
  const [filterSubject, setFilterSubject] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [previewPosition, setPreviewPosition] = useState<{ top: number; left: number } | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const activities: Activity[] = [
    {
      activityID: "a1",
      name: "Animal Match - Grade 1",
      type: "Drag and Drop",
      grade: "1",
      subject: "Science",
      date: "2025-04-22",
      coverIcon: "/icons/animal-match.png",
      previewImage: "/previews/animal-match-preview.png",
    },
    {
      activityID: "a2",
      name: "Basic Puzzle",
      type: "Puzzle",
      grade: "2",
      subject: "Math",
      date: "2025-04-24",
      coverIcon: "/icons/puzzle.png",
      previewImage: "/previews/puzzle-preview.png",
    },
    {
      activityID: "a3",
      name: "Fill Blanks - Alphabet",
      type: "Fill Blanks",
      grade: "1",
      subject: "English",
      date: "2025-04-30",
      coverIcon: "/icons/fill-blanks.png",
      previewImage: "/previews/fill-blanks-preview.png",
    },
    // ... more
  ];

  function handlePreviewToggle(imageUrl: string, buttonElement: HTMLButtonElement) {
    if (previewImage === imageUrl) {
      setPreviewImage("");
      closePreview();
    } else {
      const rect = buttonElement.getBoundingClientRect();
      const newPosition = {
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX - 200,
      };
      setPreviewImage(imageUrl);
      setPreviewPosition(newPosition);
    }
  }

  function closePreview() {
    setPreviewPosition(null);
  }

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value.toLowerCase());
  }

  function getFilteredActivities() {
    return activities.filter(function (activity) {
      const matchesType = filterType === "" || activity.type === filterType;
      const matchesGrade = filterGrade === "" || activity.grade === filterGrade;
      const matchesSubject = filterSubject === "" || activity.subject === filterSubject;
      const matchesDate = filterDate === "" || activity.date === filterDate;
      const matchesSearch = activity.name.toLowerCase().includes(searchTerm);
      return matchesType && matchesGrade && matchesSubject && matchesDate && matchesSearch;
    });
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (previewRef.current && !previewRef.current.contains(event.target as Node)) {
        closePreview();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4 pb-14 min-h-full bg-gradient-to-br bg-yellow-100 to-purple-100
      relative flex justify-center">
      <div className="w-4/5 p-6">
        {/* Filters */}
        <div className="mb-6 grid grid-cols-2 md:grid-cols-5 gap-4">
          <select className="border rounded px-3 py-1 bg-white text-purple-700" onChange={function (e) { setFilterType(e.target.value); }}>
            <option value="">All Types</option>
            <option value="Drag and Drop">Drag and Drop</option>
            <option value="Puzzle">Puzzle</option>
            <option value="Fill Blanks">Fill Blanks</option>
          </select>

          <select className="border rounded px-3 py-1 bg-white text-purple-700" onChange={function (e) { setFilterGrade(e.target.value); }}>
            <option value="">All Grades</option>
            <option value="1">Grade 1</option>
            <option value="2">Grade 2</option>
            <option value="3">Grade 3</option>
          </select>

          <select className="border rounded px-3 py-1 bg-white text-purple-700" onChange={function (e) { setFilterSubject(e.target.value); }}>
            <option value="">All Subjects</option>
            <option value="Math">Math</option>
            <option value="Science">Science</option>
            <option value="English">English</option>
          </select>

          <input
            type="date"
            className="border rounded px-3 py-1 bg-white text-purple-700"
            onChange={function (e) { setFilterDate(e.target.value); }}
          />

          <input
            type="text"
            placeholder="Search activities..."
            className="border rounded px-3 py-1 bg-white text-purple-700"
            onChange={handleSearchChange}
          />
        </div>

        {/* Activity Cards */}
        <div className="space-y-4">
          {getFilteredActivities().map(function (activity) {
            return (
              <div
                key={activity.activityID}
                className="border border-yellow-300 bg-white rounded-lg p-4 flex items-center shadow hover:shadow-lg transition
                  cursor-pointer hover:bg-yellow-50 justify-between relative"
              >
                <div className="flex items-center">
                  <img
                    src={activity.coverIcon}
                    alt="Cover Icon"
                    className="w-16 h-16 mr-4 rounded border border-gray-300 bg-white"
                  />
                  <div>
                    <div className="text-lg font-semibold text-purple-800">{activity.name}</div>
                    <div className="text-sm text-yellow-600">
                      {activity.type} • Grade {activity.grade} • {activity.subject}
                    </div>
                    <div className="text-xs text-gray-600">Created on: {activity.date}</div>
                  </div>
                </div>
                <button
                  className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded"
                  onClick={function (e) {
                    e.stopPropagation();
                    handlePreviewToggle(activity.previewImage, e.currentTarget);
                  }}
                >
                  Preview
                </button>
              </div>
            );
          })}
        </div>

        {/* Popup Preview */}
        {previewImage !== "" && previewPosition && (
          <div
            ref={previewRef}
            className="absolute z-50 bg-white border border-gray-300 rounded shadow-lg"
            style={{
              top: previewPosition.top,
              left: previewPosition.left,
              width: "192px",
              height: "192px",
              padding: "4px"
            }}
          >
            <img
              src={previewImage}
              alt="Preview"
              className="w-full h-full object-contain"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageActivities;
