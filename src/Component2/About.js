import React from "react";
import SEO from "../SEO";
import { seoConfig } from "../config/seoConfig";
import image from "../Component2/Image/aboutus.png";
import "./css/About.css";

const aboutCards = [
  {
    title: "🚀 Our Mission",
    text: "Our mission is to streamline pharma recruitment by providing a reliable, fast, and secure jobportal where employers find qualified candidates and job seekers access genuine pharmajob opportunities without hassle",
  },
  {
    title: "🎯 Our Vision",
    text: "We aim to become India’s most trusted pharma job portal by delivering advanced hiringtools, verified job listings, and a transparent recruitment ecosystem for both employers and candidates.",
  },
  {
    title: "🤝 Our Values ",
    list: [
      "Transparency in recruitment",
      " Data privacy and security",
      "Equal job opportunities",
      "Professional integrity",
      "Industry-focused innovation",
    ],
  },
  {
    title: "⚡ Fast Hiring",
    text: "Our system is optimized for quick recruitment. Employers can post pharma jobs instantly and search candidate databases efficiently, reducing hiring time and improving productivity",
  },
  {
    title: "🔒 Secure Platform",
    text: "We maintain strict data protection measures, encrypted logins, and secure payment processing to ensure employer and candidate information remains safe at all times.",
  },
  {
    title: "🌍 Career Growth",
    text: "PharmaJobshireLink supports career advancement by providing access to verified pharma job openings, industry insights, and opportunities across multiple pharmaceutical sectors",
  },
];

const About = () => {
  return (
    <>
      <SEO
        title={seoConfig.about.title}
        description={seoConfig.about.description}
      />

      <div className="about-page">
        {/* HERO */}
        <div className="about-hero">
          <h1>About Hirelink</h1>
          <p>
            A smart recruitment platform connecting employers with the right
            candidates — faster and simpler.
          </p>
        </div>

        <div className="about-container">
          {/* IMAGE + CONTENT */}
          <div className="about-flex-wrapper">
            <img
              src={image}
              alt="Recruitment Platform"
              className="about-image-box"
            />

            <div className="about-content-box">
              <h2>Who We Are</h2>
              <p>
                PharmaJobshireLink is a dedicated <b>pharma job portal</b> built
                to connect pharmaceutical companies, healthcare organizations,
                and life-science recruiters with skilled professionals seeking
                pharma jobs. Our platform is designed to simplify hiring and job
                searching by offering a focused recruitment environment
                specifically for the pharmaceutical industry.
              </p>

              {/* CARDS */}
              <div className="about-cards-box">
                {aboutCards.map((item, index) => (
                  <div className="about-card" key={index}>
                    <h3>{item.title}</h3>

                    {item.text && <p>{item.text}</p>}

                    {item.list && (
                      <ul>
                        {item.list.map((li, i) => (
                          <li key={i}>{li}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* EMPLOYER / CANDIDATE */}
          <div className="about-role-grid">
            <div className="about-role-card">
              <h2>👔 For Employers</h2>
              <ul>
                <li>Post pharma jobs quickly</li>
                <li>Access targeted candidate profiles</li>
                <li>Download resumes by category</li>
                <li>Manage recruiter accounts</li>
                <li>Simplified hiring workflow</li>
              </ul>
              Our pharma job portal helps companies find the right talent faster
              and more accurately.
            </div>

            <div className="about-role-card">
              <h2>🧑‍💼 For Candidates</h2>
              <ul>
                <li>Search verified pharma jobs</li>
                <li>Apply instantly</li>
                <li>Create professional profiles</li>
                <li>Get discovered by recruiters</li>
                <li>Explore career opportunities nationwide</li>
              </ul>
              We make job searching simple, reliable, and industry-focused.
            </div>
          </div>

          {/* WHY CHOOSE */}
          <div className="about-why">
            <h2>Why Choose Hirelinkinfo.com?</h2>
            <p>
              ✔ Industry-specific pharma job portal
              <br />
              ✔ Verified employer listings
              <br />
              ✔ Affordable recruitment tools
              <br />✔ User-friendly website + mobile apps
              <br />
              ✔ Designed for Android & iOS compliance
              <br />✔ Optimized for speed and performance
              <br></br>
              <br></br>Hirelinkinfo provides a trusted environment where pharma
              employers meet qualified professionals efficiently.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
