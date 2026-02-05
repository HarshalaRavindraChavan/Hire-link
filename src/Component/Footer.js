function Footer() {
  return (
    <footer
      className="footer bg-white text-center"
      style={{ color: "black", fontWeight: "bold" }}
    >
      <p>
        All rights reserved © {new Date().getFullYear()} Hirelink Infotech Pvt
        Ltd | Design By{" "}
        <a
          href="https://www.esenceweb.com/"
          style={{ color: "#000" }}
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
