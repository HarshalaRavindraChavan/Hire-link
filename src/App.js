import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

/* ================= USER ================= */
import Header2 from "./Component2/Header";
import Footer2 from "./Component2/Footer";
import Home from "./Component2/Home";
import Company from "./Component2/Company";
import Jobs from "./Component2/Jobs";
import JobDetail from "./Component2/JobDetail";
import Apply from "./Component2/Apply";
import Profile from "./Component2/Profile";
import Notification from "./Component2/Notification";
import About from "./Component2/About";
import Help from "./Component2/Help";
import Contacts from "./Component2/Contact";
import Signin from "./Component2/Signin";
import Signup from "./Component2/Signup";
import Forgot from "./Component2/Forgot";
import Receipt from "./Component2/Receipt";
import Cprivacypolicies from "./Component2/Privacypolicies";
import Ctermscondition from "./Component2/Termscondition";
import Creturnpolicy from "./Component2/Returnpolicy";

/* ================= ADMIN ================= */
import Sidebar from "./Component/Sidebar";
import Header from "./Component/Header";
import Footer from "./Component/Footer";
import Dashboard from "./Component/Dashboard";
import Job from "./Component/Jobs";
import Candidates from "./Component/Candidates";
import Employes from "./Component/Employes";
import Packages from "./Component/Packages";
import Offer from "./Component/Offers";
import EmpProfile from "./Component/EmpProfile";
import Contact from "./Component/Contact";
import Users from "./Component/Users";
import Interview from "./Component/Interview";
import Applicant from "./Component/Applicant";
import Login from "./Component/Login";
import Registar from "./Component/Registar";
import Verify from "./Component/Verify";
import ResetPassword from "./Component/ResetPassword";
// import InterManage from "./Component/InterManage";

/* ================= EMPLOYER ================= */
import Header3 from "./Component3/Header";
import Footer3 from "./Component3/Footer";
import Employer from "./Component3/Employer";
import Eprivacypolicies from "./Component3/Privacypolicies";
import Etermscondition from "./Component3/Termscondition";
import Ereturnpolicy from "./Component3/Returnpolicy";
import PaymentPage from "./Component/Payment";
import PaymentSuccess from "./Component/PaymentSuccess";
import Staff from "./Component/Staff";

/* ================= USER LAYOUT ================= */
const UserLayout = () => (
  <div className="home-page-wrapper">
    <Header2 />
    <Outlet />
    <Footer2 />
  </div>
);

/* ================= ADMIN LAYOUT ================= */
const AdminLayout = () => (
  <div className="wrapper">
    <Sidebar />
    <div className="main-panel">
      <Header />
      <div className="container">
        <div className="page-inner">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  </div>
);

/* ================= EMPLOYER LAYOUT ================= */
const EmployerLayout = () => (
  <>
    <Header3 />
    <Outlet />
    <Footer3 />
  </>
);

/* ================= MAIN APP ================= */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ---------- AUTH ---------- */}
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/receipt" element={<Receipt />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* ---------- USER ---------- */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="companies" element={<Company />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="job/:slug" element={<JobDetail />} />
          <Route path="apply/:job_id" element={<Apply />} />
          <Route path="profile/*" element={<Profile />} />
          <Route path="notification" element={<Notification />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="about" element={<About />} />
          <Route path="help" element={<Help />} />

          <Route path="candidate-return-policy" element={<Creturnpolicy />} />
          <Route
            path="candidate-privacy-policies"
            element={<Cprivacypolicies />}
          />
          <Route
            path="candidate-terms-condition"
            element={<Ctermscondition />}
          />
        </Route>

        {/* ---------- EMPLOYER ---------- */}
        <Route element={<EmployerLayout />}>
          <Route path="employer" element={<Employer />} />
          <Route path="employer-return-policy" element={<Ereturnpolicy />} />
          <Route
            path="employer-privacy-policies"
            element={<Eprivacypolicies />}
          />
          <Route
            path="employer-terms-condition"
            element={<Etermscondition />}
          />
        </Route>

        {/* ---------- ADMIN ---------- */}
        <Route path="/admin" element={<Login />} />
        <Route path="/registar" element={<Registar />} />
        <Route path="/verify" element={<Verify />} />

        <Route element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="job" element={<Job />} />
          <Route path="candidate" element={<Candidates />} />
          <Route path="interview" element={<Interview />} />
          {/* <Route path="intermanage" element={<InterManage />} /> */}
          <Route path="employe" element={<Employes />} />
          <Route path="applicant" element={<Applicant />} />
          <Route path="emp-profile" element={<EmpProfile />} />
          <Route path="package" element={<Packages />} />
          <Route path="offer" element={<Offer />} />
          <Route path="contact" element={<Contact />} />
          <Route path="user" element={<Users />} />
          <Route path="staff" element={<Staff />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
