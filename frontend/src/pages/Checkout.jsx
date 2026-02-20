import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { FaLock, FaChevronLeft, FaUser, FaPhoneAlt, FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { IoMdMail } from "react-icons/io";
import CheckoutSidebar from "../components/Checkout/CheckoutSidebar";
import { createUserSlice } from "../Redux/slices/userSlice";
import toast from "react-hot-toast";

export default function Checkout() {
    const navigate = useNavigate();
    const location = useLocation();
    const bookingFromState = location.state?.booking;
    
    const dispatch = useDispatch()
    const { loading, user } = useSelector((state) => state.users)

    const [error, setError] = useState({});

    const [userData, setUserData] = useState({
        fullName: "",
        email: "",
        phone: "",
        notes: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({ ...prev, [name]: value }));
        if (error[`${name}Error`]) {
            setError(prev => ({ ...prev, [`${name}Error`]: "" }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        const { fullName, email, phone, notes } = userData;

        if (!fullName || fullName.trim().length < 2) {
            newErrors.nameError = "Name must be at least 2 characters";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            newErrors.emailError = "Please enter a valid email address";
        }

        const phoneDigits = phone.replace(/\D/g, "");
        if (!phone || phoneDigits.length < 10) {
            newErrors.phoneError = "Phone number must be at least 10 digits";
        }

        if (notes && notes.length > 500) {
            newErrors.notesError = "Notes cannot exceed 500 characters";
        }

        setError(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const result = await dispatch(createUserSlice({
                    name: userData.fullName,
                    email: userData.email,
                    phone: userData.phone,
                })).unwrap();

                navigate("/booking/payment", {
                    state: {
                        booking: bookingFromState,
                        user: result
                    }
                });
            } catch (err) {
                toast.error("Something went wrong! please try again", { duration: 2000 });
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#FAFAFA] text-gray-900 font-sans antialiased pb-20">
            <nav className="p-6 max-w-5xl mx-auto flex items-center justify-between">
                <button
                    onClick={() => navigate(-1)}
                    className="flex cursor-pointer items-center gap-2 text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors"
                >
                    <FaChevronLeft size={12} /> Back
                </button>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                    <FaLock className="text-emerald-500" /> Secure Checkout
                </div>
            </nav>

            <main className="max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-5 gap-12 mt-8">
                <div className="lg:col-span-3 space-y-8">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-serif mb-2 text-gray-900">Finalize Booking</h1>
                        <p className="text-gray-500">Please provide your contact details to secure your slot.</p>
                    </div>

                    <form onSubmit={handleNext} className="space-y-6">
                        <div className="grid grid-cols-1 gap-6">
                            {/* Full Name */}
                            <div className="relative">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">Full Name</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><FaUser size={14} /></span>
                                    <input
                                        name="fullName"
                                        value={userData.fullName}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        className={`w-full pl-12 pr-4 py-4 bg-white border ${error.nameError ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-100'} rounded-2xl focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all font-medium`}
                                    />
                                </div>
                                {error.nameError && <p className="text-red-500 text-xs mt-1.5 ml-2 font-semibold">{error.nameError}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Email */}
                                <div>
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">Email Address</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><IoMdMail size={16} /></span>
                                        <input
                                            type="email"
                                            name="email"
                                            value={userData.email}
                                            onChange={handleChange}
                                            placeholder="john@example.com"
                                            className={`w-full pl-12 pr-4 py-4 bg-white border ${error.emailError ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-100'} rounded-2xl focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all font-medium`}
                                        />
                                    </div>
                                    {error.emailError && <p className="text-red-500 text-xs mt-1.5 ml-2 font-semibold">{error.emailError}</p>}
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">Phone Number</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><FaPhoneAlt size={14} /></span>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={userData.phone}
                                            onChange={handleChange}
                                            placeholder="+1 (555) 000-0000"
                                            className={`w-full pl-12 pr-4 py-4 bg-white border ${error.phoneError ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-100'} rounded-2xl focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all font-medium`}
                                        />
                                    </div>
                                    {error.phoneError && <p className="text-red-500 text-xs mt-1.5 ml-2 font-semibold">{error.phoneError}</p>}
                                </div>
                            </div>

                            {/* Special Notes */}
                            <div>
                                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">Special Requests (Optional)</label>
                                <textarea
                                    name="notes"
                                    rows="4"
                                    value={userData.notes}
                                    onChange={handleChange}
                                    placeholder="Any allergies or specific preferences..."
                                    className={`w-full p-4 bg-white border ${error.notesError ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-100'} rounded-2xl focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all font-medium resize-none`}
                                />
                                {error.notesError && <p className="text-red-500 text-xs mt-1.5 ml-2 font-semibold">{error.notesError}</p>}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full cursor-pointer bg-gray-900 text-white py-6 rounded-3xl font-bold text-lg hover:bg-black transition-all shadow-xl hover:-translate-y-1 active:translate-y-0"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <FaSpinner className="animate-spin text-2xl" />
                                </div>
                            ) : (
                                "Proceed to Payment"
                            )}
                        </button>
                    </form>
                </div>

                <div className="lg:col-span-2">
                    <CheckoutSidebar booking={bookingFromState} />
                </div>
            </main>
        </div>
    );
}