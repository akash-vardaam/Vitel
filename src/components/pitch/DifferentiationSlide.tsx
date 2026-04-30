import PitchSlide from "./PitchSlide";

export default function DifferentiationSlide() {
  return (
    <PitchSlide>
      <div className="max-w-6xl w-full text-center flex flex-col items-center">
        <p className="chip chip-primary mb-6 text-[11px] tracking-widest uppercase">Differentiation</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4 max-w-4xl">
          The market stops at insight<br />
          <span className="text-gradient-primary">Vitel owns execution</span>
        </h2>
        <p className="font-body text-lg text-foreground-muted mb-14 max-w-2xl">
          We don't compete on better insights. We compete on outcomes.
        </p>

        <div className="space-y-10">
          {/* Competitors */}
          <div className="space-y-4">
            <p className="font-body text-xs text-foreground-subtle uppercase tracking-wider">Others stop here</p>
            <div className="flex flex-wrap justify-center gap-2">
              {["InsideTracker", "Function Health", "Whoop", "Levels", "Superpower"].map((name) => (
                <span key={name} className="chip text-[11px]">{name}</span>
              ))}
            </div>
            <p className="font-body text-sm text-foreground-muted">Reports, scores, recommendations — but no execution layer</p>
          </div>

          <div className="w-full h-px bg-border" />

          {/* Vitel flow */}
          <div className="space-y-4">
            <p className="font-body text-xs text-primary uppercase tracking-wider font-semibold">Vitel controls the full system</p>
            <div className="flex flex-wrap justify-center items-center gap-2 font-body text-sm text-foreground">
              {["Data", "Insight", "Clinician", "Protocol", "Practitioner", "Feedback"].map((step, i, arr) => (
                <span key={step} className="flex items-center gap-2">
                  <span className="chip chip-primary text-[11px]">{step}</span>
                  {i < arr.length - 1 && <span className="text-primary/60">→</span>}
                </span>
              ))}
            </div>
            <p className="font-body text-sm text-foreground-muted">A connected system that turns data into outcomes—and learns from every cycle</p>
          </div>
        </div>
      </div>
    </PitchSlide>
  );
}
