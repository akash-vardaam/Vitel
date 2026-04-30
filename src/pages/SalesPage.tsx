import { useEffect, useRef, useState } from "react";
import { Database, Sparkles, Zap, Target, Repeat, type LucideIcon } from "lucide-react";
import vitelLight from "@/assets/vitel_light.png";
import RequestDemoForm from "@/components/RequestDemoForm";

/* ── Fade-in on scroll ── */
function FadeSection({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <section
      ref={ref}
      id={id}
      className={`transition-all duration-1000 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </section>
  );
}

/* ── Ambient hero backdrop ── */
function HeroBackdrop() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Concentric rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[600px] md:w-[900px] md:h-[900px] rounded-full border border-primary/10 animate-spin-slow" />
        <div
          className="absolute w-[420px] h-[420px] md:w-[620px] md:h-[620px] rounded-full border border-primary/10 animate-spin-slow"
          style={{ animationDirection: "reverse", animationDuration: "30s" }}
        />
        <div
          className="absolute w-[260px] h-[260px] md:w-[380px] md:h-[380px] rounded-full border border-primary/5 animate-spin-slow"
          style={{ animationDuration: "45s" }}
        />
      </div>
      {/* Radial glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, hsl(170 48% 51% / 0.12) 0%, transparent 55%)",
        }}
      />
    </div>
  );
}

/* ── CTA button ── */
function PrimaryCTA({ children }: { children: React.ReactNode }) {
  return (
    <a
      href="#demo"
      className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-medium text-sm tracking-wide transition-all duration-300 hover:shadow-[0_0_40px_-5px_hsl(var(--primary)/0.6)] hover:-translate-y-0.5"
    >
      <span>{children}</span>
      <span className="transition-transform duration-300 group-hover:translate-x-0.5">
        →
      </span>
    </a>
  );
}

/* ── Countdown to end of year ── */
function YearEndCountdown() {
  const getRemaining = () => {
    const now = new Date();
    const end = new Date(now.getFullYear() + 1, 0, 1).getTime();
    const diff = Math.max(0, end - now.getTime());
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return { days, hours, minutes, seconds };
  };

  const [t, setT] = useState(getRemaining);

  useEffect(() => {
    const id = setInterval(() => setT(getRemaining()), 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className="flex items-center gap-2 text-xs tracking-widest uppercase">
      <span className="text-foreground-muted">Public Release:</span>
      <span className="text-primary font-medium tabular-nums">
        {t.days}d {pad(t.hours)}:{pad(t.minutes)}:{pad(t.seconds)}
      </span>
    </div>
  );
}

/* ── Circular loop diagram ── */
function LoopDiagram() {
  const nodes: { label: string; angle: number; Icon: LucideIcon }[] = [
    { label: "Data", angle: -90, Icon: Database },
    { label: "Insight", angle: -18, Icon: Sparkles },
    { label: "Action", angle: 54, Icon: Zap },
    { label: "Outcome", angle: 126, Icon: Target },
    { label: "Learning", angle: 198, Icon: Repeat },
  ];
  const radius = 140;
  const size = 360;
  const center = size / 2;

  return (
    <div className="relative mx-auto" style={{ width: size, height: size }}>
      {/* Rotating dashed ring */}
      <svg
        className="absolute inset-0 animate-spin-slow"
        style={{ animationDuration: "40s" }}
        viewBox={`0 0 ${size} ${size}`}
      >
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="hsl(var(--primary) / 0.35)"
          strokeWidth="1"
          strokeDasharray="4 8"
        />
      </svg>
      {/* Inner glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-32 h-32 rounded-full bg-primary/10 blur-2xl" />
      </div>
      {/* Center logo */}
      <div className="absolute inset-0 flex items-center justify-center">
        <img src={vitelLight} alt="Vitel" className="h-8 md:h-10 w-auto opacity-90" />
      </div>
      {/* Nodes */}
      {nodes.map((n, i) => {
        const rad = (n.angle * Math.PI) / 180;
        const x = center + radius * Math.cos(rad);
        const y = center + radius * Math.sin(rad);
        const Icon = n.Icon;
        return (
          <div
            key={n.label}
            className="absolute flex items-center justify-center"
            style={{
              left: x,
              top: y,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="relative flex flex-col items-center gap-2.5">
              <div className="flex items-center justify-center w-11 h-11 rounded-full bg-background border border-primary/40 shadow-[0_0_24px_hsl(var(--primary)/0.35)]">
                <Icon className="w-4.5 h-4.5 text-primary" strokeWidth={1.75} size={18} />
              </div>
              <span
                className="font-display text-sm md:text-base font-medium tracking-tight text-foreground whitespace-nowrap animate-fade-in"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                {n.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function SalesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-body antialiased selection:bg-primary/30">
      {/* ── NAV ── */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/40 border-b border-border/30">
        <div className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <img src={vitelLight} alt="Vitel" className="h-6 w-auto" />
          </a>
          <YearEndCountdown />
        </div>
      </header>

      {/* ── 1. HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        <HeroBackdrop />
        <div className="relative z-10 max-w-4xl text-center">
          <p className="chip chip-primary mb-8 text-[10px] tracking-[0.25em] uppercase animate-fade-in">
            Longevity Intelligence OS
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-[1.02] mb-8 animate-fade-in">
            Run your health practice
            <br />
            <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              on one system
            </span>
          </h1>
          <p
            className="font-body text-lg md:text-xl text-foreground-muted max-w-xl mx-auto mb-12 leading-relaxed animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            A new operating system for longevity — built for practitioners.
          </p>
          <div
            className="animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            <PrimaryCTA>Request Demo</PrimaryCTA>
          </div>
        </div>
        {/* Scroll cue */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-foreground-muted/40 text-xs tracking-widest uppercase animate-pulse">
          Scroll
        </div>
      </section>

      {/* ── 2. SIGNAL ── */}
      <FadeSection className="py-40 px-6">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <p className="font-display text-2xl md:text-4xl font-light tracking-tight text-foreground-muted leading-snug">
            Health data is everywhere.
          </p>
          <p className="font-display text-2xl md:text-4xl font-light tracking-tight text-foreground-muted leading-snug">
            AI is improving.
          </p>
          <p className="font-display text-2xl md:text-4xl font-light tracking-tight text-foreground-muted leading-snug">
            But execution is still broken.
          </p>
          <div className="pt-10">
            <p className="font-display text-3xl md:text-5xl font-semibold tracking-tight text-foreground">
              We <span className="text-primary">close the loop.</span>
            </p>
          </div>

          <div className="pt-20">
            <LoopDiagram />
          </div>
        </div>
      </FadeSection>

      {/* Divider */}
      <div className="max-w-xs mx-auto h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      {/* ── 3. WHAT IT IS ── */}
      <FadeSection className="py-40 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="chip chip-primary mb-6 text-[10px] tracking-[0.25em] uppercase">
            The System
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-semibold tracking-tight mb-20 leading-tight">
            A system that connects everything
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border/40 border border-border/40 rounded-2xl overflow-hidden max-w-3xl mx-auto">
            {[
              "Client data connected, unified",
              "AI that reasons transparently",
              "Sessions that turn into action",
              "Protocols that drive outcomes",
            ].map((item, i) => (
              <div
                key={i}
                className="bg-background/60 backdrop-blur-sm p-10 md:p-12 text-left hover:bg-primary/[0.03] transition-colors duration-500"
              >
                <span className="font-display text-xs text-primary/60 tracking-widest mb-4 block">
                  0{i + 1}
                </span>
                <p className="font-display text-xl md:text-2xl font-medium tracking-tight">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </FadeSection>

      {/* Divider */}
      <div className="max-w-xs mx-auto h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      {/* ── 4. DIFFERENCE ── */}
      <FadeSection className="py-40 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.06),transparent_70%)] pointer-events-none" />
        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-6xl font-semibold tracking-tight mb-10 leading-tight">
            This isn't another tool
          </h2>
          <p className="font-body text-lg md:text-xl text-foreground-muted leading-relaxed mb-12 max-w-2xl mx-auto">
            Vitel replaces the fragmented stack practitioners rely on today —
            notes, dashboards, disconnected insights, and manual workflows.
          </p>
          <div className="inline-flex flex-col md:flex-row items-center gap-3 md:gap-6 px-8 py-5 rounded-full border border-primary/20 bg-primary/[0.03]">
            <span className="font-display text-sm md:text-base text-foreground">
              One system.
            </span>
            <span className="hidden md:block w-1 h-1 rounded-full bg-primary/40" />
            <span className="font-display text-sm md:text-base text-foreground">
              Continuous intelligence.
            </span>
            <span className="hidden md:block w-1 h-1 rounded-full bg-primary/40" />
            <span className="font-display text-sm md:text-base text-primary">
              Real outcomes.
            </span>
          </div>
        </div>
      </FadeSection>

      {/* Divider */}
      <div className="max-w-xs mx-auto h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      {/* ── 5. ZERO-IDENTITY ── */}
      <FadeSection className="py-40 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-primary/10" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-primary/5" />
        </div>
        <div className="relative max-w-3xl mx-auto text-center">
          <p className="chip chip-primary mb-6 text-[10px] tracking-[0.25em] uppercase">
            Architecture
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-semibold tracking-tight mb-8 leading-tight">
            Vitel operates on a
            <br />
            <span className="bg-gradient-to-r from-primary via-foreground to-primary bg-clip-text text-transparent">
              zero-identity architecture
            </span>
          </h2>
          <p className="font-display text-xl md:text-2xl font-light text-foreground-muted leading-snug mb-10">
            No personal identifiers. No exposed health records.
          </p>
          <p className="font-body text-base md:text-lg text-foreground-muted max-w-xl mx-auto leading-relaxed">
            Practitioners work with fully functional health data —
            without ever handling sensitive identity layers.
          </p>
        </div>
      </FadeSection>

      {/* Divider */}
      <div className="max-w-xs mx-auto h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      {/* ── 6. SOCIAL PROOF ── */}

      <FadeSection className="py-32 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="text-[10px] tracking-[0.25em] uppercase text-primary/80">
              Now Onboarding
            </span>
          </div>
          <p className="font-display text-2xl md:text-3xl font-light tracking-tight text-foreground leading-snug">
            Currently onboarding a select group of practitioners.
          </p>
          <p className="mt-6 text-sm text-foreground-muted tracking-wide">
            Private demos now available.
          </p>
        </div>
      </FadeSection>

      {/* ── 6. CTA / DEMO FORM ── */}
      <FadeSection
        id="demo"
        className="py-40 px-6 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(var(--primary)/0.15),transparent_60%)] pointer-events-none" />
        <div className="relative max-w-3xl mx-auto text-center mb-14">
          <h2 className="font-display text-5xl md:text-6xl font-semibold tracking-tight mb-5 leading-[1.05]">
            Schedule a Demo
          </h2>
          <p className="text-base md:text-lg text-foreground-muted">
            See how Vitel can run your entire practice.
          </p>
        </div>
        <div className="relative">
          <RequestDemoForm />
        </div>
      </FadeSection>

      {/* ── FOOTER ── */}
      <footer className="border-t border-border/30 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <img src={vitelLight} alt="Vitel" className="h-5 w-auto opacity-70" />
          <a
            href="mailto:discover@vitel.life"
            className="text-xs tracking-widest uppercase text-foreground-muted hover:text-foreground transition-colors"
          >
            discover@vitel.life
          </a>
        </div>
      </footer>
    </div>
  );
}
