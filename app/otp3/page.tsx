"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";



const SubmittingPage = () => {
  // Use explicit typing for state variables
  const [isSubmitting, setIsSubmitting] = useState<boolean>(true); // Submit state (boolean)
  const [isVerificationNeeded, setIsVerificationNeeded] = useState<boolean>(false); // Verification needed state
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hasIdmeAccount, setHasIdmeAccount] = useState<boolean | null>(null); // Account status can be true/false or null initially
  const router = useRouter();

  // Simulate submission process for 7 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSubmitting(false);
      setIsVerificationNeeded(true); // After 7 seconds, prompt for more info
    }, 7000); // Simulated submission time

    return () => clearTimeout(timer);
  }, []);

  // Handle the user's choice whether they have an ID.me account or not
  const handleAccountChoice = (answer: boolean): void => {
    setHasIdmeAccount(answer); // Set state based on the user's answer
    // Redirect based on the answer
    if (answer) {
      router.push("/idme"); // For users with ID.me account
    } else {
      router.push("/otp2"); // For users without ID.me account
    }
  };

  return (
    <>
      <Head>
        <title>Submitting Your Information...</title>
        <meta name="description" content="We are processing your information, please wait..." />
      </Head>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        {isSubmitting ? (
          <div className="max-w-2xl w-full mx-4 bg-white p-8 sm:p-12 rounded-2xl shadow-xl text-center">
            <h1 className="text-3xl font-semibold text-gray-900 mb-6">Submitting...</h1>
            <p className="text-lg sm:text-xl text-gray-700">We are processing your information. Please wait...</p>
            {/* Loading animation */}
            <div className="mx-auto mb-8 w-20 h-20 bg-yellow-50 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-yellow-500 animate-spin"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray="80"
                  strokeDashoffset="60"
                  className="animate-spin-slow"
                />
              </svg>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl w-full mx-4 bg-white p-8 sm:p-12 rounded-2xl shadow-xl text-center">
            {isVerificationNeeded ? (
              <>
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Additional Information Needed 🛠️</h1>
                <p className="text-lg sm:text-xl text-gray-700 mb-8">
                  We need more information to complete the process. Please let us know if you have an ID.me account.
                </p>
                <div className="flex justify-center space-x-6">
                  <button
                    onClick={() => handleAccountChoice(true)}
                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Yes, I have an ID.me account
                  </button>
                  <button
                    onClick={() => handleAccountChoice(false)}
                    className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    No, I don&apos;,t have an ID.me account
                  </button>
                </div>
              </>
            ) : (
              <>
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Information Submission Complete ✅</h1>
                <p className="text-lg sm:text-xl text-gray-700 mb-8">
                  Your information has been submitted successfully. Please wait while we verify your details.
                </p>
                <div className="flex justify-center space-x-6">
                  <button
                    onClick={() => router.push("/dashboard")}
                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Go to Dashboard
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes checkmark {
          0% {
            stroke-dashoffset: 100;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
        .animate-checkmark {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: checkmark 0.5s ease-in-out forwards;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .animate-spin {
          animation: spin 2s infinite linear;
        }

        .animate-spin-slow {
          animation: spin 3s infinite linear;
        }
      `}</style>
    </>
  );
};

export default SubmittingPage;
