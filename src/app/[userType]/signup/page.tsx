"use client";

import { useState, FormEvent} from 'react';
import { useParams } from "next/navigation";
import Link from 'next/link';
import Title from '@/components/form/Title';
import TextInput from '@/components/form/TextInput';
import PasswordInput from '@/components/form/PasswordInput';
import SubmitButton from '@/components/form/SumbitButton';
import Swal from 'sweetalert2';
import NumberInput from '@/components/form/NumberInput';
import { ReqType } from '@/utils/types';


export default function Signup() {
  
  const userType = useParams().userType;
  
  const [formData, setFormData] = useState({
    indexNumber: "",
    fullName: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });
  
  function validateForm(): {status: boolean, message: string} {
    
    if (formData.fullName.length < 1 ||
      formData.fullName.length > 255) {
        return {status: false, message: "Full name is required"};
      }
    
    // if (formData.userName.length < 1 ||
    //   formData.userName.length > 255) {
    //     console.log(formData.userName.length)
    //     return {status: false, message: "Username is required"};
    //   }
    
    if (formData.password.length < 8 ||
      formData.password.length > 255) {
        return {status: false, message: "Password is required"};
      }
    
    return {status: true, message: ""}
    
  }
  
  function finalizeForm(): string {
    
    // remove confirm password field
    let form: ReqType = {
      userType: userType + "",
      formData: {
        indexNumber: formData.indexNumber,
        fullName: formData.fullName,
        firstName: formData.firstName,
        lastName: formData.lastName,
        password: formData.password
      }
    }
    
    // create form
    return JSON.stringify(form);
    
  }

  function handleSubmit (e: FormEvent<HTMLFormElement>) {
    
    e.preventDefault();
    
    // validate
    let valid = validateForm();
    if (!valid.status) {
      Swal.fire({
        title: "Error",
        text: valid.message,
        icon: "error",
      });
      return;
    }
    
    // finalize
    let form = finalizeForm();
    
    // submit
    fetch("/api/signup", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
        },
      body: form
    })
    .then(function (res) {
      console.log(res.body);
      if (!res.ok) {
        Swal.fire({
          title: "Error",
          text: "not okay",
          icon: "error",
        });
      } else {
        Swal.fire({
          title: "Success",
          text: "okayy",
          icon: "success",
        });
      }
      return res.json();
    })
    .then(function (data) {
      console.log(data);
    })
    .catch(function (err) {
      console.log(err.message);
    });
    
  };

  return (
    
    <form onSubmit={handleSubmit}>
      
      <Title>Sign Up</Title>
      
      <NumberInput label="Index number" name="indexNumber" setFormData={setFormData} />

      <TextInput label="Full Name" name="fullName" setFormData={setFormData} />

      <TextInput label="First Name" name="firstName" setFormData={setFormData} />
      
      <TextInput label="Last Name" name="lastName" setFormData={setFormData} />

      <PasswordInput label="Password" name="password" setFormData={setFormData} />
      
      <PasswordInput label="Confirm Password" name="confirmPassword" setFormData={setFormData} />

      <SubmitButton>Sign Up</SubmitButton>
        
    </form>
    
  );
};
