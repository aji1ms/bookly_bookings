import { FaArrowRight } from "react-icons/fa";

function HeroSection() {
    const cardImage = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800";
    return (
        <section className="relative overflow-hidden px-6 py-24 md:py-32 flex items-center" style={{ minHeight: "calc(90vh - 68px)" }} aria-label="Hero">
            <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
                <div
                    className="absolute w-[600px] h-[600px] rounded-full -top-48 -right-24 opacity-35"
                    style={{ background: "radial-gradient(circle, #E5E7EB 0%, transparent 70%)", filter: "blur(80px)" }}
                />
                <div
                    className="absolute w-96 h-96 rounded-full -bottom-24 -left-24 opacity-35"
                    style={{ background: "radial-gradient(circle, #F3F4F6 0%, transparent 70%)", filter: "blur(80px)" }}
                />
            </div>

            <div className="relative max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                {/* Content */}
                <div className="max-w-xl">
                    <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-gray-500 bg-gray-100 border border-gray-200 px-3.5 py-1.5 rounded-full mb-7 animate-fade-up">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                        Premium Appointment Booking
                    </div>
                    <h1
                        className="font-serif-display font-normal leading-none tracking-tight text-gray-900 mb-6 animate-fade-up"
                        style={{ fontSize: "clamp(42px, 6vw, 80px)", animationDelay: "100ms" }}
                    >
                        Book your next<br />
                        session <em className="text-gray-400">effortlessly</em>
                    </h1>

                    <p className="text-lg text-gray-500 leading-relaxed max-w-md mb-11 animate-fade-up" style={{ animationDelay: "200ms" }}>
                        Schedule services with trusted, vetted professionals — in seconds, not minutes. Your time deserves better.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-wrap items-center gap-4 mb-14 animate-fade-up" style={{ animationDelay: "300ms" }}>
                        <a href="#" className="inline-flex items-center justify-center gap-2 text-base font-semibold text-white bg-gray-900 px-9 py-4 rounded-full no-underline hover:bg-gray-800 hover:-translate-y-px hover:shadow-xl transition-all duration-200 w-full sm:w-auto">
                            Get started
                            <FaArrowRight />
                        </a>
                        <a href="#services" className="inline-flex items-center justify-center gap-2 text-sm font-medium text-gray-900 border border-gray-200 px-7 py-3.5 rounded-full no-underline hover:border-gray-500 hover:bg-gray-50 hover:-translate-y-px transition-all duration-200 w-full sm:w-auto">
                            View services
                        </a>
                    </div>

                    {/* Social proof */}
                    <div className="flex items-center gap-3.5 animate-fade-up" style={{ animationDelay: "400ms" }}>
                        <div className="flex">
                            {["AJ", "TM", "LP", "KR"].map((ini, i) => (
                                <div
                                    key={ini}
                                    className="w-9 h-9 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-600"
                                    style={{ marginLeft: i === 0 ? 0 : -10 }}
                                >
                                    {ini}
                                </div>
                            ))}
                        </div>
                        <div className="text-sm text-gray-500 leading-snug">
                            <strong className="block text-gray-900 font-semibold">2,400+ sessions booked</strong>
                            Trusted by professionals this month
                        </div>
                    </div>
                </div>

                {/* Booking card visual */}
                <div className="hidden md:block relative animate-fade-up" style={{ animationDelay: "200ms" }} aria-hidden="true">
                    <div className="relative z-10 w-full max-w-[440px] ml-auto">

                        <div className="relative rounded-4xl overflow-hidden border border-gray-200 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700 ease-out">
                            <img
                                src={cardImage}
                                alt="Professional Workspace"
                                className="w-full h-[500px] object-cover"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-gray-900/60 to-transparent" />

                            <div className="absolute bottom-6 left-6 right-6">
                                <div className="backdrop-blur-md bg-white/10 border border-white/20 p-4 rounded-2xl">
                                    <p className="text-white text-sm font-medium">"Bookly has transformed how I manage my client sessions. Pure elegance."</p>
                                    <p className="text-white/70 text-xs mt-2">— Sarah Jenkins, Design Consultant</p>
                                </div>
                            </div>
                        </div>

                        {/*  Stat Card 1 */}
                        <div className="absolute -top-6 -left-12 bg-white border border-gray-100 p-4 rounded-2xl shadow-xl animate-float" style={{ animationDelay: '1s' }}>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center">
                                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Real-time</p>
                                    <p className="text-sm font-semibold text-gray-900">Instant Sync</p>
                                </div>
                            </div>
                        </div>

                        {/* Stat Card 2 */}
                        <div className="absolute top-1/2 -right-8 transform -translate-y-1/2 bg-gray-900 text-white p-5 rounded-2xl shadow-2xl animate-float">
                            <div className="text-center">
                                <p className="text-2xl font-serif-display font-bold">4.9</p>
                                <div className="flex gap-0.5 my-1 justify-center">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} width="10" height="10" viewBox="0 0 24 24" fill="#fbbf24"><path d="M12 1.7L9.5 8.5H2.4l5.7 4.1-2.2 6.8 6.1-4.4 6.1 4.4-2.2-6.8 5.7-4.1h-7.1L12 1.7z" /></svg>
                                    ))}
                                </div>
                                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Avg. Rating</p>
                            </div>
                        </div>

                        {/* Decorative Element: Grid Pattern */}
                        <div className="absolute -bottom-10 -left-10 w-32 h-32 -z-10 opacity-20" style={{ backgroundImage: 'radial-gradient(#4b5563 1px, transparent 0)', backgroundSize: '12px 12px' }} />
                    </div>
                </div>
            </div>
        </section >
    )
}

export default HeroSection;