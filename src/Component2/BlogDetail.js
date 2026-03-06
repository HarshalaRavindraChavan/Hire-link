import React, { useEffect, useState } from "react";
import "../Component2/css/BlogDetail.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../config/constants";

export default function BlogDetail() {
  const navigate = useNavigate();
  const { slug } = useParams();

  const [blog, setBlog] = useState(null);

  useEffect(() => {
    getBlogDetail();
  }, [slug]);

  const getBlogDetail = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}admin/getdatawhere/tbl_blogs/blog_slug/${slug}`,
      );

      if (res.data.status && res.data.data.length > 0) {
        setBlog(res.data.data[0]);
      }
    } catch (err) {
      toast.error(err);
    }
  };

  if (!blog) return <p className="bd-loading">Loading...</p>;

  return (
    <>
      {/* HERO */}
      <section className="bd-hero">
        <img
          src={`${BASE_URL}Uploads/${blog.blog_featured_image}`}
          alt={blog.blog_title}
        />

        <div className="bd-hero-overlay">
          <div className="bd-hero-content">
            <span className="bd-category">{blog.blog_category}</span>

            <h1>{blog.blog_title}</h1>

            <div className="bd-meta">
              <span className="bd-author">✍ {blog.blog_author}</span>
              <span>•</span>
              <span>{blog.blog_created_at}</span>
              <span>•</span>
              <span>5 min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="bd-wrapper">
        <div className="bd-container">
          {/* SHARE BAR */}
          {/* <div className="bd-share">
            <p>Share</p>
            <button>🔗</button>
            <button>📘</button>
            <button>🐦</button>
          </div> */}

          <article className="bd-content">
            <p className="bd-intro">{blog.blog_short_description}</p>

            <div
              className="bd-description"
              dangerouslySetInnerHTML={{
                __html: blog.blog_content || "<p>No description available</p>",
              }}
            />
          </article>
        </div>
      </section>

      {/* FLOAT BUTTON */}
      <button className="job-float-btn" onClick={() => navigate("/")}>
        🚀 Explore Jobs
      </button>
    </>
  );
}
