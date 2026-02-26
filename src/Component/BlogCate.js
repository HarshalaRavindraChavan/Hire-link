import React, { useState, useEffect } from "react";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";


function BlogCate() {
  const [blogcate, setBlogcate] = useState([]);
 
  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${BASE_URL}admin/getdata/tbl_blog_cate`);

      // ✅ backend response structure handle
      setBlogs(res.data?.data || []);
    } catch (err) {
      console.error("Fetch blog Cate failed", err);
      setBlogcate([]); // safety
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  
  const blogSchema = yup.object({
    bc_name: yup.string().required("Title required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(blogSchema),
  });

  
  const onSubmit = async (data) => {
    try {
      await axios.post(`${BASE_URL}admin/insert/tbl_blog_cate`, data);
      toast.success("Blog Category added successfully 🎉");
      reset();
      document.querySelector(".btn-close")?.click();
      fetchBlogs();
    } catch {
      toast.error("Something went wrong ❌");
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
          + Add Cate
        </button>
      </div>

      {/* TABLE */}
      <table className="table table-bordered text-center">
        <thead>
          <tr>
            <th>#</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {records.length ? (
            records.map((blog, i) => (
              <tr key={blog.blog_id}>
                <td>{firstIndex + i + 1}</td>
                <td className="text-center"> {blog.bc_name}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No blogs found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* MODAL */}
      <div className="modal fade" id="exampleModal">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header bg-success text-white">
              <h5 className="modal-title">Add Categories</h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-12 mb-3">
                    <label>Blog Category</label>
                    <input
                      className="form-control "
                      placeholder="Category"
                      {...register("bc_name")}
                    />
                    <small className="text-danger">
                      {errors.bc_name?.message}
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
                <button className="btn btn-success ms-auto" type="submit">
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

export default BlogCate;
