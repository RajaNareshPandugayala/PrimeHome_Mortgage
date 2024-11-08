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
import Refinancing from "./pages/Refinancing";
import CashOutRefinance from "./pages/CashOutRefinance";
import FhaVaStreamline from "./pages/FhaVaStreamlineRefinance";
import TheLoanProcess from "./pages/TheLoanProcess";
import GlossaryOfMortgageTerms from "./pages/GlossaryOfMortgageTerms";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import GetInformativeFreeReports from "./pages/GetInformativeFreeReports";
import MeetOurStaff from "./pages/MeetOurStaff";
import TeatingGmailFormPage from "./pages/Form/ExampleGmailForm";


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

          <Route path="/Refinancing" element={<Refinancing />} />
          <Route path="/Cash-Out-Refinance" element={<CashOutRefinance />} />
          <Route path="/fha-va-streamline" element={<FhaVaStreamline />} />
          <Route path="/the-loan-process" element={<TheLoanProcess />} />

          <Route path="/Free-Reports" element={<GetInformativeFreeReports />} />
          <Route path="/Glossary-Terms" element={<GlossaryOfMortgageTerms />} />

          <Route path="/About-Us" element={<AboutUs />} />
          <Route path="/our-staff" element={<MeetOurStaff />} />
          <Route path="/Contact-Us" element={<ContactUs />} />


          {/* Deleted-Testing code for customr details are sent Gmail through FORM  */}
          <Route path="/Test-Mail-Through-Form" element={<TeatingGmailFormPage />} />

        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
