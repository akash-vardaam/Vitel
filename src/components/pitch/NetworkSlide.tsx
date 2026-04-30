import PitchSlide from "./PitchSlide";

const flow = ["Users", "Practitioners", "More Users", "Better Data", "Better Outcomes"];

export default function NetworkSlide() {
  return (
    <PitchSlide>
      <div className="max-w-5xl w-full text-center flex flex-col items-center">
        <p className="chip chip-primary mb-6 text-[11px] tracking-widest uppercase">Network Effect</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-16">
          Distribution is built<br />into the system
        </h2>

        {/* Flow */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
          {flow.map((item, i) => (
            <div key={item} className="flex items-center gap-3">
              <span className="chip chip-primary text-sm font-medium px-4 py-2">{item}</span>
              {i < flow.length - 1 && <span className="text-primary/40 text-lg">→</span>}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            "Practitioners adopt Vitel as a tool",
            "Clients onboard to participate",
            "The system improves with every interaction",
          ].map((line, i) => (
            <div key={line} className="group bg-gradient-card border border-border rounded-xl p-7 hover:border-primary/30 transition-colors duration-300 flex flex-col items-center text-center">
              <span className="font-display text-xs text-primary/60 tracking-widest">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="font-display text-lg font-semibold mt-3 mb-2">{line}</h3>
              <div className="mt-5 w-8 h-px bg-primary/30 group-hover:w-12 transition-all duration-300" />
            </div>
          ))}
        </div>

        <div className="mt-14">
          <div className="w-10 h-0.5 bg-primary mx-auto mb-4" />
          <p className="font-display text-xl font-semibold text-foreground/90 mb-2">
            Every new user improves the system for every other user
          </p>
          <p className="font-body text-sm text-foreground-subtle">
            A self-reinforcing health intelligence network
          </p>
        </div>
      </div>
    </PitchSlide>
  );
}
