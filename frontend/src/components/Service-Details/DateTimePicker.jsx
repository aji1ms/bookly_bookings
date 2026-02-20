import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAvailableTimeThunk } from "../../Redux/slices/bookingSlice";

export default function DateTimePicker({ date, time, onDateChange, onTimeChange, businessId, staffId }) {
    const today = new Date().toISOString().split("T")[0];
    const dispatch = useDispatch();

    const { availableTime, loading } = useSelector((state) => state.bookings);

    useEffect(() => {
        if (date && businessId) {
            dispatch(getAvailableTimeThunk({
                date,
                businessId,
                staffId: staffId === "any" ? undefined : staffId,
            }));
        }
    }, [date, staffId, businessId]);

    const slots = availableTime?.data?.availableSlots || [];

    return (
        <section className="animate-fade-up border-t border-gray-100 pt-12">
            <div className="flex items-center gap-3 mb-8">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-900 text-white text-xs font-bold">3</span>
                <h2 className="text-2xl font-semibold tracking-tight">Pick Date & Slot</h2>
            </div>

            <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">
                    Choose a Date
                </label>
                <input
                    type="date"
                    min={today}
                    value={date}
                    onChange={(e) => onDateChange(e.target.value)}
                    className="w-full md:w-auto p-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all font-bold text-lg cursor-pointer"
                />

                {date && (
                    <div className="mt-10 animate-fade-up">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4 block">
                            Available Times
                        </label>

                        {/* Loading shimmer */}
                        {loading ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                {Array.from({ length: 8 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className="py-4 rounded-2xl bg-gray-200 animate-pulse h-14"
                                    />
                                ))}
                            </div>
                        ) : slots.length === 0 ? (
                            <div className="text-center py-10 text-gray-400 text-sm font-medium">
                                No available slots for this date. Please try another day.
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                {slots.map((slot) => (
                                    <button
                                        key={slot}
                                        onClick={() => onTimeChange(slot)}
                                        className={`py-4 cursor-pointer rounded-2xl text-sm font-bold transition-all border-2 ${time === slot
                                            ? "bg-gray-900 text-white border-gray-900 shadow-lg"
                                            : "bg-white text-gray-700 border-gray-100 hover:border-gray-900"
                                            }`}
                                    >
                                        {slot}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}