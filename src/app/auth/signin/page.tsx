"use client";

import PandaEar from '@/components/signin/PandaEar';
import PandaFace from '@/components/signin/PandaFace';
import PandaHand from '@/components/signin/PandaHand';
import PandaPaw from '@/components/signin/PandaPaw';
import React, { useState, useEffect,useContext } from 'react';
import { clientAuth } from "@/lib/firebaseClient";
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import { redirect, useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { AuthContext } from "@/contexts/AuthProvider";
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export default function PandaSignIn() {
  
  const { userID, email, userType, role, status, user } = useContext(AuthContext);
  
  // Panda
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  // Reset panda styles when clicking outside inputs
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('#email') && !target.closest('#password')) {
        setIsEmailFocused(false);
        setIsPasswordFocused(false);
      } 
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);
  
  // Login
  const router = useRouter();
  
  const [uEmail, setUEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  
  // Already logged in
  useEffect(() => {
    if (user && userType && status === "ACTIVE" && user.emailVerified) redirect("/" + userType.toLowerCase());
  }, [user]);
  
  // Google login
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      await signInWithPopup(clientAuth, provider);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Google login failed");
    }
  };

  // Email login
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { user } = await signInWithEmailAndPassword(clientAuth, uEmail, password);
      if (!user.emailVerified) {
        await sendEmailVerification(user);
        setMessage("Verification email sent. Please check your inbox.");
      } else {
        setMessage("Login successful! Redirecting...");
        redirect("/" + userType?.toLowerCase());
      }
      setError(null);
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  };
  
  // Handle password reset
  async function handlePasswordReset() {
    if (!uEmail) {
      setError("No email provided. Please enter your email first.");
      return;
    }
    try{
      await sendPasswordResetEmail(clientAuth, uEmail);
      setMessage("Password reset email sent. Please check your inbox");
      setError(null);
    } catch (err: any) {
      setError("Failed to send reset email");
    }
  };

  return (
    <div className="min-h-screen bg-[#8e70e6] flex items-center justify-center p-4 font-poppins">
      <div className="relative w-[31.25rem] h-[31.25rem]">
        
         {/*TODO: Implement error message popup*/}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {message && <p className="text-green-600 text-center mb-4">{message}</p>}
        
        {/* Panda Face */}
        <PandaFace isEmailFocused={isEmailFocused} />
        
        {/* Panda Ears */}
        <PandaEar />
        
        {/* Panda Hands */}
        <PandaHand isPasswordFocused={isPasswordFocused} />
        
        {/* Panda paws */}
        <PandaPaw />
        
        {/* Form */}
        <form onSubmit={handleEmailLogin} className="pt-10 pb-4 absolute top-[9.5rem] left-1/2 -translate-x-1/2 w-[23.75rem] h-[22rem] bg-white rounded-lg p-12 flex flex-col justify-center z-50">
          
          {/* Google Login */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="cursor-pointer flex items-center justify-center gap-3 w-full px-6 py-3 bg-gray-200 text-black rounded-lg hover:bg-red-600 transition mb-4"
          >
            <FontAwesomeIcon icon={faGoogle as IconProp} />
            Sign in with Google
          </button>
          
          {/* Email Login */}
          <label htmlFor="email" className="block mb-1 font-semibold text-[#2e0d30]">
            Enter your Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            className="text-[0.95rem] font-normal text-[#3f3554] p-1 border-b-2 border-[#3f3554] outline-none focus:border-[#71c418] placeholder-[#b4b5b3] mb-4"
            value={uEmail}
            onChange={(e) => setUEmail(e.target.value)}
            onFocus={() => {
              setIsEmailFocused(true);
              setIsPasswordFocused(false);
            }}
          />
          
          {/* Password Input */}
          <label htmlFor="password" className="block mb-1 font-semibold text-[#2e0d30]">
            Enter your Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            className="text-[0.95rem] font-normal text-[#3f3554] p-1 border-b-2 border-[#3f3554] outline-none focus:border-[#71c418] placeholder-[#b4b5b3] mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => {
              setIsEmailFocused(false);
              setIsPasswordFocused(true);
            }}
          />
          
          <button type="submit" className="text-[0.95rem] p-2 w-[18.6rem] rounded bg-[#c41857] text-white uppercase font-semibold cursor-pointer tracking-wider mt-2 hover:bg-[#a31447]">
            Login
          </button>
          
          <p className="text-center text-sm text-gray-500 mt-1 mb-6">
            Forgot Password?{" "}
            <button className="text-blue-600 hover:underline" onClick={handlePasswordReset}>
              Reset Password
            </button>
          </p>
          
        </form>
      </div>
    </div>
  );
};
