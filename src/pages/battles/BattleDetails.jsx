import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  Trophy,
  Code2,
  Tag,
} from "lucide-react";

const battles = [
  {
    id: 1,
    title: "Frontend Challenge",
    difficulty: "Easy",
    duration: "30 min",
    xp: 200,
    description:
      "Build a responsive landing page using React and Tailwind CSS that matches the provided UI design.",
    tags: ["React", "Tailwind", "Responsive"],
  },
  {
    id: 2,
    title: "JavaScript Arrays",
    difficulty: "Easy",
    duration: "20 min",
    xp: 150,
    description:
      "Solve array manipulation and searching problems using efficient algorithms.",
    tags: ["JavaScript", "Arrays"],
  },
  {
    id: 3,
    title: "Binary Search",
    difficulty: "Medium",
    duration: "45 min",
    xp: 350,
    description:
      "Implement Binary Search and solve related interview problems.",
    tags: ["DSA", "Searching"],
  },
  {
    id: 4,
    title: "Node REST API",
    difficulty: "Medium",
    duration: "60 min",
    xp: 450,
    description:
      "Develop REST APIs using Express.js with authentication and validation.",
    tags: ["Node", "Express", "API"],
  },
  {
    id: 5,
    title: "Authentication System",
    difficulty: "Hard",
    duration: "90 min",
    xp: 700,
    description:
      "Build JWT Authentication with Refresh Tokens and Role Based Access.",
    tags: ["JWT", "Security", "Node"],
  },
];

function BattleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const battle = battles.find((item) => item.id === Number(id));

  if (!battle) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050816] text-white">
        Battle not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050816] text-white">

      <div className="mx-auto max-w-6xl px-6 py-10">

        <button
          onClick={() => navigate("/battles")}
          className="mb-8 flex items-center gap-2 rounded-lg border border-slate-700 px-5 py-2 hover:bg-slate-800"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="rounded-3xl border border-slate-700 bg-[#111827] p-10">

          <span className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-black">
            {battle.difficulty}
          </span>

          <h1 className="mt-6 text-5xl font-black">
            {battle.title}
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-400">
            {battle.description}
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">

            <div className="rounded-xl bg-[#0F172A] p-5">

              <Clock className="mb-3 text-emerald-400" />

              <h3 className="text-xl font-semibold">
                Time Limit
              </h3>

              <p className="mt-2 text-slate-400">
                {battle.duration}
              </p>

            </div>

            <div className="rounded-xl bg-[#0F172A] p-5">

              <Trophy className="mb-3 text-yellow-400" />

              <h3 className="text-xl font-semibold">
                Reward
              </h3>

              <p className="mt-2 text-slate-400">
                {battle.xp} XP
              </p>

            </div>

            <div className="rounded-xl bg-[#0F172A] p-5">

              <Code2 className="mb-3 text-cyan-400" />

              <h3 className="text-xl font-semibold">
                Difficulty
              </h3>

              <p className="mt-2 text-slate-400">
                {battle.difficulty}
              </p>

            </div>

          </div>

          <div className="mt-10">

            <div className="mb-4 flex items-center gap-2">

              <Tag className="text-emerald-400" />

              <h2 className="text-2xl font-bold">
                Tags
              </h2>

            </div>

            <div className="flex flex-wrap gap-3">

              {battle.tags.map((tag) => (

                <span
                  key={tag}
                  className="rounded-full bg-slate-800 px-4 py-2"
                >
                  {tag}
                </span>

              ))}

            </div>

          </div>

          <button
            onClick={() => navigate("/editor")}
            className="mt-12 rounded-xl bg-emerald-500 px-8 py-4 text-lg font-bold text-black transition hover:bg-emerald-400"
          >
            Start Challenge
          </button>

        </div>

      </div>

    </div>
  );
}

export default BattleDetails;