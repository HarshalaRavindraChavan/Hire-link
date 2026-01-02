import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const EmpProfile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const employer = JSON.parse(localStorage.getItem("employer"));
  const auth = JSON.parse(localStorage.getItem("auth"));

  // const [states, setStates] = useState([]);
  // const [cities, setCities] = useState([]);

  // useEffect(() => {
  //   fetchStates();
  // }, []);

  // const fetchStates = async () => {
  //   try {
  //     const res = await axios.get(
  //       "https://norealtor.in/hirelink_apis/admin/getdata/state"
  //     );

  //     if (res.data.status) {
  //       setStates(res.data.data);
  //     }
  //   } catch (err) {
  //     console.error("State fetch error", err);
  //   }
  // };

  // //=========all city==========

  // const fetchCities = async (stateId) => {
  //   try {
  //     const res = await axios.get(
  //       `https://norealtor.in/hirelink_apis/admin/getdatawhere/district/state_id/${stateId}`
  //     );

  //     if (res.data.status) {
  //       setCities(res.data.data);
  //     }
  //   } catch (err) {
  //     console.error("City fetch error", err);
  //   }
  // };

  const formik = useFormik({
    initialValues: {
      fullname: employer?.emp_name || "",
      email: employer?.emp_email || "",
      mobile: employer?.emp_mobile || "",

      password: "",
      confirmPassword: "",

      emp_companyname: employer?.emp_companyname || "",
      location: employer?.emp_location || "",
      // city: employer?.emp_city || "",
      // state: employer?.emp_state || "",

      website: employer?.emp_website || "",
      linkedin: employer?.emp_linkedin || "",
      facebook: employer?.emp_facebook || "",
      instagram: employer?.emp_instagram || "",
      youtube: employer?.emp_youtube || "",

      emp_com_logo: employer?.emp_com_logo || "",
    },

    enableReinitialize: true,

    validationSchema: Yup.object({
      fullname: Yup.string().required("Full name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      mobile: Yup.string()
        .matches(/^[6-9][0-9]{9}$/, "Invalid mobile number")
        .required("Mobile is required"),

      emp_companyname: Yup.string().required("Company name is required"),
      location: Yup.string().required("Location is required"),
      // city: Yup.string().required("City is required"),
      // state: Yup.string().required("State is required"),

      website: Yup.string().url("Invalid URL").nullable(),
      linkedin: Yup.string().url("Invalid URL").nullable(),
      facebook: Yup.string().url("Invalid URL").nullable(),
      instagram: Yup.string().url("Invalid URL").nullable(),
      youtube: Yup.string().url("Invalid URL").nullable(),

      emp_com_logo: Yup.string().required("Company logo required"),
    }),

    onSubmit: async (values) => {
      try {
        const payload = {
          emp_name: values.fullname,
          emp_email: values.email,
          emp_mobile: values.mobile,
          emp_companyname: values.emp_companyname,
          emp_location: values.location,
          // emp_city: values.city,
          // emp_state: values.state,
          emp_website: values.website,
          emp_linkedin: values.linkedin,
          emp_facebook: values.facebook,
          emp_instagram: values.instagram,
          emp_youtube: values.youtube,
          emp_com_logo: values.emp_com_logo,
        };

        if (values.password) {
          payload.emp_password = values.password;
        }

        const res = await axios.post(
          `https://norealtor.in/hirelink_apis/employer/updatedata/tbl_employer/emp_id/${auth.emp_id}`,
          payload
        );

        if (res.data.status) {
          toast.success("Profile updated successfully");

          // const updatedEmployer = {
          //   ...employer,
          //   emp_state: values.state,
          //   emp_city: values.city,
          // };

          // localStorage.setItem("employer", JSON.stringify(updatedEmployer));
        } else {
          toast.error("Update failed");
        }
      } catch {
        toast.error("Server error");
      }
    },
  });

  //  useEffect(() => {
  //   if (formik.values.state) {
  //     fetchCities(formik.values.state);
  //   }
  // }, []);

  const uploadFile = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append(field, file);

    try {
      const res = await axios.post(
        "https://norealtor.in/hirelink_apis/admin/fileupload",
        formData
      );

      if (res.data.status) {
        formik.setFieldValue(field, res.data.files[field]);
        toast.success("File uploaded successfully");
      } else {
        toast.error("Upload failed");
      }
    } catch {
      toast.error("Upload failed");
    }
  };

  const fieldClass = (name) =>
    `form-control ${
      formik.touched[name] && formik.errors[name] ? "is-invalid" : ""
    }`;

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      <div className="container-fluid py-4">
        <div className="container">
          <div className="mb-4 d-flex justify-content-between align-items-center">
            <div className="d-flex gap-2">
              <button
                type="button"
                className={`btn btn-sm ${
                  activeTab === "profile"
                    ? "btn-success"
                    : "btn-outline-success"
                }`}
                onClick={() => setActiveTab("profile")}
              >
                Profile
              </button>

              <button
                type="button"
                className={`btn btn-sm ${
                  activeTab === "password"
                    ? "btn-success"
                    : "btn-outline-success"
                }`}
                onClick={() => setActiveTab("password")}
              >
                Change Password
              </button>
            </div>
          </div>
          {activeTab === "profile" && (
            <div className="card shadow-sm border-0">
              <div className="card-body p-4">
                <form onSubmit={formik.handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-4">
                      <label className="fw-semibold">Full Name</label>
                      <input
                        type="text"
                        className={fieldClass("fullname")}
                        placeholder="Enter full name"
                        {...formik.getFieldProps("fullname")}
                      />
                      <div className="invalid-feedback">
                        {formik.errors.fullname}
                      </div>
                    </div>

                    <div className="col-md-4">
                      <label className="fw-semibold">Email</label>
                      <input
                        type="email"
                        className={fieldClass("email")}
                        placeholder="Enter email"
                        {...formik.getFieldProps("email")}
                      />
                      <div className="invalid-feedback">
                        {formik.errors.email}
                      </div>
                    </div>

                    <div className="col-md-4">
                      <label className="fw-semibold">Mobile</label>
                      <input
                        type="text"
                        className={fieldClass("mobile")}
                        placeholder="Enter mobile"
                        {...formik.getFieldProps("mobile")}
                      />
                      <div className="invalid-feedback">
                        {formik.errors.mobile}
                      </div>
                    </div>

                    <div className="col-md-4">
                      <label className="fw-semibold">Company Name</label>
                      <input
                        type="text"
                        className={fieldClass("emp_companyname")}
                        placeholder="Enter company name"
                        {...formik.getFieldProps("emp_companyname")}
                      />
                      <div className="invalid-feedback">
                        {formik.errors.emp_companyname}
                      </div>
                    </div>

                    <div className="col-md-4">
                      <label className="fw-semibold">
                        Company Logo
                        {formik.values.emp_com_logo && (
                          <i className="fa-solid fa-circle-check text-success ms-2"></i>
                        )}
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        onChange={(e) => uploadFile(e, "emp_com_logo")}
                      />
                      <input
                        type="hidden"
                        {...formik.getFieldProps("emp_com_logo")}
                      />
                      <div className="invalid-feedback d-block">
                        {formik.errors.emp_com_logo}
                      </div>
                    </div>

                    {/* state */}
                    {/* <div className="col-md-4">
                      <label className="fw-semibold">State</label>

                      <select
                        className={`form-select form-control ${
                          formik.touched.state && formik.errors.state
                            ? "is-invalid"
                            : ""
                        }`}
                        name="state"
                        value={formik.values.state}
                        onChange={(e) => {
                          const stateId = e.target.value;

                          formik.setFieldValue("state", stateId);
                          formik.setFieldValue("city", "");
                          fetchCities(stateId);
                        }}
                        onBlur={formik.handleBlur}
                      >
                        <option value="">Select State</option>
                        {states.map((s) => (
                          <option key={s.state_id} value={s.state_id}>
                            {s.state_title}
                          </option>
                        ))}
                      </select>
                      <div className="invalid-feedback">
                        {formik.errors.state}
                      </div>
                    </div>
                    {/* citys */}
                    {/* <div className="col-md-4">
                      <label className="fw-semibold">City</label>
                      <select
                        className={`form-select form-control ${
                          formik.touched.city && formik.errors.city
                            ? "is-invalid"
                            : ""
                        }`}
                        name="city"
                        value={formik.values.city}
                        onChange={(e) =>
                          formik.setFieldValue("city", e.target.value)
                        }
                        onBlur={formik.handleBlur}
                        disabled={!cities.length}
                      >
                        <option value="">Select City</option>
                        {cities.map((c) => (
                          <option key={c.districtid} value={c.districtid}>
                            {c.district_title}
                          </option>
                        ))}
                      </select>

                      <div className="invalid-feedback">
                        {formik.errors.city}
                      </div>
                    </div> */}

                    <div className="col-md-4">
                      <label className="fw-semibold">Location</label>
                      <input
                        type="text"
                        className={fieldClass("location")}
                        placeholder="Enter location"
                        {...formik.getFieldProps("location")}
                      />
                      <div className="invalid-feedback">
                        {formik.errors.location}
                      </div>
                    </div>

                    <div className="col-md-4">
                      <label className="fw-semibold">Website</label>
                      <input
                        type="text"
                        className={fieldClass("website")}
                        placeholder="https://example.com"
                        {...formik.getFieldProps("website")}
                      />
                      <div className="invalid-feedback">
                        {formik.errors.website}
                      </div>
                    </div>

                    <div className="col-md-4">
                      <label className="fw-semibold">linkedin</label>
                      <input
                        type="text"
                        className={fieldClass("linkedin")}
                        placeholder="https://example.com"
                        {...formik.getFieldProps("linkedin")}
                      />
                      <div className="invalid-feedback">
                        {formik.errors.linkedin}
                      </div>
                    </div>

                    <div className="col-md-4">
                      <label className="fw-semibold">instagram</label>
                      <input
                        type="text"
                        className={fieldClass("instagram")}
                        placeholder="https://example.com"
                        {...formik.getFieldProps("instagram")}
                      />
                      <div className="invalid-feedback">
                        {formik.errors.instagram}
                      </div>
                    </div>

                    <div className="col-md-4">
                      <label className="fw-semibold">facebook</label>
                      <input
                        type="text"
                        className={fieldClass("facebook")}
                        placeholder="https://example.com"
                        {...formik.getFieldProps("facebook")}
                      />
                      <div className="invalid-feedback">
                        {formik.errors.facebook}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <label className="fw-semibold">youtube</label>
                      <input
                        type="text"
                        className={fieldClass("youtube")}
                        placeholder="https://example.com"
                        {...formik.getFieldProps("youtube")}
                      />
                      <div className="invalid-feedback">
                        {formik.errors.youtube}
                      </div>
                    </div>
                  </div>

                  <div className="text-center mt-4">
                    <button type="submit" className="btn btn-success px-5">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          {activeTab === "password" && (
            <div className="card shadow-sm border-0">
              <div className="card-body p-4">
                <form>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="fw-semibold">New Password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Enter new password"
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="fw-semibold">Confirm Password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Confirm password"
                      />
                    </div>

                    <div className="text-center mt-4">
                      <button type="submit" className="btn btn-success px-5">
                        Update Password
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EmpProfile;
