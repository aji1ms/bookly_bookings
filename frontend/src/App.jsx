import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./pages/Home";
import ServicesPage from "./pages/Services";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;