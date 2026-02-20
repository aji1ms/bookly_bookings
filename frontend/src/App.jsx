import { BrowserRouter, Route, Routes } from "react-router";
import { Toaster } from 'react-hot-toast';
import HomePage from "./pages/Home";
import ServicesPage from "./pages/Services";
import ServiceDetailPage from "./pages/ServiceDetails";
import PaymentPage from "./pages/Payment";
import SuccessPage from "./pages/SuccessPage";
import ReceiptPage from "./pages/ReceiptPage";
import AboutPage from "./pages/About";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services/:id" element={<ServiceDetailPage />} />
        <Route path="/booking/checkout" element={<Checkout />} />
        <Route path="/booking/payment" element={<PaymentPage />} />
        <Route path="/booking/confirmation" element={<SuccessPage />} />
        <Route path="/booking/receipt" element={<ReceiptPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;