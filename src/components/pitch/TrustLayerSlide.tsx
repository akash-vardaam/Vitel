import PitchSlide from "./PitchSlide";
import MdiIcon from "@/components/ui/MdiIcon";
import { mdiShieldLockOutline, mdiEyeOffOutline, mdiAccountKeyOutline, mdiLockOutline, mdiServerSecurity, mdiFileSearchOutline, mdiDatabaseExportOutline } from "@mdi/js";

const cards = [
  {
    icon: mdiShieldLockOutline,
    title: "We don't store identity with data",
    points: [
      "Personal identity and health data are separated by design",
      "No direct linkage between user identity and health records",
      "Tokenized system replaces identifiable information",
    ],
    footer: "Your data can exist without revealing who you are",
  },
  {
    icon: mdiEyeOffOutline,
    title: "Insights without exposure",
    points: [
      "AI models operate on anonymized datasets",
      "No personal identifiers used in analysis",
      "System learns from patterns, not people",
    ],
    footer: "Your data improves the system—without exposing you",
  },
  {
    icon: mdiAccountKeyOutline,
    title: "You decide what is shared",
    points: [
      "Grant or revoke access to clinicians or practitioners at any time",
      "Time-based and scope-based permissions",
      "Share specific datasets, not your full profile",
    ],
    footer: "Access is explicit, reversible, and transparent",
  },
];

const details = [
  { icon: mdiLockOutline, text: "End-to-end encryption" },
  { icon: mdiServerSecurity, text: "Secure storage (HIPAA-ready infrastructure)" },
  { icon: mdiFileSearchOutline, text: "Audit logs for all access events" },
  { icon: mdiDatabaseExportOutline, text: "Data export and deletion at any time" },
];

export default function TrustLayerSlide() {
  return (
    <PitchSlide className="relative overflow-hidden">
      {/* Subtle differentiated glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-primary/[0.04] blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-5">
          <p className="chip chip-primary mb-2 text-[11px] tracking-widest uppercase">Trust Layer</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
            Your data is yours{" "}
            <span className="text-muted-foreground/50">— Not ours</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Vitel is built on a zero-identity architecture designed to protect, separate, and anonymize your health data at every level
          </p>
        </div>

        {/* 3 Core Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {cards.map((card) => (
            <div
              key={card.title}
              className="group relative rounded-2xl border border-border/40 bg-card/30 backdrop-blur-sm p-7 flex flex-col gap-5 transition-all duration-500 hover:border-primary/30 hover:bg-card/50"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-primary/[0.03] pointer-events-none" />

              <div className="relative z-10 flex flex-col gap-5 h-full">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <MdiIcon path={card.icon} size={20} className="text-primary" />
                </div>

                <h3 className="text-lg font-semibold tracking-tight">{card.title}</h3>

                <ul className="space-y-3 flex-1">
                  {card.points.map((point) => (
                    <li key={point} className="text-sm text-muted-foreground leading-relaxed flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-primary/50 shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>

                <p className="text-xs text-primary/60 font-medium pt-3 border-t border-border/30">
                  {card.footer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Full-width statement */}
        <div className="text-center py-8">
          <p className="text-xl md:text-2xl font-medium tracking-tight leading-snug">
            Health data should be{" "}
            <span className="text-primary">private by default</span>
            <br />
            <span className="text-muted-foreground/60">Not protected as an afterthought</span>
          </p>
        </div>

        {/* Detail row */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {details.map((d) => (
            <div key={d.text} className="flex items-center gap-2 text-xs text-muted-foreground/50">
              <MdiIcon path={d.icon} size={14} className="text-primary/40" />
              {d.text}
            </div>
          ))}
        </div>
      </div>
    </PitchSlide>
  );
}
