import PitchSlide from "./PitchSlide";

export default function AIModesSlide() {
  return (
    <PitchSlide>
      <div className="max-w-6xl w-full">
        <p className="chip chip-primary mb-6 text-[11px] tracking-widest uppercase">AI Modes</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4 max-w-4xl">
          One system — <span className="text-gradient-primary">Two ways of thinking</span>
        </h2>
        <p className="font-body text-lg text-foreground-muted mb-14 max-w-2xl">
          Vitel adapts its reasoning based on how you want to act
        </p>

        {/* Query prompt */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="bg-background-elevated border border-border rounded-xl px-6 py-4 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0" />
            <p className="font-body text-sm text-foreground/80 italic">
              "How can I improve my cardiovascular health based on my data?"
            </p>
          </div>
        </div>

        {/* Two response cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          {/* Clinical Mode */}
          <div className="group relative bg-gradient-card border border-primary/20 rounded-xl p-7 hover:border-primary/40 transition-all duration-300">
            <div className="absolute inset-0 rounded-xl bg-primary/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/15 text-primary text-[11px] font-semibold tracking-wider uppercase mb-5">
                Clinical Mode
              </span>
              <h3 className="font-display text-lg font-semibold mb-5">Evidence-first guidance</h3>

              <div className="space-y-4 text-sm font-body">
                <div>
                  <p className="text-foreground-muted text-xs uppercase tracking-wider mb-1">Focus</p>
                  <p className="text-foreground/85">Risk reduction and validated outcomes</p>
                </div>
                <div>
                  <p className="text-foreground-muted text-xs uppercase tracking-wider mb-1">Data Used</p>
                  <p className="text-foreground/85">ApoB elevated, sleep variability, HRV trends</p>
                </div>
                <div>
                  <p className="text-foreground-muted text-xs uppercase tracking-wider mb-1">Insight</p>
                  <p className="text-foreground/85">Elevated cardiovascular risk driven by lipid profile and recovery patterns</p>
                </div>
                <div>
                  <p className="text-foreground-muted text-xs uppercase tracking-wider mb-1">Recommendation</p>
                  <ul className="space-y-1 text-foreground/85">
                    <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-primary shrink-0" />Improve sleep consistency</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-primary shrink-0" />Increase steady-state cardio</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-primary shrink-0" />Review lipid markers with clinician</li>
                  </ul>
                </div>
                <div className="flex gap-6">
                  <div>
                    <p className="text-foreground-muted text-xs uppercase tracking-wider mb-1">Confidence</p>
                    <p className="text-primary font-semibold">High</p>
                  </div>
                  <div>
                    <p className="text-foreground-muted text-xs uppercase tracking-wider mb-1">Evidence</p>
                    <p className="text-foreground/85">Peer-reviewed clinical research</p>
                  </div>
                </div>
                <div>
                  <p className="text-foreground-muted text-xs uppercase tracking-wider mb-1">Tone</p>
                  <p className="text-foreground/70 italic text-xs">Conservative, precise, medically aligned</p>
                </div>
              </div>
            </div>
          </div>

          {/* Biohack Mode */}
          <div className="group relative bg-gradient-card border border-accent/20 rounded-xl p-7 hover:border-accent/40 transition-all duration-300">
            <div className="absolute inset-0 rounded-xl bg-accent/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <span className="inline-block px-3 py-1 rounded-full bg-accent/15 text-accent text-[11px] font-semibold tracking-wider uppercase mb-5">
                Biohack Mode
              </span>
              <h3 className="font-display text-lg font-semibold mb-5">Optimization and performance focus</h3>

              <div className="space-y-4 text-sm font-body">
                <div>
                  <p className="text-foreground-muted text-xs uppercase tracking-wider mb-1">Focus</p>
                  <p className="text-foreground/85">Performance, optimization, experimentation</p>
                </div>
                <div>
                  <p className="text-foreground-muted text-xs uppercase tracking-wider mb-1">Data Used</p>
                  <p className="text-foreground/85">ApoB, HRV suppression, sleep inconsistency</p>
                </div>
                <div>
                  <p className="text-foreground-muted text-xs uppercase tracking-wider mb-1">Insight</p>
                  <p className="text-foreground/85">Cardiovascular strain with sleep as highest leverage variable</p>
                </div>
                <div>
                  <p className="text-foreground-muted text-xs uppercase tracking-wider mb-1">Opportunities</p>
                  <ul className="space-y-1 text-foreground/85">
                    <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-accent shrink-0" />Sleep timing optimization</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-accent shrink-0" />Omega-3 optimization</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-accent shrink-0" />HRV recovery protocols (breathwork, cold exposure)</li>
                  </ul>
                </div>
                <div className="flex gap-6">
                  <div>
                    <p className="text-foreground-muted text-xs uppercase tracking-wider mb-1">Confidence</p>
                    <p className="text-accent font-semibold">Moderate to high</p>
                  </div>
                  <div>
                    <p className="text-foreground-muted text-xs uppercase tracking-wider mb-1">Evidence</p>
                    <p className="text-foreground/85">Clinical + emerging research</p>
                  </div>
                </div>
                <div>
                  <p className="text-foreground-muted text-xs uppercase tracking-wider mb-1">Tone</p>
                  <p className="text-foreground/70 italic text-xs">Exploratory, forward-looking, optimization-driven</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom statement */}
        <div className="text-center space-y-1">
          <p className="font-display text-lg font-semibold text-foreground/90">
            Same data · Different lens · Full transparency
          </p>
        </div>
      </div>
    </PitchSlide>
  );
}
