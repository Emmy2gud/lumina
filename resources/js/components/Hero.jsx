import { useRef } from "react";
import { Button } from "@headlessui/react";

const Hero = () => {
const ref = useRef(null);
  const onMouseMove = () => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
  };

  return (
    <header className="relative overflow-hidden">


      <div
        ref={ref}
        onMouseMove={onMouseMove}
        className="relative container mx-auto grid gap-10 py-12 md:grid-cols-2 md:py-16 lg:py-20"
      >

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(600px circle at var(--mx, 50%) var(--my, 50%), hsl(var(--brand)/0.18), transparent 40%)",
          }}
        />

        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
            Learn the skills of tomorrow with courses you’ll love
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">
            Join thousands of learners leveling up in development, design, data, and more—taught by world‑class instructors.
          </p>
          <div className="mt-6">
            {/* serach with pure tailwind */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search for courses, topics, or instructors"
                className="w-full rounded-md border border-gray-400 bg-white px-4 py-3 pr-12 text-sm focus:border-primary focus:ring-2 focus:ring-primary"
              />
              <Button
                variant=""
                className="absolute bg-purple-600 text-[hsl(var(--brand-foreground))] right-2 top-1/2 -translate-y-1/2 rounded-md px-4 py-2 text-sm"
              >
                Search
              </Button>
    </div>

          </div>
          <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <div>50k+ students</div>
            <div>2k+ courses</div>
            <div>Trusted by teams</div>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-xl border border-gray-300 bg-card/80 p-2 shadow-sm backdrop-blur">
            <img
              src=" https://images.unsplash.com/photo-1517245386807-bb43f82c33c4"
              alt="Abstract e-learning hero visual"
              className="h-full w-full rounded-lg object-cover"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </header>
  );
};


export default Hero;
