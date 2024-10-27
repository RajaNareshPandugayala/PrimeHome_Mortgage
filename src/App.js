import { BrowserRouter, Routes, Route } from "react-router-dom";
// import logo from './logo.svg';
import './App.css';
import Home from "./pages/Home";

// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import { SignupAndLogin } from './userRegistration/registration';

function App() {
  return (
    <div>
      <BrowserRouter basename="/PrimeHome_Mortgage">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/login" element={<Login />} /> */}
          {/* <Route path="/register" element={<Register />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
