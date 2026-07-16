import React, { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

function FAQ() {
  const faqs = [
    {
      question: "How does the AI grading evaluation engine work?",
      answer: "When a student submits code inside the Monaco editor workspace, the system captures their HTML/CSS layout using a headless Playwright browser. The visual snapshot is reviewed by Gemini Vision, while the source files are analyzed by our LangGraph evaluation pipeline. You get a score out of 100 based on correctness, responsiveness, accessibility, code quality, and performance."
    },
    {
      question: "Why does the AI Mentor only give hints during active contests?",
      answer: "To maintain academic integrity and fairness. During active contests or homework assignments prior to the deadline, the AI Mentor operates under constraint parameters that restrict it from outputting direct solutions or code blocks. It provides conceptual tips and debugging questions instead. Full refactoring code suggestions are unlocked for practice challenges and after homework deadlines pass."
    },
    {
      question: "How do I verify the authenticity of a certificate?",
      answer: "Every certificate issued on DevBattles carries a unique validator code. Anyone can query this code publicly via the verify page (e.g. `/certificates/verify/:code`) to check details like student name, college, score grade, issuing teacher, and the completed coding challenge."
    },
    {
      question: "Can colleges onboard custom departments?",
      answer: "Yes, administrators can use the admin dashboard to configure colleges and assign department streams. Teachers can then assign homework targeted at specific student departments or college batches."
    },
    {
      question: "What languages are currently supported by the coding workspace?",
      answer: "We support front-end languages including HTML, CSS, JavaScript (supporting styling options like Tailwind CSS utility integrations)."
    }
  ];

  const [openIdx, setOpenIdx] = useState(null);

  const toggleFAQ = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Find answers to commonly asked questions about DevBattles contests, AI tutoring constraints, and sandbox workspace operations.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-[#111827]/50 border border-slate-700/50 rounded-2xl overflow-hidden transition"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-800/20"
                >
                  <div className="flex gap-4 items-center">
                    <HelpCircle className="h-6 w-6 text-emerald-400 shrink-0" />
                    <span className="font-bold text-white text-lg">{faq.question}</span>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="h-5 w-5 text-slate-400 shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-slate-300 text-sm leading-relaxed border-t border-slate-800">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default FAQ;
