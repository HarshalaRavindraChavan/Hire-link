import { useFormik } from "formik";
import * as Yup from "yup";
import "../Component2/css/Contacts.css"; // ✔ YOU ASKED TO ADD THIS
import axios from "axios";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function Contact() {
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    con_name: Yup.string()
      .required("Full Name is required")
      .min(3, "Minimum 3 characters"),
    con_email: Yup.string()
      .email("Invalid email")
      .required("Email is required"),
    con_mobile: Yup.string()
      .matches(/^[0-9]{10}$/, "Enter 10 digit number")
      .required("Phone number is required"),
    con_subject: Yup.string().required("Subject is required"),
    con_message: Yup.string()
      .required("Message is required")
      .min(10, "Minimum 10 characters"),
  });

  const formik = useFormik({
    initialValues: {
      con_name: "",
      con_email: "",
      con_mobile: "",
      con_subject: "",
      con_message: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        const res = await axios.post(
          "https://norealtor.in/hirelink_apis/candidate/insert/tbl_contact",
          values
        );

        if (res.data?.status) {
          toast.success("Message Sent Successfully ✅");
          resetForm();
        } else {
          toast.error(res.data?.message || "Failed");
        }
      } catch (err) {
        toast.error("Server Error ❌");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <>
      {/* TOAST */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        pauseOnHover
        theme="colored"
      />
      <div className="contact-section">
        <div className="container py-5">
          <h2 className="contact-title text-center mb-5">
            Get in <span>Touch</span>
          </h2>

          <div className="row g-4 align-items-stretch">
            {/* LEFT — INFO CARD */}
            <div className="col-md-5">
              <div className="info-glass-card p-4">
                <h3 className="info-title mb-3">
                  <i className="fa-solid fa-briefcase me-2"></i> About Hirelink
                </h3>

                <p className="info-text">
                  Hirelink is a modern job portal designed to connect job
                  seekers and employers efficiently — just like Indeed and
                  LinkedIn. Whether you are searching for your next career
                  opportunity or hiring skilled talent, Hirelink makes the
                  entire process fast, smart, and seamless.
                </p>

                <div className="info-features mt-4">
                  <h5 className="fw-bold mb-2">
                    <i className="fa-solid fa-users-line me-2 text-primary"></i>
                    Why Job Seekers Love Hirelink
                  </h5>
                  <ul>
                    <li>🔍 Explore thousands of job openings</li>
                    <li>⚡ Smart profile increases visibility</li>
                    <li>📩 Apply instantly with One-Click Apply</li>
                    <li>🧠 AI-based job recommendations</li>
                    <li>📈 Resume insights & career tools</li>
                  </ul>
                </div>

                <div className="info-features mt-4">
                  <h5 className="fw-bold mb-2">
                    <i className="fa-solid fa-building me-2 text-success"></i>
                    Why Employers Choose Hirelink
                  </h5>
                  <ul>
                    <li>🏢 Post jobs in seconds with easy dashboard</li>
                    <li>🎯 Smart filtering to find qualified candidates</li>
                    <li>📊 ATS – real-time application tracking</li>
                    <li>🤝 Direct in-platform messaging</li>
                    <li>🚀 Faster hiring with automated screening</li>
                  </ul>
                </div>

                <div className="contact-details mt-4">
                  <h5 className="fw-bold mb-2">📍 Contact Details</h5>
                  <p>
                    <i className="fa-solid fa-envelope text-success me-2"></i>{" "}
                    support@hirelink.com
                  </p>
                  <p>
                    <i className="fa-solid fa-phone text-primary me-2"></i> +91
                    9876543210
                  </p>
                  <p>
                    <i className="fa-solid fa-location-dot text-danger me-2"></i>{" "}
                    Pune, Maharashtra
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT — FORM CARD */}
            <div className="col-md-7 ps-4">
              <form
                onSubmit={formik.handleSubmit}
                className="contact-form-card p-4"
              >
                {/* Name */}
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    {...formik.getFieldProps("con_name")}
                    placeholder="Enter Full Name"
                  />
                  {formik.touched.con_name && formik.errors.con_name && (
                    <small className="text-danger">
                      {formik.errors.con_name}
                    </small>
                  )}
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    {...formik.getFieldProps("con_email")}
                    placeholder="Enter Email Address"
                  />
                  {formik.touched.con_email && formik.errors.con_email && (
                    <small className="text-danger">
                      {formik.errors.con_email}
                    </small>
                  )}
                </div>

                {/* Phone */}
                <div className="mb-3">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    {...formik.getFieldProps("con_mobile")}
                    placeholder="Enter Mobile Number"
                  />
                  {formik.touched.con_mobile && formik.errors.con_mobile && (
                    <small className="text-danger">
                      {formik.errors.con_mobile}
                    </small>
                  )}
                </div>

                {/* Subject */}
                <div className="mb-3">
                  <label className="form-label">Subject</label>
                  <input
                    type="text"
                    className="form-control"
                    {...formik.getFieldProps("con_subject")}
                    placeholder="Enter Subject"
                  />
                  {formik.touched.con_subject && formik.errors.con_subject && (
                    <small className="text-danger">
                      {formik.errors.con_subject}
                    </small>
                  )}
                </div>

                {/* Message */}
                <div className="mb-3">
                  <label className="form-label">Message</label>
                  <textarea
                    rows="4"
                    className="form-control"
                    {...formik.getFieldProps("con_message")}
                    placeholder="Enter Your Message"
                  ></textarea>
                  {formik.touched.con_message && formik.errors.con_message && (
                    <small className="text-danger">
                      {formik.errors.con_message}
                    </small>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-contact w-100"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Message ✉️"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
