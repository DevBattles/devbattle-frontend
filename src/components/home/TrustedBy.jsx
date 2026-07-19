import Section from "@/components/layout/Section";

const companies = [
  "Google",
  "Microsoft",
  "GitHub",
  "OpenAI",
  "Amazon",
  "Meta",
];

function TrustedBy() {
  return (
    <Section className="border-y border-slate-800 bg-[#08101d] py-12">

      <p className="mb-10 text-center text-sm font-medium uppercase tracking-[0.25em] text-slate-500">
        TRUSTED BY DEVELOPERS USING TECHNOLOGIES FROM
      </p>

      <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-3 lg:grid-cols-6">

        {companies.map((company) => (
          <div
            key={company}
            className="rounded-xl border border-slate-800 bg-[#0f172a] py-5 text-lg font-semibold text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500 hover:text-emerald-400"
          >
            {company}
          </div>
        ))}

      </div>

    </Section>
  );
}

export default TrustedBy;