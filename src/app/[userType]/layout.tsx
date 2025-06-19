"use client";

import { useState, FormEvent, useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import useUserType from '@/hooks/useUserType';
import Link from 'next/link';

export default function Layout(props: any) {
  
  // user type
  const { userType, setUserType } = useAuth();
  
  const uType = useUserType();
  
  useEffect(() => {
    setUserType(uType);
  }, []);
  
  return (
    
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
      {props.children}
      </div>
    </div>
  );
};
