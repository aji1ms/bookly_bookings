import { FaStar, FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router";

const RecentBusinesses = ({ services }) => {
    const navigate = useNavigate();

    if (!services || services.length === 0) return null;

    return (
        <section className="py-8 bg-white" id="recent-businesses">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="flex items-end justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                            Recently joined businesses
                        </h2>
                        <p className="text-sm text-gray-400 mt-1">Newest establishments on the platform</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="w-px h-6 bg-gray-200 mx-2 hidden sm:block" />
                        <button
                            onClick={() => navigate("/services")}
                            className="group cursor-pointer hidden sm:flex items-center gap-2 text-sm font-bold text-gray-900 hover:opacity-70 transition-all"
                        >
                            See all
                            <FaArrowRight className="group-hover:translate-x-1 transition-transform" size={11} />
                        </button>
                    </div>
                </div>

                <div
                    className="flex flex-col sm:flex-row gap-8 sm:gap-6 overflow-x-hidden sm:overflow-x-auto pb-4 no-scrollbar sm:scroll-smooth sm:snap-x sm:snap-mandatory"
                >
                    {services.map((service) => (
                        <div
                            key={service._id}
                            onClick={() => navigate(`/services/${service._id}`)}
                            className="group shrink-0 w-full sm:w-[280px] cursor-pointer sm:snap-start"
                        >
                            {/* Card Image */}
                            <div className="relative w-full aspect-4/3 rounded-3xl overflow-hidden bg-gray-100 mb-4">
                                <img
                                    src={service.image}
                                    alt={service.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                                    <FaStar className="text-amber-400" size={10} />
                                    <span className="text-[11px] font-bold text-gray-900">{service?.rating || "New"}</span>
                                </div>
                            </div>

                            {/* Details */}
                            <div className="px-1">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="text-lg sm:text-base font-bold text-gray-900 truncate flex-1 group-hover:text-emerald-600 transition-colors">
                                        {service?.name}
                                    </h3>
                                    <span className="text-base sm:text-sm font-bold text-gray-900 ml-2">
                                        ${service?.price || "40"}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 text-gray-400 text-xs font-medium">
                                    <span className="flex items-center gap-1">
                                        <FaMapMarkerAlt size={10} />
                                        {service?.location || "Remote"}
                                    </span>
                                    <span className="w-1 h-1 bg-gray-300 rounded-full" />
                                    <span className="truncate">
                                        {service?.serviceType?.name || "Professional"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}

                    <button
                        onClick={() => navigate("/services")}
                        className="sm:hidden w-full py-4 text-center font-bold text-gray-900 border border-gray-200 rounded-2xl active:bg-gray-50"
                    >
                        View all businesses
                    </button>
                </div>
            </div>
        </section>
    );
};

export default RecentBusinesses;