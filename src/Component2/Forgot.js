import logo from "../Component2/Image/logo.png";
import SEO from "../SEO";
import { seoConfig } from "../config/seoConfig";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { BASE_URL } from "../config/constants";

function Forgot() {
  // ✅ Validation Schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Enter registered email address"),
    user_type: Yup.string().required("Please select Candidate or Employer"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  // ✅ Submit
  const onSubmit = async (data) => {
    try {
      const res = await fetch(`${BASE_URL}forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          user_type: data.user_type,
        }),
      });

      const result = await res.json();

      if (result.status) {
        toast.success("Reset link sent to your email");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <SEO
        title={seoConfig.forgot.title}
        description={seoConfig.forgot.description}
      />
      {/* TOAST */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        pauseOnHover
        theme="colored"
      />
      <div className="bg-light d-flex justify-content-center align-items-center vh-100">
        <div
          className="card shadow p-4 m-2"
          style={{ width: "500px", background: "#f7fdf0ff" }}
        >
          {/* Back */}
          <div className="mb-3">
            <NavLink to="/" className="text-decoration-none text-dark">
              <i className="fa-solid fa-arrow-left me-2"></i>Back
            </NavLink>
          </div>

          {/* Logo */}
          <img
            src={logo}
            alt="Forgot Password"
            className="d-block mx-auto mb-3"
            style={{ width: "150px" }}
          />

          <h3 className="text-center mb-2">Forgot your password?</h3>
          <p className="text-center text-muted mb-4">
            Enter your email and we'll send you a link to reset your password.
          </p>

          {/* FORM */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <div className="mb-3">
              <label className="form-label fw-bold">Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="you@gmail.com"
                {...register("email")}
              />
              <p className="text-danger">{errors.email?.message}</p>
            </div>

            {/* User Type */}
            <div className="mb-3 text-center">
              {/* <label className="form-label fw-bold d-block">
                Select Account Type
              </label> */}

              <div className="d-flex justify-content-center gap-4">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    value="candidate"
                    id="candidate"
                    {...register("user_type")}
                  />
                  <label className="form-check-label" htmlFor="candidate">
                    Candidate
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    value="employer"
                    id="employer"
                    {...register("user_type")}
                  />
                  <label className="form-check-label" htmlFor="employer">
                    Employer
                  </label>
                </div>
              </div>

              <p className="text-danger">{errors.user_type?.message}</p>
            </div>

            {/* Submit */}
            <button type="submit" className="btn btn-success w-100">
              Send reset link
            </button>
          </form>

          {/* Login */}
          <p className="text-center mt-3 mb-0 text-muted">
            Already have an account?{" "}
            <NavLink to="/signin" className="fw-semibold">
              Login
            </NavLink>
          </p>
        </div>
      </div>
    </>
  );
}

export default Forgot;
