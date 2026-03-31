"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ThankYouPage() {
  const router = useRouter();
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedScore = localStorage.getItem("quizScore");

    if (savedScore === null) {
      router.push("/eval");
      return;
    }

    const parsedScore = parseInt(savedScore, 10);

    // Validate score
    if (isNaN(parsedScore) || parsedScore < 0 || parsedScore > 5) {
      localStorage.removeItem("quizScore"); // Clear invalid data
      router.push("/eval");
      return;
    }

    setScore(parsedScore);
    setLoading(false);

    // Optional: Clear score after reading (prevents replay issues)
    // localStorage.removeItem("quizScore");
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-zinc-300 border-t-blue-600 mx-auto" />
          <p className="mt-6 text-zinc-600">Loading your results...</p>
        </div>
      </div>
    );
  }

  const totalQuestions = 5;
  const percentage = Math.round(((score ?? 0) / totalQuestions) * 100);

  const getScoreMessage = (score: number) => {
    switch (score) {
      case 5:
        return "Perfect! You’re exceptional.";
      case 4:
        return "Excellent work!";
      case 3:
        return "Great job!";
      default:
        return "Good effort. Keep improving!";
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 py-12">
      <div className="max-w-2xl mx-auto px-6">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-zinc-100">
          {/* Hero Section */}
          <div className="bg-gradient-to-br from-zinc-900 to-black text-white px-10 py-20 text-center relative">
            <div className="text-6xl mb-6">🎉</div>

            <h1 className="text-5xl font-bold tracking-tighter mb-3">
              Congratulations!
            </h1>

            <p className="text-zinc-400 text-lg mb-10">
              You’ve completed the AI Image Evaluation
            </p>

            {/* Score Display */}
            <div className="inline-flex items-end gap-3 bg-white/10 backdrop-blur-xl rounded-3xl px-12 py-8">
              <span className="text-8xl font-bold tabular-nums tracking-tighter">
                {score}
              </span>
              <span className="text-5xl text-zinc-400 font-light">/</span>
              <span className="text-6xl font-medium text-zinc-300">
                {totalQuestions}
              </span>
            </div>

            <p className="mt-6 text-xl text-zinc-300">
              {getScoreMessage(score!)}
            </p>
          </div>

          {/* Content Area */}
          <div className="p-10 space-y-9">
            {/* Percentage */}
            <div className="text-center">
              <p className="text-sm uppercase tracking-widest text-zinc-500">
                Your Score
              </p>
              <p className="text-6xl font-semibold text-zinc-900 mt-1">
                {percentage}%
              </p>
            </div>

            {/* Bonuses */}
            <div className="space-y-4">
              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 flex gap-5">
                <div className="text-4xl">🎁</div>
                <div>
                  <p className="font-semibold text-lg">Test Completion Bonus</p>
                  <p className="text-emerald-600">
                    $50 credited for completing the quiz
                  </p>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 flex gap-5">
                <div className="text-4xl">💼</div>
                <div>
                  <p className="font-semibold text-lg">Signing Bonus</p>
                  <p className="text-amber-600">
                    $100 after onboarding &amp; payment setup
                  </p>
                </div>
              </div>
            </div>

            {/* Next Step */}
            <div className="bg-zinc-900 text-white rounded-2xl p-8 text-center">
              <p className="text-lg font-medium mb-2">
                Ready to claim your bonuses?
              </p>
              <p className="text-zinc-400 mb-6">
                Complete onboarding to receive your rewards
              </p>

              <button
                onClick={() => router.push("/onboarding")}
                className="w-full bg-white text-black font-semibold py-4 rounded-2xl hover:bg-zinc-100 transition-all active:scale-95 text-lg"
              >
                Continue to Onboarding →
              </button>
            </div>

            <p className="text-center text-zinc-500 text-sm">
              Your progress is saved • You can return anytime
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}