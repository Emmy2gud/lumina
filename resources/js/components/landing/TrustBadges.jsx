const companies = [
  { name: "Google", logo: "G" },
  { name: "Microsoft", logo: "M" },
  { name: "Amazon", logo: "A" },
  { name: "Meta", logo: "f" },
  { name: "Apple", logo: "🍎" },
  { name: "Netflix", logo: "N" },
];

const TrustBadges = () => {
  return (
    <section className="py-12 lg:py-16 border-y border-border bg-muted/30">
      <div className="container-wide section-padding">
        <div className="text-center mb-8">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Trusted by professionals at leading companies
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
          {companies.map((company, index) => (
            <div
              key={company.name}
              className="flex items-center gap-2 text-muted-foreground/60 hover:text-muted-foreground transition-colors duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <span className="text-2xl font-bold">{company.logo}</span>
              <span className="text-lg font-semibold tracking-tight">{company.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
