import { CallToActionSection } from "@/components/layout/CallToActionSection";
import FAQSection from "@/components/layout/FAQ";
import FeatureTutor from "@/components/layout/FeatureTutor";
import { Hero } from "@/components/layout/Hero";
import Testimonials from "@/components/layout/Testimonials";

export default async function Home() {
  return (
    <div className="">
      <Hero />
      <div className="max-w-10/12 mx-auto py-10 lg:py-20">
        <FeatureTutor />
      </div>
      <CallToActionSection />
      <div className="max-w-10/12 mx-auto py-10 lg:py-20">
        <FAQSection />
      </div>
      <div className=" py-10 lg:py-20 bg-muted/30">
        <Testimonials />
      </div>
    </div>
  );
}
