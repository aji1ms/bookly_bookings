export default function BookingSummary({ booking }) {
    if (!booking.service) return null;

    return (
        <div className={`overflow-hidden rounded-3xl transition-all duration-500 bg-gray-900 text-white p-8 shadow-2xl`}>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-6">Booking Summary</h3>
            <div className="space-y-6">
                <div className="flex justify-between items-start gap-4">
                    <div className="text-white/60 text-sm">Service</div>
                    <div className="text-right text-sm font-bold">{booking.service.name}</div>
                </div>

                {booking.staff && (
                    <div className="flex justify-between items-start gap-4">
                        <div className="text-white/60 text-sm">Professional</div>
                        <div className="text-right text-sm font-bold">{booking.staff.name}</div>
                    </div>
                )}

                {booking.date && (
                    <div className="flex justify-between items-start gap-4">
                        <div className="text-white/60 text-sm">Appointment</div>
                        <div className="text-right text-sm font-bold">
                            {booking.date} <br />
                            <span className="text-emerald-400">{booking.time || '--:--'}</span>
                        </div>
                    </div>
                )}
            </div>
            <div className="mt-10 pt-8 border-t border-white/10 flex justify-between items-end">
                <span className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Total Price</span>
                <span className="text-3xl font-serif text-white">{booking.service.price}</span>
            </div>
        </div>
    );
}