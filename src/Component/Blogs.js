import React, { useState, useEffect } from "react";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ConfirmDelete from "./commenuse/ConfirmDelete";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import Pagination from "./commenuse/Pagination";
import { BASE_URL } from "../config/constants";
import SEO from "../SEO";
import { seoConfig } from "../config/seoConfig";
import RichTextEditor from "../Component/commenuse/RichTextEditor";
import BlogCate from "../Component/BlogCate";

function Blogs() {
  const [activeTab, setActiveTab] = useState("categories");
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${BASE_URL}admin/getdata/tbl_blog_cate`);
      setCategories(res.data?.data || []);
    } catch {
      setCategories([]);
    }
  };

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${BASE_URL}admin/getdata/tbl_blogs`);
      setBlogs(res.data?.data || []);
    } catch {
      setBlogs([]);
    }
  };

  useEffect(() => {
    fetchBlogs();
    fetchCategories();
  }, []);

  // Delete modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Open Confirm Delete Modal
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}admin/deletedata/tbl_blogs/blog_id/${deleteId}`,
      );

      if (res.data.status === true) {
        setShowDeleteModal(false);
        setDeleteId(null);

        fetchBlogs();
      } else {
        toast.error("Failed to delete Categories");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Something went wrong while deleting");
    }
  };

  const recordsPerPage = 100;
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

  // ADD FORM
  const {
    register: addRegister,
    handleSubmit: addHandleSubmit,
    setValue: addSetValue,
    watch: addWatch,
    reset: addReset,
    formState: { errors: addErrors },
  } = useForm({
    resolver: yupResolver(blogSchema),
  });

  // EDIT FORM
  const {
    register: editRegister,
    handleSubmit: editHandleSubmit,
    setValue: editSetValue,
    watch: editWatch,
    reset: editReset,
    formState: { errors: editErrors },
  } = useForm({
    resolver: yupResolver(blogSchema),
  });

  // 🔥 WATCH TITLES
  const addTitle = addWatch("blog_title");
  const editTitle = editWatch("blog_title");

  // 🔹 Auto slug for ADD
  useEffect(() => {
    if (addTitle) {
      addSetValue("blog_slug", generateSlug(addTitle));
    }
  }, [addTitle]);

  // 🔹 Auto slug for EDIT
  useEffect(() => {
    if (editTitle) {
      editSetValue("blog_slug", generateSlug(editTitle));
    }
  }, [editTitle]);

  // IMAGE UPLOAD
  const uploadImage = async (e, setFormValue) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Only JPG / PNG allowed");
      e.target.value = "";
      return;
    }

    setUploading(true);
    setUploadSuccess(false);

    const formData = new FormData();
    formData.append("blog_featured_image", file);

    try {
      const res = await axios.post(`${BASE_URL}admin/fileupload`, formData);

      if (res.data.status) {
        const filename = res.data.files.blog_featured_image;

        // 🔥 IMPORTANT FIX
        setFormValue("blog_featured_image", filename, {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true,
        });

        setUploadSuccess(true);
        toast.success("Image uploaded successfully ✅");
      } else {
        toast.error("Upload failed ❌");
      }
    } catch {
      toast.error("Image upload error ❌");
    } finally {
      setUploading(false);
    }
  };

  const generateSlug = (title) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  // ADD
  const onAddSubmit = async (data) => {
    data.blog_slug = generateSlug(data.blog_title);
    data.blog_author = "Admin";

    try {
      await axios.post(`${BASE_URL}admin/insert/tbl_blogs`, data);
      toast.success("Blog added successfully");
      fetchBlogs();
      addReset();
      setUploadSuccess(false);
      document.querySelector("#addBlogModal .btn-close")?.click();
    } catch {
      toast.error("Something went wrong");
    }
  };

  // EDIT
  const onEditSubmit = async (data) => {
    data.blog_slug = generateSlug(data.blog_title);

    try {
      await axios.post(
        `${BASE_URL}admin/updatedata/tbl_blogs/blog_id/${selectedBlogId}`,
        data,
      );
      toast.success("Blog updated successfully");
      fetchBlogs();
      editReset();
      document.querySelector("#editBlogModal .btn-close")?.click();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const handleEdit = (blog) => {
    setSelectedBlogId(blog.blog_id);

    editSetValue("blog_title", blog.blog_title);
    editSetValue("blog_slug", blog.blog_slug); // 🔥 ADD THIS
    editSetValue("blog_category", blog.blog_category);
    editSetValue("blog_status", blog.blog_status);
    editSetValue("blog_short_description", blog.blog_short_description);
    editSetValue("blog_content", blog.blog_content);
    editSetValue("blog_featured_image", blog.blog_featured_image);

    setUploadSuccess(true);

    const modal = new window.bootstrap.Modal(
      document.getElementById("editBlogModal"),
    );
    modal.show();
  };
  return (
    <>
      <SEO
        title={seoConfig.a_applicant.title}
        description={seoConfig.a_applicant.description}
      />
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      <div className="d-flex gap-2">
        <button
          className={`btn btn-md ${
            activeTab === "categories" ? "btn-success" : "btn-outline-success"
          }`}
          onClick={() => setActiveTab("categories")}
        >
          Categories
        </button>

        <button
          className={`btn btn-md ${
            activeTab === "blogs" ? "btn-success" : "btn-outline-success"
          }`}
          onClick={() => setActiveTab("blogs")}
        >
          Blogs
        </button>
      </div>

      {activeTab === "blogs" && (
        <>
          <div className="d-flex justify-content-between mb-3 mt-4">
            <h3 className="fw-bold">Blogs</h3>

            <button
              className="btn btn-success"
              data-bs-toggle="modal"
              data-bs-target="#addBlogModal"
              onClick={() => {
                addReset();
                setUploadSuccess(false);
                setSelectedBlogId(null);
              }}
            >
              + Add Blog
            </button>
          </div>

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
                {records && records.length > 0 ? (
                  records.map((blog, index) => (
                    <tr key={index}>
                      <td>{firstIndex + index + 1}</td>
                      <td className="text-start">
                        <b>Title:</b>
                        {/* <span
                          className="text-primary fw-bold"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleEdit(blog)}
                        >
                          {blog.blog_title}
                        </span> */}
                        <div className="dropdown d-inline ms-2">
                          <span
                            className="fw-bold text-primary"
                            role="button"
                            data-bs-toggle="dropdown"
                          >
                            {blog.blog_title}
                          </span>

                          <ul className="dropdown-menu shadow">
                            <li>
                              <button
                                className="dropdown-item"
                                onClick={() => handleEdit(blog)}
                              >
                                <i className="fas fa-edit me-2"></i> Edit
                              </button>
                            </li>

                            <li>
                              <button
                                className="dropdown-item text-danger"
                                onClick={() => handleDeleteClick(blog.blog_id)}
                              >
                                <i className="fas fa-trash me-2"></i>Delete
                              </button>
                            </li>
                          </ul>
                        </div>
                        <br></br>
                        <b>Category:</b>
                        {blog.bc_name}
                        <br></br>
                        <b>Views:</b>
                        {blog.blog_views}
                      </td>
                      <td className="text-center">
                        {blog.blog_featured_image ? (
                          <img
                            style={{ width: "100px" }}
                            src={`${BASE_URL}Uploads/${blog.blog_featured_image}`}
                            alt="blog"
                          />
                        ) : (
                          "No Image"
                        )}
                      </td>
                      <td>{blog.blog_status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center fw-bold">
                      No Blogs Found
                    </td>
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

          <ConfirmDelete
            show={showDeleteModal}
            onConfirm={confirmDelete}
            onCancel={() => setShowDeleteModal(false)}
          />
        </>
      )}

      {activeTab === "categories" && <BlogCate />}

      {/* ================= ADD MODAL ================= */}
      <div className="modal fade" id="addBlogModal">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content rounded-4">
            <div className="modal-header bg-success text-white">
              <h5 className="modal-title fw-bold">Add Blog</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <form onSubmit={addHandleSubmit(onAddSubmit)}>
              <div className="modal-body">
                <BlogFormUI
                  register={addRegister}
                  errors={addErrors}
                  uploadImage={(e) => uploadImage(e, addSetValue)}
                  uploading={uploading}
                  uploadSuccess={uploadSuccess}
                  watch={addWatch}
                  setValue={addSetValue}
                  categories={categories}
                />
              </div>
              <div className="modal-footer bg-light">
                <button
                  className="btn btn-outline-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-success ms-auto">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* ================= EDIT MODAL ================= */}
      <div className="modal fade" id="editBlogModal">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content rounded-4">
            <div className="modal-header bg-success text-dark">
              <h5 className="modal-title fw-bold">Edit Blog</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <form onSubmit={editHandleSubmit(onEditSubmit)}>
              <div className="modal-body">
                <BlogFormUI
                  register={editRegister}
                  errors={editErrors}
                  uploadImage={(e) => uploadImage(e, editSetValue)}
                  uploading={uploading}
                  uploadSuccess={uploadSuccess}
                  watch={editWatch}
                  setValue={editSetValue}
                  categories={categories}
                />
              </div>
              <div className="modal-footer bg-light">
                <button
                  className="btn btn-outline-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-success ms-auto">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

function BlogFormUI({
  register,
  errors,
  uploadImage,
  uploading,
  uploadSuccess,
  watch,
  setValue,
  categories,
}) {
  return (
    <div className="row">
      <div className="col-md-6 mb-3">
        <label>Blog Title</label>
        {/* 🔥 ADD THIS */}
        <input type="hidden" {...register("blog_slug")} />
        <input
          className="form-control"
          placeholder="Blog Title"
          {...register("blog_title")}
        />
        <small className="text-danger">{errors.blog_title?.message}</small>
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

          {/* 🔄 Loader */}
          {uploading && (
            <span className="position-absolute top-50 end-0 translate-middle-y me-3">
              <span className="spinner-border spinner-border-sm text-primary"></span>
            </span>
          )}

          {/* ✔ Success */}
          {uploadSuccess && !uploading && (
            <span className="position-absolute top-50 end-0 translate-middle-y me-3 text-success fw-bold">
              ✔
            </span>
          )}
        </div>

        {/* 🔥 Hidden RHF field */}
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

          {categories.map((cat) => (
            <option key={cat.bc_id} value={cat.bc_id}>
              {cat.bc_name}
            </option>
          ))}
        </select>
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
      </div>

      <div className="mb-3">
        <label>Short Description</label>
        <textarea
          className="form-control"
          placeholder="Short Description"
          rows="4"
          {...register("blog_short_description")}
        />
      </div>

      <div className="mb-3">
        <label>Blog Content</label>
        <RichTextEditor
          value={watch("blog_content")}
          onChange={(html) =>
            setValue("blog_content", html, { shouldValidate: true })
          }
        />
      </div>
    </div>
  );
}

export default Blogs;
