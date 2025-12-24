import React, { useState, useEffect } from "react";
import Pagination from "./commenuse/Pagination";
import axios from "axios";

function Contact() {
  // Correct way: set tab title
  useEffect(() => {
    document.title = "Hirelink | Contact";
  }, []);

  const [contacts, setContact] = useState([]);

  // Pagination start
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;

  const records = contacts.slice(firstIndex, lastIndex);
  const nPages = Math.ceil(contacts.length / recordsPerPage);
  // Pagination End

  //===================== Get All contact =================

  useEffect(() => {
    fetchContact();
  }, []);

  const fetchContact = async () => {
    try {
      const res = await axios.get(
        "https://norealtor.in/hirelink_apis/admin/getdata/tbl_contact"
      );

      if (res.data.status === true) {
        setContact(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching Contact", error);
    }
  };

  return (
    <>
      <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4">
        <div>
          <h3 className="fw-bold mb-3">Contacts</h3>
        </div>
      </div>

      <div className="card shadow-sm p-3 border">
        <div className="row g-2 align-items-center mb-3">
          <div className="col-md-2">
            <input className="form-control" placeholder="Enter Subject...." />
          </div>

          <div className="col-6 col-md-2">
            <input type="date" className="form-control" />
          </div>

          <div className="col-6 col-md-2">
            <input type="date" className="form-control" />
          </div>

          <div className="col-12 col-md-3 d-flex justify-content-md-start justify-content-between">
            <button className="btn px-4 me-2 btn-success">Submit</button>

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

        {/* TABLE START */}
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="table-light text-center">
              <tr>
                <th className="fs-6 fw-bold">ID</th>
                <th className="fs-6 fw-bold">Contact Detail</th>
                <th className="fs-6 fw-bold">Subject</th>
                <th className="fs-6 fw-bold">Message</th>
                <th className="fs-6 fw-bold">Activity Detail</th>
              </tr>
            </thead>

            <tbody>
              {contacts.length > 0 ? (
                contacts.map((c) => (
                  <tr key={c.con_id} className="text-center align-middle">
                    <td>{c.con_id}</td>

                    <td className="text-start">
                      <div className="fw-bold">
                        Name:{" "}
                        <span className="text-dark fw-normal">
                          {c.con_name}
                        </span>
                      </div>
                      <div className="fw-bold">
                        Email:{" "}
                        <span className="text-dark fw-normal">
                          {c.con_email}
                        </span>
                      </div>
                      <div className="fw-bold">
                        Mobile:{" "}
                        <span className="text-dark fw-normal">
                          {c.con_mobile}
                        </span>
                      </div>
                    </td>

                    <td className="text-start">{c.con_subject}</td>

                    <td className="text-start w-25">{c.con_message}</td>

                    <td className="text-start">
                      <div className="fw-bold">
                        Added By:{" "}
                        <span className="text-dark fw-normal">
                          {c.con_added_by}
                        </span>
                      </div>
                      <div className="fw-bold">
                        Added Date:{" "}
                        <span className="text-dark fw-normal">
                          {c.con_added_date}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-muted py-3">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {/* TABLE END */}

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={nPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </>
  );
}

export default Contact;
