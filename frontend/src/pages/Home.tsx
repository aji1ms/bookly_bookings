import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import CtaBanner from "../components/Home/CtaBanner";
import Testimonials from '../components/Home/Testimonials';
import HeroSection from "../components/Home/HeroSection";
import StatCard from "../components/common/StatCard";
import ThreeStepSection from "../components/Home/ThreeStepSection";
import ServicesSection from "../components/Home/ServicesSection";
import { getAllBusinessesThunk } from "../Redux/slices/businessSlice";
import { RecentBusinessesShimmer } from "../components/Shimmer-UI/ServicePageShimmer";
import { RootState, AppDispatch } from "../Redux/store";
import { useTranslation } from "react-i18next";

export default function HomePage() {
    const { t } = useTranslation();
    const dispatch = useDispatch<AppDispatch>();
    const { loading, businessData } = useSelector((state: RootState) => state.business);

    useEffect(() => {
        dispatch(getAllBusinessesThunk({}))
    }, [dispatch]);

    const recentServices = businessData?.slice(0, 4);

    return (
        <div className="font-dm-sans bg-white text-gray-900 antialiased overflow-x-hidden">
            {/* ── Header ── */}
            <Header />

            <main>
                {/* ── Hero Section── */}
                <HeroSection />

                {/* ── Stats ── */}
                <section className="px-6 pb-20 dark:bg-gray-900" aria-label="Key statistics">
                    <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-gray-200 border border-gray-200 rounded-2xl overflow-hidden">
                        <StatCard value={2400} suffix="+" label={t("stats.sessions")} delay="0ms" />
                        <StatCard value={98} suffix="%" label={t("stats.satisfaction")} delay="100ms" />
                        <StatCard value={340} suffix="+" label={t("stats.professionals")} delay="200ms" />
                        <StatCard value={60} suffix="s" label={t("stats.booking_time")} delay="300ms" />
                    </div>
                </section>

                {/* ── Services ── */}
                {loading ? (
                    <RecentBusinessesShimmer />
                )
                    : <ServicesSection services={recentServices} />
                }

                {/* Divider */}
                <div className="max-w-6xl mx-auto h-px bg-gray-100" />

                {/* ── Three Step Section ── */}
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