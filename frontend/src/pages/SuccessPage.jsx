import { useNavigate, useLocation } from "react-router";
import { FaCheckCircle, FaCalendarAlt, FaReceipt, FaPlus } from "react-icons/fa";

export default function SuccessPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const booking = location.state?.booking;

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-6 antialiased overflow-hidden">

            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                {[...Array(12)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full opacity-10 animate-float"
                        style={{
                            width: `${20 + (i * 13) % 60}px`,
                            height: `${20 + (i * 13) % 60}px`,
                            background: i % 3 === 0 ? "#10b981" : i % 3 === 1 ? "#1f2937" : "#d1fae5",
                            left: `${(i * 17 + 5) % 95}%`,
                            top: `${(i * 23 + 10) % 90}%`,
                            animationDelay: `${i * 0.4}s`,
                            animationDuration: `${4 + (i % 3)}s`,
                        }}
                    />
                ))}
            </div>

            <div className="max-w-xl w-full text-center space-y-8 relative z-10">

                <div
                    className="flex justify-center"
                    style={{ animation: "slideDown 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both" }}
                >
                    <div className="relative flex items-center justify-center">
                        <div className="absolute w-36 h-36 rounded-full border-2 border-emerald-200 animate-ripple" />
                        <div className="absolute w-28 h-28 rounded-full border-2 border-emerald-300 animate-ripple" style={{ animationDelay: "0.3s" }} />
                        <div className="absolute w-20 h-20 rounded-full bg-emerald-50 animate-pulse" />

                        <svg width="72" height="72" viewBox="0 0 120 120" className="relative z-10">
                            <circle
                                cx="60" cy="60" r="56"
                                fill="#22c55e"
                                style={{
                                    transformOrigin: "60px 60px",
                                    animation: "scale-in 0.4s cubic-bezier(0.34,1.56,0.64,1) both"
                                }}
                            />
                            <path
                                d="M35 60 L52 77 L85 43"
                                fill="none" stroke="white"
                                strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"
                                style={{
                                    strokeDasharray: 80,
                                    strokeDashoffset: 80,
                                    animation: "draw-check 0.5s ease 0.35s forwards"
                                }}
                            />
                        </svg>
                    </div>
                </div>

                <div className="space-y-2" style={{ animation: "slideDown 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.15s both" }}>
                    <h1 className="text-4xl md:text-5xl font-serif text-gray-900">Booking Confirmed!</h1>
                    <p className="text-gray-500 font-medium">Your appointment has been successfully scheduled.</p>
                    {booking?.bookingNumber && (
                        <p className="text-sm font-bold text-emerald-600 tracking-widest uppercase">
                            {booking.bookingNumber}
                        </p>
                    )}
                </div>

                <div
                    className="bg-[#FAFAFA] border border-gray-100 rounded-[2.5rem] p-8 text-left space-y-6 shadow-sm"
                    style={{ animation: "slideDown 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s both" }}
                >
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Service</p>
                            <h3 className="text-xl font-bold text-gray-900">{booking?.service?.name}</h3>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Amount Paid</p>
                            <h3 className="text-xl font-serif text-gray-900">$ {booking?.service?.price}</h3>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200/50">
                        <div className="flex items-center gap-3" style={{ animation: "slideRight 0.5s ease 0.5s both" }}>
                            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-gray-400">
                                <FaCalendarAlt size={14} />
                            </div>
                            <div>
                                <p className="text-[9px] font-black uppercase tracking-tighter text-gray-400">Date</p>
                                <p className="text-sm font-bold">{booking?.date?.split("T")[0]}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3" style={{ animation: "slideRight 0.5s ease 0.6s both" }}>
                            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-emerald-500">
                                <FaCheckCircle size={14} />
                            </div>
                            <div>
                                <p className="text-[9px] font-black uppercase tracking-tighter text-gray-400">Time</p>
                                <p className="text-sm font-bold text-emerald-600">{booking?.time}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                    style={{ animation: "slideDown 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.45s both" }}
                >
                    <button
                        onClick={() => navigate("/services")}
                        className="flex cursor-pointer items-center justify-center gap-2 bg-gray-900 text-white py-5 rounded-2xl font-bold hover:bg-black transition-all hover:-translate-y-1 active:translate-y-0 shadow-lg shadow-gray-200"
                    >
                        <FaPlus size={12} /> Book Another
                    </button>
                    <button
                        onClick={() => navigate("/booking/receipt", { state: { booking } })}
                        className="flex cursor-pointer items-center justify-center gap-2 bg-white border border-gray-200 text-gray-900 py-5 rounded-2xl font-bold hover:bg-gray-50 transition-all hover:-translate-y-1 active:translate-y-0"
                    >
                        <FaReceipt size={12} className="text-gray-400" /> View Receipt
                    </button>
                </div>

                <p className="text-xs text-gray-400" style={{ animation: "slideDown 0.5s ease 0.6s both" }}>
                    A confirmation email has been sent to your inbox. <br />
                    Need to reschedule?{" "}
                    <span className="underline cursor-pointer hover:text-gray-700 transition-colors">
                        Contact Support
                    </span>
                </p>
            </div>

            <style>{`
                @keyframes scale-in {
                    from { transform: scale(0); opacity: 0; }
                    to   { transform: scale(1); opacity: 1; }
                }
                @keyframes draw-check {
                    to { stroke-dashoffset: 0; }
                }
                @keyframes slideDown {
                    from { opacity: 0; transform: translateY(-24px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes slideRight {
                    from { opacity: 0; transform: translateX(-16px); }
                    to   { opacity: 1; transform: translateX(0); }
                }
                @keyframes ripple {
                    0%   { transform: scale(0.8); opacity: 0.8; }
                    100% { transform: scale(1.4); opacity: 0; }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50%      { transform: translateY(-20px) rotate(180deg); }
                }
                .animate-ripple {
                    animation: ripple 2s ease-out infinite;
                }
                .animate-float {
                    animation: float 4s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}