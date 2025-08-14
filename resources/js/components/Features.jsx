import { Card, CardContent } from "@/components/ui/card";
import { Award, Globe, ShieldCheck, Clock } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Expert instructors",
    desc: "Learn from vetted professionals with industry experience.",
  },
  {
    icon: Globe,
    title: "Learn anywhere",
    desc: "Mobile‑friendly lessons to study at your own pace.",
  },
  {
    icon: ShieldCheck,
    title: "Certificates",
    desc: "Earn shareable certificates to showcase your skills.",
  },
  {
    icon: Clock,
    title: "Bite‑sized videos",
    desc: "Short, focused lessons to fit your schedule.",
  },
];

const Features = () => {
  return (
    <section className="container mx-auto py-12" aria-labelledby="features-heading">
      <h2 id="features-heading" className="text-2xl font-bold">Why learn with Lumina</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => (
          <Card key={f.title} className="card-hover h-full">
            <CardContent className="p-6">
              <f.icon className="text-foreground" />
              <h3 className="mt-4 text-base font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Features;
