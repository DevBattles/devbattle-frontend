import { motion } from "framer-motion";
import {
  Bot,
  CheckCircle2,
  Trophy,
  Zap,
} from "lucide-react";

function HeroEditor() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="relative flex items-center justify-center"
    >
      {/* Glow */}
      <div className="absolute h-96 w-96 rounded-full bg-emerald-500/20 blur-[140px]" />

      {/* AI Card */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
        className="absolute -left-10 top-8 hidden rounded-2xl border border-slate-700 bg-[#111827]/90 p-4 shadow-xl backdrop-blur lg:block"
      >
        <div className="flex items-center gap-3">
          <Bot className="text-emerald-400" />

          <div>
            <h4 className="text-sm font-semibold text-white">
              AI Assistant
            </h4>

            <p className="text-xs text-slate-400">
              Reviewing your solution...
            </p>
          </div>
        </div>
      </motion.div>

      {/* XP Card */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
        className="absolute -right-8 bottom-8 hidden rounded-2xl border border-slate-700 bg-[#111827]/90 p-4 shadow-xl backdrop-blur lg:block"
      >
        <div className="flex items-center gap-3">
          <Trophy className="text-yellow-400" />

          <div>
            <h4 className="text-sm font-semibold text-white">
              +250 XP
            </h4>

            <p className="text-xs text-slate-400">
              Battle Won
            </p>
          </div>
        </div>
      </motion.div>

      {/* Editor */}
      <div className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-slate-700 bg-[#111827] shadow-[0_0_50px_rgba(16,185,129,.18)]">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-700 px-6 py-4">

          <div className="flex items-center gap-2">

            <div className="h-3 w-3 rounded-full bg-red-500"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
            <div className="h-3 w-3 rounded-full bg-green-500"></div>

            <span className="ml-3 text-sm text-slate-400">
              battle.jsx
            </span>

          </div>

          <div className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
            <Zap size={14} />
            Live
          </div>

        </div>

        {/* Code */}
        <div className="grid grid-cols-[40px_1fr] gap-4 px-6 py-6 text-sm leading-8">

          <div className="select-none text-slate-600">
            1
            <br />
            2
            <br />
            3
            <br />
            4
            <br />
            5
            <br />
            6
            <br />
            7
            <br />
            8
            <br />
            9
          </div>

          <pre className="overflow-x-auto text-slate-300">{`const battle = async () => {

  const result = await solveChallenge();

  if(result.success){
    return "🏆 Victory";
  }

  return "Try Again";
};

battle();`}
          </pre>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-slate-700 px-6 py-4">

          <div className="flex items-center gap-2 text-sm text-emerald-400">
            <CheckCircle2 size={18} />
            All Tests Passed
          </div>

          <div className="text-sm text-slate-400">
            Runtime 0.18s
          </div>

        </div>

      </div>
    </motion.div>
  );
}

export default HeroEditor;