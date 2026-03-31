"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function OnboardingComplete() {
  const router = useRouter();

  // Optional: auto-redirect to main dashboard after 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/dashboard"); // ← change to your actual main app route
    }, 80000000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-6">
      <div className="max-w-lg w-full text-center">
        {/* Success illustration */}
        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-emerald-100 text-6xl shadow-inner">
          🎉
        </div>

        <h1 className="text-4xl font-semibold tracking-tight text-gray-900">
          You&apos;re all set!
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          Welcome to the team. Your accounts are ready and your credentials have been securely received.
        </p>

        <div className="mt-10 grid gap-3 text-left">
          <div className="rounded-3xl bg-white border border-gray-100 p-6 shadow-sm">
            <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-emerald-500">→</span>
              Next steps to start earning
            </h2>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <span className="font-mono text-xs bg-emerald-100 text-emerald-700 px-2.5 rounded-2xl h-5 flex items-center">1</span>
                <div>
                  <p className="font-medium">Log into Outlier</p>
                  <a
                    href="https://app.outlier.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-xs flex items-center gap-1 mt-0.5"
                  >
                    app.outlier.ai <span className="text-xs">↗</span>
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="font-mono text-xs bg-emerald-100 text-emerald-700 px-2.5 rounded-2xl h-5 flex items-center">2</span>
                <div>
                  <p className="font-medium">Browse and claim your first tasks</p>
                  <p className="text-gray-500 text-xs">Start with the easiest ones to build your rating</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="font-mono text-xs bg-emerald-100 text-emerald-700 px-2.5 rounded-2xl h-5 flex items-center">3</span>
                <div>
                  <p className="font-medium">Set up payouts in AirTM</p>
                  <p className="text-gray-500 text-xs">Link your bank or preferred withdrawal method</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <button
            onClick={() => router.push("/dashboard")}
            className="w-full h-14 bg-gray-900 hover:bg-black text-white font-semibold rounded-3xl text-lg transition-all"
          >
            Go to my dashboard
          </button>

          <a
            href="https://app.outlier.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-14 border border-gray-300 hover:border-gray-400 font-medium rounded-3xl flex items-center justify-center text-base transition-all"
          >
            Open Outlier now →
          </a>
        </div>

        <div className="mt-12 text-xs text-gray-400">
          Need help? Contact your onboarding manager on Telegram or email{" "}
          <a href="mailto:support@yourcompany.com" className="text-gray-500 hover:text-gray-600">
            support@yourcompany.com
          </a>
        </div>
      </div>
    </div>
  );
}