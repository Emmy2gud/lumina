import React, { useEffect, useMemo, useState } from "react";
import course1 from "../../../../public/assets/course-1.jpg";
import course3 from "../../../../public/assets/course-7.jpg";
import course2 from "../../../../public/assets/course-3.jpg";

export default function Cart() {
  const [items, setItems] = useState([
    {
      id: "c1",
      title: "Mastering React Fundamentals",
      price: 49,
      image: course1,
      qty: 1,
    },
    {
      id: "c2",
      title: "Advanced TypeScript for Pros",
      price: 79,
      image: course2,
      qty: 2,
    },
       {
      id: "c3",
      title: "Mastering Data Analysis Fundamentals",
      price: 109,
      image: course3,
      qty: 1,
    },
  ]);

  useEffect(() => {

    document.title = "Shopping Cart | Modern Add to Cart";

    const descText =
      "Review your cart, update quantities, and checkout with a clean, modern cart UI.";
    const metaDesc =
      document.querySelector('meta[name="description"]') ||
      Object.assign(document.createElement("meta"), { name: "description" });
    metaDesc.setAttribute("content", descText.slice(0, 160));
    if (!metaDesc.parentElement) document.head.appendChild(metaDesc);

    const canonical =
      document.querySelector('link[rel="canonical"]') ||
      Object.assign(document.createElement("link"), { rel: "canonical" });
    canonical.setAttribute("href", `${window.location.origin}/cart`);
    if (!canonical.parentElement) document.head.appendChild(canonical);
  }, []);

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.qty, 0),
    [items]
  );
  const taxRate = 0.1;
  const tax = useMemo(() => subtotal * taxRate, [subtotal]);
  const total = useMemo(() => subtotal + tax, [subtotal, tax]);

  const increment = (id) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)));
  const decrement = (id) =>
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty - 1) } : i))
    );
  const removeItem = (id) => setItems((prev) => prev.filter((i) => i.id !== id));

  const currency = (n) =>
    n.toLocaleString(undefined, { style: "currency", currency: "USD" });



  return (
    <>


      <main className="container mt-20 animate-enter mx-auto">
        <div className="mb-6 rounded-xl text-white bg-primary p-4 text-sm">
          <p>
            Enjoy a clean checkout experience. Your items are saved for 24 hours.
          </p>
        </div>

        <h1 className="mb-2 text-3xl md:text-4xl font-bold tracking-tight">
          Shopping Cart
        </h1>
        <p className="mb-8 text-muted-foreground">
          Manage your courses, adjust quantities, and proceed to checkout.
        </p>

        <section className="grid gap-6 md:grid-cols-3">

          <article className="md:col-span-2 space-y-4">
            {items.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border p-8 text-center">
                <p className="mb-4">Your cart is empty.</p>
                <a
                  className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-primary-foreground transition hover:bg-primary/90 hover:shadow-[var(--shadow-elegant)]"
                  href="/"
                >
                  Continue Shopping
                </a>
              </div>
            ) : (
              items.map((i) => (
                <div
                  key={i.id}
                  className="group relative flex gap-4 rounded-xl bg-white p-4 shadow-sm transition will-change-transform hover:-translate-y-0.5 hover:shadow-[var(--shadow-elegant)] animate-enter"
                >
                  <div className="h-24 w-24 overflow-hidden rounded-lg shadow-sm">
                    <img
                      src={i.image}
                      alt={`${i.title} thumbnail`}
                      loading="lazy"
                      className="h-full w-full object-cover hover-scale"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h2 className="font-semibold leading-tight">{i.title}</h2>
                        <p className="text-sm text-muted-foreground">{currency(i.price)}</p>
                      </div>

                      <div className="hidden sm:block text-right font-semibold">
                        {currency(i.price * i.qty)}
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <div className="inline-flex items-center overflow-hidden rounded-lg border border-gray-300 bg-background">
                        <button
                          className="h-9 w-10 select-none transition hover:bg-accent hover:text-accent-foreground"
                          onClick={() => decrement(i.id)}
                          aria-label={`Decrease quantity of ${i.title}`}
                        >
                          −
                        </button>
                        <span className="min-w-10 px-2 text-center">
                          {i.qty}
                        </span>
                        <button
                          className="h-9 w-10 select-none transition hover:bg-accent hover:text-accent-foreground"
                          onClick={() => increment(i.id)}
                          aria-label={`Increase quantity of ${i.title}`}
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(i.id)}
                        className="text-sm text-red-500 underline underline-offset-4 transition hover:text-destructive"
                        aria-label={`Remove ${i.title} from cart`}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </article>

          {/* Summary */}
          <aside className="h-fit rounded-xl bg-white p-6 shadow-sm md:sticky md:top-6 animate-enter">
            <h2 className="mb-4 text-lg font-semibold">Order Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{currency(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Tax (10%)</span>
                <span>{currency(tax)}</span>
              </div>
              <div className="my-3 border-t border-dashed border-border" />
              <div className="flex items-center justify-between text-base font-semibold">
                <span>Total</span>
                <span>{currency(total)}</span>
              </div>
            </div>

            <button
              className="mt-6 w-full rounded-md bg-primary px-4 py-2 text-white transition hover:bg-primary/90 hover:shadow-[var(--shadow-elegant)]"
              onClick={() => alert("This is a demo checkout.")}
            >
              Proceed to Checkout
            </button>

            <p className="mt-3 text-xs text-muted-foreground">
              Secure checkout. Prices shown in USD. Images are lazy-loaded.
            </p>
          </aside>
        </section>
      </main>

      {/* Footer */}
      <footer className="container py-10 text-center text-sm text-muted-foreground">
        <p>
          Need help?{' '}
          <a className="story-link underline" href="#">
            Visit support
          </a>
        </p>
      </footer>
    </>
  );
}
