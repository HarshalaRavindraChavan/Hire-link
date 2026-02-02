import { useSearchParams, useNavigate, NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import SEO from "../SEO";
import { seoConfig } from "../config/seoConfig";
import { useEffect, useState } from "react";
import { BASE_URL } from "../config/constants";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [isValidToken, setIsValidToken] = useState(null); // null = loading
  const [errorMsg, setErrorMsg] = useState("");

  // 🔐 Validation
  const validationSchema = Yup.object({
    new_password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("New password is required"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("new_password")], "Passwords do not match")
      .required("Confirm password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  // ✅ Verify token on page load
  useEffect(() => {
    if (!token) {
      setIsValidToken(false);
      setErrorMsg("Invalid reset link.");
      return;
    }

    const verifyToken = async () => {
      try {
        const res = await fetch(`${BASE_URL}verify-reset-token?token=${token}`);
        const result = await res.json();

        if (!result.status) {
          setIsValidToken(false);
          setErrorMsg("This password reset link has expired.");
        } else {
          setIsValidToken(true);
        }
      } catch (err) {
        setIsValidToken(false);
        setErrorMsg("Something went wrong. Please try again.");
      }
    };

    verifyToken();
  }, [token]);

  // ✅ Submit new password
  const onSubmit = async (data) => {
    try {
      const res = await fetch(`${BASE_URL}reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: token,
          new_password: data.new_password,
        }),
      });

      const result = await res.json();

      if (result.status) {
        navigate("/signin");
      } else {
        setErrorMsg(result.message);
        setIsValidToken(false);
      }
    } catch (error) {
      setErrorMsg("Unable to reset password. Try again.");
      setIsValidToken(false);
    }
  };

  return (
    <>
      <SEO
        title={seoConfig.resetpass.title}
        description={seoConfig.resetpass.description}
      />
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card shadow p-4" style={{ width: "400px" }}>
          {/* ⏳ Loading */}
          {isValidToken === null && (
            <p className="text-center">Verifying reset link...</p>
          )}

          {/* ❌ Expired / Invalid */}
          {isValidToken === false && (
            <>
              <h4 className="text-center text-danger mb-3">
                Reset Link Expired
              </h4>
              <p className="text-center text-muted">{errorMsg}</p>

              <NavLink to="/forgot" className="btn btn-primary w-100 mt-3">
                Request New Link
              </NavLink>
            </>
          )}

          {/* ✅ Valid Token → Show Form */}
          {isValidToken === true && (
            <>
              <h3 className="text-center mb-3">Reset Password</h3>

              <form onSubmit={handleSubmit(onSubmit)}>
                <input type="hidden" value={token} />

                <div className="mb-3">
                  <label className="form-label">New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    {...register("new_password")}
                    placeholder="Enter new password"
                  />
                  <p className="text-danger">{errors.new_password?.message}</p>
                </div>

                <div className="mb-3">
                  <label className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    {...register("confirm_password")}
                    placeholder="Confirm new password"
                  />
                  <p className="text-danger">
                    {errors.confirm_password?.message}
                  </p>
                </div>

                <button type="submit" className="btn btn-success w-100">
                  Update Password
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
