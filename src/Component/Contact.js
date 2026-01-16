import React, { useState, useEffect } from "react";
import Pagination from "./commenuse/Pagination";
import axios from "axios";
import { BASE_URL } from "../config/constants";
import TableSkeleton from "./commenuse/TableSkeleton";

function Contact() {
  // Correct way: set tab title
  useEffect(() => {
    document.title = "Hirelink | Contact";
  }, []);

  const [contacts, setContact] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  //===================== Get All contact =================

  useEffect(() => {
    fetchContact();
  }, []);

  const fetchContact = async () => {
    try {
      setLoading(true); // loader start

      const res = await axios.get(
        `${BASE_URL}hirelink_apis/admin/getdata/tbl_contact`
      );

      if (res.data.status === true) {
        setContact(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching Contact", error);
    } finally {
      setLoading(false); // loader stop
    }
  };

  const filteredContacts = React.useMemo(() => {
    return contacts.filter((c) => {
      const searchValue = search.trim().toLowerCase();
      const subjectValue = subject.trim().toLowerCase();

      // 🔍 SEARCH FILTER
      const matchesSearch =
        !searchValue ||
        c?.con_name?.toLowerCase().includes(searchValue) ||
        c?.con_email?.toLowerCase().includes(searchValue) ||
        c?.con_mobile?.toString().includes(searchValue) ||
        c?.con_message?.toLowerCase().includes(searchValue) ||
        c?.con_subject?.toLowerCase().includes(searchValue);

      // 🏷 SUBJECT FILTER (separate)
      const matchesSubject =
        !subjectValue || c?.con_subject?.toLowerCase().includes(subjectValue);

      // 📅 DATE FILTER
      const addedDate = c?.con_added_date ? new Date(c.con_added_date) : null;
      const from = fromDate ? new Date(fromDate) : null;
      const to = toDate ? new Date(toDate) : null;

      let matchesDate = true;
      if (addedDate) {
        if (from && to) matchesDate = addedDate >= from && addedDate <= to;
        else if (from) matchesDate = addedDate >= from;
        else if (to) matchesDate = addedDate <= to;
      }

      return matchesSearch && matchesSubject && matchesDate;
    });
  }, [contacts, search, subject, fromDate, toDate]);
  // Pagination start
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 100;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;

  const records = filteredContacts.slice(firstIndex, lastIndex);
  const nPages = Math.ceil(filteredContacts.length / recordsPerPage);
  // Pagination End

  useEffect(() => {
    setCurrentPage(1);
  }, [search, subject, fromDate, toDate]);

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
            <input
              className="form-control"
              placeholder="Enter Subject...."
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div className="col-6 col-md-2">
            <input
              type="date"
              className="form-control"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>

          <div className="col-6 col-md-2">
            <input
              type="date"
              className="form-control"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>

          <div className="col-12 col-md-3 d-flex justify-content-md-start justify-content-between">
            <button
              className="btn px-4 me-2 btn-success"
              onClick={() => setCurrentPage(1)}
            >
              Submit
            </button>

            <button
              className="btn btn-light border px-3"
              onClick={() => {
                setSearch("");
                setSubject("");
                setFromDate("");
                setToDate("");
                setCurrentPage(1);
              }}
            >
              <i className="fa fa-refresh"></i>
            </button>
          </div>

          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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
              {loading ? (
                <TableSkeleton rows={6} columns={5} />
              ) : records.length > 0 ? (
                records.map((c) => (
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
