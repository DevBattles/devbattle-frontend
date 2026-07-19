import { useNavigate } from "react-router-dom";

function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      title: "AI Agent",
      path: "/agent",
    },
    {
      title: "Leaderboard",
      path: "/leaderboard",
    },
    {
      title: "Battles",
      path: "/battles",
    },
    {
      title: "Profile",
      path: "/profile",
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-700 bg-[#111827] p-8">

      <h2 className="text-2xl font-bold">
        Quick Actions
      </h2>

      <div className="mt-6 grid gap-4 md:grid-cols-2">

        {actions.map((item) => (

          <button
            key={item.title}
            onClick={() => navigate(item.path)}
            className="rounded-xl border border-slate-700 bg-[#0F172A] p-5 text-left transition hover:border-emerald-400 hover:bg-slate-900"
          >
            {item.title}
          </button>

        ))}

      </div>

    </div>
  );
}

export default QuickActions;