import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { FaCheckCircle, FaCalendarAlt, FaReceipt, FaPlus } from "react-icons/fa";

export default function SuccessPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const booking = location.state?.booking;

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-6 antialiased">
            <div className="max-w-xl w-full text-center space-y-8 animate-fade-up">

                {/* Animated Checkmark Icon */}
                <div className="flex justify-center">
                    <div className="relative">
                        <div className="absolute inset-0 bg-emerald-100 rounded-full animate-ping opacity-25"></div>
                        <FaCheckCircle className="text-emerald-500 text-8xl relative z-10 animate-bounce-short" />
                    </div>
                </div>

                {/* Hero Message */}
                <div className="space-y-2">
                    <h1 className="text-4xl md:text-5xl font-serif text-gray-900">Booking Confirmed!</h1>
                    <p className="text-gray-500 font-medium">Your appointment has been successfully scheduled.</p>
                    <p className="text-gray-500 font-medium">Booking Number: {booking.bookingNumber}</p>
                </div>

                {/* Booking Summary Card */}
                <div className="bg-[#FAFAFA] border border-gray-100 rounded-[2.5rem] p-8 text-left space-y-6 shadow-sm">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Service</p>
                            <h3 className="text-xl font-bold text-gray-900">{booking.service.name}</h3>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Amount Paid</p>
                            <h3 className="text-xl font-serif text-gray-900">$ {booking.service.price}</h3>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200/50">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-gray-400">
                                <FaCalendarAlt size={14} />
                            </div>
                            <div>
                                <p className="text-[9px] font-black uppercase tracking-tighter text-gray-400">Date</p>
                                <p className="text-sm font-bold">{booking.date.split("T")[0]}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-emerald-500">
                                <FaCheckCircle size={14} />
                            </div>
                            <div>
                                <p className="text-[9px] font-black uppercase tracking-tighter text-gray-400">Time</p>
                                <p className="text-sm font-bold text-emerald-600">{booking.time}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                        onClick={() => navigate("/services")}
                        className="flex cursor-pointer items-center justify-center gap-2 bg-gray-900 text-white py-5 rounded-2xl font-bold hover:bg-black transition-all hover:-translate-y-1 shadow-lg shadow-gray-200"
                    >
                        <FaPlus size={12} /> Book Another
                    </button>
                    <button
                        onClick={() => navigate("/booking/receipt", { state: { booking } })}
                        className="flex cursor-pointer items-center justify-center gap-2 bg-white border border-gray-200 text-gray-900 py-5 rounded-2xl font-bold hover:bg-gray-50 transition-all hover:-translate-y-1"
                    >
                        <FaReceipt size={12} className="text-gray-400" /> View Receipt
                    </button>
                </div>

                <p className="text-xs text-gray-400">
                    A confirmation email has been sent to your inbox. <br />
                    Need to reschedule? <span className="underline cursor-pointer">Contact Support</span>
                </p>
            </div>
        </div>
    );
}