import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const EmpProfile = () => {
  const [showCurrentPwd, setShowCurrentPwd] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);

  const employer = JSON.parse(localStorage.getItem("employer"));
  const auth = JSON.parse(localStorage.getItem("auth"));

  const formik = useFormik({
    initialValues: {
      fullname: employer?.emp_name || "",
      email: employer?.emp_email || "",
      mobile: employer?.emp_mobile || "",

      newPassword: "",
      confirmPassword: "",

      emp_companyname: employer?.emp_companyname || "",
      emp_location: employer?.emp_location || "",
      emp_city: employer?.emp_city || "",
      emp_state: employer?.emp_state || "",

      emp_website: employer?.emp_website || "",
      emp_linkedin: employer?.emp_linkedin || "",
      emp_facebook: employer?.emp_facebook || "",
      emp_instagram: employer?.emp_instagram || "",
      emp_youtube: employer?.emp_youtube || "",

      emp_logo: "",
    },

    enableReinitialize: true,

    validationSchema: Yup.object({
      fullname: Yup.string().trim().required("Full name is required"),

      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),

      mobile: Yup.string()
        .trim()
        .required("Mobile number is required")
        .matches(/^[6-9][0-9]{9}$/, "Enter valid 10-digit mobile number"),

      newPassword: Yup.string()
        .trim()
        .min(6, "Minimum 6 characters")
        .notRequired(),

      confirmPassword: Yup.string().when("newPassword", {
        is: (val) => val && val.length > 0,
        then: (schema) =>
          schema
            .required("Confirm password is required")
            .oneOf([Yup.ref("newPassword")], "Passwords must match"),
        otherwise: (schema) => schema.notRequired(),
      }),

      companyname: Yup.string().trim().required("Company name is required"),
      location: Yup.string().trim().required("Location is required"),
      city: Yup.string().trim().required("City is required"),
      state: Yup.string().trim().required("State is required"),

      website: Yup.string().url("Enter valid website URL").nullable(),
      linkedin: Yup.string().url("Enter valid LinkedIn URL").nullable(),
      facebook: Yup.string().url("Enter valid Facebook URL").nullable(),
      instagram: Yup.string().url("Enter valid Instagram URL").nullable(),
      youtube: Yup.string().url("Enter valid YouTube URL").nullable(),

      emp_logo: Yup.mixed().nullable(),
    }),

    onSubmit: async (values) => {
      try {
        const payload = {
          emp_name: values.fullname,
          emp_email: values.email,
          emp_mobile: values.mobile,
          emp_companyname: values.emp_companyname,
          emp_location: values.emp_location,
          emp_city: values.emp_city,
          emp_state: values.emp_state,
          emp_website: values.emp_website,
          emp_linkedin: values.emp_linkedin,
          emp_facebook: values.emp_facebook,
          emp_instagram: values.emp_instagram,
          emp_youtube: values.emp_youtube,
          emp_com_logo: values.emp_logo,
        };

        // 🔐 Send password only if entered
        if (values.newPassword && values.newPassword.trim() !== "") {
          payload.emp_password = values.newPassword;
        }

        const res = await axios.post(
          `https://norealtor.in/hirelink_apis/employer/updatedata/tbl_employer/emp_id/${auth.emp_id}`,
          payload
        );

        if (res.data.status === true) {
          toast.success("Profile updated successfully");

          // ✅ Update localStorage
          localStorage.setItem("employer", JSON.stringify(res.data.data));

          // ✅ Update ALL form fields instantly
          formik.setValues({
            fullname: res.data.data.emp_name || "",
            email: res.data.data.emp_email || "",
            mobile: res.data.data.emp_mobile || "",
            newPassword: "",
            confirmPassword: "",
            emp_companyname: res.data.data.emp_companyname || "",
            emp_location: res.data.data.emp_location || "",
            emp_city: res.data.data.emp_city || "",
            emp_state: res.data.data.emp_state || "",
            emp_website: res.data.data.emp_website || "",
            emp_linkedin: res.data.data.emp_linkedin || "",
            emp_facebook: res.data.data.emp_facebook || "",
            emp_instagram: res.data.data.emp_instagram || "",
            emp_youtube: res.data.data.emp_youtube || "",

            emp_logo: res.data.data.emp_com_logo || "",
          });
        } else {
          toast.error(res.data.message || "Update failed");
        }
      } catch (error) {
        console.error(error);
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
                  <div className="col-md-4">
                    <label className="fw-semibold">Full Name</label>
                    <input
                      type="text"
                      className={`form-control ${
                        formik.touched.fullname && formik.errors.fullname
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder="Enter full name"
                      {...formik.getFieldProps("fullname")}
                    />
                    <div className="invalid-feedback">
                      {formik.errors.fullname}
                    </div>
                  </div>

                  {/* Email */}
                  <div className="col-md-4">
                    <label className="fw-semibold">Email</label>
                    <input
                      type="email"
                      className={`form-control ${
                        formik.touched.email && formik.errors.email
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder="Enter email address"
                      {...formik.getFieldProps("email")}
                    />
                    <div className="invalid-feedback">
                      {formik.errors.email}
                    </div>
                  </div>

                  {/* Mobile */}
                  <div className="col-md-4">
                    <label className="fw-semibold">Mobile</label>
                    <input
                      type="text"
                      className={`form-control ${
                        formik.touched.mobile && formik.errors.mobile
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder="Enter 10 digit mobile number"
                      {...formik.getFieldProps("mobile")}
                    />
                    <div className="invalid-feedback">
                      {formik.errors.mobile}
                    </div>
                  </div>

                  {/* Password */}
                  <div className="col-md-4">
                    <label className="fw-semibold">Password</label>
                    <div className="input-group">
                      <input
                        type={showPwd ? "text" : "password"}
                        className={`form-control ${
                          formik.touched.password && formik.errors.password
                            ? "is-invalid"
                            : ""
                        }`}
                        placeholder="Enter password"
                        {...formik.getFieldProps("password")}
                      />
                      <span
                        className="input-group-text cursor-pointer"
                        onClick={() => setShowPwd(!showPwd)}
                      >
                        {showPwd ? <FaEyeSlash /> : <FaEye />}
                      </span>
                      <div className="invalid-feedback">
                        {formik.errors.password}
                      </div>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="col-md-4">
                    <label className="fw-semibold">Confirm Password</label>
                    <div className="input-group">
                      <input
                        type={showConfirmPwd ? "text" : "password"}
                        className={`form-control ${
                          formik.touched.confirmPassword &&
                          formik.errors.confirmPassword
                            ? "is-invalid"
                            : ""
                        }`}
                        placeholder="Re-enter password"
                        {...formik.getFieldProps("confirmPassword")}
                      />
                      <span
                        className="input-group-text cursor-pointer"
                        onClick={() => setShowConfirmPwd(!showConfirmPwd)}
                      >
                        {showConfirmPwd ? <FaEyeSlash /> : <FaEye />}
                      </span>
                      <div className="invalid-feedback">
                        {formik.errors.confirmPassword}
                      </div>
                    </div>
                  </div>

                  {/* Company Logo */}
                  <div className="col-md-4">
                    <label className="fw-semibold">Company Logo</label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={(e) =>
                        formik.setFieldValue("companyLogo", e.target.files[0])
                      }
                    />
                  </div>

                  {/* Company Name */}
                  <div className="col-md-4">
                    <label className="fw-semibold">Company Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter company name"
                      {...formik.getFieldProps("companyName")}
                    />
                  </div>

                  {/* Location */}
                  <div className="col-md-4">
                    <label className="fw-semibold">Location</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter location"
                      {...formik.getFieldProps("location")}
                    />
                  </div>

                  {/* City */}
                  <div className="col-md-4">
                    <label className="fw-semibold">City</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter city"
                      {...formik.getFieldProps("city")}
                    />
                  </div>

                  {/* State */}
                  <div className="col-md-4">
                    <label className="fw-semibold">State</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter state"
                      {...formik.getFieldProps("state")}
                    />
                  </div>

                  {/* Social Links */}
                  <div className="col-md-4">
                    <label className="fw-semibold">Website</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="https://example.com"
                      {...formik.getFieldProps("website")}
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="fw-semibold">LinkedIn</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="LinkedIn profile link"
                      {...formik.getFieldProps("linkedin")}
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="fw-semibold">Facebook</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Facebook profile link"
                      {...formik.getFieldProps("facebook")}
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="fw-semibold">Instagram</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Instagram profile link"
                      {...formik.getFieldProps("instagram")}
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="fw-semibold">YouTube</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="YouTube channel link"
                      {...formik.getFieldProps("youtube")}
                    />
                  </div>
                </div>

                {/* Submit */}
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
