import { useEffect } from "react";
import "../Component2/css/Footer.css";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer mt-5">
      <div className="d-flex flex-wrap justify-content-center gap-3">
        <NavLink to="/jobs">Browse Jobs</NavLink>
        <NavLink to="/companies">Browse Companies</NavLink>
        {/* <NavLink to="/dashboard">Work at JobFinder</NavLink> */}
        {/* <NavLink to="/dashboard">Countries</NavLink> */}
        <NavLink to="/about">About</NavLink>
        <NavLink to="/help">Help</NavLink>
        <NavLink to="/candidate-terms-condition">Terms & Condition</NavLink>
        <NavLink to="/employer">Post a Job</NavLink>
        <NavLink to="/candidate-return-policy">Return Policy</NavLink>
        <NavLink to="/candidate-privacy-policies">Privacy & Policies</NavLink>
      </div>

      <p className="copy mt-5">
        © {new Date().getFullYear()} · Hirelinkinfo.com | All Rights Reserved |
        Design By{" "}
        <a
          href="https://www.esenceweb.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ensenceweb IT
        </a>
      </p>
    </footer>
  );
}

export default Footer;
