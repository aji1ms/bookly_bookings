function CtaBanner() {
    return (
        <section className="px-6 pb-20" aria-label="Call to action">
            <div className="max-w-6xl mx-auto">
                <div className="bg-gray-900 rounded-3xl px-12 py-16 text-center relative overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                        <div className="absolute w-[500px] h-[500px] rounded-full border border-white/5 -top-48 left-1/2 -translate-x-1/2" />
                        <div className="absolute w-72 h-72 rounded-full border border-white/5 -bottom-24 -right-12" />
                    </div>
                    <p className="relative text-xs font-semibold tracking-widest uppercase text-white/40 mb-5">
                        Ready when you are
                    </p>
                    <h2 className="relative font-serif-display text-3xl md:text-5xl font-normal text-white leading-tight tracking-tight mb-4">
                        Your next appointment<br />
                        is <em className="text-white/50">one click away</em>
                    </h2>
                    <p className="relative text-base text-white/50 leading-relaxed max-w-sm mx-auto mb-10">
                        Join thousands who've simplified how they book. No account required to get started.
                    </p>
                    <div className="relative flex flex-wrap gap-3 justify-center">
                        <a href="#" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900 bg-white px-8 py-4 rounded-full no-underline hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-200">
                            Book your first session
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                                <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                        <a href="#services" className="inline-flex items-center text-sm font-medium text-white/70 border border-white/20 px-7 py-3.5 rounded-full no-underline hover:text-white hover:border-white/50 hover:bg-white/10 transition-all duration-200">
                            View all services
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CtaBanner;