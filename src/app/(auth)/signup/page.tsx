"use client";

import { useState, FormEvent} from 'react';
import Link from 'next/link';
import Title from '@/components/shared/form/Title';
import TextInput from '@/components/shared/form/TextInput';
import PasswordInput from '@/components/shared/form/PasswordInput';
import SubmitButton from '@/components/shared/form/SubmitButton';
import EmailInput from '@/components/shared/form/EmailInput';
import NumberInput from '@/components/shared/form/NumberInput';
import PhoneInput from '@/components/shared/form/PhoneInput';
import DateInput from '@/components/shared/form/DateInput';
import GroupTitle from '@/components/shared/form/GroupTitle';
import { UserType } from '@/lib/utils/types';
import { useSearchParams } from 'next/navigation';
import cleanParams from '@/lib/utils/cleanParams';

export default function Signup() {
  
  const searchParams = useSearchParams();
  const userType = searchParams.get("userType") as UserType;
  
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
  
  function finalizeForm(): {form: string, params: URLSearchParams} {
    
    // form
    const form = {
      ...formData,
    };
    
    delete form.confirmPassword;
    
    // params
    const params = cleanParams({ 
      userType: userType,
    })
    
    return {
      form: JSON.stringify(form),
      params: new URLSearchParams(params)
    }
    
  }
  
  async function handleSubmit (e: FormEvent<HTMLFormElement>) {
    
    e.preventDefault();
    
    // validate
    const valid = validateForm();
    console.log(valid);
    
    // submit
    const form = finalizeForm();
    
    const url = `/api/users?${form.params}`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: form.form
    });
    
    const resData = await res.json();
    console.log(resData);

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
