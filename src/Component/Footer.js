function Footer() {
  return (
    <footer
      className="footer bg-white text-center"
      style={{ color: "black", fontWeight: "bold" }}
    >
      <p>
        © {new Date().getFullYear()} Hirelinkinfo.com | All Rights Reserved |
        Design By <a href="https://www.esenceweb.com/"    target="_blank"
          rel="noopener noreferrer">Ensenceweb IT</a>
      </p>
    </footer>
  );
}

export default Footer;
