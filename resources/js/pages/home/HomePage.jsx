
import HeroSection from "@/components/landing/HeroSection";
import TrustBadges from "@/components/landing/TrustBadges";
import FeaturedCourses from "@/components/landing/FeaturedCourses";
import CategoriesSection from "@/components/landing/CategoriesSection";
import StatsSection from "@/components/landing/StatsSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import BenefitsSection from "@/components/landing/BenefitsSection";
import WaitlistSection from "@/components/landing/WaitlistSection";


const Index = () => {
  return (
    <>
      {/* SEO Meta Tags */}
      <title>LearnHub - Master In-Demand Skills with Expert-Led Courses</title>
      <meta
        name="description"
        content="Join 500K+ learners. Access 10,000+ expert courses, earn certificates, and accelerate your career with LearnHub's comprehensive learning platform."
      />

      <div className="min-h-screen bg-background">

        <main>
          <HeroSection />
          <TrustBadges />
          <FeaturedCourses />
          <CategoriesSection />
          <StatsSection />
          <HowItWorksSection />
          <TestimonialsSection />
          <BenefitsSection />
          <WaitlistSection />
        </main>

      </div>
    </>
  );
};

export default Index;
