import Hero from "@/components/home/Hero";
import TrustedBy from "@/components/home/TrustedBy";
import Features from "@/components/home/Features";
import HowItWorks from "@/components/home/HowItWorks";
import LeaderboardPreview from "@/components/home/LeaderboardPreview";
import CTA from "@/components/home/CTA";
import Footer from "@/components/layout/Footer";

function Home() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <Features />
      <HowItWorks />
      <LeaderboardPreview />
      <CTA />
      <Footer />
    </>
  );
}

export default Home;