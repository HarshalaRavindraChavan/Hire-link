import React from "react";
import image from "../Component2/Image/aboutus.png";

const About = () => {
  return (
    <div
      style={{
        fontFamily: "Poppins, Arial, sans-serif",
        background: "#f4f7fb",
      }}
    >
      {/* HERO SECTION */}
      <div
        style={{
          background: "linear-gradient(135deg, #59bb3b, #6baf1e)",
          color: "#fff",
          padding: "30px 20px",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "42px", marginBottom: "15px" }}>
          About Hirelink
        </h1>
        <p
          style={{
            fontSize: "18px",
            maxWidth: "800px",
            margin: "auto",
            opacity: 0.95,
          }}
        >
          A smart recruitment platform connecting employers with the right
          candidates, faster and simpler.
        </p>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ maxWidth: "1200px", margin: "auto", padding: "60px 20px" }}>
        {/* IMAGE + TEXT */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "40px",
            alignItems: "center",
            marginBottom: "60px",
          }}
        >
          <img
            src={image}
            alt="Recruitment Platform"
            style={{
              width: "100%",
              maxWidth: "500px",
              borderRadius: "14px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
            }}
          />

          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: "28px", marginBottom: "15px" }}>
              Who We Are
            </h2>
            <p style={{ color: "#555", lineHeight: 1.7 }}>
              Hirelinkinfo.com is a modern job portal designed to simplify the
              hiring process. We provide a trusted digital space where employers
              can discover talent and candidates can explore genuine career
              opportunities.
            </p>

            {/* CARDS */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "25px",
                marginBottom: "60px",
              }}
            >
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
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    background: "#fff",
                    padding: "30px",
                    borderRadius: "14px",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
                  }}
                >
                  <h3 style={{ marginBottom: "10px" }}>{item.title}</h3>
                  <p style={{ color: "#555", lineHeight: 1.6 }}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* EMPLOYER + CANDIDATE */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "30px",
            marginBottom: "60px",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              padding: "35px",
              borderRadius: "14px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
            }}
          >
            <h2>👔 For Employers</h2>
            <p style={{ color: "#555", lineHeight: 1.7 }}>
              Employers can register, post job openings, manage applications,
              and connect with relevant candidates efficiently through our
              platform.
            </p>
          </div>

          <div
            style={{
              background: "#ffffff",
              padding: "35px",
              borderRadius: "14px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
            }}
          >
            <h2>🧑‍💼 For Candidates</h2>
            <p style={{ color: "#555", lineHeight: 1.7 }}>
              Candidates can create profiles, search jobs, and apply easily
              while exploring career opportunities across multiple industries.
            </p>
          </div>
        </div>

        {/* WHY CHOOSE */}
        <div
          style={{
            background: "linear-gradient(135deg, #9fa108, #036908)",
            color: "#fff",
            padding: "50px 30px",
            borderRadius: "16px",
            textAlign: "center",
          }}
        >
          <h2 style={{ marginBottom: "20px" }}>Why Choose Hirelinkinfo.com?</h2>
          <p style={{ maxWidth: "800px", margin: "auto", lineHeight: 1.8 }}>
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
