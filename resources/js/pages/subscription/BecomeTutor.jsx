


import DashboardPreview from "@/components/subscription/DashboardPreview";
import Earnings from "@/components/subscription/Earnings";
import HowItWorks from "@/components/subscription/HowItWorks";
import TeachCategories from "@/components/subscription/TeachCategories";
import TutorCTA from "@/components/subscription/TutorCTA";
import TutorHero from "@/components/subscription/TutorHero";
import TutorPlans from "@/components/subscription/TutorPlans";
import WhyTeach from "@/components/subscription/WhyTeach";

const BecomeTutor = () => {
  return (
    <div className="min-h-screen bg-background ">
      {/* <Navbar /> */}
      <main>
        <TutorHero />
        <WhyTeach/>
        <HowItWorks />
        <TeachCategories />
        <DashboardPreview />
        <TutorPlans />
        <Earnings />
        <TutorCTA />
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default BecomeTutor;
