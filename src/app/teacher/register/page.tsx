"use client";

import { useState, FormEvent, useContext } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { TeacherRole, UserStatus, UserType } from "@prisma/client";
import NavigatorLayout from "@/components/navigator/NavigatorLayout";
import Title from "@/components/shared/headings/Title";
import InputField from "@/components/register/InputField";
import OptionField from "@/components/register/OptionField";
import FileUpload from "@/components/register/FileUpload";
import RegisterLog from "@/components/register/RegisterLog";
import cleanParams from "@/lib/utils/cleanParams";
import parseExcel from "@/lib/utils/parseExcel";
import toSentenceCase from "@/lib/utils/toSentenceCase";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthContext } from "@/contexts/AuthProvider";
import Unauthorized from "@/components/shared/loading/Unauthorized";

export default function Register() {
  
  const { userID, email, userType, role, status, user } = useContext(AuthContext);
  if (role != TeacherRole.ADMIN || status != UserStatus.ACTIVE) {
    return <Unauthorized />;
  }

  const searchParams = useSearchParams();
  const userRegisterType = searchParams.get("userType") as UserType;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    indexNumber: "",
    role: "Demonstrator",
    grade: "1",
  });

  const [isBulk, setIsBulk] = useState(false);
  const [bulkFile, setBulkFile] = useState<File | null>(null);
  const [inputError, setInputError] = useState<string | null>(null);
  const [logs, setLogs] = useState<{ type: 'info' | 'error' | 'success'; message: string; timestamp: Date }[]>([]);

  function addLog(type: 'info' | 'error' | 'success', message: string) {
    setLogs(prev => [...prev, { type, message, timestamp: new Date() }]);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  }

  function validateRegisterForm(): { status: boolean; message: string } {

    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setInputError("email");
      return { status: false, message: "Please enter a valid email address" };
    }

    // Password strength validation
    if (formData.password && formData.password.length < 8) {
      setInputError("password");
      return { status: false, message: "Password must be at least 8 characters long" };
    }

    return { status: true, message: "" };

  }

  function finalizeRegisterForm(): string {

    let form: any = { ...formData };

    if (userRegisterType === "TEACHER") {
      delete form.grade;
    } else if (userRegisterType === "STUDENT") {
      delete form.role;
    }

    // single record enclosed in an array
    return JSON.stringify([form]);

  }

  async function handleSubmit(e?: FormEvent<HTMLFormElement>) {

    e?.preventDefault();

    // userData
    let form: string = "";

    // Bulk register
    if (isBulk && bulkFile) {
      
      // Use parser with Signup Record
      // Array of records
      try {
        form = userRegisterType === "TEACHER" ? JSON.stringify(await parseExcel(bulkFile)) 
          : JSON.stringify(await parseExcel(bulkFile));
      } catch (err: any) {
        addLog('error', err.toString());
        return;
      }
      
      // Individual register
    } else {

      const valid = validateRegisterForm();
      if (!valid.status) {
        addLog('error', valid.message);
        return;
      }

      // Array but single record
      form = finalizeRegisterForm();

    }

    // Submit
    toast.promise(async () => {

      const url = `/api/register?userRegisterType=${userRegisterType}`;
      const token = await user?.getIdToken();
      const res = await fetch(url, {
        method: "POST",
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json" 
        },
        body: form,
      });

      const resData = await res.json();
      if (!resData.status) {
        addLog('error', `Registration was unsuccessful. Check the message below. `);
        addLog('info', resData.data);
        throw new Error("Registration was unsuccessful");
      }

      // Generate user summary
      addLog('success', `Registration is successful. View summary below. `);
      addLog('info', resData.data);

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        indexNumber: "",
        role: "Demonstrator",
        grade: "1",
      });

      // Remove file
      setBulkFile(null);

    },
    {
      loading: "Processing...This may take some time",
      success: "Registration successful",
      error: "Failed to register",
    })

  }

  return (

    <NavigatorLayout>

      {/* Title */}
      <Title title={`Add ${toSentenceCase(userRegisterType)}s`} back={true} />

      {/* Main */}
      <div className="min-h-[calc(100vh-500px)] bg-blue-300 p-6 relative">
        <div className="flex gap-6 max-w-7xl mx-auto min-h-dvh">

          {/* Action log */}
          <div className="w-2/3 bg-gray-900 rounded-2xl shadow-lg p-6">
            <div className="flex" >
              <h2 className="text-xl font-bold text-white mb-4">Action Log</h2>
              
              {/*Clear log*/}
              <button
                onClick={() => setLogs([])}
                className="text-red-600 hover:cursor-pointer hover:text-red-500 transition-colors ml-auto"
                title="Clear Logs"
              >
                <FontAwesomeIcon icon={faTrash} className="text-xs w-4 h-4" />
              </button>
            </div>
            
            {/*Log*/}
            <div className="h-full overflow-y-auto space-y-2">
              {logs.length === 0 ? (
                <p className="text-gray-400 text-sm">No logs yet...</p>
              ) : (
                logs.map((log, index) => (
                  <RegisterLog key={index} type={log.type} message={log.message} timestamp={log.timestamp} />
                ))
              )}

            </div>
          </div>

          {/* Form */}
          <div className="w-1/3">

            {/* Bulk switcher */}
            <button
              className="inline-flex items-center justify-center font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2
              transition-colors duration-200 w-full  px-4 py-3 text-sm bg-blue-600 text-white  hover:bg-blue-700  focus:ring-blue-500 mb-3"
              onClick={() => { setIsBulk(!isBulk) }}
            >
              {isBulk ? "< Manual register" : "Bulk register >"}
            </button>

            <div className="bg-white rounded-2xl shadow-lg p-8">

              {/* Manual Form */}
              {!isBulk && (
                <form onSubmit={handleSubmit} className="space-y-6">

                  <h2 className="text-2xl font-bold mb-4 bg-emerald-200 rounded p-2">Personal Details</h2>

                  <InputField
                    label="First Name"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    error={inputError}
                    onChange={(e) => handleInputChange(e)}
                    required
                    placeholder="Enter first name"
                  />

                  <InputField
                    label="Last Name"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    error={inputError}
                    onChange={(e) => handleInputChange(e)}
                    required
                    placeholder="Enter last name"
                  />

                  <InputField
                    label="Index Number"
                    name="indexNumber"
                    type="text"
                    value={formData.indexNumber}
                    error={inputError}
                    onChange={(e) => handleInputChange(e)}
                    required
                    placeholder="Enter the index number"
                  />
                  
                  {userRegisterType === "TEACHER" && (
                    <OptionField
                      label="Role"
                      name="role"
                      type="text"
                      values={Object.values(TeacherRole).map(val => toSentenceCase(val)).reverse()}
                      error={inputError}
                      onChange={(e) => handleInputChange(e)}
                      required
                    />
                  )}
                  
                  {userRegisterType === "STUDENT" && (
                    <OptionField
                      label="Grade"
                      name="grade"
                      type="text"
                      values={Object.values(["1", "2", "3", "4", "5"])}
                      error={inputError}
                      onChange={(e) => handleInputChange(e)}
                      required
                    />
                  )}

                  <InputField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    error={inputError}
                    onChange={(e) => handleInputChange(e)}
                    required
                    placeholder="your.email@example.com"
                  />

                  <InputField
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    error={inputError}
                    onChange={(e) => handleInputChange(e)}
                    required
                    placeholder="At least 6 characters"
                  />

                  <button type="submit" className="inline-flex items-center justify-center font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2
                    transition-colors duration-200 w-full  px-4 py-3 text-sm bg-blue-600 text-white  hover:bg-blue-700  focus:ring-blue-500 mb-3"
                  >
                    Register
                  </button>

                </form>
              )}

              {/* Bulk Upload */}
              {isBulk && (<>

                {/*description*/}
                <p className="text-sm text-gray-600">Select a .xlsx or .xls file containing user data</p>

                <div className="space-y-2">

                  <label className="block text-sm font-medium text-gray-700">
                    Excel File
                  </label>

                  <FileUpload
                    handleUpload={(file: File | null) => {
                      if (!file) {
                        addLog('info', `No file selected`);
                        return;
                      }

                      setBulkFile(file);
                      addLog('info', `Selected file: ${file.name}`);

                    }}
                  />

                  <button
                    className="inline-flex items-center justify-center font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2
                    transition-colors duration-200 w-full  px-4 py-3 text-sm bg-blue-600 text-white  hover:bg-blue-700  focus:ring-blue-500 mb-3"
                    onClick={() => handleSubmit()}
                  >
                    Register
                  </button>

                </div>
              </>)}
            </div>

          </div>
        </div>
      </div>
    </NavigatorLayout>
  );
}
