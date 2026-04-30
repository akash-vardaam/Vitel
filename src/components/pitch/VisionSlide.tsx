import PitchSlide from "./PitchSlide";
import vitelLight from "@/assets/vitel_light.png";

export default function VisionSlide() {
  return (
    <PitchSlide className="relative overflow-hidden">
      {/* Rotating rings — matching cover */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] md:w-[900px] md:h-[900px] rounded-full border border-primary/10 animate-spin-slow" />
        <div className="absolute w-[420px] h-[420px] md:w-[620px] md:h-[620px] rounded-full border border-primary/5 animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "30s" }} />
        <div className="absolute w-[240px] h-[240px] md:w-[340px] md:h-[340px] rounded-full border border-primary/[0.08] animate-spin-slow" style={{ animationDuration: "40s" }} />
      </div>

      {/* Glow */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 50% 40%, hsl(170 48% 51% / 0.1) 0%, transparent 55%)" }} />

      <div className="relative z-10 max-w-4xl w-full text-center flex flex-col items-center">
        <p className="chip chip-primary mb-6 text-[11px] tracking-widest uppercase">Vision</p>
        <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-6">
          We're not building<br />a health app
        </h2>
        <p className="font-body text-xl md:text-2xl text-foreground-muted max-w-3xl mx-auto leading-relaxed mb-4">
          We're building the system that runs your health
        </p>
        <p className="font-body text-base text-foreground-subtle max-w-xl mx-auto italic mb-16">
          A platform that gets smarter with every user, every insight, and every action
        </p>

        <img src={vitelLight} alt="Vitel" className="h-8 object-contain opacity-60" />
      </div>
    </PitchSlide>
  );
}
