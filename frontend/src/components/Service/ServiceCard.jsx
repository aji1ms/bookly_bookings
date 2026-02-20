import { useState } from "react";
import { useNavigate } from "react-router";

function ServiceCard({ service, index }) {
    const navigate = useNavigate();
    const [hovered, setHovered] = useState(false);

    return (
        <div
            key={index}
            className="group bg-white border border-gray-200 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 animate-fade-up"
            style={{ animationDelay: `${index * 50}ms` }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className="relative h-44 bg-gray-100 overflow-hidden">
                <img src={service?.image} alt={service?.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-[10px] font-bold text-gray-900 border border-gray-200">
                    {service?.serviceCount} Services
                </div>
            </div>

            <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-serif-display text-lg text-gray-900 leading-tight">{service?.name}</h3>
                    <div className="flex items-center gap-1 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100">
                        <span className="text-[11px] font-bold">★</span>
                        <span className="text-[11px] font-bold">{service?.rating}</span>
                    </div>
                </div>

                <p className="text-xs text-gray-500 line-clamp-2 mb-4 leading-relaxed">
                    {service?.description}
                </p>

                <div className="mt-auto space-y-3">
                    <div className="flex items-center justify-between text-[11px] font-medium text-gray-400 uppercase tracking-widest">
                        <span>{service?.location}</span>
                        <span>{service?.duration}</span>
                    </div>

                    <div className="pt-3 border-t border-gray-50 flex items-center justify-between">
                        <div>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter leading-none mb-1">From</p>
                            <p className="text-lg font-semibold text-gray-900">${service?.startingPrice}</p>
                        </div>
                        <button
                            onClick={() => navigate(`/services/${service?._id}`)}
                            className={`px-5 py-2 cursor-pointer rounded-full text-xs font-bold transition-all ${hovered ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-700"
                                }`}>
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ServiceCard;