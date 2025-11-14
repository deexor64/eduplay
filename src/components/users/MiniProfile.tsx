import toSentenceCase from "@/lib/utils/toSentenceCase";
import { TeacherRole, UserType } from "@prisma/client";
import { useState } from "react";

interface MiniProfileProps {
  showPreview: boolean;
  setShowProfile: React.Dispatch<React.SetStateAction<boolean>>;
  userType: UserType;
  user: {
    userID: string;
    name: string;
    email: string;
    indexNumber: string;
    role?: TeacherRole;
    grade?: 1 | 2 | 3 | 4 | 5;
  };
  handleUpdateUserInfo: Function;
}

export default function MiniProfile(props: MiniProfileProps) {
  
  const { showPreview, setShowProfile, userType, user, handleUpdateUserInfo } = props;

  if (!showPreview) return null;
  

  const [formData, setFormData] = useState({
    email: user.email,
    indexNumber: user.indexNumber,
    role: user.role || "",
    grade: user.grade || "",
  });

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) setShowProfile(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: (name == "grade" ? parseInt(value): value) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleUpdateUserInfo(user.userID, formData);
    setShowProfile(false);
  };

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/50"
      onClick={handleOverlayClick}
    >
      <div className="z-50 bg-white border border-gray-200 rounded-2xl shadow-xl p-6 w-[420px] h-auto flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">{user.name}</h2>
          <button
            onClick={() => setShowProfile(false)}
            className="text-gray-500 hover:text-gray-700 transition cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-4 flex-1" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Index Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Index Number
            </label>
            <input
              type="text"
              name="indexNumber"
              value={formData.indexNumber}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Conditional: Teacher role */}
          {userType === "TEACHER" && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                {Object.values(TeacherRole).map((val) => {
                  return <option key={val} value={val}>{toSentenceCase(val)}</option>;
                })}
              </select>
            </div>
          )}

          {/* Conditional: Student grade */}
          {userType === "STUDENT" && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Grade
              </label>
              <select
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                {[1, 2, 3, 4, 5].map((val) => {
                  return <option key={val} value={val}>{val}</option>;
                })}
              </select>
            </div>
          )}

          {/* Buttons */}
          <div className="mt-6 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowProfile(false)}
              className="px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
