import {
    BrainCircuit,
    Trophy,
    Swords,
    BarChart3,
    ShieldCheck,
    Users,
  } from "lucide-react";
  
  import Section from "@/components/layout/Section";
  
  const features = [
    {
      icon: <Swords size={34} />,
      title: "Live Coding Battles",
      description:
        "Compete with developers in real-time coding battles and improve your problem solving skills.",
    },
    {
      icon: <BrainCircuit size={34} />,
      title: "AI Mentor",
      description:
        "Receive instant AI feedback, optimization tips and personalized learning recommendations.",
    },
    {
      icon: <Trophy size={34} />,
      title: "Leaderboards",
      description:
        "Climb global rankings, earn XP, unlock achievements and showcase your coding journey.",
    },
    {
      icon: <BarChart3 size={34} />,
      title: "Progress Tracking",
      description:
        "Visualize your growth through analytics, performance reports and challenge history.",
    },
    {
      icon: <ShieldCheck size={34} />,
      title: "Verified Challenges",
      description:
        "Solve curated frontend, backend and full-stack challenges designed by experienced developers.",
    },
    {
      icon: <Users size={34} />,
      title: "Developer Community",
      description:
        "Learn with other developers, join discussions and collaborate on coding challenges.",
    },
  ];
  
  function Features() {
    return (
      <Section className="py-32 bg-[#050816]">
  
        <div className="mx-auto max-w-3xl text-center">
  
          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400">
            FEATURES
          </span>
  
          <h2 className="mt-6 text-5xl font-bold text-white">
            Everything You Need To
            <span className="text-emerald-400"> Become Better</span>
          </h2>
  
          <p className="mt-6 text-lg text-slate-400">
            DevBattles provides everything required to learn, compete,
            track your progress and prepare for real software engineering
            interviews.
          </p>
  
        </div>
  
        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
  
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-3xl border border-slate-800 bg-[#0f172a] p-8 transition-all duration-300 hover:-translate-y-2 hover:border-emerald-500 hover:shadow-[0_0_40px_rgba(16,185,129,.15)]"
            >
  
              <div className="mb-6 inline-flex rounded-2xl bg-emerald-500/10 p-4 text-emerald-400">
                {feature.icon}
              </div>
  
              <h3 className="text-2xl font-semibold text-white">
                {feature.title}
              </h3>
  
              <p className="mt-4 leading-8 text-slate-400">
                {feature.description}
              </p>
  
            </div>
          ))}
  
        </div>
  
      </Section>
    );
  }
  
  export default Features;