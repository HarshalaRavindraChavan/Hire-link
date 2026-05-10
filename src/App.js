import {
  BrowserRouter,
  useLocation,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { useEffect } from "react";
import PlayStoreButton from "./config/PlayStoreButton";
import HelpSupport from "./config/HelpSupport";

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
import CandidateReceiptPage from "./Component2/CandidateReceiptPage";
import BlogPage from "./Component2/Blog";
import BlogDetailPage from "./Component2/BlogDetail";
import CateBlogPage from "./Component2/CateBlog";

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
import PaymentHistory from "./Component/PaymentHistory";
import Support from "./Component/Support";
import Setting from "./Component/Setting";
import AdminBlogs from "./Component/Blogs";
import CateBlog from "./Component/BlogCate";

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
    <main className="main-content">
      <Outlet />
    </main>
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

function MainApp() {
  const location = useLocation();

  // ✅ Help Support show only here
  const showSupportOnPaths = ["/signin", "/signup", "/verify", "/payment"];

  const shouldShowSupport = showSupportOnPaths.some((path) =>
    location.pathname.startsWith(path),
  );

  // ✅ Playstore hide logic
  const hideOnPaths = [
    "/signin",
    "/signup",
    "/forgot",
    "/admin",
    "/registar",
    "/verify",
    "/payment",
    "/blogs",
    "/blog-detail",
    "/category",
    "/payment-success",
    "/reset-password",
    "/candidate-receipt",
    "/dashboard",
    "/job",
    "/candidate",
    "/interview",
    "/payment-history",
    "/employers",
    "/applicant",
    "/emp-profile",
    "/package",
    "/offer",
    "/contact",
    "/support",
    "/user",
    "/staff",
    "/setting",
    "/admin-Blogs",
    "/cate-blog",
  ];

  const shouldHide = hideOnPaths.some((path) =>
    location.pathname.startsWith(path),
  );

  useEffect(() => {
    const isAdminRoute =
      location.pathname.startsWith("/dashboard") ||
      location.pathname.startsWith("/job") ||
      location.pathname.startsWith("/candidate") ||
      location.pathname.startsWith("/interview") ||
      location.pathname.startsWith("/payment-history") ||
      location.pathname.startsWith("/employers") ||
      location.pathname.startsWith("/applicant") ||
      location.pathname.startsWith("/emp-profile") ||
      location.pathname.startsWith("/package") ||
      location.pathname.startsWith("/offer") ||
      location.pathname.startsWith("/contact") ||
      location.pathname.startsWith("/user") ||
      location.pathname.startsWith("/staff") ||
      location.pathname.startsWith("/setting") ||
      location.pathname.startsWith("/admin-Blogs") ||
      location.pathname.startsWith("/cate-blog") ||
      location.pathname.startsWith("/admin") ||
      location.pathname.startsWith("/registar") ||
      location.pathname.startsWith("/verify");

    const preventDefault = (e) => e.preventDefault();

    /* ================= USER SIDE ONLY ================= */
    if (!isAdminRoute) {
      // Right Click Disable
      document.addEventListener("contextmenu", preventDefault);

      // Copy Disable
      document.addEventListener("copy", preventDefault);

      // Cut Disable
      document.addEventListener("cut", preventDefault);

      // Paste Disable
      document.addEventListener("paste", preventDefault);

      // Text Select Disable
      document.addEventListener("selectstart", preventDefault);
    }

    if (isAdminRoute) {
      // Right Click Disable
      document.addEventListener("contextmenu", preventDefault);
    }

    /* ================= BOTH USER + ADMIN ================= */

    const handleKeyDown = (e) => {
      // F12
      if (e.key === "F12") {
        e.preventDefault();
      }

      // Ctrl + Shift + I
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "i") {
        e.preventDefault();
      }

      // Ctrl + Shift + J
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "j") {
        e.preventDefault();
      }

      // Ctrl + U
      if (e.ctrlKey && e.key.toLowerCase() === "u") {
        e.preventDefault();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", preventDefault);

      document.removeEventListener("copy", preventDefault);

      document.removeEventListener("cut", preventDefault);

      document.removeEventListener("paste", preventDefault);

      document.removeEventListener("selectstart", preventDefault);

      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [location.pathname]);

  return (
    <>
      <Routes>
        {/* ---------- AUTH ----------*/}
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/receipt" element={<Receipt />} />
        <Route path="/candidate-receipt" element={<CandidateReceiptPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/blogs" element={<BlogPage />} />
        <Route path="/blog-detail/:slug" element={<BlogDetailPage />} />
        <Route path="/category/:slug" element={<CateBlogPage />} />
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
          <Route path="payment-history" element={<PaymentHistory />} />
          <Route path="support" element={<Support />} />
          <Route path="employers" element={<Employes />} />
          <Route path="applicant" element={<Applicant />} />
          <Route path="emp-profile" element={<EmpProfile />} />
          <Route path="package" element={<Packages />} />
          <Route path="offer" element={<Offer />} />
          <Route path="contact" element={<Contact />} />
          <Route path="user" element={<Users />} />
          <Route path="staff" element={<Staff />} />
          <Route path="setting" element={<Setting />} />
          <Route path="admin-Blogs" element={<AdminBlogs />} />
          <Route path="cate-blog" element={<CateBlog />} />
        </Route>
      </Routes>

      {/* ✅ Help Support */}
      {shouldShowSupport && <HelpSupport />}

      {/* ✅ PlayStore Button */}
      {!shouldHide && <PlayStoreButton />}
    </>
  );
}

/* ================= MAIN APP ================= */
function App() {
  return (
    <BrowserRouter>
      <MainApp />
    </BrowserRouter>
  );
}

export default App;
