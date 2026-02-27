import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";

import { AppDispatch, RootState } from "../Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getStaffByServiceIdThunk } from "../Redux/slices/staffSlice";
import { getBusinessByIdThunk } from "../Redux/slices/businessSlice";
import { getserviceByBusinessId } from "../Redux/slices/servicesSlice";
import { IBusiness } from "../Redux/slices/businessSlice";
import { IService } from "../Redux/slices/servicesSlice";
import { IStaff } from "../Redux/slices/staffSlice";

import BusinessDatas from "../components/Service-Details/BusinessDatas";
import HeroSection from "../components/Service-Details/HeroSection";
import DateTimePicker from "../components/Service-Details/DateTimePicker";
import BookingSummary from "../components/Service-Details/BookingSummary";
import ServiceList from "../components/Service-Details/ServiceList";
import StaffSelection from "../components/Service-Details/StaffSelection";
import { HeroSectionShimmer, BusinessDatasShimmer, ServiceListShimmer }
    from "../components/Shimmer-UI/ServiceDetailsPageShimmer";

export interface BookingState {
    business: IBusiness | null;
    service: IService | null;
    staff: IStaff | null;
    date: string;
    time: string;
}


export default function SeviceDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const dispatch = useDispatch<AppDispatch>();

    const { selectedbusiness } = useSelector((state: RootState) => state.business);
    const { loading, services } = useSelector((state: RootState) => state.services)
    const { loading: staffLoading, staffs } = useSelector((state: RootState) => state.staffs);

    useEffect(() => {
        if (id) {
            dispatch(getBusinessByIdThunk(id));
            dispatch(getserviceByBusinessId(id));
        }
    }, [id, dispatch]);

    const [booking, setBooking] = useState<BookingState>({
        business: null,
        service: null,
        staff: null,
        date: "",
        time: ""
    });

    useEffect(() => {
        if (selectedbusiness) {
            setBooking(prev => ({ ...prev, business: selectedbusiness }));
        }
    }, [selectedbusiness]);

    const updateBooking = <K extends keyof BookingState>(field: K, value: BookingState[K]) => {
        setBooking(prev => {
            const newState = { ...prev, [field]: value };
            if (field === "service") { newState.staff = null; newState.date = ""; newState.time = ""; }
            if (field === "staff") { newState.date = ""; newState.time = ""; }
            if (field === "date") { newState.time = ""; }
            return newState;
        });
    };

    useEffect(() => {
        if (booking.service?._id) {
            dispatch(getStaffByServiceIdThunk(booking.service._id));
        }
    }, [booking.service?._id, dispatch]);

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            {loading ? (
                <HeroSectionShimmer />
            ) : (
                <HeroSection business={selectedbusiness as IBusiness} />
            )}

            <main className="max-w-6xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-12">
                        {loading ? (
                            <ServiceListShimmer count={3} />
                        ) : (
                            <ServiceList
                                services={services}
                                selectedServiceId={booking.service?._id}
                                onSelect={(svc) => updateBooking('service', svc)}
                            />
                        )}

                        {booking.service && (
                            <StaffSelection
                                staff={staffs}
                                staffLoading={staffLoading}
                                selectedStaffId={booking.staff?._id}
                                onSelect={(s) => updateBooking("staff", s)}
                            />
                        )}

                        {booking.staff && (
                            <DateTimePicker
                                date={booking.date}
                                time={booking.time}
                                onDateChange={(d) => updateBooking('date', d)}
                                onTimeChange={(t) => updateBooking('time', t)}
                                businessId={id ?? ""}
                                staffId={booking.staff?._id ?? ""}
                            />
                        )}

                        {booking.time && (
                            <button
                                onClick={() => navigate("/booking/checkout", { state: { booking } })}
                                className="w-full cursor-pointer bg-gray-900 text-white py-5 rounded-2xl font-bold text-lg hover:bg-black transition-colors shadow-xl animate-fade-up dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-300 dark:hover:text-gray-800">
                                Confirm Booking
                            </button>
                        )}
                    </div>

                    <div className="lg:col-span-1 sticky top-20 space-y-6">
                        <BookingSummary booking={booking} />
                        {loading ? (
                            <BusinessDatasShimmer />
                        ) : (
                            <BusinessDatas data={selectedbusiness as IBusiness} />
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}