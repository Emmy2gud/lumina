import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TutorHero from "@/components/tutor/TutorHero";
import WhyTeach from "@/components/tutor/WhyTeach";
import HowItWorks from "@/components/tutor/HowItWorks";
import TeachCategories from "@/components/tutor/TeachCategories";
import DashboardPreview from "@/components/tutor/DashboardPreview";
import TutorPlans from "@/components/tutor/TutorPlans";
import Earnings from "@/components/tutor/Earnings";
import TutorCTA from "@/components/tutor/TutorCTA";

const BecomeTutor = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <TutorHero />
        <WhyTeach />
        <HowItWorks />
        <TeachCategories />
        <DashboardPreview />
        <TutorPlans />
        <Earnings />
        <TutorCTA />
      </main>
      <Footer />
    </div>
  );
};

export default BecomeTutor;
