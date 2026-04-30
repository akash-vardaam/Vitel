import PitchSlide from "./PitchSlide";
import { Activity, TrendingUp } from "lucide-react";

export default function CoreIntelligenceSlide() {
  return (
    <PitchSlide>
      <div className="max-w-6xl w-full">
        <p className="chip chip-primary mb-6 text-[11px] tracking-widest uppercase">The Engines</p>
        <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-4">
          Two engines power Vitel
        </h2>
        <p className="font-body text-lg text-foreground-muted mb-16">
          Not a score. A system.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Biological Age Engine */}
          <div className="group bg-gradient-card border border-border rounded-2xl p-8 md:p-10 hover:border-primary/30 transition-all duration-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 blur-3xl rounded-full pointer-events-none" />
            <div className="relative z-10">
              <Activity className="w-10 h-10 text-primary mb-6" strokeWidth={1.5} />
              <h3 className="font-display text-2xl font-bold mb-4">Biological Age Engine</h3>
              <p className="font-body text-foreground-muted mb-6 leading-relaxed">
                A real-time model of how your body is functioning today
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  "Uses multi-modal inputs (labs, fitness, recovery, body composition, lifestyle)",
                  "Applies clinical weighting",
                  "Prioritizes recency + consistency",
                  "Tracks contribution of each variable",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span className="font-body text-sm text-foreground-muted">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-background/50 border border-border rounded-lg p-4 mb-6">
                <p className="font-body text-xs text-foreground-subtle uppercase tracking-wider mb-1">Output</p>
                <p className="font-body text-sm text-foreground">Dynamic biological age that updates continuously</p>
              </div>

              <p className="font-display text-sm font-semibold text-primary italic">
                Not a static clock. A living model.
              </p>
            </div>
          </div>

          {/* Longevity Score Engine */}
          <div className="group bg-gradient-card border border-border rounded-2xl p-8 md:p-10 hover:border-primary/30 transition-all duration-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-accent/5 blur-3xl rounded-full pointer-events-none" />
            <div className="relative z-10">
              <TrendingUp className="w-10 h-10 text-primary mb-6" strokeWidth={1.5} />
              <h3 className="font-display text-2xl font-bold mb-4">Longevity Score Engine</h3>
              <p className="font-body text-foreground-muted mb-6 leading-relaxed">
                A forward-looking model of where your health is going
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  "Combines biological age + trajectory",
                  "Measures trends, risk markers, and adherence",
                  "Rewards consistency, not snapshots",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span className="font-body text-sm text-foreground-muted">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-background/50 border border-border rounded-lg p-4 mb-6">
                <p className="font-body text-xs text-foreground-subtle uppercase tracking-wider mb-1">Output</p>
                <p className="font-body text-sm text-foreground">0–100 score with direction + confidence</p>
              </div>

              <p className="font-display text-sm font-semibold text-primary italic">
                Where you are → where you're going
              </p>
            </div>
          </div>
        </div>
      </div>
    </PitchSlide>
  );
}
