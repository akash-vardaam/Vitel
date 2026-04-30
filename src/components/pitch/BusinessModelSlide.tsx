import PitchSlide from "./PitchSlide";
import { CreditCard, Stethoscope, Network } from "lucide-react";

const models = [
  { title: "Subscriptions", desc: "Tiered access to insights and features", icon: CreditCard },
  { title: "Clinical Reviews", desc: "Paid expert analysis (RN / PA)", icon: Stethoscope },
  { title: "Action Layer", desc: "Practitioner network + real-world execution", icon: Network },
];

export default function BusinessModelSlide() {
  return (
    <PitchSlide>
      <div className="max-w-5xl w-full">
        <p className="chip chip-primary mb-6 text-[11px] tracking-widest uppercase">Business Model</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-16">
          Revenue scales<br />with engagement
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {models.map((m) => (
            <div key={m.title} className="group bg-gradient-card border border-border rounded-xl p-8 hover:border-primary/30 transition-colors duration-300">
              <m.icon className="w-8 h-8 text-primary mb-5" strokeWidth={1.5} />
              <h3 className="font-display text-xl font-semibold mb-3">{m.title}</h3>
              <p className="font-body text-sm text-foreground-muted leading-relaxed">{m.desc}</p>
              <div className="mt-5 w-8 h-px bg-primary/30 group-hover:w-12 transition-all duration-300" />
            </div>
          ))}
        </div>

        <div className="mt-14">
          <div className="w-10 h-0.5 bg-primary mb-4" />
          <p className="font-display text-lg font-semibold text-foreground/90">
            The more a user relies on Vitel, the more the system monetizes
          </p>
        </div>
      </div>
    </PitchSlide>
  );
}
