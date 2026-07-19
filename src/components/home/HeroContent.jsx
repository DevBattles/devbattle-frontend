import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function HeroContent() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col justify-center"
    >
      {/* Badge */}
      <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400">
        <Sparkles size={16} />
        <span>THE ULTIMATE CODING BATTLE PLATFORM</span>
      </div>

      {/* Heading */}
      <h1 className="mt-8 text-5xl font-black leading-[1.05] tracking-tight text-white lg:text-6xl xl:text-7xl">
        Practice.
        <br />
        <span className="text-emerald-400">Compete.</span>
        <br />
        Win.
      </h1>

      {/* Description */}
      <p className="mt-8 max-w-xl text-lg leading-8 text-slate-400">
        DevBattles is an all-in-one platform to master Web Development, DSA and
        AI through coding battles, real-world projects, contests and
        AI-powered mentoring.
      </p>

      {/* Buttons */}
      <div className="mt-10 flex flex-wrap gap-4">

        <Link to="/login">
          <Button
            size="lg"
            className="bg-emerald-500 text-black hover:bg-emerald-400"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>

        <Link to="/register">
          <Button
            size="lg"
            variant="outline"
            className="border-slate-700 bg-transparent text-white hover:bg-slate-800"
          >
            Join DevBattles
          </Button>
        </Link>

      </div>

      {/* Stats */}
      <div className="mt-14 grid grid-cols-3 gap-8">

        <div>
          <h3 className="text-4xl font-bold text-white">25K+</h3>
          <p className="mt-2 text-slate-400">Developers</p>
        </div>

        <div>
          <h3 className="text-4xl font-bold text-white">1200+</h3>
          <p className="mt-2 text-slate-400">Battles</p>
        </div>

        <div>
          <h3 className="text-4xl font-bold text-white">98%</h3>
          <p className="mt-2 text-slate-400">Success Rate</p>
        </div>

      </div>
    </motion.div>
  );
}

export default HeroContent;