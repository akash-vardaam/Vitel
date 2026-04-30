import PitchSlide from "./PitchSlide";
import vitelLight from "@/assets/vitel_light.png";
import { ChevronDown } from "lucide-react";

export default function CoverSlide() {
  return (
    <PitchSlide className="relative overflow-hidden">
      {/* Rotating rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] md:w-[900px] md:h-[900px] rounded-full border border-primary/10 animate-spin-slow" />
        <div className="absolute w-[420px] h-[420px] md:w-[620px] md:h-[620px] rounded-full border border-primary/5 animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "30s" }} />
        <div className="absolute w-[240px] h-[240px] md:w-[340px] md:h-[340px] rounded-full border border-primary/[0.08] animate-spin-slow" style={{ animationDuration: "40s" }} />
      </div>

      {/* Glow */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 50% 35%, hsl(170 48% 51% / 0.1) 0%, transparent 55%)" }} />

      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl">
        <img src={vitelLight} alt="Vitel" className="h-20 md:h-28 object-contain mb-8" />
        <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-6">
          Your Body. Your Data.
        </h1>
        <p className="font-body text-xl md:text-2xl text-foreground-muted max-w-2xl mb-4 leading-relaxed">
          A closed-loop health intelligence system<br />
          That turns data into action—and action into better outcomes
        </p>
        <p className="font-body text-sm text-foreground-subtle max-w-lg mb-10">
          Not a health app. A system that runs your health.
        </p>

        <button
          onClick={() => document.getElementById("shift")?.scrollIntoView({ behavior: "smooth" })}
          className="group inline-flex items-center gap-2 chip chip-primary text-sm px-6 py-3 hover:bg-primary/20 transition-colors duration-300 cursor-pointer"
        >
          Explore the system
          <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
        </button>

        <div className="mt-20 flex flex-col items-center gap-3">
          <div className="w-px h-12 bg-gradient-to-b from-primary/40 to-transparent animate-pulse" />
        </div>
      </div>
    </PitchSlide>
  );
}
