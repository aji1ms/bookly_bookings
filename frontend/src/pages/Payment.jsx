import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { FaLock, FaChevronLeft, FaCreditCard, FaSpinner } from "react-icons/fa";
import toast from "react-hot-toast";
import OrderSummary from "../components/Payment/OrderSummary";
import { useDispatch, useSelector } from "react-redux";
import { createBookingThunk } from "../Redux/slices/bookingSlice";

export default function PaymentPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const bookingState = location.state?.booking;
    const userState = location.state?.user;

    const dispatch = useDispatch();
    const { loading, bookings } = useSelector((state) => state.bookings);

    const [cardData, setCardData] = useState({
        number: "",
        name: "",
        expiry: "",
        cvv: ""
    });

    const [errors, setErrors] = useState({});

    const handleCardChange = (e) => {
        let { name, value } = e.target;

        if (name === "number") {
            value = value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
        } else if (name === "name") {
            value = value.toUpperCase().replace(/[^A-Z\s]/g, "");
        } else if (name === "expiry") {
            value = value.replace(/\D/g, "").slice(0, 4);
            if (value.length > 2) value = value.slice(0, 2) + "/" + value.slice(2, 4);
        } else if (name === "cvv") {
            value = value.replace(/\D/g, "").slice(0, 3);
        }

        setCardData({ ...cardData, [name]: value });
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
    };

    const validatePayment = () => {
        const newErrors = {};
        const { number, name, expiry, cvv } = cardData;

        if (number.replace(/\s/g, "").length !== 16) {
            newErrors.number = "Card number must be 16 digits";
        }

        if (name.trim().length < 3) {
            newErrors.name = "Full cardholder name is required";
        }

        if (!/^\d{2}\/\d{2}$/.test(expiry)) {
            newErrors.expiry = "Use MM/YY format";
        } else {
            const [month, year] = expiry.split("/").map(Number);
            const now = new Date();
            const currentYear = now.getFullYear() % 100;
            const currentMonth = now.getMonth() + 1;

            if (month < 1 || month > 12) {
                newErrors.expiry = "Invalid month";
            } else if (year < currentYear || (year === currentYear && month < currentMonth)) {
                newErrors.expiry = "Card has expired";
            }
        }

        if (cvv.length < 3) {
            newErrors.cvv = "Required (3 digits)";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlePayment = async (e) => {
        e.preventDefault();

        if (validatePayment()) {
            try {
                const result = await dispatch(createBookingThunk({
                    serviceType: bookingState.business.serviceType._id,
                    business: bookingState.business._id,
                    service: bookingState.service._id,
                    staff: bookingState.staff._id,
                    user: userState._id,
                    date: bookingState.date,
                    time: bookingState.time,
                    totalAmount: bookingState.service.price
                })).unwrap();

                navigate("/booking/confirmation", {
                    state: { booking: result }
                });
            } catch (error) {
                toast.error("Something went wrong! please try again", { duration: 2000, position: "top-right" });
            }
        }
    }

    return (
        <div className="min-h-screen bg-[#FAFAFA] text-gray-900 font-sans antialiased pb-20">
            <nav className="p-6 max-w-5xl mx-auto flex items-center justify-between">
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors cursor-pointer">
                    <FaChevronLeft size={12} /> Back
                </button>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                    <FaLock className="text-emerald-500" /> Secure SSL Connection
                </div>
            </nav>

            <main className="max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-5 gap-12 mt-8">
                <div className="lg:col-span-3 space-y-10">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-serif mb-2">Credit Card</h1>
                        <p className="text-gray-500">Enter your card details to complete the booking.</p>
                    </div>

                    <form onSubmit={handlePayment} className="space-y-6">
                        <div className="bg-white p-8 rounded-4xl border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] space-y-6">

                            {/* Card Number */}
                            <div>
                                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">Card Number</label>
                                <div className="relative">
                                    <input
                                        name="number"
                                        placeholder="1234 5678 9012 3456"
                                        value={cardData.number}
                                        onChange={handleCardChange}
                                        className={`w-full p-4 pl-12 bg-gray-50 border ${errors.number ? 'border-red-500 ring-1 ring-red-500' : 'border-transparent'} focus:bg-white focus:border-gray-900 rounded-2xl transition-all font-mono text-lg tracking-wider outline-none`}
                                    />
                                    <FaCreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                                </div>
                                {errors.number && <p className="text-red-500 text-[10px] mt-2 font-bold uppercase tracking-wider">{errors.number}</p>}
                            </div>

                            {/* Holder Name */}
                            <div>
                                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">Cardholder Name</label>
                                <input
                                    name="name"
                                    placeholder="JANE DOE"
                                    value={cardData.name}
                                    onChange={handleCardChange}
                                    className={`w-full p-4 bg-gray-50 border ${errors.name ? 'border-red-500 ring-1 ring-red-500' : 'border-transparent'} focus:bg-white focus:border-gray-900 rounded-2xl transition-all font-bold tracking-widest outline-none`}
                                />
                                {errors.name && <p className="text-red-500 text-[10px] mt-2 font-bold uppercase tracking-wider">{errors.name}</p>}
                            </div>

                            {/* Expiry & CVV */}
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">Expiry Date</label>
                                    <input
                                        name="expiry"
                                        placeholder="MM/YY"
                                        value={cardData.expiry}
                                        onChange={handleCardChange}
                                        className={`w-full p-4 bg-gray-50 border ${errors.expiry ? 'border-red-500 ring-1 ring-red-500' : 'border-transparent'} focus:bg-white focus:border-gray-900 rounded-2xl transition-all text-center font-bold outline-none`}
                                    />
                                    {errors.expiry && <p className="text-red-500 text-[10px] mt-2 font-bold uppercase tracking-wider text-center">{errors.expiry}</p>}
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">CVV</label>
                                    <input
                                        type="password"
                                        name="cvv"
                                        placeholder="•••"
                                        value={cardData.cvv}
                                        onChange={handleCardChange}
                                        className={`w-full p-4 bg-gray-50 border ${errors.cvv ? 'border-red-500 ring-1 ring-red-500' : 'border-transparent'} focus:bg-white focus:border-gray-900 rounded-2xl transition-all text-center font-bold outline-none`}
                                    />
                                    {errors.cvv && <p className="text-red-500 text-[10px] mt-2 font-bold uppercase tracking-wider text-center">{errors.cvv}</p>}
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full cursor-pointer bg-gray-900 text-white py-6 rounded-3xl font-bold text-lg hover:bg-black transition-all shadow-xl hover:-translate-y-1 flex items-center justify-center gap-3 group"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <FaSpinner className="animate-spin text-2xl" />
                                </div>
                            ) : (
                                <span>Confirm & Pay {bookingState?.service?.price}</span>
                            )}
                        </button>
                    </form>
                </div>

                <OrderSummary booking={bookingState} />
            </main>
        </div>
    );
}