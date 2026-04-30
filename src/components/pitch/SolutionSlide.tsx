import PitchSlide from "./PitchSlide";
import appHome from "@/assets/app-home.png";
import appLongevity from "@/assets/app-longevity.png";
import appBloodwork from "@/assets/app-bloodwork.png";

export default function SolutionSlide() {
  return (
    <PitchSlide className="relative overflow-hidden">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-16">
          <p className="chip chip-primary mb-6 text-[11px] tracking-widest uppercase">The Solution</p>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Vitel completes the loop
          </h2>
          <p className="font-body text-lg md:text-xl text-foreground-muted max-w-3xl mx-auto leading-relaxed">
            A system that continuously turns data into action—and action into better data
          </p>
        </div>

        {/* App screenshots showcase */}
        <div className="relative flex items-end justify-center gap-4 md:gap-8">
          {/* Side screen - Bloodwork */}
          <div className="hidden md:block w-44 lg:w-56 rounded-2xl overflow-hidden border border-border/50 shadow-2xl shadow-primary/5 opacity-60 translate-y-6 hover:opacity-90 hover:-translate-y-0 transition-all duration-700">
            <img src={appBloodwork} alt="Bloodwork analysis" className="w-full object-cover" />
          </div>

          {/* Center screen - Home dashboard */}
          <div className="w-60 md:w-68 lg:w-80 rounded-2xl overflow-hidden border-2 border-primary/30 shadow-2xl shadow-primary/10 relative z-10 animate-float">
            <img src={appHome} alt="Vitel dashboard" className="w-full object-cover" />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5" />
          </div>

          {/* Side screen - Longevity Score */}
          <div className="hidden md:block w-44 lg:w-56 rounded-2xl overflow-hidden border border-border/50 shadow-2xl shadow-primary/5 opacity-60 translate-y-6 hover:opacity-90 hover:-translate-y-0 transition-all duration-700">
            <img src={appLongevity} alt="Longevity score" className="w-full object-cover" />
          </div>
        </div>

        {/* Glow behind phones */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-16 w-[500px] h-40 bg-primary/5 blur-3xl rounded-full pointer-events-none" />
      </div>
    </PitchSlide>
  );
}
