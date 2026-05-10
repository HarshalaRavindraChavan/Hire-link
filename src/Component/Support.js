// ================= SUPPORT MANAGEMENT =================
// Employer page sarkhach Support Page
// Table Name : tbl_support

import React, { useState, useEffect } from "react";
import SEO from "../SEO";
import { seoConfig } from "../config/seoConfig";
import ConfirmDelete from "./commenuse/ConfirmDelete";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Pagination from "./commenuse/Pagination";
import { toast } from "react-toastify";
import { BASE_URL } from "../config/constants";
import TableSkeleton from "./commenuse/TableSkeleton";
import { parseApiResponse } from "../config/parseApiResponse";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function Support() {
  const navigate = useNavigate();
  const auth = JSON.parse(localStorage.getItem("auth"));
  const isAdmin = Number(auth?.role) === 1;

  const [search, setSearch] = useState("");
  const [support, setSupport] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

//   useEffect(() => {
//     if (!auth) {
//       navigate("/signin");
//     }
//   }, [auth, navigate]);

  useEffect(() => {
    fetchSupport();
  }, []);

  // ================= FETCH SUPPORT =================
  const fetchSupport = async () => {
    try {
      setLoading(true);

      const response = await axios.get(`${BASE_URL}admin/getdata/tbl_support`);

      const res = parseApiResponse(response);

      if (res.status === true) {
        setSupport(res.data);
      }
    } catch (error) {
      toast.error("Support Fetch Error");
    } finally {
      setLoading(false);
    }
  };

  // ================= PAGINATION =================
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 50;

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;

  const nPages = Math.ceil(support.length / recordsPerPage);

  // ================= DELETE =================
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}admin/deletedata/tbl_support/supp_id/${deleteId}`,
      );

      const res = parseApiResponse(response);

      if (res.status === true) {
        toast.success("Support Deleted Successfully");
        setShowDeleteModal(false);
        setDeleteId(null);

        fetchSupport();
      } else {
        toast.error("Delete Failed");
      }
    } catch (error) {
      toast.error("Delete Error");
    }
  };

  // ================= SEARCH FILTER =================
  const filteredRecords = support.filter((item) => {
    const value = search.toLowerCase();

    return (
      item?.supp_name?.toLowerCase().includes(value) ||
      item?.supp_email?.toLowerCase().includes(value) ||
      item?.supp_mobile?.toLowerCase().includes(value) ||
      item?.supp_subject?.toLowerCase().includes(value) ||
      item?.supp_ticket_no?.toString().includes(value)
    );
  });

  // ================= STATUS UPDATE =================
  const handleStatusChange = async (id, status) => {
    if (isUpdatingStatus) return;

    setIsUpdatingStatus(true);

    try {
      const response = await axios.post(
        `${BASE_URL}admin/updatedata/tbl_support/supp_id/${id}`,
        {
          supp_status: status,
        },
      );

      const res = parseApiResponse(response);

      if (res.status === true) {
        toast.success("Status Updated");

        setSupport((prev) =>
          prev.map((item) =>
            item.supp_id === id ? { ...item, supp_status: status } : item,
          ),
        );
      } else {
        toast.error("Status Update Failed");
      }
    } catch (error) {
      toast.error("Server Error");
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  // ================= EXPORT EXCEL =================
  const exportToExcel = (data) => {
    const formatted = data.map((e) => ({
      ID: e.supp_id,
      Ticket: e.supp_ticket_no,
      Name: e.supp_name,
      Email: e.supp_email,
      Mobile: e.supp_mobile,
      Subject: e.supp_subject,
      Type: e.supp_type,
      Status: e.supp_status,
      Date: e.supp_creat_at,
    }));

    const ws = XLSX.utils.json_to_sheet(formatted);
    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, "Support");

    const buffer = XLSX.write(wb, {
      bookType: "xlsx",
      type: "array",
    });

    saveAs(new Blob([buffer]), "Support.xlsx");
  };

  return (
    <>
      <SEO title="Support Management" description="Support Management Page" />

      {/* HEADER */}
      <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4">
        <h3 className="fw-bold mb-3">Support Management</h3>
      </div>

      {/* CARD */}
      <div className="card shadow-sm p-3 border">
        {/* FILTER */}
        <div className="row mb-3">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <button
              className="btn btn-outline-success"
              onClick={() => exportToExcel(filteredRecords)}
            >
              Export XL Sheet
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="table-responsive">
          <table className="table table-bordered align-middle mb-0">
            <thead className="table-light text-center">
              <tr>
                <th>ID</th>
                <th>User Details</th>
                <th>Support Details</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <TableSkeleton rows={6} columns={5} />
              ) : filteredRecords.length > 0 ? (
                filteredRecords
                  .slice(firstIndex, lastIndex)
                  .map((item, index) => (
                    <tr key={item.supp_id}>
                      {/* ID */}
                      <td className="text-center fw-bold">
                        {firstIndex + index + 1}
                      </td>

                      {/* USER DETAILS */}
                      <td style={{ width: "25%" }}>
                        <div className="fw-bold">
                          Name :
                          <span className="fw-normal text-dark ms-1">
                            {item.supp_name}
                          </span>
                        </div>

                        <div className="fw-bold">
                          Email :
                          <span className="fw-normal text-dark ms-1">
                            {item.supp_email}
                          </span>
                        </div>

                        <div className="fw-bold">
                          Mobile :
                          <span className="fw-normal text-dark ms-1">
                            {item.supp_mobile}
                          </span>
                        </div>
                      </td>

                      {/* SUPPORT DETAILS */}
                      <td style={{ width: "40%" }}>
                        <div className="fw-bold">
                          Ticket No :
                          <span className="fw-normal text-dark ms-1">
                            #{item.supp_ticket_no}
                          </span>
                        </div>

                        <div className="fw-bold">
                          Type :
                          <span className="fw-normal text-dark ms-1">
                            {item.supp_type}
                          </span>
                        </div>

                        <div className="fw-bold">
                          Sub Type :
                          <span className="fw-normal text-dark ms-1">
                            {item.supp_sub_type}
                          </span>
                        </div>

                        <div className="fw-bold">
                          Subject :
                          <span className="fw-normal text-dark ms-1">
                            {item.supp_subject}
                          </span>
                        </div>

                        <div className="fw-bold">
                          Message :
                          <span className="fw-normal text-dark ms-1">
                            {item.supp_message}
                          </span>
                        </div>
                      </td>

                      {/* STATUS */}
                      <td className="text-center">
                        <div className="fw-bold">
                          Date :
                          <span className="fw-normal text-dark ms-1">
                            {item.supp_creat_at}
                          </span>
                        </div>

                        <div className="fw-bold mt-2">
                          Status :
                          {isAdmin ? (
                            <select
                              className="form-select form-select-sm d-inline w-auto ms-2"
                              value={item.supp_status || "0"}
                              disabled={isUpdatingStatus}
                              onChange={(e) =>
                                handleStatusChange(item.supp_id, e.target.value)
                              }
                            >
                              <option value="0">Pending</option>
                              <option value="1">Open</option>
                              <option value="2">In Progress</option>
                              <option value="3">Resolved</option>
                              <option value="4">Closed</option>
                            </select>
                          ) : (
                            <span className="badge bg-success ms-2">
                              {item.supp_status}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* ACTION */}
                      <td className="text-center">
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDeleteClick(item.supp_id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No Support Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* PAGINATION */}
          <Pagination
            currentPage={currentPage}
            totalPages={nPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>

      {/* DELETE MODAL */}
      <ConfirmDelete
        show={showDeleteModal}
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </>
  );
}

export default Support;
