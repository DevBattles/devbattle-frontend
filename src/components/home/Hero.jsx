import { Button } from "@/components/ui/button";

function Hero() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-6xl font-bold">
          Practice.
          <span className="text-blue-600"> Compete.</span>
          Learn.
        </h1>

        <p className="mt-6 text-lg text-gray-600">
          DevBattles helps developers improve through coding battles,
          assignments and AI-powered learning.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Button>Get Started</Button>

          <Button variant="outline">
            Explore
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Hero;