import { CallToActionSection } from "@/components/layout/CallToActionSection";
import FeatureTutor from "@/components/layout/FeatureTutor";
import { Hero } from "@/components/layout/Hero";

export default async function Home() {
  return (
    <div className="">
      <Hero />
      <FeatureTutor />
      <CallToActionSection />
    </div>
  );
}
