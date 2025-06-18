"use client";

import { useState, FormEvent } from 'react';
import Link from 'next/link';

export default function Layout(props: any) {
  
  return (
    
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
      {props.children}
      </div>
    </div>
  );
};
