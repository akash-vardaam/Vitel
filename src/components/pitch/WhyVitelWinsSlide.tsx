import PitchSlide from "./PitchSlide";
import { RefreshCw, Database, Zap } from "lucide-react";

export default function WhyVitelWinsSlide() {
  return (
    <PitchSlide>
      <div className="max-w-5xl w-full text-center flex flex-col items-center">
        <p className="chip chip-primary mb-6 text-[11px] tracking-widest uppercase">Differentiation</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-16">
          Built for the system,<br />not the feature
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {[
            { icon: RefreshCw, title: "Closed-loop architecture", desc: "Not a feature—an integrated system" },
            { icon: Database, title: "Multi-modal data foundation", desc: "Unifies all health inputs from day one" },
            { icon: Zap, title: "Execution layer", desc: "Turns insight into real-world action" },
          ].map((card) => (
            <div key={card.title} className="group bg-gradient-card border border-border rounded-xl p-8 hover:border-primary/30 transition-all duration-300 text-center flex flex-col items-center">
              <card.icon className="w-8 h-8 text-primary mb-5" strokeWidth={1.5} />
              <h3 className="font-display text-lg font-semibold mb-3">{card.title}</h3>
              <p className="font-body text-sm text-foreground-muted leading-relaxed">{card.desc}</p>
              <div className="mt-5 w-8 h-px bg-primary/30 group-hover:w-12 transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>
    </PitchSlide>
  );
}
