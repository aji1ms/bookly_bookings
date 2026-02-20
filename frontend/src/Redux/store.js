import { configureStore } from "@reduxjs/toolkit";
import serviceTypeReducer from './slices/servicetypeSlice';
import businessReducer from './slices/businessSlice';
import servicesReducer from './slices/servicesSlice';
import staffReducer from './slices/staffSlice';
import bookingReducer from './slices/bookingSlice';
import userReducer from './slices/userSlice';

const store = configureStore({
    reducer: {
        serviceType: serviceTypeReducer,
        business: businessReducer,
        services: servicesReducer,
        staffs: staffReducer,
        bookings: bookingReducer,
        users: userReducer
    },
});

export default store;