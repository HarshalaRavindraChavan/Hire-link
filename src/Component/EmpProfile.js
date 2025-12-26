import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const EmpProfile = () => {
  const [showNewPwd, setShowNewPwd] = useState(false);
  const [showCurrentPwd, setShowCurrentPwd] = useState(false);

  const employer = JSON.parse(localStorage.getItem("employer"));
  const auth = JSON.parse(localStorage.getItem("auth"));

  const formik = useFormik({
    initialValues: {
      fullname: employer?.emp_name || "",
      email: employer?.emp_email || "",
      mobile: employer?.emp_mobile || "",
      newPassword: "",
      confirmPassword: "",
    },
    enableReinitialize: true,

    validationSchema: Yup.object({
      fullname: Yup.string().required("Full name is required"),
      mobile: Yup.string()
        .trim()
        .required("Mobile number is required")
        .matches(/^[6-9][0-9]{9}$/, "Enter a valid 10-digit mobile number"),
      newPassword: Yup.string().min(6, "Minimum 6 characters"),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("newPassword")],
        "Passwords must match"
      ),
    }),

    onSubmit: async (values) => {
      try {
        const payload = {
          emp_name: values.fullname,
          emp_email: values.email,
          emp_mobile: values.mobile,
        };

        // 🔐 Password दिला असेल तरच पाठव
        if (values.newPassword) {
          payload.emp_password = values.newPassword;
        }

        const res = await axios.post(
          `https://norealtor.in/hirelink_apis/employer/updatedata/tbl_employer/emp_id/${auth.emp_id}`,
          payload
        );

        if (res.data.status === true) {
          toast.success("Profile updated successfully");

          // ✅ STEP 6: localStorage update
          localStorage.setItem("employer", JSON.stringify(res.data.data));

          // ✅ STEP 7: form inputs instantly update
          formik.setValues({
            fullname: res.data.data.emp_name,
            email: res.data.data.emp_email,
            mobile: res.data.data.emp_mobile,
            newPassword: "",
            confirmPassword: "",
          });
        } else {
          toast.error(res.data.message || "Update failed");
        }
      } catch (error) {
        toast.error("Server error");
      }
    },
  });

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        pauseOnHover
        theme="colored"
      />
      <div className="container-fluid py-4">
        <div className="container">
          {/* Page Title */}
          <div className="mb-4">
            <h5 className="fw-bold">My Profile</h5>
          </div>

          {/* Card */}
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <form onSubmit={formik.handleSubmit}>
                <div className="row g-3">
                  {/* Full Name */}
                  <div className="col-md-6 col-12">
                    <label className="form-label fw-semibold">Full Name</label>
                    <input
                      type="text"
                      name="fullname"
                      className={`form-control ${
                        formik.touched.fullname && formik.errors.fullname
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder="Enter your name"
                      {...formik.getFieldProps("fullname")}
                    />
                    <div className="invalid-feedback">
                      {formik.errors.fullname}
                    </div>
                  </div>

                  {/* Email */}
                  <div className="col-md-6 col-12">
                    <label className="form-label fw-semibold">Email</label>
                    <input
                      type="email"
                      name="email"
                      readOnly
                      className={`form-control ${
                        formik.touched.email && formik.errors.email
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder="Enter your email"
                      {...formik.getFieldProps("email")}
                    />
                    <div className="invalid-feedback">
                      {formik.errors.email}
                    </div>
                  </div>

                  {/* Mobile */}
                  <div className="col-md-6 col-12">
                    <label className="form-label fw-semibold">Mobile</label>
                    <input
                      type="text"
                      name="mobile"
                      className={`form-control ${
                        formik.touched.mobile && formik.errors.mobile
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder="Enter mobile number"
                      {...formik.getFieldProps("mobile")}
                    />
                    <div className="invalid-feedback">
                      {formik.errors.mobile}
                    </div>
                  </div>

                  {/* New Password */}
                  <div className="col-md-6 col-12">
                    <label className="form-label fw-semibold">
                      New Password
                    </label>
                    <div className="input-group">
                      <input
                        type={showNewPwd ? "text" : "password"}
                        name="newPassword"
                        className={`form-control ${
                          formik.touched.newPassword &&
                          formik.errors.newPassword
                            ? "is-invalid"
                            : ""
                        }`}
                        placeholder="Enter new password"
                        {...formik.getFieldProps("newPassword")}
                      />
                      <span
                        className="input-group-text cursor-pointer"
                        onClick={() => setShowNewPwd(!showNewPwd)}
                      >
                        {showNewPwd ? <FaEyeSlash /> : <FaEye />}
                      </span>
                      <div className="invalid-feedback">
                        {formik.errors.newPassword}
                      </div>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="col-md-6 col-12">
                    <label className="form-label fw-semibold">
                      Confirm Password
                    </label>
                    <div className="input-group">
                      <input
                        type={showCurrentPwd ? "text" : "password"}
                        name="confirmPassword"
                        className={`form-control ${
                          formik.touched.confirmPassword &&
                          formik.errors.confirmPassword
                            ? "is-invalid"
                            : ""
                        }`}
                        placeholder="Enter confirm password"
                        {...formik.getFieldProps("confirmPassword")}
                      />
                      <span
                        className="input-group-text cursor-pointer"
                        onClick={() => setShowCurrentPwd(!showCurrentPwd)}
                      >
                        {showCurrentPwd ? <FaEyeSlash /> : <FaEye />}
                      </span>
                      <div className="invalid-feedback">
                        {formik.errors.confirmPassword}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <div className="text-center mt-4">
                  <button type="submit" className="btn btn-success px-5">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmpProfile;
