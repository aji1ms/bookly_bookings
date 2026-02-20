import { useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import { FaPrint, FaChevronLeft, FaCheckCircle } from "react-icons/fa";

export default function ReceiptPage() {
    const navigate = useNavigate();
    const receiptRef = useRef();
    const location = useLocation();
    const booking = location.state?.booking;

    if (!booking) {
        return <div className="p-10 text-center">No booking data found.</div>;
    }

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-[#F8F9FA] py-16 px-6 font-sans text-slate-900">
            {/* Action Bar */}
            <div className="max-w-3xl mx-auto mb-10 flex justify-between items-center print:hidden">
                <button
                    onClick={() => navigate("/")}
                    className="group cursor-pointer flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-slate-900 transition-all"
                >
                    <FaChevronLeft className="group-hover:-translate-x-1 transition-transform" />
                    Exit to Dashboard
                </button>
                <button
                    onClick={handlePrint}
                    className="flex cursor-pointer items-center gap-3 px-6 py-3 bg-slate-900 text-white rounded-2xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
                >
                    <FaPrint size={14} />
                    <span className="font-bold text-sm">Print Receipt</span>
                </button>
            </div>

            {/* MAIN RECEIPT */}
            <div
                ref={receiptRef}
                className="max-w-3xl mx-auto bg-white rounded-4xl border border-slate-100 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.04)] overflow-hidden print:shadow-none print:border-none"
            >
                {/* Top Branding Section */}
                <div className="p-12 border-b border-dashed border-slate-100 flex justify-between items-start">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="h-8 w-8 bg-slate-900 rounded-lg flex items-center justify-center">
                                <span className="text-white font-serif font-bold text-xl">{booking.business.name.charAt(0)}</span>
                            </div>
                            <h1 className="text-2xl font-serif font-bold tracking-tight">
                                {booking.business.name}</h1>
                        </div>
                        <p className="text-slate-400 text-xs uppercase tracking-[0.2em] font-bold">Transaction Confirmed</p>
                    </div>
                    <div className="text-right">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full mb-4">
                            <FaCheckCircle size={12} />
                            <span className="text-[10px] font-black uppercase tracking-wider">Payment Received</span>
                        </div>
                        <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest mb-1">Receipt ID</p>
                        <p className="font-mono text-sm font-bold">{booking.bookingNumber || "N/A"}</p>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="p-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        {/* Left: Customer Info */}
                        <div className="space-y-8">
                            <div>
                                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300 mb-4">Customer Details</h4>
                                <div className="space-y-1">
                                    <p className="text-lg font-bold text-slate-900">{booking.user?.name}</p>
                                    <p className="text-sm text-slate-500">{booking.user?.email}</p>
                                    <p className="text-sm text-slate-500">{booking.user?.phone}</p>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300 mb-4">Appointment Info</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-slate-50 rounded-2xl">
                                        <p className="text-[9px] uppercase font-bold text-slate-400 mb-1">Date</p>
                                        <p className="text-sm font-bold">{booking.date}</p>
                                    </div>
                                    <div className="p-4 bg-slate-50 rounded-2xl">
                                        <p className="text-[9px] uppercase font-bold text-slate-400 mb-1">Time</p>
                                        <p className="text-sm font-bold">{booking.time}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Summary */}
                        <div className="bg-slate-50 rounded-4xl p-8 space-y-6">
                            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Order Summary</h4>

                            <div className="flex justify-between items-start border-b border-slate-200 pb-4">
                                <div>
                                    <p className="font-bold text-slate-900">{booking.service?.name}</p>
                                    <p className="text-[11px] text-slate-500 mt-1">With {booking.staff?.name}</p>
                                </div>
                                <p className="font-bold">${booking.service?.price}</p>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between text-xs text-slate-500">
                                    <span>Base Rate</span>
                                    <span>${booking.service?.price}</span>
                                </div>
                                <div className="flex justify-between text-xs text-slate-500">
                                    <span>Platform Fee</span>
                                    <span>$0.00</span>
                                </div>
                                <div className="flex justify-between pt-4 border-t border-slate-200">
                                    <span className="text-sm font-bold text-slate-900">Total Paid</span>
                                    <span className="text-2xl font-serif font-bold text-slate-900">${booking.service?.price}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Branding */}
                    <div className="mt-20 pt-10 border-t border-slate-100 flex flex-col items-center">
                        <p className="text-xs text-slate-400 mb-6 max-w-sm text-center leading-relaxed font-medium">
                            Please present this receipt upon arrival at <span>{booking.business.name}</span>. We look forward to seeing you.
                        </p>
                        <div className="flex gap-8 items-center opacity-30 grayscale">
                            <span className="text-[10px] font-bold tracking-widest uppercase italic">Verified Booking</span>
                            <span className="text-[10px] font-bold tracking-widest uppercase italic">Secure SSL</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}