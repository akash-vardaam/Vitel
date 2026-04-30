import PitchSlide from "./PitchSlide";

const nodes = [
  { label: "Capture", desc: "Unified health data across ALL inputs (labs, wearables, scans, supplements, medications, fitness, lifestyle)" },
  { label: "Understand", desc: "Explainable AI insights, scores, and trends" },
  { label: "Validate", desc: "Clinical review (RN / PA)" },
  { label: "Act", desc: "Personalized protocols and recommendations" },
  { label: "Evolve", desc: "Practitioner network + real-world execution + feedback loop" },
];

export default function LoopSlide() {
  return (
    <PitchSlide>
      <div className="max-w-5xl w-full">
        <p className="chip chip-primary mb-6 text-[11px] tracking-widest uppercase">The Operating System</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4 max-w-3xl">
          The Vitel Operating System
        </h2>
        <p className="font-body text-foreground-muted mb-16 max-w-xl">
          A system that learns from every interaction
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {nodes.map((node, i) => (
            <div key={i} className="group bg-gradient-card border border-border rounded-xl p-7 hover:border-primary/30 transition-all duration-300">
              <span className="font-display text-xs text-primary/60 tracking-widest">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="font-display text-lg font-semibold mt-3 mb-2">{node.label}</h3>
              <p className="font-body text-sm text-foreground-muted">{node.desc}</p>
              <div className="mt-5 w-8 h-px bg-primary/30 group-hover:w-12 transition-all duration-300" />
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <p className="font-body text-sm text-foreground-subtle">Continuous system improvement</p>
        </div>
      </div>
    </PitchSlide>
  );
}
