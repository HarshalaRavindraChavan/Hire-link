import { useEffect } from "react";
import "../Component2/css/Footer.css";

function Footer() {
  return (
    <footer className="footer mt-5">
      <div className="d-flex flex-wrap justify-content-center gap-3">
        <a href="#">Career advice</a>
        <a href="#">Browse jobs</a>
        <a href="#">Browse companies</a>
        <a href="#">Salaries</a>
        <a href="#">Work at JobFinder</a>
        <a href="#">Countries</a>
        <a href="#">About</a>
        <a href="#">Help</a>
        <a href="#">Post a job</a>
      </div>

      <p className="copy mt-5">© 2025 Esenceweb IT || All Rights Reserved</p>
    </footer>
  );
}

export default Footer;
