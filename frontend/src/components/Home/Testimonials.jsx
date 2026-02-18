function Testimonials() {
    const testimonials = [
        { quote: "The booking experience is the most frictionless I've encountered. Clean, fast, and it just works.", name: "Amara Jensen", role: "Creative Director", initials: "AJ", delay: "0ms" },
        { quote: "Finally a service platform that respects my time. Booked in 90 seconds, no unnecessary steps.", name: "Theo Marchetti", role: "Product Manager", initials: "TM", delay: "80ms" },
        { quote: "The professionals on this platform are exceptional. Highly curated, deeply reliable.", name: "Lena Park", role: "Architect", initials: "LP", delay: "160ms" },
    ];

    return (
        <section className="px-6 py-20 bg-gray-50" id="testimonials" aria-label="Customer testimonials">
            <div className="max-w-6xl mx-auto">
                <div className="mb-14">
                    <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-4">Testimonials</p>
                    <h2 className="font-serif-display text-4xl md:text-5xl font-normal text-gray-900 leading-tight tracking-tight">
                        People who've<br />made the switch
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {testimonials.map((t) => (
                        <div
                            key={t.name}
                            className="p-7 border border-gray-200 rounded-2xl bg-white flex flex-col gap-4 animate-fade-up transition-all duration-200 hover:border-gray-300 hover:shadow-md"
                            style={{ animationDelay: t.delay }}
                        >
                            {/* Star Rating */}
                            <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="#111827" aria-hidden="true">
                                        <path d="M7 1l1.545 3.13 3.455.502-2.5 2.437.59 3.44L7 8.885 3.91 10.51l.59-3.441L2 4.632l3.455-.503L7 1z" />
                                    </svg>
                                ))}
                            </div>

                            {/* Quote */}
                            <p className="text-sm text-gray-700 leading-relaxed italic flex-1">
                                "{t.quote}"
                            </p>

                            {/* Author Info */}
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-600 shrink-0">
                                    {t.initials}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                                    <p className="text-xs text-gray-400 mt-0.5">{t.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Testimonials;