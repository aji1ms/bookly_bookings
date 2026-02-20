import { FaStar, FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router";

const RecentBusinesses = ({ services }) => {
    const navigate = useNavigate();

    if (!services || services.length === 0) return null;

    return (
        <section className="py-10 bg-white" id="recent-businesses">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                            Recently joined businesses
                        </h2>
                        <p className="text-sm text-gray-400 mt-1">Newest establishments on the platform</p>
                    </div>
                    <button
                        onClick={() => navigate("/services")}
                        className="group cursor-pointer flex items-center gap-2 text-sm font-bold text-gray-900 hover:opacity-70 transition-all shrink-0"
                    >
                        See all
                        <FaArrowRight className="group-hover:translate-x-1 transition-transform" size={11} />
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {services.map((service) => (
                        <div
                            key={service._id}
                            onClick={() => navigate(`/services/${service._id}`)}
                            className="group cursor-pointer"
                        >
                            {/* Image */}
                            <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden bg-gray-100 mb-3">
                                <img
                                    src={service.image}
                                    alt={service.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                {/* Rating badge */}
                                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                                    <FaStar className="text-amber-400" size={10} />
                                    <span className="text-[11px] font-bold text-gray-900">
                                        {service?.rating || "New"}
                                    </span>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="px-0.5">
                                <div className="flex justify-between items-start mb-1 gap-2">
                                    <h3 className="text-sm font-bold text-gray-900 leading-snug group-hover:text-emerald-600 transition-colors line-clamp-1 flex-1">
                                        {service?.name}
                                    </h3>
                                    <span className="text-sm font-bold text-gray-900 shrink-0">
                                        ${service?.startingPrice}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 text-gray-400 text-xs font-medium">
                                    <span className="flex items-center gap-1 truncate">
                                        <FaMapMarkerAlt size={9} className="shrink-0" />
                                        <span className="truncate">{service?.location}</span>
                                    </span>
                                    <span className="w-1 h-1 bg-gray-300 rounded-full shrink-0" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 sm:hidden">
                    <button
                        onClick={() => navigate("/services")}
                        className="w-full py-4 text-center text-sm font-bold text-gray-900 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors"
                    >
                        View all businesses
                    </button>
                </div>

            </div>
        </section>
    );
};

export default RecentBusinesses;