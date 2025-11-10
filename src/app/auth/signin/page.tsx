"use client";

import PandaEar from '@/components/signin/PandaEar';
import PandaFace from '@/components/signin/PandaFace';
import PandaHand from '@/components/signin/PandaHand';
import PandaPaw from '@/components/signin/PandaPaw';
import React, { useState, useEffect,useContext } from 'react';
import styles from './signin.module.css';
import { clientAuth } from "@/lib/firebaseClient";
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import { redirect } from "next/navigation";
import { AuthContext } from "@/contexts/AuthProvider";
import DialogueCloud from '@/components/register/DialogueCloud';

export default function PandaSignIn() {
  
  const { userID, email, userType, role, status, user } = useContext(AuthContext);
  
  // Panda
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  // Reset panda styles when clicking outside inputs
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      
      const target = e.target as HTMLElement;
      
      // Panda
      if (!target.closest('#email') && !target.closest('#password')) {
        setIsEmailFocused(false);
        setIsPasswordFocused(false);
      }
      
      // Message
      if (!target.closest('#login-form')) {
        setMessage(null);
      }
      
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
    
  }, []);
  
  // Login 
  const [uEmail, setUEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<{message: string, type: 'success' | 'error' | 'normal'} | null>(null);
  
  // Already logged in
  useEffect(() => {
    if (user && userType && status === "ACTIVE" && user.emailVerified) redirect("/" + userType.toLowerCase() + "/activities");
  }, [user]);
  
  // Google login
  async function handleGoogleLogin() {
    
    setMessage({message: "Let me check...", type: "normal"});
    
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "Select your Account" });
      await signInWithPopup(clientAuth, provider);
    } catch (err: any) {
      setMessage({message: "Ooops! Google login failed", type: "error"});
    }
    
  };

  // Email login
  async function handleEmailLogin(e: React.FormEvent) {
    
    e.preventDefault();
    setMessage({message: "Let me check...", type: "normal"});
    
    // Empty email and password
    if (!uEmail) {
      setMessage({message: "Your Email looks empty", type: "normal"});
      return;
    } else if (!password) {
      setMessage({message: "You forgot to enter the Password", type: "normal"});
      return;
    }
    
    // Try login user
    try {
      const { user } = await signInWithEmailAndPassword(clientAuth, uEmail, password);
      if (!user.emailVerified) {
        await sendEmailVerification(user);
        setMessage({message: "We sent you a verification email, Check your inbox", type: "success"});
      } else {
        const claims = (await user.getIdTokenResult()).claims;
        await Promise.resolve(setTimeout(() => redirect("/" + (claims.userType! as string).toLowerCase()), 1500)); // wait a bit
        setMessage({message: "Voilà! That worked", type: "success"});
      }
    } catch (err: any) {
      setMessage({message: "Ooops! Your Email or Password is wrong", type: "error"});
    }
    
  };
  
  // Handle password reset
  async function handlePasswordReset() {
    
    setMessage({message: "Let me check...", type: "normal"});
    
    if (!uEmail) {
      setMessage({message: "Enter your email first, We will help you", type: "normal"});
      return;
    }
    
    try{
      await sendPasswordResetEmail(clientAuth, uEmail);
      setMessage({message: "Password reset email sent, Please check your inbox", type: "success"});
    } catch (err: any) {
      setMessage({message: "Ooops! Failed to reset your password", type: "error"});
    }
    
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center p-4 font-poppins">

      {/* Animated background symbols (non-interactive) */}
      <div className={styles.signinBackground} aria-hidden="true">
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i}><span></span></div>
        ))}
      </div>
      
      <div className="relative w-[31.25rem] h-[31.25rem]">
        
        {message && <DialogueCloud message={message} />}
        
        {/* Panda Face */}
        <PandaFace isEmailFocused={isEmailFocused} />
        
        {/* Panda Ears */}
        <PandaEar />
        
        {/* Panda Hands */}
        <PandaHand isPasswordFocused={isPasswordFocused} />
        
        {/* Panda paws */}
        <PandaPaw />
        
        {/* Form */}
        <form id="login-form" onSubmit={handleEmailLogin}
          className="pt-10 pb-4 absolute top-[9.5rem] left-1/2 -translate-x-1/2 w-[23.75rem] h-[22rem] bg-teal-100/50 rounded-lg p-12 
            flex flex-col justify-center z-50 border-2 border-fuchsia-400 shadow-lg shadow-fuchsia-500/40 backdrop-blur-md">

          {/* Google Login */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="cursor-pointer flex items-center justify-center gap-5 w-full py-2 bg-red-300 text-black rounded-lg hover:bg-red-400 transition mb-4"
          >
            <svg width="35" height="35" viewBox="0 0 32 32" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M23.75,16A7.7446,7.7446,0,0,1,8.7177,18.6259L4.2849,22.1721A13.244,13.244,0,0,0,29.25,16" fill="#00ac47"></path><path d="M23.75,16a7.7387,7.7387,0,0,1-3.2516,6.2987l4.3824,3.5059A13.2042,13.2042,0,0,0,29.25,16" fill="#4285f4"></path><path d="M8.25,16a7.698,7.698,0,0,1,.4677-2.6259L4.2849,9.8279a13.177,13.177,0,0,0,0,12.3442l4.4328-3.5462A7.698,7.698,0,0,1,8.25,16Z" fill="#ffba00"></path><polygon fill="#2ab2db" points="8.718 13.374 8.718 13.374 8.718 13.374 8.718 13.374"></polygon><path d="M16,8.25a7.699,7.699,0,0,1,4.558,1.4958l4.06-3.7893A13.2152,13.2152,0,0,0,4.2849,9.8279l4.4328,3.5462A7.756,7.756,0,0,1,16,8.25Z" fill="#ea4435"></path><polygon fill="#2ab2db" points="8.718 18.626 8.718 18.626 8.718 18.626 8.718 18.626"></polygon><path d="M29.25,15v1L27,19.5H16.5V14H28.25A1,1,0,0,1,29.25,15Z" fill="#4285f4"></path></g></svg>
            <span>Sign in with Google</span>
          </button>
          
          {/* Email Login */}
          <label htmlFor="email" className="block mb-1 font-semibold text-[#2e0d30]">
            Enter your Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            className="rounded text-[0.95rem] font-normal text-[#3f3554] p-1 border-b-2 border-[#3f3554] outline-none  placeholder-[#b4b5b3] mb-4"
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
            className="rounded text-[0.95rem] font-normal text-[#3f3554] p-1 border-b-2 border-[#3f3554] 
            outline-none placeholder-[#b4b5b3] mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => {
              setIsEmailFocused(false);
              setIsPasswordFocused(true);
            }}
          />
          
          <button type="submit" className="text-[0.95rem] p-2 w-full rounded bg-red-400 text-white 
            uppercase font-semibold cursor-pointer tracking-wider mt-2 hover:bg-red-500">
            Login
          </button>
          
          <p className="text-center text-sm text-gray-500 mt-1 mb-6">
            Forgot Password?{" "}
            <button type="button" className="text-blue-600 cursor-pointer" 
              onClick={handlePasswordReset}>
              Reset Password
            </button>
          </p>
          
        </form>
      </div>
    </div>
  );
};
