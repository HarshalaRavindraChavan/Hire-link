import React from "react";
import image from "../Component2/Image/aboutus.png";
import "./css/About.css";

const About = () => {
  return (
    <div className="about-page">
      {/* HERO SECTION */}
      <div className="about-hero">
        <h1>About Hirelink</h1>
        <p>
          A smart recruitment platform connecting employers with the right
          candidates, faster and simpler.
        </p>
      </div>

      {/* MAIN CONTENT */}
      <div className="about-container">
        {/* IMAGE + TEXT + CARDS */}
        <div className="about-flex-wrapper">
          {/* IMAGE */}
          <img
            src={image}
            alt="Recruitment Platform"
            className="about-image-box"
          />

          {/* TEXT + CARDS */}
          <div className="about-content-box">
            <h2>Who We Are</h2>
            <p>
              Hirelinkinfo.com is a modern job portal designed to simplify the
              hiring process. We provide a trusted digital space where employers
              can discover talent and candidates can explore genuine career
              opportunities.
            </p>

            {/* CARDS */}
            <div className="about-cards-box">
              {[
                {
                  title: "🚀 Our Mission",
                  text: "To make recruitment simple, transparent, and accessible for everyone.",
                },
                {
                  title: "🎯 Our Vision",
                  text: "To become a trusted platform for job seekers and employers across industries.",
                },
                {
                  title: "🤝 Our Values",
                  text: "Trust, transparency, and genuine opportunities for growth.",
                },
                {
                  title: "⚡ Fast Hiring",
                  text: "We help employers reduce hiring time with smart tools and instant candidate access.",
                },
                {
                  title: "🔒 Secure Platform",
                  text: "User data and job information are protected with strong security and privacy practices.",
                },
                {
                  title: "🌍 Career Growth",
                  text: "We support candidates in finding meaningful jobs that help them grow professionally.",
                },
              ].map((item, i) => (
                <div className="about-card" key={i}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* EMPLOYER + CANDIDATE */}
        <div className="about-role-grid">
          <div className="about-role-card">
            <h2>👔 For Employers</h2>
            <p>
              Employers can register, post job openings, manage applications,
              and connect with relevant candidates efficiently through our
              platform.
            </p>
          </div>

          <div className="about-role-card">
            <h2>🧑‍💼 For Candidates</h2>
            <p>
              Candidates can create profiles, search jobs, and apply easily
              while exploring career opportunities across multiple industries.
            </p>
          </div>
        </div>

        {/* WHY CHOOSE */}
        <div className="about-why">
          <h2>Why Choose Hirelinkinfo.com?</h2>
          <p>
            ✔ Simple & user-friendly platform <br />
            ✔ Genuine job opportunities <br />
            ✔ Secure data handling <br />✔ Dedicated support for employers and
            candidates
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
