import React, { useEffect, useMemo, useState } from "react";

import course1 from "../../../../public/assets/course-1.jpg";
import course3 from "../../../../public/assets/course-7.jpg";
import course2 from "../../../../public/assets/course-3.jpg";

export default function Checkout() {

  const [items] = useState([
    { id: "c1", title: "Mastering React Fundamentals", price: 49, image: course1, qty: 1 },
    { id: "c2", title: "Advanced TypeScript for Pros", price: 79, image: course2, qty: 1 },
    { id: "c3", title: "Design Systems with Tailwind", price: 39, image: course3, qty: 1 },
  ]);

  const subtotal = useMemo(() => items.reduce((sum, i) => sum + i.price * i.qty, 0), [items]);
  const taxRate = 0.1; // 10%
  const tax = useMemo(() => subtotal * taxRate, [subtotal]);
  const total = useMemo(() => subtotal + tax, [subtotal, tax]);

  useEffect(() => {
    // SEO
    document.title = "Checkout | Modern Two-Column Checkout";
    const descText = "Secure checkout: enter your card details and review the order summary.";
    const metaDesc =
      document.querySelector('meta[name="description"]') ||
      Object.assign(document.createElement("meta"), { name: "description" });
    metaDesc.setAttribute("content", descText.slice(0, 160));
    if (!metaDesc.parentElement) document.head.appendChild(metaDesc);

    const canonical =
      document.querySelector('link[rel="canonical"]') ||
      Object.assign(document.createElement("link"), { rel: "canonical" });
    canonical.setAttribute("href", `${window.location.origin}/checkout`);
    if (!canonical.parentElement) document.head.appendChild(canonical);
  }, []);

  const currency = (n) => n.toLocaleString(undefined, { style: "currency", currency: "USD" });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Checkout",
    description: "Secure checkout page to complete your purchase.",
    url: `${typeof window !== "undefined" ? window.location.href : ""}`,
  };

  return (
    <>


      {/* Main */}
      <main className="container py-8 animate-enter mx-auto mt-20">
        <div className="mb-6 rounded-xl bg-primary text-white p-4 text-sm">
          <p>Complete your purchase securely. All transactions are encrypted.</p>
        </div>

        <h1 className="mb-2 text-3xl md:text-4xl font-bold tracking-tight">Checkout</h1>
        <p className="mb-8 text-muted-foreground">Enter payment details and review your order summary.</p>

        <section className="grid gap-6 md:grid-cols-2">

          <article className="space-y-6">
            <div className="rounded-xl bg-white  shadow-gray-400 p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold">Payment Details</h2>

              <form
                className="space-y-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Demo checkout: payment processing is not enabled.");
                }}
                aria-label="Payment form"
              >
                <div className="grid gap-2">
                  <label htmlFor="name" className="text-sm text-muted-foreground">
                    Cardholder Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Jane Doe"
                    className="flex h-10 w-full rounded-md border border-gray-400  bg-background px-3 py-2 text-base ring-offset-background placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm"
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="card" className="text-sm text-muted-foreground">
                    Card Number
                  </label>
                  <input
                    id="card"
                    name="card"
                    inputMode="numeric"
                    autoComplete="cc-number"
                    placeholder="1234 5678 9012 3456"
                    minLength={12}
                    maxLength={19}
                    required
                    className="flex h-10 w-full rounded-md border border-gray-400 bg-background px-3 py-2 text-base ring-offset-background placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="grid gap-2">
                    <label htmlFor="exp" className="text-sm text-muted-foreground">
                      Expiry (MM/YY)
                    </label>
                    <input
                      id="exp"
                      name="exp"
                      placeholder="08/27"
                      inputMode="numeric"
                      autoComplete="cc-exp"
                      required
                      className="flex h-10 w-full rounded-md border border-gray-400 bg-background px-3 py-2 text-base ring-offset-background placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="cvc" className="text-sm text-muted-foreground">
                      CVC
                    </label>
                    <input
                      id="cvc"
                      name="cvc"
                      placeholder="123"
                      inputMode="numeric"
                      autoComplete="cc-csc"
                      minLength={3}
                      maxLength={4}
                      required
                      className="flex h-10 w-full rounded-md border border-gray-400 bg-background px-3 py-2 text-base ring-offset-background placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="grid gap-2">
                    <label htmlFor="country" className="text-sm text-muted-foreground">
                      Country
                    </label>
                    <select
                      id="country"
                      name="country"
                      required
                      className="flex h-10 w-full rounded-md border border-gray-400 bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm"
                    >
                      <option value="" disabled>
                        Select country
                      </option>
                      <option>United States</option>
                      <option>Canada</option>
                      <option>United Kingdom</option>
                      <option>Germany</option>
                      <option>Australia</option>
                    </select>
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="postal" className="text-sm text-muted-foreground">
                      Postal Code
                    </label>
                    <input
                      id="postal"
                      name="postal"
                      type="text"
                      required
                      placeholder="12345"
                      className="flex h-10 w-full rounded-md border border-gray-400 bg-background px-3 py-2 text-base ring-offset-background placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input id="save" name="save" type="checkbox" className="h-4 w-4 rounded border-gray-400 bg-background" />
                  <label htmlFor="save" className="text-sm text-muted-foreground">
                    Save card for future purchases
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-md bg-primary px-4 py-2 text-white transition hover:bg-primary/90 hover:shadow-[var(--shadow-elegant)]"
                >
                  Pay Now {`(${currency(total)})`}
                </button>

                <p className="text-xs text-muted-foreground">Payments are processed securely. We do not store your full card details.</p>
              </form>
            </div>
          </article>

          {/* Order Summary */}
          <aside className="h-fit rounded-xl bg-white  shadow-gray-400 p-6 shadow-sm  md:sticky md:top-6">
            <h2 className="mb-4 text-lg font-semibold">Order Summary</h2>

            <div className="space-y-4">
              {items.map((i) => (
                <div key={i.id} className="flex items-center gap-4">
                  <div className="h-16 w-16 overflow-hidden rounded-lg border border-border">
                    <img
                      src={i.image}
                      alt={`${i.title} thumbnail`}
                      loading="lazy"
                      className="h-full w-full object-cover hover-scale"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="line-clamp-1 text-sm font-medium">{i.title}</p>
                    <p className="text-xs text-muted-foreground">Qty {i.qty}</p>
                  </div>
                  <div className="text-sm font-semibold">{currency(i.price * i.qty)}</div>
                </div>
              ))}

              <div className="my-2 border-t border-dashed border-gray-400" />

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{currency(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Tax (10%)</span>
                  <span>{currency(tax)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="my-3 border-t border-dashed border-gray-400" />
                <div className="flex items-center justify-between text-base font-semibold">
                  <span>Total</span>
                  <span>{currency(total)}</span>
                </div>
              </div>

              <a
                href="/cart"
                className="inline-flex items-center justify-center rounded-md border border-primary hover:text-primary  bg-primary text-white px-3 py-2 text-sm transition hover:bg-accent "
              >
                Back to Cart
              </a>
            </div>

            <p className="mt-4 text-xs text-muted-foreground">You can review your items before completing the purchase.</p>
          </aside>
        </section>
      </main>

      {/* Footer */}
      <footer className="container py-10 text-center text-sm text-muted-foreground mx-auto">
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
