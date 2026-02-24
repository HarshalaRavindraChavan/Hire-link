import React, { useState } from "react";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import Pagination from "./commenuse/Pagination";
import { BASE_URL } from "../config/constants";
import SEO from "../SEO";
import { seoConfig } from "../config/seoConfig";
import RichTextEditor from "../Component/commenuse/RichTextEditor";

function Blogs() {
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = blogs.slice(firstIndex, lastIndex);
  const nPages = Math.ceil(blogs.length / recordsPerPage);

  const blogSchema = yup.object({
    blog_title: yup.string().required("Title required"),
    blog_short_description: yup.string().required("Short description required"),
    blog_content: yup.string().required("Content required"),
    blog_category: yup.string().required("Category required"),
    blog_status: yup.string().required("Status required"),
    blog_featured_image: yup.string().required("Image required"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(blogSchema),
  });

  const onSubmit = async (data) => {
    try {
      await axios.post(`${BASE_URL}admin/insert`, data);
      toast.success("Blog added successfully 🎉");
      reset();
      document.querySelector(".btn-close")?.click();
    } catch {
      toast.error("Something went wrong ❌");
    }
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setUploadSuccess(false);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(`${BASE_URL}/admin/fileupload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.status) {
        setValue("blog_featured_image", res.data.filename, {
          shouldValidate: true,
        });

        setUploadSuccess(true);
        toast.success("Image uploaded successfully ✅");
      }
    } catch (err) {
      toast.error("Image upload failed ❌");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <SEO
        title={seoConfig.a_applicant.title}
        description={seoConfig.a_applicant.description}
      />

      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      <div className="d-flex justify-content-between mb-3">
        <h3 className="fw-bold">Blogs</h3>
        <button
          className="btn btn-success"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          + Add Blog
        </button>
      </div>

      {/* TABLE */}
      <div className="card shadow-sm p-3">
        <table className="table table-bordered text-center">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {records.length > 0 ? (
              records.map((blog, index) => (
                <tr key={index}>
                  <td>{firstIndex + index + 1}</td>
                  <td>{blog.btitle}</td>
                  <td>{blog.category}</td>
                  <td>{blog.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No blogs found</td>
              </tr>
            )}
          </tbody>
        </table>

        <Pagination
          currentPage={currentPage}
          totalPages={nPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* ADD BLOG MODAL */}
      <div className="modal fade" id="exampleModal">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content rounded-4">
            <div className="modal-header bg-success text-white">
              <h5 className="modal-title fw-bold">Add Blog</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label>Blog Title</label>
                    <input
                      className="form-control"
                      {...register("blog_title")}
                      placeholder="Blog Title"
                    />
                    <small className="text-danger">
                      {errors.blog_title?.message}
                    </small>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Main Image</label>

                    <div className="position-relative">
                      <input
                        type="file"
                        className="form-control pe-5"
                        onChange={uploadImage}
                        disabled={uploading}
                      />

                      {/* LOADER */}
                      {uploading && (
                        <span className="position-absolute top-50 end-0 translate-middle-y me-3">
                          <span className="spinner-border spinner-border-sm text-primary"></span>
                        </span>
                      )}

                      {/* SUCCESS TICK */}
                      {uploadSuccess && !uploading && (
                        <span
                          className="position-absolute top-50 end-0 translate-middle-y me-3 text-success fw-bold"
                          style={{ fontSize: "18px" }}
                        >
                          ✔
                        </span>
                      )}
                    </div>

                    {/* Hidden RHF field */}
                    <input type="hidden" {...register("blog_featured_image")} />

                    <small className="text-danger">
                      {errors.blog_featured_image?.message}
                    </small>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Category</label>
                    <select
                      className="form-select form-control"
                      {...register("blog_category")}
                    >
                      <option value="">Select</option>
                      <option value="Career">Career</option>
                      <option value="Jobs">Jobs</option>
                      <option value="Technology">Technology</option>
                    </select>
                    <small className="text-danger">
                      {errors.blog_category?.message}
                    </small>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Status</label>
                    <select
                      className="form-select form-control"
                      {...register("blog_status")}
                    >
                      <option value="">Select</option>
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                    </select>
                    <small className="text-danger">
                      {errors.blog_status?.message}
                    </small>
                  </div>

                  <div className="mb-3">
                    <label>Short Description</label>
                    <textarea
                      className="form-control"
                      placeholder="Short Description"
                      rows="2"
                      {...register("blog_short_description")}
                    />
                    <small className="text-danger">
                      {errors.blog_short_description?.message}
                    </small>
                  </div>

                  <div className="mb-3">
                    <label>Blog Content</label>
                    <RichTextEditor
                      value={watch("blog_content")}
                      onChange={(html) =>
                        setValue("blog_content", html, { shouldValidate: true })
                      }
                    />
                    <small className="text-danger">
                      {errors.blog_content?.message}
                    </small>
                  </div>
                </div>
              </div>

              <div className="modal-footer bg-light rounded-bottom-4 d-flex">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-success px-4 ms-auto"
                  disabled={uploading}
                >
                  {uploading ? "Uploading..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Blogs;
