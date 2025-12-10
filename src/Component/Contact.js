function Contact() {
  return (
    <>
      <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4">
        <div>
          <h3 className="fw-bold mb-3">Contacts</h3>
        </div>
      </div>
      <div className="card shadow-sm p-3">
        <div className="row g-2 align-items-center mb-3">
          <div className="col-md-2">
            <select className="form-select form-control">
              <option value="">Select Exper</option>
              <option>Percentage</option>
              <option>Flat Amount</option>
            </select>
          </div>
          <div className="col-md-2">
            <input type="date" className="form-control" />
          </div>

          <div className="col-md-2">
            <input type="date" className="form-control" />
          </div>

          <div className="col-md-3 d-flex">
            <button type="submit" className="btn btn-success px-4 me-2">
              Submit
            </button>
            <button className="btn btn-light border px-3">
              <i className="fa fa-refresh"></i>
            </button>
          </div>

          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
            />
          </div>
        </div>

        <table className="table table-bordered">
          <thead className="table-light text-center">
            <tr className="text-center">
              <th className="fs-6 fw-bold">ID</th>
              <th className="fs-6 fw-bold">Contact Detail</th>
              <th className="fs-6 fw-bold">Subject</th>
              <th className="fs-6 fw-bold">Massage</th>
              <th className="fs-6 fw-bold">Activity Detail</th>
            </tr>
          </thead>

          <tbody>
            <tr className="text-center align-middle">
              <td>1</td>
              <td className="text-start">
                <div className="fw-bold">
                  Name:{"  "}
                  <span className="text-dark fw-normal">Harshal mahajan</span>
                </div>
                <div className="fw-bold">
                  Email:{"  "}
                  <span className="text-dark fw-normal">harshal@hmail.com</span>
                </div>
                <div className="fw-bold">
                  Mobile No:{"  "}
                  <span className="text-dark fw-normal">9999999999</span>
                </div>
              </td>

              {/* Subject */}
              <td className="text-start">Job Application</td>

              {/* Massage */}
              <td className="text-start w-25">
                Include every Bootstrap JavaScript plugin and dependency with
                one of our two bundles. Both bootstrap.bundle.js an
              </td>
              {/* Activity Detail */}
              <td className="text-start">
                <div className="fw-bold ">
                  Added By:{"  "}
                  <span className="text-dark fw-normal">11/11/2025</span>
                </div>
                <div className="fw-bold ">
                  Added Date:{"  "}
                  <span className="text-dark fw-normal">18/07/2025</span>
                </div>
              </td>
            </tr>
            {/* <tr>
              <td colSpan="6" className="text-center text-muted py-3">
                No data available
              </td>
            </tr> */}
          </tbody>
        </table>

        {/* <Pagination
            currentPage={currentPage}
            totalPages={nPages}
            onPageChange={(page) => setCurrentPage(page)}
          /> */}
      </div>
    </>
  );
}
export default Contact;
