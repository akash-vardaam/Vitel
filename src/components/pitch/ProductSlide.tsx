import PitchSlide from "./PitchSlide";
import appMetrics from "@/assets/app-metrics.png";
import appBioage from "@/assets/app-bioage.png";
import appReview from "@/assets/app-review.png";
import appActions from "@/assets/app-actions.png";

const cards = [
  {
    step: "01",
    title: "Connect your health data",
    desc: "Labs, wearables, scans, supplements, medications, fitness",
    img: appMetrics,
  },
  {
    step: "02",
    title: "Understand your biology",
    desc: "Biological age + key drivers\nExplainable AI insights",
    img: appBioage,
  },
  {
    step: "03",
    title: "Validate with clinicians",
    desc: "Expert review (RN / PA)\nHuman + AI alignment",
    img: appReview,
  },
  {
    step: "04",
    title: "Execute in the real world",
    desc: "Protocols + practitioner network\nOutcomes, not recommendations",
    img: appActions,
  },
];

export default function ProductSlide() {
  return (
    <PitchSlide>
      <div className="max-w-6xl w-full">
        <p className="chip chip-primary mb-6 text-[11px] tracking-widest uppercase">Product</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-16">
          From data to action in minutes
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <div key={card.step} className="group flex flex-col items-center text-center">
              <div className="relative w-full rounded-xl overflow-hidden border border-border bg-background/50 mb-5 hover:border-primary/30 transition-all duration-500">
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-56 object-cover object-top opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
              </div>
              <span className="font-display text-xs text-primary/80 tracking-widest mb-2">{card.step}</span>
              <h3 className="font-display text-base font-semibold mb-2">{card.title}</h3>
              {card.desc.split("\n").map((line, i) => (
                <p key={i} className="font-body text-sm text-foreground-muted">{line}</p>
              ))}
              <div className="mt-4 mx-auto w-8 h-px bg-primary/30 group-hover:w-12 transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>
    </PitchSlide>
  );
}
