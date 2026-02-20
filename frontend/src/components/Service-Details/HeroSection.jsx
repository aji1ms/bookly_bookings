import { FaStar, FaMapMarkerAlt, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router";

export default function HeroSection({ business }) {
    const navigate = useNavigate();

    return (
        <div className="relative h-[45vh] w-full overflow-hidden">
            <button
                onClick={() => navigate("/services")}
                className="absolute cursor-pointer top-6 left-6 md:top-10 md:left-16 z-20 flex items-center justify-center w-10 h-10 bg-white/20 backdrop-blur-md text-white rounded-full border border-white/30"
            >
                <FaArrowLeft className="group-hover:-translate-x-0.5 transition-transform" />
            </button>

            <img
                src={business?.image}
                alt={business?.name}
                className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/40" />

            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 max-w-6xl mx-auto w-full">
                <h1 className="text-white text-4xl md:text-6xl font-serif mb-4 leading-tight">
                    {business?.name}
                </h1>
                <div className="flex items-center gap-4 text-white/90 text-sm">
                    <div className="flex items-center gap-1 text-yellow-400">
                        <FaStar />
                        <span className="text-white font-bold">{business?.rating}</span>
                    </div>
                    <span>•</span>
                    <span>100 Reviews</span>
                    <span>•</span>
                    <span className="flex items-center gap-2">
                        <FaMapMarkerAlt />
                        {business?.location}
                    </span>
                </div>
            </div>
        </div>
    );
}