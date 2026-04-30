import CoverSlide from "@/components/pitch/CoverSlide";
import ShiftSlide from "@/components/pitch/ShiftSlide";
import ProblemSlide from "@/components/pitch/ProblemSlide";
import SolutionSlide from "@/components/pitch/SolutionSlide";
import LoopSlide from "@/components/pitch/LoopSlide";
import ProductSlide from "@/components/pitch/ProductSlide";
import CoreIntelligenceSlide from "@/components/pitch/CoreIntelligenceSlide";
import ExplainableAISlide from "@/components/pitch/ExplainableAISlide";
import AIModesSlide from "@/components/pitch/AIModesSlide";
import TrustLayerSlide from "@/components/pitch/TrustLayerSlide";
import WhyVitelWinsSlide from "@/components/pitch/WhyVitelWinsSlide";
import MatrixSlide from "@/components/pitch/MatrixSlide";
import DifferentiationSlide from "@/components/pitch/DifferentiationSlide";
import NetworkSlide from "@/components/pitch/NetworkSlide";
import BusinessModelSlide from "@/components/pitch/BusinessModelSlide";
import VisionSlide from "@/components/pitch/VisionSlide";

export default function PitchPage() {
  return (
    <div className="bg-background text-foreground snap-y snap-mandatory h-screen overflow-y-auto scroll-smooth">
      <CoverSlide />
      <ShiftSlide />
      <ProblemSlide />
      <SolutionSlide />
      <LoopSlide />
      <ProductSlide />
      <CoreIntelligenceSlide />
      <ExplainableAISlide />
      <AIModesSlide />
      <TrustLayerSlide />
      <WhyVitelWinsSlide />
      <MatrixSlide />
      <DifferentiationSlide />
      <NetworkSlide />
      <BusinessModelSlide />
      <VisionSlide />
    </div>
  );
}
