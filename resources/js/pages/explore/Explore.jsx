import Hero from "../../components/Hero";
import Categories from "../../components/Categories";
import { usePage } from '@inertiajs/react';
import CourseCard from "../../components/CourseCard";
import { Link } from "@inertiajs/react";
import FlashMessage from "../../components/modal/FlashMessage";





// const courses = [
//   { id: "1", title: "Modern JavaScript Mastery: ES6+ Deep Dive", instructor: "Ethan Miles", rating: 4.7, reviews: 12873, hours: 12, lessons: 96, price: 14.99, image: "https://images.unsplash.com/photo-1518773553398-650c184e0bb3", badge: "Bestseller", category: "Development" },
//   { id: "2", title: "UI/UX Design Foundations: From Wireframe to Prototype", instructor: "Hannah Lee", rating: 4.8, reviews: 9876, hours: 10.5, lessons: 80, price: 13.99, image:"https://images.unsplash.com/photo-1503602642458-232111445657", badge: "Hot", category: "Design" },
//   { id: "3", title: "Data Science with Python: Build Real Dashboards", instructor: "Arjun Patel", rating: 4.7, reviews: 15642, hours: 14, lessons: 110, price: 16.99, image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71", category: "Data Science" },
//   { id: "4", title: "Python for Beginners: Your First 10 Projects", instructor: "Maya Chen", rating: 4.6, reviews: 20345, hours: 8, lessons: 62, price: 11.99, image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4", category: "Development" },
//   { id: "5", title: "AWS Cloud Practitioner: Zero to Certified", instructor: "James Carter", rating: 4.8, reviews: 11230, hours: 15, lessons: 120, price: 17.99, image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2", badge: "Bestseller", category: "Cloud" },
//   { id: "6", title: "Cybersecurity Essentials: Secure Your Apps", instructor: "Nora Ali", rating: 4.6, reviews: 7654, hours: 9.5, lessons: 74, price: 12.99, image: "https://images.unsplash.com/photo-1556157382-97eda2a7a2f1", category: "Cybersecurity" },
//   { id: "7", title: "Digital Marketing Analytics Bootcamp", instructor: "Carlos Diaz", rating: 4.5, reviews: 6543, hours: 7, lessons: 58, price: 10.99, image:"https://images.unsplash.com/photo-1556761175-4b46a572b786", category: "Marketing" },
//   { id: "8", title: "Machine Learning A‑Z: Build ML Systems", instructor: "Sara Novak", rating: 4.7, reviews: 18321, hours: 16, lessons: 125, price: 18.99, image: "https://images.unsplash.com/photo-1552664730-d307ca884978", category: "AI & ML" },
//   { id: "9", title: "Advanced React Patterns & Performance", instructor: "Ethan Miles", rating: 4.8, reviews: 9234, hours: 11, lessons: 88, price: 15.99, image:"https://images.unsplash.com/photo-1518773553398-650c184e0bb3", category: "Development" },
//   { id: "10", title: "Product Management: From Idea to Launch", instructor: "Hannah Lee", rating: 4.6, reviews: 5342, hours: 6.5, lessons: 52, price: 12.49, image: "https://images.unsplash.com/photo-1503602642458-232111445657", category: "Product" },
//   { id: "11", title: "SQL for Analysts: Fast‑Track", instructor: "Arjun Patel", rating: 4.7, reviews: 13210, hours: 9, lessons: 70, price: 13.49, image:"https://images.unsplash.com/photo-1551288049-bebda4e38f71", category: "Data Science" },
//   { id: "12", title: "Figma Masterclass: Design Systems", instructor: "Maya Chen", rating: 4.6, reviews: 7432, hours: 8, lessons: 64, price: 12.99, image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4", category: "Design" },
// ];

const categorySections = [
  "Development",
  "Design",
  "Data Science",
  "Marketing",
  "Cloud",
  "Cybersecurity",
  "AI & ML",
  "Product",
];

const topicrecommendations = [
  { id: "1", title: "React.js",},
    { id: "2", title: "UI/UX Design",},
    { id: "3", title: "Python Programming",},
    { id: "4", title: "Digital Marketing",},
    { id: "5", title: "Data Analysis",},
    { id: "6", title: "Machine Learning",},
    { id: "7", title: "Cloud Computing",},
    { id: "8", title: "Cybersecurity Basics",},]




const Explore = ({courses}) => {
    const getCoursesByCategory = (cat) => courses.data.filter((c) => c.category === cat);
      const { flash } = usePage().props;
      console.log(courses)
  return (
    <div className="min-h-screen bg-background">

    <FlashMessage flash={flash} />
      <Hero />

      <main>


        {/* <Categories /> */}

        <section id="courses" className="container mx-auto py-8" aria-labelledby="popular-heading">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 id="popular-heading" className="text-2xl font-bold">Popular courses</h2>
              <p className="text-sm text-muted-foreground">Small & medium cards for faster scanning</p>
            </div>
            <a href="#" className="story-link text-sm">See all</a>
          </div>

          <div className="mt-6 grid gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            {courses.data.map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>
        </section>


        <section className="container mx-auto py-8" aria-labelledby="promo-banner">
          <div className="rounded-xl border p-6 md:p-10 bg-gradient-to-r from-purple-600 to bg-blue-600  text-[hsl(var(--brand-foreground))] shadow-glow">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 id="promo-banner" className="text-2xl md:text-3xl font-bold">Level up this week — up to 80% off</h2>
                <p className="mt-1 opacity-90">Top picks across Development, Design, Data, Cloud and more.</p>
              </div>
              <a href="#development" className="inline-flex items-center rounded-md px-5 py-3 text-sm font-medium bg-background/90 text-foreground hover:bg-background transition">
                Browse deals
              </a>
            </div>
          </div>
        </section>

        {/* Category sections */}
        {/* {categorySections.map((section) => {
          const primary = getCoursesByCategory(section);
          if (primary.length === 0) return null ;
          const anchor = section.toLowerCase().replace(/\s+/g, '-');
          const fillersNeeded = Math.max(0, 5 - primary.length);
          const fillers = fillersNeeded > 0
            ? courses
                .filter((c) => c.category !== section && !primary.some((p) => p.id === c.id))
                .slice(0, fillersNeeded)
            : [];
          const displayItems = [...primary.slice(0, 5), ...fillers].slice(0, 5);
          return (
            <section key={section} id={anchor} className="container mx-auto py-8" aria-labelledby={`${anchor}-heading`}>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <h2 id={`${anchor}-heading`} className="text-2xl font-bold">{section}</h2>
                  <p className="text-sm text-muted-foreground">Curated courses in {section}</p>
                </div>
                <a href="#" className="story-link text-sm">See all</a>
              </div>
              <div className="mt-6 grid gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
                {displayItems.map((c) => (
                  <CourseCard key={c.id} course={c} />
                ))}
              </div>
            </section>
          );
        })} */}

{/* topics recommendations */}
        <section className="container mx-auto py-8" aria-labelledby="topics-heading">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 id="topics-heading" className="text-2xl font-bold">Explore topics</h2>
              <p className="text-sm text-muted-foreground">Discover courses by topic</p>
            </div>
            <a href="#" className="story-link text-sm">See all</a>
          </div>
          <div className="mt-6 grid gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            {topicrecommendations.map((c) => (
 <div key={c.id} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
                {c.title}
                </h3>
                <Link
                    href={`/topic/${c.id}`}
                    className="inline-flex items-center justify-center rounded-md bg-[image:var(--gradient-primary)] px-4 py-2 text-sm font-medium text-white hover:bg-secondary transition-colors"
                >
                    Explore
                </Link>
            </div>
            ))}
          </div>
        </section>
      </main>


    </div>
  );
};

export default Explore;
