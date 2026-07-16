import React from "react";
import { Users, Award, Code, GraduationCap } from "lucide-react";

function About() {
  return (
    <div className="min-h-screen bg-[#050816] text-white pt-24 pb-12 px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
            About DevBattles
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            We are the ultimate competitive coding and homework evaluation platform designed specifically for colleges, students, and developers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">Our Mission</h2>
            <p className="text-slate-300 leading-relaxed">
              At DevBattles, we believe learning software engineering should be engaging, gamified, and community-driven. By introducing structured homework assignments alongside real-time live contests and automated AI tutoring, we bridge the gap between classroom theory and industry-grade application logic.
            </p>
            <p className="text-slate-300 leading-relaxed">
              Whether you are an aspiring student building responsive web interfaces, a teacher seeking robust testing options, or an administrator tracking academic performance, DevBattles offers the exact tools you need.
            </p>
          </div>
          
          <div className="bg-[#111827]/50 backdrop-blur-md border border-slate-700/50 rounded-2xl p-8 space-y-6">
            <div className="flex gap-4">
              <div className="h-12 w-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                <Code className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">Interactive Sandbox Editor</h3>
                <p className="text-sm text-slate-400 mt-1">Practice and preview your code changes side-by-side using our advanced embedded Monaco code compiler workspace.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="h-12 w-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">Live Competitive Sprints</h3>
                <p className="text-sm text-slate-400 mt-1">Compete live against classmates, move up the leaderboard rankings, and claim certification badges.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="h-12 w-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">Automated Grading Pipeline</h3>
                <p className="text-sm text-slate-400 mt-1">Receive immediate grading scorecards, weaknesses checkpoints, and refactoring guidelines from our AI evaluator.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
