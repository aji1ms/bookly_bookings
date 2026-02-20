export default function OrderSummary({ booking }) {
    return (
        <div className="lg:col-span-2">
            <div className="bg-white border border-gray-100 rounded-4xl p-8 sticky top-10">
                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 mb-8 pb-4 border-b">Order Summary</h3>

                <div className="space-y-6">
                    <div className="flex justify-between">
                        <span className="text-gray-500 text-sm">Service</span>
                        <span className="font-bold text-sm">{booking?.service?.name}</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-500 text-sm">Professional</span>
                        <span className="font-bold text-sm">{booking?.staff?.name || "Expert"}</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-500 text-sm">Date & Time</span>
                        <div className="text-right">
                            <p className="font-bold text-sm">{booking?.date}</p>
                            <p className="text-emerald-600 text-xs font-bold uppercase tracking-tighter">{booking?.time}</p>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-gray-50">
                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Total Amount</p>
                                <p className="text-3xl font-serif text-gray-900 mt-1">$ {booking?.service?.price}</p>
                            </div>
                            <div className="text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                                Ready
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}