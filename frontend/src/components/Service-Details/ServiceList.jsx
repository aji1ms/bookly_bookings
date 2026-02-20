import { FaRegClock, FaCheckCircle } from "react-icons/fa";

export default function ServiceList({ services, selectedServiceId, onSelect }) {
    return (
        <section className="animate-fade-up">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-900 text-white text-xs font-bold">1</span>
                    <h2 className="text-2xl font-semibold tracking-tight">Select Service</h2>
                </div>
                {selectedServiceId && (
                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                        <FaCheckCircle /> Completed
                    </span>
                )}
            </div>

            <div className="grid gap-4">
                {services.map((svc) => {
                    const isSelected = selectedServiceId === svc._id;

                    return (
                        <div
                            key={svc._id}
                            onClick={() => onSelect(svc)}
                            className={`group p-6 border-2 rounded-2xl transition-all duration-300 flex justify-between items-start gap-4 ${isSelected
                                ? "border-gray-900 bg-white shadow-xl"
                                : "border-gray-100 bg-white hover:border-gray-300"
                                }`}
                        >
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-gray-900 mb-1">{svc?.name}</h3>
                                <p className="text-sm text-gray-500">{svc?.description}</p>
                                <div className="flex items-center gap-4 mt-4 text-xs font-medium">
                                    <span className="text-gray-400 flex items-center gap-1">
                                        <FaRegClock /> {svc?.duration} min
                                    </span>
                                    <span className="text-gray-900 font-bold text-sm bg-gray-100 px-3 py-1 rounded-full">
                                        $ {svc?.price}
                                    </span>
                                </div>
                            </div>

                            <button
                                className={`shrink-0 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all cursor-pointer ${isSelected
                                    ? "bg-gray-900 text-white"
                                    : "bg-white text-gray-400 border border-gray-200 group-hover:border-gray-900 group-hover:text-gray-900"
                                    }`}
                            >
                                {isSelected ? "Selected" : "Select"}
                            </button>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}