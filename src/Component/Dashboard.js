import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  return (
    <>
      <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4">
        <div>
          <h3 className=" mb-3" style={{ color: "black", fontWeight: "bold" }}>
            Dashboard
          </h3>
        </div>
        <div className="ms-auto py-2 py-md-0">
          <a href="#" className="btn btn-label-info btn-round me-2">
            Manage
          </a>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6 col-md-3">
          <div
            className="card card-stats card-round"
            onClick={() => navigate("/jobs")} // 🔥 Entire card clickable
            style={{ cursor: "pointer" }} // 👈 Hand cursor
          >
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-icon">
                  <div className="icon-big text-center icon-info bubble-shadow-small">
                    <i className="fa fa-briefcase"></i>
                  </div>
                </div>

                <div className="col col-stats ms-3 ms-sm-0">
                  <div className="numbers">
                    <p
                      className="card-category"
                      style={{
                        fontSize: "18px",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      Jobs
                    </p>

                    <h4
                      className="card-title"
                      style={{
                        fontSize: "18px",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      1294
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-md-3">
          <div
            className="card card-stats card-round"
            onClick={() => navigate("/condidate")}
            style={{ cursor: "pointer" }}
          >
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-icon">
                  <div className="icon-big text-center icon-info bubble-shadow-small">
                    <i className="fa fa-users"></i>
                  </div>
                </div>

                <div className="col col-stats ms-3 ms-sm-0">
                  <div className="numbers">
                    <p
                      className="card-category"
                      style={{
                        fontSize: "18px",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      Candidates
                    </p>

                    <h4
                      className="card-title"
                      style={{
                        fontSize: "18px",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      1303
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-md-3">
          <div
            className="card card-stats card-round"
            onClick={() => navigate("/interview")}
            style={{ cursor: "pointer" }}
          >
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-icon">
                  <div className="icon-big text-center icon-info bubble-shadow-small">
                    <i className="fa fa-comments"></i>
                  </div>
                </div>

                <div className="col col-stats ms-3 ms-sm-0">
                  <div className="numbers">
                    <p
                      className="card-category"
                      style={{
                        fontSize: "18px",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      Interview
                    </p>

                    <h4
                      className="card-title"
                      style={{
                        fontSize: "18px",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      1345
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-md-3">
          <div
            className="card card-stats card-round"
            onClick={() => navigate("/employe")}
            style={{ cursor: "pointer" }}
          >
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-icon">
                  <div className="icon-big text-center icon-info bubble-shadow-small">
                    <i className="fa fa-user-tie"></i>
                  </div>
                </div>
                <div className="col col-stats ms-3 ms-sm-0">
                  <div className="numbers">
                    <p
                      className="card-category"
                      style={{
                        fontSize: "18px",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      Employes
                    </p>
                    <h4
                      className="card-title"
                      style={{
                        fontSize: "18px",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      576
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-md-3">
          <div
            className="card card-stats card-round"
            onClick={() => navigate("/contact")}
            style={{ cursor: "pointer" }}
          >
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-icon">
                  <div className="icon-big text-center icon-info bubble-shadow-small">
                    <i className="fa fa-headphones"></i>
                  </div>
                </div>
                <div className="col col-stats ms-3 ms-sm-0">
                  <div className="numbers">
                    <p
                      className="card-category"
                      style={{
                        fontSize: "18px",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      Contacts
                    </p>
                    <h4
                      className="card-title"
                      style={{
                        fontSize: "18px",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      200
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-md-3">
          <div
            className="card card-stats card-round"
            onClick={() => navigate("/user")}
            style={{ cursor: "pointer" }}
          >
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-icon">
                  <div className="icon-big text-center icon-info bubble-shadow-small">
                    {/* <i className="far fa-check-circle"></i> */}
                    <i className="fa fa-user"></i>
                  </div>
                </div>
                <div className="col col-stats ms-3 ms-sm-0">
                  <div className="numbers">
                    <p
                      className="card-category"
                      style={{
                        fontSize: "18px",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      Users
                    </p>
                    <h4
                      className="card-title"
                      style={{
                        fontSize: "18px",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      1000
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
