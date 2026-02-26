import React, { useState, useEffect } from "react";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import Pagination from "./commenuse/Pagination";
import { BASE_URL } from "../config/constants";
import RichTextEditor from "../Component/commenuse/RichTextEditor";

function Blogs() {
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // const [blogs, setBlogs] = useState([
  //   {
  //     blog_id: 1,
  //     blog_title: "How to Get Pharma Job",
  //     blog_category: "Career",
  //     blog_status: "published",
  //     image: { img },
  //   },
  //   {
  //     blog_id: 2,
  //     blog_title: "AI in Healthcare",
  //     blog_category: "Technology",
  //     blog_status: "draft",
  //     image: { img },
  //   },
  //   {
  //     blog_id: 3,
  //     blog_title: "Resume Tips for Freshers",
  //     blog_category: "Career",
  //     blog_status: "published",
  //     image: { img },
  //   },
  //   {
  //     blog_id: 4,
  //     blog_title: "Future of Automation",
  //     blog_category: "Technology",
  //     blog_status: "draft",
  //     image: { img },
  //   },
  //   {
  //     blog_id: 5,
  //     blog_title: "Interview Preparation Guide",
  //     blog_category: "Career",
  //     blog_status: "published",
  //     image: { img },
  //   },
  //   {
  //     blog_id: 6,
  //     blog_title: "Cloud Computing Basics",
  //     blog_category: "Technology",
  //     blog_status: "published",
  //     image: { img },
  //   },
  // ]);

  /* 🔹 Fetch blogs */
  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${BASE_URL}admin/getdata/tbl_blogs`);

      // ✅ backend response structure handle
      setBlogs(res.data?.data || []);
    } catch (err) {
      console.error("Fetch blogs failed", err);
      setBlogs([]); // safety
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = blogs.slice(firstIndex, lastIndex);
  const nPages = Math.ceil(blogs.length / recordsPerPage);

  /* 🔹 Validation */
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
    defaultValues: {
      blog_featured_image: "",
      blog_content: "",
    },
  });

  /* 🔹 Slug generator */
  const generateSlug = (title) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  /* 🔹 Submit */
  const onSubmit = async (data) => {
    console.log("FINAL DATA", data);
    data.blog_slug = generateSlug(data.blog_title);
    data.blog_author = "Admin";

    try {
      await axios.post(`${BASE_URL}admin/insert/tbl_blogs`, data);
      toast.success("Blog added successfully 🎉");
      reset();
      document.querySelector(".btn-close")?.click();
      fetchBlogs();
    } catch {
      toast.error("Something went wrong ❌");
    }
  };

  /* 🔹 Image upload */
  const uploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // optional validation (same as user)
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Only JPG / PNG allowed");
      e.target.value = "";
      return;
    }

    setUploading(true);
    setUploadSuccess(false);

    const formData = new FormData();
    formData.append("blog_featured_image", file); // 👈 backend key

    try {
      const res = await axios.post(`${BASE_URL}admin/fileupload`, formData);

      if (res.data.status) {
        const filename = res.data.files.blog_featured_image;

        // 🔥 React Hook Form value set
        setValue("blog_featured_image", filename, {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true,
        });

        setUploadSuccess(true); // ✔ green tick
        toast.success("Image uploaded successfully ✅");
      } else {
        toast.error("Upload failed ❌");
      }
    } catch (err) {
      toast.error("Image upload error ❌");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <ToastContainer />

      <div className="d-flex justify-content-between mb-3">
        <h3>Blogs</h3>
        <button
          className="btn btn-success"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          + Add Blog
        </button>
      </div>

      {/* TABLE */}
      <table className="table table-bordered text-center">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Category</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {records.length ? (
            records.map((blog, i) => (
              <tr key={blog.blog_id}>
                <td>{firstIndex + i + 1}</td>
                <td className="text-start">
                  <b>Title:</b> {blog.blog_title}
                  <br></br>
                  <b>Category</b> {blog.blog_category}
                  <br></br>
                  <b>Views:</b>
                  {blog.blog_views}
                </td>
                <td className="text-center">
                  <img
                    style={{ width: "100px" }}
                    src={`${BASE_URL}Uploads/${blog.blog_featured_image}`}
                  ></img>
                </td>
                <td className="text-center"> {blog.blog_status}</td>
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

      {/* MODAL */}
      <div className="modal fade" id="exampleModal">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header bg-success text-white">
              <h5 className="modal-title">Add Blogs</h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label>Blog Title</label>
                    <input
                      className="form-control "
                      placeholder="Title"
                      {...register("blog_title")}
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
                      className="form-control "
                      {...register("blog_category")}
                    >
                      <option value="">Select Category</option>
                      <option value="Career">Career</option>
                      <option value="Technology">Technology</option>
                    </select>

                    <small className="text-danger">
                      {errors.blog_category?.message}
                    </small>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Status</label>
                    <select
                      className="form-control "
                      {...register("blog_status")}
                    >
                      <option value="">Select Status</option>
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                    </select>

                    <small className="text-danger">
                      {errors.blog_status?.message}
                    </small>
                  </div>

                  <div className="col-md-12 mb-3">
                    <label>Short Description</label>
                    <textarea
                      className="form-control"
                      placeholder="Short Description"
                      {...register("blog_short_description")}
                      rows={4}
                    />
                    <small className="text-danger">
                      {errors.blog_short_description?.message}
                    </small>
                  </div>

                  <div className="col-md-12 mb-3">
                    <RichTextEditor
                      value={watch("blog_content")}
                      onChange={(v) =>
                        setValue("blog_content", v, {
                          shouldValidate: true,
                          shouldDirty: true,
                          shouldTouch: true,
                        })
                      }
                    />
                    <small className="text-danger">
                      {errors.blog_content?.message}
                    </small>
                  </div>
                </div>
              </div>

              <div className="modal-footer bg-light d-flex">
                <button
                  className="btn btn-outline-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  className="btn btn-success ms-auto"
                  type="submit"
                  disabled={uploading}
                >
                  Save
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
