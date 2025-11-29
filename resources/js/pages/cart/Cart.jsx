import React, { useEffect, useMemo, useState } from "react";
import { Link, useForm, usePage } from "@inertiajs/react";
import { router } from '@inertiajs/react';
import course1 from "../../../../public/assets/course-1.jpg";
import course3 from "../../../../public/assets/course-7.jpg";
import course2 from "../../../../public/assets/course-3.jpg";

export default function Cart() {
   const { auth, cart: initialCart } = usePage().props;
    const [cart, setCart] = useState(initialCart || []);


console.log(cart)


const updateQuantity = (courseId, change) => {
    router.post(`/cart/update/${courseId}`, {
        quantity_change: change
    }, {
        preserveScroll: true,
        onSuccess: (page) => setCart(page.props.cart)
    });
};
    // Remove item function
    const removeItem = (courseId) => {
        router.delete(`/cart/${courseId}`,  {
            onSuccess: (page) => setCart(page.props.cart)
        });
    };

    // Calculate totals
    const subtotal =Object.values(cart).reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.10;
    const total = subtotal + tax;

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
                        {Object.keys(cart).length  === 0 ? (
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
                            Object.entries(cart).map(([id, item])=> (
                                <div
                                    key={item.id}
                                    className="group relative flex gap-4 rounded-xl bg-white p-4 shadow-sm transition will-change-transform hover:-translate-y-0.5 hover:shadow-[var(--shadow-elegant)] animate-enter"
                                >
                                    <div className="h-30 w-30 overflow-hidden rounded-lg shadow-sm">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            loading="lazy"
                                            className="h-full w-full object-cover hover-scale"
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <h2 className="font-semibold leading-tight">{item.name}</h2>
                                                 <h6 className="text-sm text-gray-600 py-1">{item.instructor}</h6>
                                                <p className="text-sm text-gray-600 ">${item.price}</p>
                                            </div>

                                            <div className="hidden sm:block text-right font-semibold">
                                                ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                                            </div>
                                        </div>

                                        <div className="mt-3 flex flex-wrap items-center gap-3">
                                            <div className="inline-flex items-center overflow-hidden rounded-lg border border-gray-300 bg-background">
                                                <button
                                                    className="h-9 w-10 select-none transition hover:bg-accent hover:text-accent-foreground"
                                                     onClick={() => updateQuantity(item.id, -1)}
                                                >
                                                    −
                                                </button>
                                                <span className="min-w-10 px-2 text-center">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    className="h-9 w-10 select-none transition hover:bg-accent hover:text-accent-foreground"
                                                 onClick={() => updateQuantity(item.id, 1)}
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <button
                                                className="text-sm text-red-500 underline underline-offset-4 transition hover:text-destructive"
                                                aria-label={`Remove ${item.name} from cart`}
                                                onClick={() => removeItem(item.id)}

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
                                <span>${subtotal}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Tax (10%)</span>
                                <span>${tax}</span>
                            </div>
                            <div className="my-3 border-t border-dashed border-border" />
                            <div className="flex items-center justify-between text-base font-semibold">
                                <span>Total</span>
                                <span>${total}</span>
                            </div>
                        </div>

                        <Link
                          href='/payment/checkout'
                        >

                        <button
                            className="mt-6 w-full rounded-md bg-primary px-4 py-2 text-white transition hover:bg-primary/90 hover:shadow-[var(--shadow-elegant)]"

                        >
                            Proceed to Checkout
                        </button>
                        </Link>


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
