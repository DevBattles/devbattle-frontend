import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Section from "@/components/layout/Section";

function CTA() {
  return (
    <Section className="relative overflow-hidden py-32 bg-[#050816]">

      {/* Glow */}

      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[150px]" />

      <div className="relative rounded-[40px] border border-slate-800 bg-gradient-to-br from-[#0f172a] to-[#111827] px-12 py-20 text-center">

        <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400">
          READY TO START?
        </span>

        <h2 className="mx-auto mt-8 max-w-4xl text-5xl font-bold leading-tight text-white">

          Become a Better Developer
          <br />

          Through Real Coding Battles.

        </h2>

        <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-400">

          Join thousands of developers improving their coding skills,
          competing on leaderboards and learning with AI-powered guidance.

        </p>

        <div className="mt-12 flex justify-center gap-5">

          <Button
            size="lg"
            className="bg-emerald-500 px-10 text-black hover:bg-emerald-400"
          >
            Get Started

            <ArrowRight className="ml-2 h-5 w-5" />

          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-slate-700 bg-transparent px-10 text-white hover:bg-slate-800"
          >
            View Challenges
          </Button>

        </div>

      </div>

    </Section>
  );
}

export default CTA;