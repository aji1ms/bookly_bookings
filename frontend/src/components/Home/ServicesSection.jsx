import { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { MdAccessTime, MdOutlineShield } from "react-icons/md";
import { CiHome } from "react-icons/ci";

const ServicesSection = () => {
    const services = [
        {
            icon: <FaRegHeart size={20} />,
            title: "Wellness & Spa",
            description: "Holistic treatments designed to restore balance and renew your sense of calm.",
            tag: "Most popular",
            delay: "0ms",
        },
        {
            icon: <MdAccessTime size={22} />,
            title: "Consultation",
            description: "One-on-one sessions with verified professionals, tailored to your specific needs.",
            tag: "Expert guided",
            delay: "80ms",
        },
        {
            icon: <CiHome size={24} />,
            title: "Home Services",
            description: "Trusted professionals delivered to your door, on your schedule.",
            tag: "Flexible",
            delay: "160ms",
        },
        {
            icon: <MdOutlineShield size={22} />,
            title: "Coaching & Training",
            description: "Structured programs built for progress, led by certified coaches.",
            tag: "Goal-driven",
            delay: "240ms",
        },
    ];

    return (
        <section className="px-6 py-20 bg-gray-50" id="services" aria-label="Our services">
            <div className="max-w-6xl mx-auto">
                <div className="mb-14">
                    <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-4 flex items-center gap-2.5">
                        What we offer
                        <span className="inline-block h-px w-10 bg-gray-300" />
                    </p>
                    <h2 className="font-serif-display text-4xl md:text-5xl font-normal text-gray-900 leading-tight tracking-tight mb-4">
                        Services built<br />for your life
                    </h2>
                    <p className="text-base text-gray-500 leading-relaxed max-w-lg mt-3.5">
                        From wellness to professional coaching — every service on Bookly is curated for quality.
                    </p>
                </div>

                {/* Grid Container */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {services.map((service) => {
                        const [isHovered, setIsHovered] = useState(false);

                        return (
                            <div
                                key={service.title}
                                className="p-8 border border-gray-200 rounded-2xl bg-white flex flex-col gap-3 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-400 hover:shadow-lg animate-fade-up"
                                style={{ animationDelay: service.delay }}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                            >
                                {/* Icon Box */}
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-200 ${isHovered
                                        ? "bg-gray-900 border-gray-900 text-white"
                                        : "bg-gray-50 border-gray-200 text-gray-900"
                                    }`}>
                                    {service.icon}
                                </div>

                                <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
                                    {service.tag}
                                </span>

                                <h3 className="font-serif-display text-2xl font-normal text-gray-900 tracking-tight">
                                    {service.title}
                                </h3>

                                <p className="text-sm text-gray-500 leading-relaxed flex-1">
                                    {service.description}
                                </p>

                                {/* Action Button */}
                                <button className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-900 bg-transparent border-none cursor-pointer p-0 transition-all duration-200 hover:gap-2.5 font-dm-sans mt-1">
                                    Book session
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                        <path
                                            d="M1 7h12M7 1l6 6-6 6"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;