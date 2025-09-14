"use client";

import { useContext, useEffect, useState } from "react";
import { clientAuth } from "@/lib/firebaseClient";
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { redirect } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons"; // ← change here
import { AuthContext } from "@/contexts/AuthProvider";

export default function Signin() {
  
  const { userID, email, userType, role, status, user } = useContext(AuthContext);

  const [uEmail, setUEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  
  // Already logged in
  useEffect(() => {
    if (user && userType && user.emailVerified) redirect("/" + userType.toLowerCase());
  }, [user]);
  
  // Google login
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        
        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-6">Sign In</h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {message && <p className="text-green-600 text-center mb-4">{message}</p>}

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-3 w-full px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition mb-6"
        >
          <FontAwesomeIcon icon={faGlobe} />
          Sign in with Google
        </button>

        <div className="border-b border-gray-300 mb-6"></div>

        {/* Email/Password Login */}
        <form onSubmit={handleEmailLogin} className="flex flex-col gap-4">
          <div className="flex items-center border px-3 py-2 rounded-lg">
            <FontAwesomeIcon icon={faEnvelope} className="text-gray-400 mr-2" />
            <input
              type="email"
              placeholder="Email"
              value={uEmail}
              onChange={(e) => setUEmail(e.target.value)}
              className="flex-1 outline-none"
              required
            />
          </div>
          <div className="flex items-center border px-3 py-2 rounded-lg">
            <FontAwesomeIcon icon={faLock} className="text-gray-400 mr-2" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{" "}
          <a href="/auth/signup" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
        
      </div>
    </div>
  );
}
