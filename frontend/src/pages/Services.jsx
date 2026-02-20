import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import SearchFilterBar from "../components/Service/SearchFilterBar";
import ServiceCard from "../components/Service/ServiceCard";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllBusinessesThunk } from "../Redux/slices/businessSlice";
import { getAllServiceTypesThunk } from "../Redux/slices/servicetypeSlice";
import { ServiceCardShimmer } from "../components/Shimmer-UI/ServicePageShimmer";

export default function ServicesPage() {
    const dispatch = useDispatch();
    const { loading, businessData } = useSelector((state) => state.business)

    useEffect(() => {
        dispatch(getAllServiceTypesThunk());
        dispatch(getAllBusinessesThunk())
    }, [dispatch]);

    return (
        <div className="font-dm-sans bg-white text-gray-900 antialiased min-h-screen">
            {/* Header */}
            <Header />
            <main>
                {/* Search & Filter Bar */}
                <SearchFilterBar />

                {/* Results Area */}
                <section className="px-6 py-12">
                    <div className="max-w-6xl mx-auto">
                        {loading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                <ServiceCardShimmer count={4} />
                            </div>
                        ) :
                            businessData.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {businessData.map((service, i) => (
                                        <ServiceCard
                                            key={service._id}
                                            service={service}
                                            index={i}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-20">
                                    <h3 className="text-xl font-serif-display text-gray-400">No providers found</h3>
                                </div>
                            )
                        }
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
