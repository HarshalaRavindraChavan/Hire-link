import React, { useState, useEffect } from "react";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ConfirmDelete from "./commenuse/ConfirmDelete";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { BASE_URL } from "../config/constants";
import { useNavigate } from "react-router-dom";
import { parseApiResponse } from "../config/parseApiResponse";

function BlogCate() {
  const navigate = useNavigate();
  const [blogcate, setBlogcate] = useState([]);
  const [editId, setEditId] = useState(null);

  const auth = JSON.parse(localStorage.getItem("auth"));

  useEffect(() => {
    if (!auth) {
      navigate("/signin");
    }
  }, [auth, navigate]);

  // ================= FETCH =================
  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${BASE_URL}admin/getdata/tbl_blog_cate`);
      setBlogcate(res.data?.data || []);
    } catch (err) {
      toast.error("Fetch failed", err);
      setBlogcate([]);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // ================= VALIDATION =================
  const blogSchema = yup.object({
    bc_name: yup.string().required("Category name required"),
    bc_status: yup.string().required("Status required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(blogSchema),
  });

  // ================= INSERT / UPDATE =================
  const onSubmit = async (data) => {
    try {
      if (editId) {
        await axios.post(
          `${BASE_URL}admin/updatedata/tbl_blog_cate/bc_id/${editId}`,
          data,
        );
        toast.success("Category updated successfully");
      } else {
        data.bc_status = 1;

        await axios.post(`${BASE_URL}admin/insert/tbl_blog_cate`, data);
        toast.success("Category added successfully");
      }

      reset();
      setEditId(null);
      document.querySelector(".btn-close")?.click();
      fetchBlogs();
    } catch (error) {
      toast.error(error);
      toast.error("Something went wrong ❌");
    }
  };

  // ================= EDIT =================
  const handleEdit = (blog) => {
    setEditId(blog.bc_id);

    setValue("bc_name", blog.bc_name);
    setValue("bc_status", blog.bc_status); // 🔥 important

    const modal = new window.bootstrap.Modal(
      document.getElementById("exampleModal"),
    );
    modal.show();
  };

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
      const response = await axios.get(
        `${BASE_URL}admin/deletedata/tbl_blog_cate/bc_id/${deleteId}`,
      );

      const res = parseApiResponse(response);

      if (res.data.status === true) {
        setShowDeleteModal(false);
        setDeleteId(null);

        fetchBlogs();
      } else {
        toast.error("Failed to delete Categories");
      }
    } catch (error) {
      toast.error("Delete error:", error);
      toast.error("Something went wrong while deleting");
    }
  };

  return (
    <>
      <ToastContainer />

      <div className="d-flex justify-content-between mb-3 mt-4">
        <h3>Blog Categories</h3>
        <button
          className="btn btn-success"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={() => {
            reset();
            setEditId(null);
          }}
        >
          + Add Category
        </button>
      </div>

      {/* TABLE */}
      <div className="card shadow-sm p-3">
        <table className="table table-bordered text-center">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Category</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {blogcate.length > 0 ? (
              blogcate.map((blog, i) => (
                <tr key={blog.bc_id}>
                  <td>{i + 1}</td>
                  <td>{blog.bc_name}</td>
                  <td>
                    {blog.bc_status == 1 ? (
                      <span className="badge bg-success">Active</span>
                    ) : (
                      <span className="badge bg-danger">Inactive</span>
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary me-2"
                      onClick={() => handleEdit(blog)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDeleteClick(blog.bc_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No blog categories found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ConfirmDelete
        show={showDeleteModal}
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteModal(false)}
      />

      {/* MODAL */}
      <div className="modal fade" id="exampleModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-success text-white">
              <h5 className="modal-title">
                {editId ? "Update Category" : "Add Category"}
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-body">
                <div className="mb-3">
                  <label>Blog Category</label>
                  <input
                    className="form-control"
                    placeholder="Category"
                    {...register("bc_name")}
                  />
                  <small className="text-danger">
                    {errors.bc_name?.message}
                  </small>
                </div>

                {editId && (
                  <div className="mb-3">
                    <label>Status</label>
                    <select className="form-select" {...register("bc_status")}>
                      <option value="1">Active</option>
                      <option value="0">Inactive</option>
                    </select>
                  </div>
                )}
              </div>

              <div className="modal-footer bg-light d-flex">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button className="btn btn-success ms-auto" type="submit">
                  {editId ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default BlogCate;
