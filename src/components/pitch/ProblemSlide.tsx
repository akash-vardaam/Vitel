import PitchSlide from "./PitchSlide";

const problems = [
  { title: "Data is everywhere", desc: "Labs, wearables, scans, supplements" },
  { title: "Insights are disconnected", desc: "Each tool explains one piece" },
  { title: "No system drives action", desc: "People don't know what to do next" },
];

export default function ProblemSlide() {
  return (
    <PitchSlide>
      <div className="max-w-5xl w-full">
        <p className="chip chip-primary mb-6 text-[11px] tracking-widest uppercase">The Problem</p>
        <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-16 max-w-3xl">
          Health is fragmented<br />and reactive
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {problems.map((p, i) => (
            <div key={i} className="group bg-gradient-card border border-border rounded-xl p-8 hover:border-primary/30 transition-all duration-300">
              <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-5">
                <span className="text-sm font-display font-bold text-primary">{i + 1}</span>
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">{p.title}</h3>
              <p className="font-body text-sm text-foreground-muted leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        <p className="font-display text-xl md:text-2xl font-semibold text-foreground/90 border-l-2 border-primary pl-6">
          Insight without execution doesn't change outcomes
        </p>
      </div>
    </PitchSlide>
  );
}
