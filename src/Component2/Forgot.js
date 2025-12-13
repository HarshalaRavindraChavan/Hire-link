import logo from "../Component2/Image/logo.png";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

function Forgot() {
  useEffect(() => {
    document.title = "Hirelink | Forgot Password";
  }, []);

  // Validation Schema (NO if/else)
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Enter Regiter Email Address"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    alert("Form Submitted Successfully!");
  };

  return (
    <>
      <div className="bg-light d-flex justify-content-center align-items-center vh-100">
        <div
          className="card shadow p-4 m-2"
          style={{ width: "500px", maxwidth: "420px", background: "#f7fdf0ff" }}
        >
          <div className="mb-3">
            <NavLink to="/" className="text-decoration-none text-dark">
              <i className="fa-solid fa-arrow-left me-2"></i>Back
            </NavLink>
          </div>

          <div>
            <img
              src={logo}
              alt="Forgot Password"
              className="d-block mx-auto mb-3"
              style={{ width: "150px", height: "auto" }}
            />
          </div>
          <h3 className="text-center mb-2">Forgot your password?</h3>
          <p className="text-center text-muted mb-4">
            Enter your email and we'll send you a link to reset your password.
          </p>

          <form id="forgotForm" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3 text-center">
              <label for="email" className="form-label fw-bold">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="you@gmail.com"
                {...register("email")}
              />
              <p className="text-danger">{errors.email?.message}</p>
            </div>

            <button type="submit" className="btn btn-success w-100">
              Send reset link
            </button>
          </form>

          <p className="text-center mt-3 mb-0 text-muted">
            Already have an account?
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
