"use client";

import { useState, FormEvent} from 'react';
import useAuth from '@/hooks/useAuth';
import Link from 'next/link';
import Title from '@/components/form/Title';
import TextInput from '@/components/form/TextInput';
import PasswordInput from '@/components/form/PasswordInput';
import SubmitButton from '@/components/form/SumbitButton';
import EmailInput from '@/components/form/EmailInput';
import Swal from 'sweetalert2';
import NumberInput from '@/components/form/NumberInput';
import { PostReqType } from '@/lib/utils/types';
import PhoneInput from '@/components/form/PhoneInput';
import DateInput from '@/components/form/DateInput';
import GroupTitle from '@/components/form/GroupTitle';

export default function Signup() {
  
  const { userType, setUserType } = useAuth();
  
  const [formData, setFormData] = useState({
    // user
    fullName: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    // admin teacher student
    indexNumber: "",
  });
  
  function validateForm(): {status: boolean, message: string} {
    
    return {status: true, message: ""}
    
  }
  
  function finalizeForm(): string {
    
    let form: PostReqType = {
      userType: userType,
      formData: {
        userType: userType,
        fullName: formData.fullName,
        firstName: formData.firstName,
        lastName: formData.lastName,
        dateOfBirth: formData.dateOfBirth,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
        indexNumber: formData.indexNumber,
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
      
      <Title>Sign Up <br/> as 
        {(userType == "admin") &&  " Admin"}
        {(userType == "teacher") &&  " Teacher"}
        {(userType == "parent") &&  " Parent"}
      </Title>
      
      {/* general info */}
      <GroupTitle>General Info</GroupTitle>

      <TextInput label="Full Name" name="fullName" setFormData={setFormData} />

      <TextInput label="First Name" name="firstName" setFormData={setFormData} />
      
      <TextInput label="Last Name" name="lastName" setFormData={setFormData} />
      
      <DateInput label="Date of Birth" name="dateOfBirth" setFormData={setFormData} />
      
      <EmailInput label="E-mail" name="email" setFormData={setFormData} />
      
      <PhoneInput label="Phone Number" name="phoneNumber" setFormData={setFormData} />

      <PasswordInput label="Password" name="password" setFormData={setFormData} />
      
      <PasswordInput label="Confirm Password" name="confirmPassword" setFormData={setFormData} />
      
      { ["admin", "teacher"].includes(userType) &&
        <>
          {/* professionsal info */}
          <GroupTitle>Special Info</GroupTitle>
          
          <NumberInput label="Index Number" name="indexNumber" setFormData={setFormData} />
        
        </>
      }
            
      <SubmitButton>Sign Up</SubmitButton>
        
    </form>
    
  );
};
