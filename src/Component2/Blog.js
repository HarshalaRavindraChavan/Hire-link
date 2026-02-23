import React from "react";
import "../Component2/css/Blog.css";
import logo from "../Component2/logo/hirelink.png";
import { useNavigate, NavLink } from "react-router-dom";

const blogs = [
  {
    id: 1,
    title: "Career Objective Or Resume Objective Samples",
    desc: "A career objective is a crucial aspect of a professional resume. Get it right with examples.",
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    author: "Hirelink Content Team",
    image: logo,
  },
  {
    id: 2,
    title: "White-Collar Hiring Opens 2026 with 3% YoY Growth",
    desc: "India’s white-collar hiring sees steady growth driven by non-IT sectors.",
    img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    author: "Hirelink Content Team",
    image: logo,
  },
  {
    id: 3,
    title: "Job Application Letter: Format, Samples & Tips (2026)",
    desc: "Here’s a detailed guide on job application letters with samples.",
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
    author: "Hirelink Content Team",
    image: logo,
  },
  {
    id: 4,
    title: "How to Write a Perfect Resume in 2026",
    desc: "Step-by-step guide to creating a modern resume recruiters love.",
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    author: "Hirelink Content Team",
    image: logo,
  },
];

export default function Blog() {
  const navigate = useNavigate();
  return (
    <>
      {/* ===== HEADER ===== */}
      <header className="hlb-header">
        <div className="hlb-header-inner">
          <h1 className="hlb-logo-text">hirelink blog</h1>
          <p className="hlb-tagline">Maximizing Your Career Potential</p>
        </div>
      </header>

      {/* ===== RECENT POSTS ===== */}
      <section className="hl-blog-wrapper">
        <div className="hl-container">
          <h3 className="hl-section-title">Recent Posts</h3>

          <div className="hl-blog-grid">
            {blogs.map((blog) => (
              <NavLink to="/blog-Detail">
                <div className="hl-blog-card" key={blog.id}>
                  <div className="hl-blog-img">
                    <img src={blog.img} alt={blog.title} />
                  </div>

                  <div className="hl-blog-body">
                    <h4 className="hl-blog-title">{blog.title}</h4>
                    <p className="hl-blog-desc">{blog.desc}</p>
                  </div>

                  <div className="hl-blog-footer">
                    <img src={blog.image} alt="author" />
                    <span className="hl-author">{blog.author}</span>
                  </div>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CATEGORY POSTS ===== */}
      <section className="hl-blog-wrapper">
        <div className="hl-container">
          <h3 className="hl-section-title">
            Category Posts (132)
            <span>View All</span>
          </h3>

          <div className="hl-blog-grid">
            {blogs.map((blog) => (
              <NavLink to="/blog-Detail">
                <div className="hl-blog-card" key={`cat-${blog.id}`}>
                  <div className="hl-blog-img">
                    <img src={blog.img} alt={blog.title} />
                  </div>

                  <div className="hl-blog-body">
                    <h4 className="hl-blog-title">{blog.title}</h4>
                    <p className="hl-blog-desc">{blog.desc}</p>
                  </div>

                  <div className="hl-blog-footer">
                    <img src={blog.image} alt="author" />
                    <span className="hl-author">{blog.author}</span>
                  </div>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      </section>
      {/* ===== FLOATING JOB BUTTON ===== */}
      <button className="job-float-btn" onClick={() => navigate("/")}>
        Looking for a job?
      </button>
    </>
  );
}
