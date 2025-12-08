import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./Component/Sidebar";
import Header from "./Component/Header";
import Footer from "./Component/Footer";
import Dashboard from "./Component/Dashboard";
import Jobs from "./Component/Jobs";
import Condidates from "./Component/Candidates";
import Employes from "./Component/Employes";
import Packages from "./Component/Packages";
import Offer from "./Component/Offers";
import Contact from "./Component/Contact";
import Users from "./Component/Users";
import Login from "./Component/Login";
import Signup from "./Component/Signup";
import Verify from "./Component/Verify";
import Interview from "./Component/Interview";

// Layout Component for all inner pages
const Layout = () => {
  return (
    <div className="wrapper">
      <Sidebar />
      <div className="main-panel">
        <Header />
        <div className="container">
          <div className="page-inner">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/condidate" element={<Condidates />} />
              <Route path="/interview" element={< Interview/>}/>
              <Route path="/employe" element={<Employes />} />
              <Route path="/package" element={<Packages />} />
              <Route path="/offer" element={<Offer />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/user" element={<Users />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login page without layout */}
        <Route path="/" element={<Login />} />

        {/* Signup page without layout */}
        <Route path="/signup" element={<Signup />} />

        {/* Verify page without layout */}
        <Route path="/verify" element={<Verify />} />

        {/* Layout pages */}
        <Route path="/*" element={<Layout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
