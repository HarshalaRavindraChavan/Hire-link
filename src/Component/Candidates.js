import React, { useState } from "react";
import ConfirmDelete from "./commenuse/ConfirmDelete";

function Candidates() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Harshal Mahajan",
      email: "harshal1@gmail.com",
      mobile: "9876543201",
      business: "1 year",
      category: "2024-01-05",
      location: "",
      city: "Mumbai",
      state: "Maharashtra",
      website: "1111 2222 3333",
      facebook: "ABCDE1234F",
      linkedin: "Maharashtra",
      instagram: "1111 2222 3333",
      youtube: "ABCDE1234F",
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = users.slice(firstIndex, lastIndex);
  const nPages = Math.ceil(users.length / recordsPerPage);

  // Delete modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Open Confirm Delete Modal
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  // DELETE CONFIRM
  const confirmDelete = () => {
    const filtered = users.filter((u) => u.id !== deleteId);
    setUsers(filtered);
    setShowDeleteModal(false);
  };

  return (
    <>
      <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4">
        <div>
          <h3 className="fw-bold mb-3">Candidates</h3>
        </div>
        <div className="ms-auto py-2 py-md-0">
          <a href="#" className="btn btn-label-info btn-round me-2">
            Manage
          </a>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr className="text-center">
                  <th className="fw-bold fs-6">Detail</th>
                  <th className="fw-bold fs-6">Contact</th>
                  <th className="fw-bold fs-6">Address</th>
                  <th className="fw-bold fs-6">Other Detail</th>
                </tr>
              </thead>

              <tbody>
                {records.length > 0 ? (
                  records.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <b>Name:</b> {item.name} <br />
                        <b>Business:</b> {item.business} <br />
                        <b>Category:</b> {item.category}
                      </td>

                      <td>
                        <b>Email:</b> {item.email} <br />
                        <b>Mobile:</b> {item.mobile}
                      </td>

                      <td>
                        <b>Location:</b> {item.location} <br />
                        <b>City:</b> {item.city} <br />
                        <b>State:</b> {item.state}
                      </td>

                      <td>
                        <b>Website:</b> {item.website} <br />
                        <b>Facebook:</b> {item.facebook} <br />
                        <b>Linkedin:</b> {item.linkedin} <br />
                        <b>Instagram:</b> {item.instagram}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center text-muted py-3">
                      No data available in table
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* PAGINATION */}
            <nav className="d-flex justify-content-end mt-3">
              <ul className="pagination">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    Previous
                  </button>
                </li>

                {[...Array(nPages).keys()].map((num) => (
                  <li
                    key={num}
                    className={`page-item ${
                      currentPage === num + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(num + 1)}
                    >
                      {num + 1}
                    </button>
                  </li>
                ))}

                <li
                  className={`page-item ${
                    currentPage === nPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* DELETE CONFIRM MODAL */}
      <ConfirmDelete
        show={showDeleteModal}
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </>
  );
}

export default Candidates;
