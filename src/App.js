import { BrowserRouter, Routes, Route } from "react-router-dom";

// Admin Components
import Sidebar from "./Component/Sidebar";
import Header from "./Component/Header";
import Footer from "./Component/Footer";
import Dashboard from "./Component/Dashboard";
import Job from "./Component/Jobs";
import Condidates from "./Component/Candidates";
import Employes from "./Component/Employes";
import Packages from "./Component/Packages";
import Offer from "./Component/Offers";
import Contact from "./Component/Contact";
import Users from "./Component/Users";
import Login from "./Component/Login";
import Registar from "./Component/Registar";
import Verify from "./Component/Verify";
import Interview from "./Component/Interview";

// User Components
import Header2 from "./Component2/Header";
import Footer2 from "./Component2/Footer";
import Home from "./Component2/Home";
import Company from "./Component2/Company";
import Jobs from "./Component2/Jobs";
import Signin from "./Component2/Signin";
import Signup from "./Component2/Signup";

// Employer Components
import Header3 from "./Component3/Header";
import Footer3 from "./Component3/Footer";
import Employer from "./Component3/Employer";
// ---------------- ADMIN LAYOUT ----------------
const AdminLayout = () => {
  return (
    <div className="wrapper">
      <Sidebar />
      <div className="main-panel">
        <Header />
        <div className="container">
          <div className="page-inner">
            <Routes>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="job" element={<Job />} />
              <Route path="condidate" element={<Condidates />} />
              <Route path="interview" element={<Interview />} />
              <Route path="employe" element={<Employes />} />
              <Route path="package" element={<Packages />} />
              <Route path="offer" element={<Offer />} />
              <Route path="contact" element={<Contact />} />
              <Route path="user" element={<Users />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

// ---------------- USER LAYOUT ----------------
const UserLayout = () => {
  return (
    <>
      <Header2 />
      <Routes>
        <Route index element={<Home />} />
        <Route path="companies" element={<Company />} />
        <Route path="jobs" element={<Jobs />} />
      </Routes>
      <Footer2 />
    </>
  );
};

// ---------------- Employer LAYOUT ----------------
const EmployerLayout = () => {
  return (
    <>
      <Header3 />
      <Routes>
        <Route path="employer" element={<Employer />} />
      </Routes>
      <Footer3 />
    </>
  );
};

// ---------------- MAIN APP ----------------
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login / Signup / Verify */}
        <Route path="/login" element={<Login />} />
        <Route path="/registar" element={<Registar />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />

        {/* USER ROUTES */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="companies" element={<Company />} />
          <Route path="jobs" element={<Jobs />} />
        </Route>

        {/* Employer ROUTES */}
        <Route element={<EmployerLayout />}>
          <Route path="employer" element={<Employer />} />
        </Route>

        {/* ADMIN ROUTES (NO /admin PREFIX) */}
        <Route element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="job" element={<Job />} />
          <Route path="condidate" element={<Condidates />} />
          <Route path="interview" element={<Interview />} />
          <Route path="employe" element={<Employes />} />
          <Route path="package" element={<Packages />} />
          <Route path="offer" element={<Offer />} />
          <Route path="contact" element={<Contact />} />
          <Route path="user" element={<Users />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
