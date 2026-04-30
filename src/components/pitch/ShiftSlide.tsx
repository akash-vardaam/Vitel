import PitchSlide from "./PitchSlide";
import { TrendingUp, BrainCircuit, Layers } from "lucide-react";

const cards = [
  { icon: TrendingUp, title: "Explosion of health data", desc: "Wearables, labs, genomics, imaging" },
  { icon: BrainCircuit, title: "Rise of AI interpretation", desc: "Models that understand biology" },
  { icon: Layers, title: "The missing layer", desc: "No system connects insight → action → outcome" },
];

export default function ShiftSlide() {
  return (
    <PitchSlide id="shift">
      <div className="max-w-5xl w-full">
        <p className="chip chip-primary mb-6 text-[11px] tracking-widest uppercase">The Shift</p>
        <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-16 max-w-4xl">
          We are entering the era of<br />
          <span className="text-gradient-primary">personal health intelligence</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div key={card.title} className="group bg-gradient-card border border-border rounded-xl p-8 hover:border-primary/30 hover:shadow-glow-primary/10 transition-all duration-300">
              <card.icon className="w-8 h-8 text-primary mb-5" strokeWidth={1.5} />
              <h3 className="font-display text-lg font-semibold mb-2">{card.title}</h3>
              <p className="font-body text-sm text-foreground-muted">{card.desc}</p>
              <div className="mt-5 w-8 h-px bg-primary/30 group-hover:w-12 transition-all duration-300" />
            </div>
          ))}
        </div>

        <div className="mt-14">
          <div className="w-10 h-0.5 bg-primary mx-auto md:mx-0 mb-4" />
          <p className="font-display text-xl font-semibold text-foreground/90">
            This gap becomes the category
          </p>
        </div>
      </div>
    </PitchSlide>
  );
}
