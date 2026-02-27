interface OrderSummaryBooking {
    business?: { _id: string; serviceType?: { _id: string } };
    service?: { _id: string; name: string; price: number };
    staff?: { _id: string; name: string };
    date?: string;
    time?: string;
}

export default function OrderSummary({ booking }: { booking: OrderSummaryBooking }) {
    return (
        <div className="lg:col-span-2">
            <div className="bg-white border border-gray-100 rounded-4xl p-8 sticky top-10 dark:bg-gray-900 dark:border-gray-800">
                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 mb-8 pb-4 border-b dark:text-gray-300">Order Summary</h3>

                <div className="space-y-6">
                    <div className="flex justify-between">
                        <span className="text-gray-500 text-sm dark:text-gray-300">Service</span>
                        <span className="font-bold text-sm dark:text-gray-300">{booking?.service?.name}</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-500 text-sm dark:text-gray-300">Professional</span>
                        <span className="font-bold text-sm dark:text-gray-300">{booking?.staff?.name || "Expert"}</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-500 text-sm dark:text-gray-300">Date & Time</span>
                        <div className="text-right">
                            <p className="font-bold text-sm dark:text-gray-300">{booking?.date}</p>
                            <p className="text-emerald-600 text-xs font-bold uppercase tracking-tighter">{booking?.time}</p>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-gray-50">
                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-300">Total Amount</p>
                                <p className="text-3xl font-serif text-gray-900 mt-1 dark:text-gray-300">$ {booking?.service?.price}</p>
                            </div>
                            <div className="text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest dark:bg-gray-800 dark:text-gray-200">
                                Ready
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}