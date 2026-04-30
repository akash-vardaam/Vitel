import PitchSlide from "./PitchSlide";
import { Database, Filter, FileText } from "lucide-react";

export default function ExplainableAISlide() {
  return (
    <PitchSlide>
      <div className="max-w-6xl w-full">
        <p className="chip chip-primary mb-6 text-[11px] tracking-widest uppercase">AI System</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4 max-w-4xl">
          Vitel doesn't generate answers<br />
          <span className="text-gradient-primary">It shows its reasoning</span>
        </h2>
        <p className="font-body text-lg text-foreground-muted mb-16 max-w-2xl">
          Every insight is traceable to data and evidence
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Data → Insight */}
          <div className="group bg-gradient-card border border-border rounded-xl p-8 hover:border-primary/30 transition-all duration-300">
            <Database className="w-8 h-8 text-primary mb-5" strokeWidth={1.5} />
            <h3 className="font-display text-lg font-semibold mb-3">Data → Insight</h3>
            <p className="font-body text-sm text-foreground-muted leading-relaxed">
              AI analyzes your full system, not isolated inputs
            </p>
            <div className="mt-5 w-8 h-px bg-primary/30 group-hover:w-12 transition-all duration-300" />
          </div>

          {/* Evidence → Filtering */}
          <div className="group bg-gradient-card border border-border rounded-xl p-8 hover:border-primary/30 transition-all duration-300">
            <Filter className="w-8 h-8 text-primary mb-5" strokeWidth={1.5} />
            <h3 className="font-display text-lg font-semibold mb-3">Evidence → Filtering</h3>
            <div className="space-y-4 mt-4">
              <div className="bg-background/60 border border-border rounded-lg p-3">
                <p className="font-display text-xs font-semibold text-primary mb-1">Clinical Mode</p>
                <p className="font-body text-xs text-foreground-muted">Peer-reviewed human studies • High confidence</p>
              </div>
              <div className="bg-background/60 border border-accent/20 rounded-lg p-3">
                <p className="font-display text-xs font-semibold text-accent mb-1">Biohack Mode</p>
                <p className="font-body text-xs text-foreground-muted">Emerging research • Experimental • Clearly labeled</p>
              </div>
            </div>
          </div>

          {/* Reasoning → Output */}
          <div className="group bg-gradient-card border border-border rounded-xl p-8 hover:border-primary/30 transition-all duration-300">
            <FileText className="w-8 h-8 text-primary mb-5" strokeWidth={1.5} />
            <h3 className="font-display text-lg font-semibold mb-3">Reasoning → Output</h3>
            <p className="font-body text-sm text-foreground-muted mb-4">Every insight includes:</p>
            <ul className="space-y-2">
              {["Data used", "Why it matters", "Confidence level", "Evidence type"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-primary shrink-0" />
                  <span className="font-body text-sm text-foreground-muted">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 text-center">
          <p className="font-display text-lg font-semibold text-foreground/90">
            Every recommendation is explainable
          </p>
        </div>
      </div>
    </PitchSlide>
  );
}
