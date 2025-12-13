import logo from "../Component2/Image/logo.png";

function Forgot() {
  return (
    <>
      <div className="bg-light d-flex justify-content-center align-items-center vh-100">
        <div
          className="card shadow p-4 m-2"
          style={{ width: "500px", maxwidth: "420px" }}
        >
          <div className="mb-3">
            <a href="/" className="text-decoration-none text-dark">
              <i className="fa-solid fa-arrow-left me-2"></i>Back
            </a>
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

          <form id="forgotForm" novalidate>
            <div className="mb-3 text-center">
              <label for="email" className="form-label fw-bold">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="you@gmail.com"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Send reset link
            </button>
          </form>

          <p className="text-center mt-3 mb-0 text-muted">
            Already have an account?
            <a href="/login" className="fw-semibold">
              Login
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Forgot;
