import Section from "@/components/layout/Section";
import HeroContent from "./HeroContent";
import HeroEditor from "./HeroEditor";
import Glow from "@/components/common/Glow";

function Hero() {
  return (
    <Section className="relative overflow-hidden bg-[#050816]">

      <Glow />

      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(#4ade80 1px, transparent 1px),linear-gradient(90deg,#4ade80 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative grid min-h-screen items-center gap-20 lg:grid-cols-2">

        <HeroContent />

        <HeroEditor />

      </div>

    </Section>
  );
}

export default Hero;