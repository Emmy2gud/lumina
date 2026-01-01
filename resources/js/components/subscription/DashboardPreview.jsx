import tutorDashboard from "@/assets/tutor-dashboard-preview.png";

const DashboardPreview = () => {
  return (
    <section className="py-20 lg:py-28 overflow-hidden">
      <div className="container-lg section-padding">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              Instructor Dashboard
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Powerful tools to manage your teaching business
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Get a complete overview of your courses, students, and earnings—all in one place. Our intuitive dashboard gives you the insights you need to grow.
            </p>

            <ul className="space-y-4">
              {[
                "Course creation and management",
                "Real-time student enrollment tracking",
                "Detailed revenue analytics",
                "Student feedback and ratings",
                "Promotional tools and discounts",
                "Direct messaging with students",
              ].map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full gradient-bg flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-3 h-3 text-primary-foreground"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Dashboard Image */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border/50">
              <img
                src={tutorDashboard}
                alt="LearnHub instructor dashboard showing course analytics and student management"
                className="w-full h-auto"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -z-10 top-1/2 right-0 w-72 h-72 bg-purple-200/40 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;
