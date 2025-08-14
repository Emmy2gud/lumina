import { Button } from "@/components/ui/button";

const categories = [
  "Development",
  "Design",
  "Data Science",
  "Marketing",
  "Business",
  "Product",
  "Cybersecurity",
  "Cloud",
  "AI & ML",
  "Photography",
  "Music",
  "Personal Growth",
];

const Categories = () => {
  return (
    <section id="categories" className="container mx-auto py-10" aria-labelledby="categories-heading">
      <h2 id="categories-heading" className="text-2xl font-bold">Browse by category</h2>
      <div className="mt-4 flex gap-3 pb-2">
        {categories.map((c) => (
          <Button key={c} variant="" size="sm" className="rounded-full whitespace-nowrap bg-purple-600 text-[hsl(var(--brand-foreground))]">
            {c}
          </Button>
        ))}
      </div>
    </section>
  );
};

export default Categories;
