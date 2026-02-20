import { useState, useEffect } from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import CtaBanner from "../components/Home/CtaBanner";
import Testimonials from '../components/Home/Testimonials';
import HeroSection from "../components/Home/HeroSection";
import StatCard from "../components/common/StatCard";
import ThreeStepSection from "../components/Home/ThreeStepSection";
import ServicesSection from "../components/Home/ServicesSection";

export default function HomePage() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <div className="font-dm-sans bg-white text-gray-900 antialiased overflow-x-hidden">
            {/* ── Header ── */}
            <Header />

            <main>
                {/* ── Hero ── */}
                <HeroSection />

                {/* ── Stats ── */}
                <section className="px-6 pb-20" aria-label="Key statistics">
                    <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-gray-200 border border-gray-200 rounded-2xl overflow-hidden">
                        <StatCard value={2400} suffix="+" label="Sessions booked monthly" delay="0ms" />
                        <StatCard value={98} suffix="%" label="Client satisfaction rate" delay="100ms" />
                        <StatCard value={340} suffix="+" label="Verified professionals" delay="200ms" />
                        <StatCard value={60} suffix="s" label="Average booking time" delay="300ms" />
                    </div>
                </section>

                {/* ── Services ── */}
                <ServicesSection />

                {/* Divider */}
                <div className="max-w-6xl mx-auto h-px bg-gray-100" />

                {/* ── How it works ── */}
                <ThreeStepSection />

                <div className="max-w-6xl mx-auto h-px bg-gray-100" />

                {/* ── Testimonials ── */}
                <Testimonials />

                {/* ── CTA Banner ── */}
                <CtaBanner />
            </main>

            {/* ── Footer ── */}
            <Footer />
        </div>
    );
}