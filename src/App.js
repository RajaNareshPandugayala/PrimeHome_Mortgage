import { BrowserRouter, Routes, Route } from "react-router-dom";
// import logo from './logo.svg';
import './App.css';
import Header from './Elements/Header/header';
import Footer from './Elements/Footer/footer';
import Home from "./pages/Home";
import Purchase from "./pages/Purchase";
import Paperwork from "./pages/Paperwork";
import QuickQuote from "./pages/QuickQuote";
import FHA from "./pages/FHA_Loans";
import VALoans from "./pages/VA_Loans";
import MonthlyPaymentMortgageCalculator from "./pages/MonthlyPaymentCalculator";
import AffordabilityCalculator from "./pages/AffordabilityCalculator";


// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import { SignupAndLogin } from './userRegistration/registration';

function App() {
  return (
    <div>
      <BrowserRouter basename="/PrimeHome_Mortgage">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Purchase" element={<Purchase />} />
          <Route path="/Paperwork" element={<Paperwork />} />
          <Route path="/QuickQuote" element={<QuickQuote />} />
          <Route path="/how-much-can-i-afford-calculator" element={<AffordabilityCalculator />} />
          <Route path="/what-will-my-monthly-payment-be-calculator" element={<MonthlyPaymentMortgageCalculator />} />
          <Route path="/FHA" element={<FHA />} />
          <Route path="/VA-Loans" element={<VALoans />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
