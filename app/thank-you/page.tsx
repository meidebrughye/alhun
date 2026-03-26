"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ThankYouPage() {
  const router = useRouter();
  const [applicationId, setApplicationId] = useState("");

  // Generate random Application ID
  useEffect(() => {
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const id = `OUT-${randomNum}`;
    setApplicationId(id);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f1e3] flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-emerald-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-5xl font-bold tracking-tighter text-gray-900 mb-3">
          Thank You!
        </h1>

        <p className="text-xl font-medium text-emerald-700 mb-6">
          Application ID: <span className="font-mono">{applicationId}</span>
        </p>

        <div className="bg-white rounded-3xl shadow-lg p-10 mb-10">
          <div className="space-y-8 text-left">
            <div>
              <p className="text-lg text-gray-700 leading-relaxed">
                Your application has been received successfully.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">What to do next:</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 font-medium">1</div>
                  <p className="text-gray-600">Go back to the TikTok message/chat where you found this form</p>
                </div>

                <div className="flex gap-4">
                  <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 font-medium">2</div>
                  <p className="text-gray-600">Message me with your Application ID: <span className="font-mono font-semibold text-gray-900">{applicationId}</span></p>
                </div>

                <div className="flex gap-4">
                  <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 font-medium">3</div>
                  <p className="text-gray-600">I will send you the direct Outlier.ai link right away</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100">
              <p className="font-semibold text-gray-900 text-lg">
                Once you are done please message me on where we were chatting
              </p>
              <p className="text-sm text-gray-500 mt-2">
                (Just reply to the TikTok message)
              </p>
            </div>
          </div>
        </div>

        <div className="text-gray-600 text-sm leading-relaxed">
          On Outlier.ai, all payments are sent securely through <strong>Airtm</strong>.<br />
          No PayPal or bank transfer needed.
        </div>

        <button
          onClick={() => router.push("/")}
          className="mt-12 text-gray-500 hover:text-gray-700 font-medium flex items-center gap-2 mx-auto transition-colors"
        >
          ← Back to Application Page
        </button>
      </div>
    </div>
  );
}