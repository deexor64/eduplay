import { useState } from "react";
import InputField from "./InputField"
import FormWrapper from "./FormWrapper"
import "./SignupForm.css";

function SignupLayout() {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const [errors, setErrors] = useState({
    username: "",
    password: ""
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.name;
    const value = e.target.value;

    setFormData({
      ...formData,
      [name]: value
    });

    setErrors({
      ...errors,
      [name]: ""
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    let newErrors = { username: "", password: "" };
    let valid = true;

    if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters.";
      valid = false;
    }

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      console.log("Form submitted:", formData);
    }
  }

  return (
    <FormWrapper title="Signup" onSubmit={handleSubmit}>
      <InputField
        label="Username"
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        error={errors.username}
      />
      <InputField
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
      />
    </FormWrapper>
  );
}

export default SignupLayout;
