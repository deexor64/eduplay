"use client";

import { useState, FormEvent} from 'react';
import Link from 'next/link';
import Title from '@/components/shared/form/Title';
import TextInput from '@/components/shared/form/TextInput';
import PasswordInput from '@/components/shared/form/PasswordInput';
import SubmitButton from '@/components/shared/form/SubmitButton';
import EmailInput from '@/components/shared/form/EmailInput';
import Swal from 'sweetalert2';
import NumberInput from '@/components/shared/form/NumberInput';
import PhoneInput from '@/components/shared/form/PhoneInput';
import DateInput from '@/components/shared/form/DateInput';
import GroupTitle from '@/components/shared/form/GroupTitle';
import { useSearchParams } from 'next/navigation';
import { UserType } from '@/lib/utils/types';

export default function Signup() {
  
  const userType = useSearchParams().get("userType") as UserType; 
  
  const [formData, setFormData] = useState({
    email: undefined,
    password: undefined,
  });
  
  function validateForm(): {status: boolean, message: string} {
    
    return {status: true, message: ""}
    
  }
  
  function finalizeForm(): string {
    
    // remove unused fields
    // undefined fileds are stripped at stringify
    let form = formData;
    
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

      <Title> Sign In <br/> as 
        {(userType == "ADMIN") &&  " Admin"}
        {(userType == "TEACHER") &&  " Teacher"}
        {(userType == "PARENT") &&  " Parent"} </Title>

      <EmailInput label="E-mail" name="email" setFormData={setFormData} /> 
      
      <PasswordInput label="Password" name="password" setFormData={setFormData} />
      
      <SubmitButton>SignIn</SubmitButton>
      
      <Link
        href="/forgot-password"
        className="text-blue-500 hover:underline text-sm"
      >
        Forgot Password?
      </Link>
        
    </form>
    
  );
};


