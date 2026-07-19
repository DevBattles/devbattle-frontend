import { Check } from "lucide-react";
import { Link } from "react-router-dom";

function Pricing() {
  const tiers = [
    {
      name: "Free Student",
      price: "$0",
      description: "Perfect for students practicing coding and participating in classroom homeworks.",
      features: [
        "Access to basic sandbox coding workspace",
        "Participate in assigned homework tasks",
        "Join open public contest sprints",
        "Basic AI Mentor prompts (10 requests/day)",
        "Earn community certificates"
      ],
      actionText: "Get Started Free",
      actionLink: "/register",
      popular: false,
    },
    {
      name: "Pro Developer",
      price: "$19",
      period: "/month",
      description: "Ideal for competitive programmers aiming to build top scores and profiles.",
      features: [
        "All Free Student features",
        "Unlimited sandbox visual code compilations",
        "Participate in premium contests",
        "Unlimited AI evaluation & grading feedback",
        "Advanced AI mentoring and hint options",
        "Interactive leaderboard analytics"
      ],
      actionText: "Upgrade to Pro",
      actionLink: "/register",
      popular: true,
    },
    {
      name: "College Enterprise",
      price: "Custom",
      description: "Tailored for universities and teachers managing multiple departments and batches.",
      features: [
        "All Pro Developer features",
        "Onboard colleges and custom departments",
        "Unlimited teacher accounts and roles",
        "Custom contest and homework creation",
        "Class performance analytics dashboards",
        "Dedicated verification endpoints"
      ],
      actionText: "Contact Sales",
      actionLink: "/contact",
      popular: false,
    }
  ];

  return (
    <div className="min-h-screen bg-[#050816] text-white pt-24 pb-12 px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Choose the best plan to level up your development capabilities and challenge classroom limits.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier, idx) => (
            <div
              key={idx}
              className={`relative bg-[#111827]/50 border rounded-2xl p-8 flex flex-col justify-between transition-transform duration-300 hover:scale-[1.02] ${
                tier.popular
                  ? "border-emerald-400 shadow-lg shadow-emerald-500/10"
                  : "border-slate-700/50"
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Most Popular
                </span>
              )}
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-white">{tier.name}</h3>
                  <p className="text-sm text-slate-400 mt-2">{tier.description}</p>
                </div>

                <div className="flex items-baseline">
                  <span className="text-4xl font-extrabold text-white">{tier.price}</span>
                  {tier.period && <span className="text-slate-400 ml-1">{tier.period}</span>}
                </div>

                <ul className="space-y-4">
                  {tier.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex gap-3 text-sm text-slate-300">
                      <Check className="h-5 w-5 text-emerald-400 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-700/50">
                <Link
                  to={tier.actionLink}
                  className={`w-full flex items-center justify-center font-bold py-3 px-6 rounded-xl transition ${
                    tier.popular
                      ? "bg-emerald-500 text-black hover:bg-emerald-400"
                      : "border border-slate-600 bg-slate-800/50 text-white hover:bg-slate-800"
                  }`}
                >
                  {tier.actionText}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Pricing;
