import React, { useEffect, useMemo, useState } from "react";
import { Link, useForm, usePage } from "@inertiajs/react";
import { router } from '@inertiajs/react'
import course1 from "../../../../public/assets/course-1.jpg";
import course3 from "../../../../public/assets/course-7.jpg";
import course2 from "../../../../public/assets/course-3.jpg";

export default function Checkout({ cart }) {
    const { flash } = usePage().props;
    console.log(cart);
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCountry, setSelectedCountry] = useState("");
    const subtotal = Object.values(cart).reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const tax = subtotal * 0.1; 
    const total = subtotal + tax;
    const { data, setData,  processing, errors } = useForm({
        email: "",
        fullname: "",
        country: "",
        postal: "",
    });

    function handleSubmit(e) {
        e.preventDefault();

        router.post("/payment/initialize", {
            onSuccess: (page) => {
                if (page.props.authUrl) {
                    window.location.href = page.props.authUrl;
                }
            },
        });
    }

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch(
                    "https://restcountries.com/v3.1/all?fields=name"
                );
                const data = await response.json();

                const sortedCountries = data
                    .map((c) => c.name.common)
                    .sort((a, b) => a.localeCompare(b));
                setCountries(sortedCountries);
            } catch (error) {
                console.error("Error fetching countries:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCountries();
    }, []);

    return (
        <>
            <main className="container py-8 animate-enter mx-auto mt-20">
                {flash.success && (
                    <div className="bg-green-200 p-2">{flash.success}</div>
                )}
                {flash.error && (
                    <div className="bg-red-200 p-2">{flash.error}</div>
                )}
                <div className="mb-6 rounded-xl bg-primary text-white p-4 text-sm">
                    <p>
                        Complete your purchase securely. All transactions are
                        encrypted.
                    </p>
                </div>

                <h1 className="mb-2 text-3xl md:text-4xl font-bold tracking-tight">
                    Checkout
                </h1>
                <p className="mb-8 text-muted-foreground">
                    Enter payment details and review your order summary.
                </p>

                <section className="grid gap-6 md:grid-cols-2">
                    <article className="space-y-6">
                        <div className="rounded-xl bg-white  shadow-gray-400 p-6 shadow-sm">
                            <h2 className="mb-4 text-lg font-semibold">
                                Payment Details
                            </h2>

                            <form
                                className="space-y-5"
                                onSubmit={handleSubmit}
                                aria-label="Payment form"
                            >
                                <div className="grid gap-2">
                                    <label
                                        htmlFor="name"
                                        className="text-sm text-muted-foreground"
                                    >
                                        FullName
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={data.fullname}
                                        onChange={(e) =>
                                            setData("fullname", e.target.value)
                                        }
                                        placeholder="Jane Doe"
                                        className="flex h-10 w-full rounded-md border border-gray-400  bg-background px-3 py-2 text-base ring-offset-background placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm"
                                    />
                                    {errors.fullname && (
                                        <div className="text-red-500">
                                            {errors.fullname}
                                        </div>
                                    )}
                                </div>

                                <div className="grid gap-2">
                                    <label
                                        htmlFor="card"
                                        className="text-sm text-muted-foreground"
                                    >
                                        Email Adress
                                    </label>
                                    <input
                                        id="card"
                                        name="card"
                                        inputMode="email"
                                        autoComplete="cc-email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        placeholder="johndoe@gmail.com"
                                        className="flex h-10 w-full rounded-md border border-gray-400 bg-background px-3 py-2 text-base ring-offset-background placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm"
                                    />
                                    {errors.email && (
                                        <div className="text-red-500">
                                            {errors.email}
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="grid gap-2">
                                        <label
                                            htmlFor="country"
                                            className="text-sm text-muted-foreground"
                                        >
                                            Country
                                        </label>
                                        <select
                                            id="country"
                                            name="country"
                                            value={data.country}
                                            onChange={(e) =>
                                                setData(
                                                    "country",
                                                    e.target.value
                                                )
                                            }
                                            className="flex h-10 w-full rounded-md border border-gray-400 bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm"
                                        >
                                            <option value="" disabled>
                                                {loading
                                                    ? "Loading countries..."
                                                    : "Select country"}
                                            </option>
                                            {countries.map((country, index) => (
                                                <option
                                                    key={index}
                                                    value={country}
                                                >
                                                    {country}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="grid gap-2">
                                        <label
                                            htmlFor="postal"
                                            className="text-sm text-muted-foreground"
                                        >
                                            Postal Code
                                        </label>
                                        <input
                                            id="postal"
                                            name="postal"
                                            type="text"
                                            value={data.postal}
                                            onChange={(e) =>
                                                setData(
                                                    "postal",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="12345"
                                            className="flex h-10 w-full rounded-md border border-gray-400 bg-background px-3 py-2 text-base ring-offset-background placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm"
                                        />

                                        {errors.postal && (
                                            <div className="text-red-500">
                                                {errors.postal}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <input
                                        id="save"
                                        name="save"
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-400 bg-background"
                                    />
                                    <label
                                        htmlFor="save"
                                        className="text-sm text-muted-foreground"
                                    >
                                        Save card for future purchases
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full rounded-md bg-primary px-4 py-2 text-white transition hover:bg-primary/90 hover:shadow-[var(--shadow-elegant)]"
                                >
                                    Pay Now ₦{total}
                                </button>

                                <p className="text-xs text-muted-foreground">
                                    Payments are processed securely. We do not
                                    store your full card details.
                                </p>
                            </form>
                        </div>
                    </article>

                    {/* Order Summary */}
                    <aside className="h-fit rounded-xl bg-white  shadow-gray-400 p-6 shadow-sm  md:sticky md:top-6">
                        <h2 className="mb-4 text-lg font-semibold">
                            Order Summary
                        </h2>

                        <div className="space-y-4">
                            {Object.entries(cart).map(([id, i]) => (
                                <div
                                    key={i.id}
                                    className="flex items-center gap-4"
                                >
                                    <div className="h-16 w-16 overflow-hidden rounded-lg">
                                        <img
                                            src={i.image}
                                            alt={`${i.title} thumbnail`}
                                            loading="lazy"
                                            className="h-full w-full object-cover hover-scale"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <p className="line-clamp-1 text-sm font-medium">
                                            {i.name}
                                        </p>
                                        <p className=" text-sm text-gray-400 ">
                                            {i.instructor}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Qty {i.quantity}
                                        </p>
                                    </div>
                                    <div className="text-sm font-semibold">
                                        ₦
                                        {(
                                            parseFloat(i.price) * i.quantity
                                        ).toFixed(2)}
                                    </div>
                                </div>
                            ))}

                            <div className="my-2 border-t border-dashed border-gray-400" />

                            <div className="space-y-2 text-sm">
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">
                                        Subtotal
                                    </span>
                                    <span>{subtotal}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">
                                        Tax (10%)
                                    </span>
                                    <span>{tax}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">
                                        Shipping
                                    </span>
                                    <span>Free</span>
                                </div>
                                <div className="my-3 border-t border-dashed border-gray-400" />
                                <div className="flex items-center justify-between text-base font-semibold">
                                    <span>Total</span>
                                    <span>₦{total}</span>
                                </div>
                            </div>

                            <a
                                href="/cart"
                                className="inline-flex items-center justify-center rounded-md border border-primary hover:text-primary  bg-primary text-white px-3 py-2 text-sm transition hover:bg-accent "
                            >
                                Back to Cart
                            </a>
                        </div>

                        <p className="mt-4 text-xs text-muted-foreground">
                            You can review your items before completing the
                            purchase.
                        </p>
                    </aside>
                </section>
            </main>

            {/* Footer */}
            <footer className="container py-10 text-center text-sm text-muted-foreground mx-auto">
                <p>
                    Need help?{" "}
                    <a className="story-link underline" href="#">
                        Visit support
                    </a>
                </p>
            </footer>
        </>
    );
}
