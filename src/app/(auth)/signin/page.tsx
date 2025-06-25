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
import cleanParams from '@/lib/utils/cleanParams';

export default function Signup() {
  
  const searchParams = useSearchParams();
  const userType = searchParams.get("userType") as UserType;
  
  const [formData, setFormData] = useState({
    email: undefined,
    password: undefined,
  });
  
  function validateForm(): {status: boolean, message: string} {
    return {status: true, message: ""} 
  }
  
  function finalizeForm(): {form: string, params: URLSearchParams} {
    
    // form
    const form = {
      ...formData,
    };
    
    // params
    const params = cleanParams({ 
      userType: userType
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
    
    const url = `/api/signin?${form.params}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
      },
      body: form.form
    })
    
    console.log(res.body);
    
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


