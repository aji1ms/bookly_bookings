function ThreeStepSection() {
    const steps = [
        { n: "01", title: "Choose your service", desc: "Browse our curated catalog of wellness, consultation, and home services. Filter by type, duration, or availability." },
        { n: "02", title: "Pick your time", desc: "View real-time availability and select a slot that works for you. No back-and-forth, no guessing." },
        { n: "03", title: "Show up & relax", desc: "Receive a confirmation instantly. Add it to your calendar, then simply show up. We handle the rest." },
    ]
    return (
        <section className="px-6 py-20" id="how-it-works" aria-label="How it works">
            <div className="max-w-6xl mx-auto">
                <div className="mb-14">
                    <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-4">The process</p>
                    <h2 className="font-serif-display text-4xl md:text-5xl font-normal text-gray-900 leading-tight tracking-tight">
                        Three steps to<br />your next session
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3">
                    {steps.map((step, i) => (
                        <div
                            key={step.n}
                            className={`flex md:flex-col gap-6 py-8 md:p-8 border-b border-gray-100 last:border-b-0 md:border-b-0 animate-fade-up ${i < 2 ? "md:border-r md:border-gray-100" : ""}`}
                            style={{ animationDelay: `${i * 80}ms` }}
                        >
                            <p className="font-serif-display text-6xl font-normal text-gray-200 leading-none shrink-0 w-16 md:w-auto">
                                {step.n}
                            </p>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ThreeStepSection;