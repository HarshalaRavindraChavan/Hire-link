import React, { useEffect, useState } from "react";
import "../Component2/css/Blog.css";
import { useNavigate, NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../config/constants";
import logo from "../Component/logo/hirelink.png";

export default function CateBlog() {
  const navigate = useNavigate();
  const { slug } = useParams();

  const [blogs, setBlogs] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    getCategoryName();
  }, [slug]);

  // GET BLOGS
  const getCategoryBlogs = async (categoryId) => {
    try {
      const res = await axios.get(
        `${BASE_URL}admin/getdatawhere/tbl_blogs/blog_category/${categoryId}`,
      );

      if (res.data.status) {
        const filtered = res.data.data.filter(
          (blog) => blog.blog_status === "1" || !blog.blog_status,
        );

        setBlogs(filtered);
      }
    } catch (err) {
      toast.error("Category Blog Error", err);
    }
  };

  // GET CATEGORY NAME
  const getCategoryName = async () => {
    try {
      const res = await axios.get(`${BASE_URL}admin/getdata/tbl_blog_cate`);

      if (res.data.status) {
        const cats = res.data.data;

        const category = cats.find(
          (c) => c.bc_name.toLowerCase().replace(/\s+/g, "-") === slug,
        );

        if (category) {
          setCategoryName(category.bc_name);
          getCategoryBlogs(category.bc_id); // id ने fetch
        }
      }
    } catch (err) {
      toast.error("Category Error", err);
    }
  };

  return (
    <>
      {/* HEADER */}
      <header className="hlb-header">
        <div className="hlb-header-inner">
          <h1 className="hlb-logo-text">{categoryName}</h1>
        </div>
      </header>

      {/* CATEGORY BLOGS */}
      <section className="hl-blog-wrapper">
        <div className="hl-container">
          <h3 className="hl-section-title">
            {categoryName} ({blogs.length})
          </h3>

          <div className="hl-blog-grid">
            {blogs.map((blog) => (
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

      {/* FLOAT BUTTON */}
      <button className="job-float-btn" onClick={() => navigate("/")}>
        Looking for a job?
      </button>
    </>
  );
}
