import { FaRegCalendarAlt } from "react-icons/fa";

const DUMMY_BOOKING = {
    service: { name: "Precision Haircut", duration: "45 min", price: "$65" },
    staff: { name: "Jordan Ellis" },
    date: "2024-10-24",
    time: "02:30 PM"
};

export default function CheckoutSidebar({ booking }) {
    return (
        <div className="lg:col-span-2">
            <div className="bg-white border border-gray-100 rounded-4xl p-8 sticky top-10 shadow-[0_20px_50px_rgba(0,0,0,0.02)]">
                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 mb-8 pb-4 border-b border-gray-50">
                    Appointment Details
                </h3>

                <div className="space-y-6">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-900">
                            <FaRegCalendarAlt size={18} />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-900">
                                {booking?.service?.name || "No Service Selected"}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                                {booking?.service?.duration} min • {booking?.staff?.name}
                            </p>
                        </div>
                    </div>

                    <div className="py-4 px-5 bg-gray-50 rounded-2xl space-y-2">
                        <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-400">
                            <span>Date</span>
                            <span className="text-gray-900">{booking?.date}</span>
                        </div>
                        <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-400">
                            <span>Time</span>
                            <span className="text-emerald-600">{booking?.time}</span>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-gray-50 flex justify-between items-end">
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Total Due</p>
                            <p className="text-3xl font-serif text-gray-900">$ {booking?.service?.price}</p>
                        </div>
                        <div className="text-[10px] text-gray-400 italic">Incl. all taxes</div>
                    </div>
                </div>
            </div>
        </div>
    );
}