import React, { useEffect, useState } from "react";
import "../Component2/css/Blog.css";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../config/constants";
import logo from "../Component/logo/hirelink.png";

export default function Blog() {
  const navigate = useNavigate();

  const [latestBlogs, setLatestBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [blogsByCategory, setBlogsByCategory] = useState({});

  useEffect(() => {
    getLatestBlogs();
    getCategories();
  }, []);

  // Latest Blogs
  const getLatestBlogs = async () => {
    try {
      const res = await axios.get(`${BASE_URL}admin/getdata/tbl_blogs`);

      if (res.data.status) {
        const latest = res.data.data
          .filter((blog) => blog.blog_status === "1" || !blog.blog_status)
          .sort(
            (a, b) => new Date(b.blog_created_at) - new Date(a.blog_created_at),
          )
          .slice(0, 4);

        setLatestBlogs(latest);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Categories
  const getCategories = async () => {
    try {
      const res = await axios.get(`${BASE_URL}admin/getdata/tbl_blog_cate`);

      if (res.data.status) {
        const cats = res.data.data;
        setCategories(cats);

        cats.forEach((cat) => {
          getBlogsByCategory(cat.bc_id);
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Blogs by Category
  const getBlogsByCategory = async (categoryId) => {
    try {
      const res = await axios.get(
        `${BASE_URL}admin/getdatawhere/tbl_blogs/blog_category/${categoryId}`,
      );

      if (res.data.status) {
        const filtered = res.data.data.filter(
          (blog) => blog.blog_status === "1" || !blog.blog_status,
        );

        setBlogsByCategory((prev) => ({
          ...prev,
          [categoryId]: filtered.slice(0, 4),
        }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {/* HEADER */}
      <header className="hlb-header">
        <div className="hlb-header-inner">
          <h1 className="hlb-logo-text">HireLink Blog</h1>
          <p className="hlb-tagline">
            Career Growth • Hiring Tips • Industry Insights
          </p>
        </div>
      </header>

      {/* LATEST BLOGS */}
      <section className="hl-blog-wrapper">
        <div className="hl-container">
          <h3 className="hl-section-title">Latest Blogs</h3>

          <div className="hl-blog-grid">
            {latestBlogs.map((blog) => (
              <NavLink to={`/blog-detail/${blog.blog_slug}`} key={blog.blog_id}>
                <div className="hl-blog-card">
                  <div className="hl-blog-img">
                    <img
                      src={`${BASE_URL}Uploads/${blog.blog_featured_image}`}
                      alt={blog.blog_title}
                    />
                  </div>

                  <div className="hl-blog-body">
                    <h4>{blog.blog_title}</h4>
                    <p>{blog.blog_short_description}</p>
                  </div>

                  <div className="hl-blog-footer">
                    <img src={logo} alt="author" />
                    <span>{blog.blog_author}</span>
                  </div>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORY BLOGS */}
      {categories.map((cat) => (
        <section key={cat.bc_id} className="hl-blog-wrapper">
          <div className="hl-container">
            <h3 className="hl-section-title">
              {cat.bc_name}
              <NavLink
                to={`/category/${cat.bc_name.toLowerCase().replace(/\s+/g, "-")}`}
              >
                View All
              </NavLink>
            </h3>

            <div className="hl-blog-grid">
              {blogsByCategory[cat.bc_id]?.map((blog) => (
                <NavLink
                  to={`/blog-detail/${blog.blog_slug}`}
                  key={blog.blog_id}
                >
                  <div className="hl-blog-card">
                    <div className="hl-blog-img">
                      <img
                        src={`${BASE_URL}Uploads/${blog.blog_featured_image}`}
                        alt={blog.blog_title}
                      />
                    </div>

                    <div className="hl-blog-body">
                      <h4>{blog.blog_title}</h4>
                      <p>{blog.blog_short_description}</p>
                    </div>

                    <div className="hl-blog-footer">
                      <img src={logo} alt="author" />
                      <span>{blog.blog_author}</span>
                    </div>
                  </div>
                </NavLink>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* FLOAT BUTTON */}
      <button className="job-float-btn" onClick={() => navigate("/")}>
        Looking for a job?
      </button>
    </>
  );
}
