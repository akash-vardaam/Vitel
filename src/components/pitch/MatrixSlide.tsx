import PitchSlide from "./PitchSlide";

const features = [
  "Unified Data Layer",
  "AI Insights Engine",
  "Biological Age / Scoring",
  "Clinical Validation",
  "Protocols / Action Layer",
  "Real-World Implementation",
  "Closed Feedback Loop",
  "Multi-Modal Coverage",
  "System That Learns Over Time",
  "Drives Measurable Outcomes",
];

type Val = "full" | "partial" | "no";

const competitors: { name: string; vals: Val[] }[] = [
  { name: "Vitel",           vals: ["full","full","full","full","full","full","full","full","full","full"] },
  { name: "InsideTracker",   vals: ["partial","full","full","no","no","no","no","partial","no","no"] },
  { name: "Function Health", vals: ["partial","partial","partial","no","no","no","no","partial","no","no"] },
  { name: "Whoop",           vals: ["partial","partial","no","no","no","no","no","no","no","no"] },
  { name: "Superpower",      vals: ["partial","full","partial","partial","partial","no","no","partial","no","no"] },
  { name: "Levels",          vals: ["partial","partial","no","no","no","no","no","no","no","no"] },
];

function Indicator({ val }: { val: Val }) {
  if (val === "full") return <div className="w-3 h-3 rounded-full bg-primary mx-auto" />;
  if (val === "partial") return <div className="w-3 h-3 rounded-full bg-[hsl(43,90%,55%)] mx-auto" />;
  return <div className="w-3 h-3 rounded-full bg-[hsl(0,65%,55%)] mx-auto" />;
}

export default function MatrixSlide() {
  return (
    <PitchSlide>
      <div className="max-w-6xl w-full">
        <p className="chip chip-primary mb-6 text-[11px] tracking-widest uppercase">Competitive Matrix</p>
        <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-12">
          Competitive matrix
        </h2>

        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full min-w-[700px] border-collapse">
            <thead>
              <tr>
                <th className="text-left font-body text-xs text-foreground-subtle uppercase tracking-wider pb-4 pr-4 w-48" />
                {competitors.map((c) => (
                  <th key={c.name} className={`font-body text-xs uppercase tracking-wider pb-4 px-3 text-center ${c.name === "Vitel" ? "text-primary font-semibold" : "text-foreground-subtle"}`}>
                    {c.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feat, fi) => (
                <tr key={feat} className="border-t border-border/50">
                  <td className="font-body text-sm text-foreground py-4 pr-4">{feat}</td>
                  {competitors.map((c) => (
                    <td key={c.name} className={`py-4 px-3 ${c.name === "Vitel" ? "bg-primary/[0.04]" : ""}`}>
                      <Indicator val={c.vals[fi]} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center gap-6 mt-8">
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-primary" /><span className="font-body text-xs text-foreground-muted">Full</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[hsl(43,90%,55%)]" /><span className="font-body text-xs text-foreground-muted">Partial</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[hsl(0,65%,55%)]" /><span className="font-body text-xs text-foreground-muted">No</span></div>
        </div>
      </div>
    </PitchSlide>
  );
}
