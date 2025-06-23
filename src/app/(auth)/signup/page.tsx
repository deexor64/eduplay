"use client";

import { useState, FormEvent} from 'react';
import Link from 'next/link';
import Title from '@/components/form/Title';
import TextInput from '@/components/form/TextInput';
import PasswordInput from '@/components/form/PasswordInput';
import SubmitButton from '@/components/form/SumbitButton';
import EmailInput from '@/components/form/EmailInput';
import Swal from 'sweetalert2';
import NumberInput from '@/components/form/NumberInput';
import PhoneInput from '@/components/form/PhoneInput';
import DateInput from '@/components/form/DateInput';
import GroupTitle from '@/components/form/GroupTitle';
import { UserType } from '@/lib/utils/types';
import { useSearchParams } from 'next/navigation';

export default function Signup() {
  
  const userType = useSearchParams().get("userType") as UserType; 
  
  const [formData, setFormData] = useState({
    fullName: undefined,
    firstName: undefined,
    lastName: undefined,
    dateOfBirth: undefined, // admin teacher
    email: undefined,
    phoneNumber: undefined,
    password: undefined,
    confirmPassword: undefined,
    indexNumber: undefined, // admin teacher
  });
  
  function validateForm(): {status: boolean, message: string} {
    
    return {status: true, message: ""}
    
  }
  
  function finalizeForm(): string {
    
    // remove unused fields
    // undefined fileds are stripped at stringify
    let form = formData;
    
    delete form.confirmPassword;
    
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
    const params = new URLSearchParams({ userType: userType });
    const url = `/api/signup?${params}`;
    fetch(url, {
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
      
      <Title> Sign Up <br/> as 
        {(userType == "ADMIN") &&  " Admin"}
        {(userType == "TEACHER") &&  " Teacher"}
        {(userType == "PARENT") &&  " Parent"} </Title>
      
      {/* general info */}
      <GroupTitle>General Info</GroupTitle>

      <TextInput label="Full Name" name="fullName" setFormData={setFormData} />

      <TextInput label="First Name" name="firstName" setFormData={setFormData} />
      
      <TextInput label="Last Name" name="lastName" setFormData={setFormData} />
      
      { ["ADMIN", "TEACHER"].includes(userType) &&

          <DateInput label="Date of Birth" name="dateOfBirth" setFormData={setFormData} />
                  
      }
      
      <EmailInput label="E-mail" name="email" setFormData={setFormData} />
      
      <PhoneInput label="Phone Number" name="phoneNumber" setFormData={setFormData} />

      <PasswordInput label="Password" name="password" setFormData={setFormData} />
      
      <PasswordInput label="Confirm Password" name="confirmPassword" setFormData={setFormData} />
      
      { ["ADMIN", "TEACHER"].includes(userType) &&
        <>
          {/* professionsal info */}
          <GroupTitle>Special Info</GroupTitle>
          
          <TextInput label="Index Number" name="indexNumber" setFormData={setFormData} />
        
        </>
      }
            
      <SubmitButton>SignUp</SubmitButton>
        
    </form>
    
  );
};
