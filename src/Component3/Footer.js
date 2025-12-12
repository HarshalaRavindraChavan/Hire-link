import React from "react";
import "../Component3/css/Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer pt-5 pb-2">
      <div className="container">
        <div className="row footer-row align-items-start mb-3">
          {/* Left Help Section */}
          <div className="col-lg-5 col-md-5 col-sm-12 left-help">
            <h3 className="fw-bold text-white">We're here to help</h3>
            <p className="text-light">
              Visit our Help Centre for answers to common questions or contact
              us directly.
            </p>

            <button
              className="btn  me-2 st"
              style={{ background: "green", color: "white" }}
            >
              Help Centre
            </button>
            <button
              className="btn btn-outline-primary me-2"
              style={{
                color: "white",
                borderColor: "white",
              }}
            >
              Contact Support
            </button>
          </div>

          {/* Right Side – All Links in One Combined Row */}
          <div className="col-lg-7 col-md-7 col-sm-12 d-flex justify-content-between link-section">
            {/* Column 1 */}
            <div className="footer-col">
              <h5 className="fw-bold text-white mb-3">Hirelink</h5>
              <ul className="footer-links list-unstyled">
                <li>
                  <a href="#">About us</a>
                </li>
                <li>
                  <a href="#">Press</a>
                </li>
                <li>
                  <a href="#">Security</a>
                </li>
                <li>
                  <a href="#">Terms</a>
                </li>
                <li>
                  <a href="#">Privacy & Policies</a>
                </li>
                <li>
                  <a href="#">Careers</a>
                </li>
                <li>
                  <a href="#">Sitemap</a>
                </li>
              </ul>
            </div>

            {/* Column 2 */}
            <div className="footer-col">
              <h5 className="fw-bold text-white mb-3">Employers</h5>
              <ul className="footer-links list-unstyled">
                <li>
                  <a href="#">Post a job</a>
                </li>
                <li>
                  <a href="#">Products</a>
                </li>
                <li>
                  <a href="#">Pricing</a>
                </li>
                <li>
                  <a href="#">Insights</a>
                </li>
                <li>
                  <a href="#">FAQ</a>
                </li>
              </ul>
            </div>

            {/* Column 3 */}
            <div className="col-6 col-md-4 footer-col">
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
                <li>
                  <a href="#">Events</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <hr style={{borderColor:"white"}}></hr>
      <div className="text-center py-3 small text-white fs-6">
        © {year} · Esenceweb IT | All Rights Reserved
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
