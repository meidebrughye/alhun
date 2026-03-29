/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// ─── Config ───────────────────────────────────────────────
const IMAGE_A = "/images/imageA.png";
const IMAGE_B = "/images/imageB.png";

const PROMPT =
  "Add a young university professor standing in between the desks of the classroom. " +
  "The professor is mid-gesture as if explaining a concept, holding a textbook and a few papers, " +
  "dressed in casual professional attire such as a blazer, button-down shirt, and slacks. " +
  "Include natural details like a backpack near a chair, a few notebooks on nearby desks, " +
  "and a few students sitting at the desks creating the feeling of a class that has just ended " +
  "or is about to begin. The scene should feel candid and realistic, with natural lighting and " +
  "an authentic academic atmosphere.";

const QUESTIONS = [
  {
    category: "Instruction Following",
    question: "Which image better follows the prompt instructions?",
    options: ["Image A", "Image B", "Tie"],
    correct: "Image A",
    explanation:
      "Image A shows the professor mid-gesture while holding an open textbook and papers — exactly as required. Image B shows the professor with completely empty hands, missing a key non-negotiable detail from the prompt.",
  },
  {
    category: "Visual Quality",
    question: "Which image has better overall visual quality?",
    options: ["Image A", "Image B", "Tie"],
    correct: "Image A",
    explanation:
      "Image A has greater depth, multiple visible students, notebooks on desks, and a backpack on a chair — all contributing to a more complete, realistic, and natural-looking classroom scene.",
  },
  {
    category: "AI-Generated Issues",
    question: "Which image looks MORE AI-generated?",
    options: ["Image A", "Image B", "Tie"],
    correct: "Image B",
    explanation:
      "Image B feels more AI-generated — the classroom is nearly empty and staged, the professor's hand merges unnaturally into his jacket pocket, and only one student is visible instead of the requested few.",
  },
  {
    category: "Instruction Following",
    question: "What is the most critical instruction failure in Image B?",
    options: [
      "The lighting is too bright",
      "The professor has empty hands — no textbook or papers",
      "There are too many students",
      "The classroom is too large",
    ],
    correct: "The professor has empty hands — no textbook or papers",
    explanation:
      "The prompt explicitly requires the professor to hold a textbook and a few papers. Image B completely ignores this — a major failure that should significantly lower its instruction following rating.",
  },
  {
    category: "AI-Generated Issues",
    question: "Which specific AI artifact appears in Image A?",
    options: [
      "The professor is wearing the wrong color jacket",
      "The classroom has no windows",
      "A table on the far right has an impossible extra leg",
      "The professor is not standing between desks",
    ],
    correct: "A table on the far right has an impossible extra leg",
    explanation:
      "Even though Image A is the stronger image overall, it still contains AI artifacts — most notably a table on the far right with an impossible extra leg, and slightly stiff, distorted fingers on the professor's raised hand.",
  },
];

// ─── Component ────────────────────────────────────────────
export default function EvaluationQuiz() {
  const router = useRouter();
  const [step, setStep]         = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore]       = useState(0);

  const q = QUESTIONS[step];
  const isLast = step === QUESTIONS.length - 1;

  function choose(option) {
    if (!revealed) setSelected(option);
  }

  function submit() {
    if (!selected) return;
    if (selected === q.correct) setScore((s) => s + 1);
    setRevealed(true);
  }

  function next() {
    if (isLast) {
      router.push("/thank-you");
    } else {
      setStep((s) => s + 1);
      setSelected(null);
      setRevealed(false);
    }
  }

  function optionClass(option) {
    const base = "w-full px-5 py-3 rounded-xl border-2 text-left text-sm font-medium transition-all ";
    if (!revealed) {
      return base + (selected === option
        ? "border-blue-500 bg-blue-50 text-blue-800 cursor-pointer"
        : "border-gray-200 hover:border-blue-300 cursor-pointer text-gray-700");
    }
    if (option === q.correct)  return base + "border-green-500 bg-green-50 text-green-800";
    if (option === selected)   return base + "border-red-400 bg-red-50 text-red-700";
    return base + "border-gray-100 opacity-40 text-gray-400";
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">

      {/* ── Header ── */}
      <header className="bg-white border-b border-gray-200 shadow-sm px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold">AI Image Evaluation — Practice Quiz</h1>
          <span className="text-sm bg-gray-100 text-gray-500 px-3 py-1 rounded-full">
            {step + 1} / {QUESTIONS.length}
          </span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-5">

        {/* ── Prompt ── */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-2">
            Prompt Instructions
          </p>
          <p className="text-gray-800 text-sm leading-relaxed">{PROMPT}</p>
        </div>

        {/* ── Hint ── */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-5 py-3 text-sm text-yellow-800">
          <span className="font-semibold">Hint:</span> Examine every detail carefully. Both images
          are AI-generated — determine which contains more noticeable or severe issues.
        </div>

        {/* ── Images ── */}
        <div className="grid grid-cols-2 gap-4">
          {[["Image A", IMAGE_A], ["Image B", IMAGE_B]].map(([label, src]) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
                <p className="font-bold text-gray-700 text-sm">{label}</p>
              </div>
              <img src={src} alt={label} className="w-full object-cover" />
            </div>
          ))}
        </div>

        {/* ── Progress bar ── */}
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div
            className="bg-blue-500 h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${(step / QUESTIONS.length) * 100}%` }}
          />
        </div>

        {/* ── Question card ── */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

          <span className="inline-block text-xs font-bold uppercase tracking-widest text-blue-400 mb-1">
            {q.category}
          </span>
          <h2 className="text-lg font-bold text-gray-900 mb-5">{q.question}</h2>

          {/* Options */}
          <div className="space-y-3 mb-5">
            {q.options.map((option) => (
              <div key={option} onClick={() => choose(option)} className={optionClass(option)}>
                {option}
                {revealed && option === q.correct && " ✅"}
                {revealed && option === selected && option !== q.correct && " ❌"}
              </div>
            ))}
          </div>

          {/* Explanation */}
          {revealed && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl px-5 py-4 mb-5 text-sm text-blue-900">
              <p className="font-semibold mb-1">📖 Explanation</p>
              <p>{q.explanation}</p>
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <span className="text-sm text-gray-400">Score: {score} / {QUESTIONS.length}</span>
            {!revealed ? (
              <button
                onClick={submit}
                disabled={!selected}
                className="px-8 h-11 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white font-semibold text-sm rounded-xl transition-all"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={next}
                className="px-8 h-11 bg-gray-900 hover:bg-gray-700 text-white font-semibold text-sm rounded-xl transition-all"
              >
                {isLast ? "Finish →" : "Next Question →"}
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
