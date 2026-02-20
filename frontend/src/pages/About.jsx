import { useNavigate } from "react-router";
import { FaCalendarCheck, FaStar, FaMagic, FaUserCheck, FaArrowRight, FaShieldAlt } from "react-icons/fa";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";

export default function AboutPage() {
    const navigate = useNavigate();

    const stats = [
        { label: "Bookings Completed", val: "50k+" },
        { label: "Top-Rated Experts", val: "1,200+" },
        { label: "Average Rating", val: "4.9/5" },
        { label: "Time Saved/User", val: "15 hrs" }
    ]

    const pillars = [
        {
            title: "Instant Scheduling",
            description: "No more phone tags or waiting for callbacks. See real-time availability and secure your spot in seconds.",
            icon: <FaCalendarCheck size={20} />
        },
        {
            title: "Curated Quality",
            description: "We vet every business on our platform to ensure they meet our Bookly Gold standard of service and hospitality.",
            icon: <FaMagic size={20} />
        },
        {
            title: "Expert Matching",
            description: "Choose the professional that fits your style. From master stylists to expert consultants, the choice is yours.",
            icon: <FaUserCheck size={20} />
        }
    ]

    const steps = ['Explore Services', 'Select Your Expert', 'Pick Your Slot', 'Show Up & Enjoy']

    return (
        <div className="min-h-screen bg-white text-gray-900 antialiased font-sans">
            <Header />

            <section className="relative pt-32 pb-20 px-6 border-b border-gray-100">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <h1 className="text-5xl md:text-7xl font-serif leading-tight tracking-tighter">
                            Redefining <br />
                            <span className="text-gray-400 italic font-normal underline decoration-1 underline-offset-8">Convenience</span> In
                            Professional Services.
                        </h1>
                        <p className="text-xl text-gray-500 max-w-md leading-relaxed">
                            Bookly is the bridge between premium service providers and clients who value time, quality, and seamless experiences.
                        </p>
                    </div>
                    <div className="relative">
                        <div className="aspect-square bg-gray-900 rounded-[3rem] overflow-hidden rotate-3 hover:rotate-0 transition-transform duration-700 shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=2070&auto=format&fit=crop"
                                alt="Service Experience"
                                className="w-full h-full object-cover opacity-80"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. STATS BAR */}
            <section className="bg-gray-900 py-16">
                <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, i) => (
                        <div key={i} className="text-center">
                            <p className="text-3xl font-serif text-white mb-1">{stat.val}</p>
                            <p className="text-[10px] uppercase tracking-widest text-white/40">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 3. CORE PILLARS OF BOOKLY */}
            <section className="py-24 max-w-6xl mx-auto px-6">
                <div className="mb-20">
                    <h2 className="text-3xl font-serif">Why Bookly?</h2>
                    <div className="w-20 h-1 bg-gray-900 mt-4"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                    {pillars.map((p) => (
                        <div className="space-y-6">
                            <div className="w-14 h-14 bg-gray-50 flex items-center justify-center rounded-2xl text-gray-900 border border-gray-100">
                                {p.icon}
                            </div>
                            <h3 className="text-xl font-bold">{p.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                {p.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 4. THE BOOKING FLOW SECTION */}
            <section className="bg-[#FAFAFA] py-24 px-6 border-y border-gray-100">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
                    <div className="flex-1 space-y-6">
                        <h2 className="text-4xl font-serif">Seamlessly Simple.</h2>
                        <p className="text-gray-500">We've distilled the booking process into four effortless steps designed for the modern user.</p>

                        <ul className="space-y-4">
                            {steps.map((step, i) => (
                                <li key={i} className="flex items-center gap-4 text-sm font-bold text-gray-700">
                                    <span className="w-6 h-6 rounded-full bg-gray-900 text-white flex items-center justify-center text-[10px]">{i + 1}</span>
                                    {step}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex-1 bg-white p-12 rounded-[3rem] border border-gray-100 shadow-xl">
                        <div className="space-y-8">
                            <div className="flex gap-4 items-center p-4 bg-gray-50 rounded-2xl border-l-4 border-gray-900">
                                <FaStar className="text-yellow-500" />
                                <div>
                                    <p className="text-xs font-black uppercase tracking-widest">Verified Reviews</p>
                                    <p className="text-sm text-gray-500 italic">Authentic feedback from real clients</p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-center p-4 bg-gray-50 rounded-2xl border-l-4 border-emerald-500">
                                <FaShieldAlt className="text-emerald-500" />
                                <div>
                                    <p className="text-xs font-black uppercase tracking-widest">Secure Payment</p>
                                    <p className="text-sm text-gray-500 italic">Encrypted transactions & flexible cancellations</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. CALL TO ACTION */}
            <section className="py-32 text-center px-6">
                <div className="max-w-2xl mx-auto space-y-10">
                    <h2 className="text-4xl md:text-6xl font-serif">Your next experience <br /> starts here.</h2>
                    <p className="text-gray-500 text-lg font-medium">
                        Join thousands of users who have found their favorite professionals through Bookly.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button
                            onClick={() => navigate("/services")}
                            className="px-10 py-5 bg-gray-900 text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-black transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                            Browse All Services <FaArrowRight size={10} />
                        </button>
                        <button className="px-10 py-5 border border-gray-200 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-gray-50 transition-all cursor-pointer">
                            List Your Business
                        </button>
                    </div>
                </div>
            </section>

            {/*Footer*/}
            <Footer />
        </div>
    );
}