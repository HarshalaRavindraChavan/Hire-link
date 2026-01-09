import React from "react";
import "../Component3/css/Footer.css";
import { NavLink } from "react-router-dom";
import logo from "../Component2/logo/admin-logo.png";

export default function Footer() {
  return (
    <footer className="footer pt-5 pb-2">
      <div className="row mb-4 ">
        {/* LEFT HELP COLUMN */}
        <div className="col-lg-5 col-md-5 mb-5 left-help text-start ">
          <img src={logo} alt="Footer Logo" className="w-25 text-start"></img>
          <h3 className="fw-bold text-white text-start">We're here to help</h3>
          <p className="text-light text-start">
            Visit our Help Centre for answers to common questions or contact us
            directly.
          </p>

          <NavLink
            to="/help"
            className="btn st me-2"
            style={{ background: "green", color: "white" }}
          >
            Help Centre
          </NavLink>

          <NavLink
            to="/contacts"
            className="btn btn-outline-light me-2"
            style={{ borderColor: "white" }}
          >
            Contact Support
          </NavLink>
        </div>

        {/* RIGHT SIDE LINK COLUMNS */}
        <div className="col-lg-7 col-md-7 ">
          <div className="row align-self-center">
            {/* Column 1 */}
            <div className="col-6 col-md-4 mb-3 text-start">
              <h5 className="fw-bold text-white mb-3">Hirelink</h5>
              <ul className="footer-links list-unstyled">
                <li>
                  <NavLink to="/about">About Us</NavLink>
                </li>
                <li>
                  <NavLink to="/employer-terms-condition">
                    Terms & Condition
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/employer-return-policy">Returnpolicy</NavLink>
                </li>
                <li>
                  <NavLink to="/employer-privacy-policies">
                    Privacy & Policies
                  </NavLink>
                </li>
                {/* <li>
                  <a href="#">Careers</a>
                </li> */}
                {/* <li>
                  <a href="#">Sitemap</a>
                </li> */}
              </ul>
            </div>

            {/* Column 2 */}
            <div className="col-6 col-md-4 mb-3 text-start">
              <h5 className="fw-bold text-white mb-3">Employers</h5>
              <ul className="footer-links list-unstyled">
                <li>
                  <NavLink to="/employer">Post a job</NavLink>
                </li>
                {/* <li>
                  <a href="#">Products</a>
                </li>
                <li>
                  <a href="#">Pricing</a>
                </li>
                <li>
                  <a href="#">Insights</a>
                </li> */}
                <li>
                  <NavLink to="/help">FAQ</NavLink>
                </li>
              </ul>
            </div>

            {/* Column 3 */}
            <div className="col-6 col-md-4 mb-3 text-start">
              <h5 className="fw-bold text-white mb-3">Resources</h5>
              <ul className="footer-links list-unstyled">
                <li>
                  <a href="#">How to hire</a>
                </li>
                <li>
                  <a href="#">Job description guide</a>
                </li>
                <li>
                  <a href="#">Interview tips</a>
                </li>
                <li>
                  <a href="#">Hiring guide</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <hr style={{ borderColor: "white" }} />

      <div className="text-center py-3 text-white small">
        © {new Date().getFullYear()} · Hirelinkinfo.com | All Rights Reserved |
        Design By{" "}
        <a
          href="https://www.esenceweb.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ensenceweb IT
        </a>
        <div className="social-icons mt-2">
          <a href="#">
            <i className="bi bi-facebook"></i>
          </a>
          <a href="#">
            <i className="bi bi-linkedin"></i>
          </a>
          <a href="#">
            <i className="bi bi-youtube"></i>
          </a>
          <a href="#">
            <i className="bi bi-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}
