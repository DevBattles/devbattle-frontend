import BattleCard from "@/components/battles/BattleCard";

const battles = [
  {
    id: 1,
    title: "Frontend Challenge",
    difficulty: "Easy",
    duration: "30 min",
    category: "React",
  },
  {
    id: 2,
    title: "JavaScript Arrays",
    difficulty: "Easy",
    duration: "20 min",
    category: "JavaScript",
  },
  {
    id: 3,
    title: "Binary Search",
    difficulty: "Medium",
    duration: "45 min",
    category: "DSA",
  },
  {
    id: 4,
    title: "Node REST API",
    difficulty: "Medium",
    duration: "60 min",
    category: "Backend",
  },
  {
    id: 5,
    title: "Authentication System",
    difficulty: "Hard",
    duration: "90 min",
    category: "Node.js",
  },
  {
    id: 6,
    title: "Portfolio Clone",
    difficulty: "Easy",
    duration: "45 min",
    category: "HTML/CSS",
  },
  {
    id: 7,
    title: "Graph Traversal",
    difficulty: "Hard",
    duration: "75 min",
    category: "DSA",
  },
  {
    id: 8,
    title: "MongoDB CRUD",
    difficulty: "Medium",
    duration: "40 min",
    category: "Database",
  },
];

function BattleList() {
  return (
    <div className="min-h-screen bg-[#050816] text-white">

      <div className="mx-auto max-w-7xl px-6 py-10">

        <h1 className="text-5xl font-black">
          Coding Battles
        </h1>

        <p className="mt-3 text-slate-400">
          Practice real interview questions and compete with developers.
        </p>

        <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {battles.map((battle) => (
            <BattleCard
              key={battle.id}
              battle={battle}
            />
          ))}

        </div>

      </div>

    </div>
  );
}

export default BattleList;