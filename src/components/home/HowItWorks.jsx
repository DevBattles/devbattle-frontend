import {
    Search,
    Code2,
    Bot,
    Trophy,
  } from "lucide-react";
  
  import Section from "@/components/layout/Section";
  
  const steps = [
    {
      number: "01",
      icon: <Search size={30} />,
      title: "Choose a Challenge",
      description:
        "Browse frontend, backend, DSA or AI challenges based on your skill level.",
    },
    {
      number: "02",
      icon: <Code2 size={30} />,
      title: "Solve & Submit",
      description:
        "Write your solution inside the built-in code editor and submit instantly.",
    },
    {
      number: "03",
      icon: <Bot size={30} />,
      title: "AI Reviews",
      description:
        "Receive detailed feedback, code optimization tips and personalized suggestions.",
    },
    {
      number: "04",
      icon: <Trophy size={30} />,
      title: "Earn XP & Rank",
      description:
        "Gain XP, unlock achievements and climb the global developer leaderboard.",
    },
  ];
  
  function HowItWorks() {
    return (
      <Section className="bg-[#050816] py-32">
  
        {/* Heading */}
  
        <div className="mx-auto max-w-3xl text-center">
  
          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400">
            HOW IT WORKS
          </span>
  
          <h2 className="mt-6 text-5xl font-bold text-white">
            Start Coding In
            <span className="text-emerald-400"> 4 Easy Steps</span>
          </h2>
  
          <p className="mt-6 text-lg text-slate-400">
            Join coding battles, improve with AI guidance and build your
            developer profile through practical challenges.
          </p>
  
        </div>
  
        {/* Timeline */}
  
        <div className="relative mx-auto mt-24 max-w-6xl">
  
          {/* Vertical Line */}
  
          <div className="absolute left-1/2 hidden h-full w-[2px] -translate-x-1/2 bg-slate-800 lg:block"></div>
  
          <div className="space-y-16">
  
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`grid items-center gap-10 lg:grid-cols-2 ${
                  index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
  
                {/* Card */}
  
                <div className="rounded-3xl border border-slate-800 bg-[#0f172a] p-8 transition duration-300 hover:border-emerald-500 hover:shadow-[0_0_35px_rgba(16,185,129,.15)]">
  
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
                    {step.icon}
                  </div>
  
                  <span className="text-sm font-semibold text-emerald-400">
                    STEP {step.number}
                  </span>
  
                  <h3 className="mt-3 text-3xl font-bold text-white">
                    {step.title}
                  </h3>
  
                  <p className="mt-4 leading-8 text-slate-400">
                    {step.description}
                  </p>
  
                </div>
  
                {/* Timeline Circle */}
  
                <div className="hidden justify-center lg:flex">
  
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-emerald-500 bg-[#050816] text-2xl font-bold text-white">
                    {step.number}
                  </div>
  
                </div>
  
              </div>
            ))}
  
          </div>
  
        </div>
  
      </Section>
    );
  }
  
  export default HowItWorks;