import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SEO from "../SEO";
import { seoConfig } from "../config/seoConfig";
import { BASE_URL } from "../config/constants";
import { useNavigate } from "react-router-dom";

function Setting() {
  const navigate = useNavigate();
  const auth = JSON.parse(localStorage.getItem("auth"));
  const role = auth?.role;
  // ================= AUTH CHECK =================
  useEffect(() => {
    if (role !== "1") {
      navigate("/signin");
    }
  }, [role, navigate]);

  // ================= COMMON GST CALCULATION =================
  const calculateAmount = (value) => {
    const base = Number(value) || 0;
    const gst = +(base * 0.18).toFixed(2);
    const total = +(base + gst).toFixed(2);
    return { base, gst, total };
  };

  // ================= STATES =================
  const [employer, setEmployer] = useState({ base: "", gst: "", total: "" });
  const [candidate, setCandidate] = useState({ base: "", gst: "", total: "" });
  const [resume, setResume] = useState({ base: "", gst: "", total: "" });
  const [staff, setStaff] = useState({ base: "", gst: "", total: "" });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await axios.get(`${BASE_URL}admin/getdata/tbl_setting`);

      res.data.data.forEach((item) => {
        const data = {
          base: Number(item.sett_base_amount),
          gst: Number(item.sett_gst_amount),
          total: Number(item.sett_pay_amount),
        };

        switch (item.sett_pay_role) {
          case "employer":
            setEmployer(data);
            break;
          case "candidate":
            setCandidate(data);
            break;
          case "resume_download":
            setResume(data);
            break;
          case "employer_staff":
            setStaff(data);
            break;
          default:
            break;
        }
      });
    } catch (error) {
      toast.error("Failed to load settings");
    }
  };

  // ================= COMMON UPDATE FUNCTION =================
  const updateFee = async (role, data, successMsg, errorMsg) => {
    if (!data.base || data.base <= 0) {
      toast.error("Please enter valid base amount");
      return;
    }

    try {
      await axios.post(
        `${BASE_URL}admin/updatedata/tbl_setting/sett_pay_role/${role}`,
        {
          sett_base_amount: data.base,
          sett_gst_amount: data.gst,
          sett_pay_amount: data.total,
          sett_update_date: new Date()
            .toISOString()
            .slice(0, 19)
            .replace("T", " "),
        },
      );

      toast.success(successMsg);
      fetchSettings();
    } catch (error) {
      toast.error(errorMsg);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      <SEO
        title={seoConfig.a_setting.title}
        description={seoConfig.a_setting.description}
      />

      <h3 className="fw-bold mb-4">Setting</h3>

      {/* ================= EMPLOYER ================= */}
      <div className="card mb-4">
        <h4 className="ms-3 mt-3">Employer Signup Fee</h4>
        <div className="card-body row">
          <div className="col-lg-3">
            <label>Base Price</label>
            <input
              type="number"
              className="form-control"
              value={employer.base}
              onChange={(e) => setEmployer(calculateAmount(e.target.value))}
            />
          </div>
          <div className="col-lg-3">
            <label>18% GST</label>
            <input className="form-control" value={employer.gst} disabled />
          </div>
          <div className="col-lg-3">
            <label>Total</label>
            <input className="form-control" value={employer.total} disabled />
          </div>
          <div className="col-lg-3 d-flex align-items-end">
            <button
              className="btn btn-success w-100"
              onClick={() =>
                updateFee(
                  "employer",
                  employer,
                  "Employer fee updated",
                  "Employer update failed",
                )
              }
            >
              Update
            </button>
          </div>
        </div>
      </div>

      {/* ================= CANDIDATE ================= */}
      <div className="card mb-4">
        <h4 className="ms-3 mt-3">Candidate Signup Fee</h4>
        <div className="card-body row">
          <div className="col-lg-3">
            <label>Base Price</label>
            <input
              type="number"
              className="form-control"
              value={candidate.base}
              onChange={(e) => setCandidate(calculateAmount(e.target.value))}
            />
          </div>
          <div className="col-lg-3">
            <label>18% GST</label>
            <input className="form-control" value={candidate.gst} disabled />
          </div>
          <div className="col-lg-3">
            <label>Total</label>
            <input className="form-control" value={candidate.total} disabled />
          </div>
          <div className="col-lg-3 d-flex align-items-end">
            <button
              className="btn btn-success w-100"
              onClick={() =>
                updateFee(
                  "candidate",
                  candidate,
                  "Candidate fee updated",
                  "Candidate update failed",
                )
              }
            >
              Update
            </button>
          </div>
        </div>
      </div>

      {/* ================= RESUME ================= */}
      <div className="card mb-4">
        <h4 className="ms-3 mt-3">Resume Download Fee</h4>
        <div className="card-body row">
          <div className="col-lg-3">
            <label>Base Price</label>
            <input
              type="number"
              className="form-control"
              value={resume.base}
              onChange={(e) => setResume(calculateAmount(e.target.value))}
            />
          </div>
          <div className="col-lg-3">
            <label>18% GST</label>
            <input className="form-control" value={resume.gst} disabled />
          </div>
          <div className="col-lg-3">
            <label>Total</label>
            <input className="form-control" value={resume.total} disabled />
          </div>
          <div className="col-lg-3 d-flex align-items-end">
            <button
              className="btn btn-success w-100"
              onClick={() =>
                updateFee(
                  "resume_download",
                  resume,
                  "Resume fee updated",
                  "Resume update failed",
                )
              }
            >
              Update
            </button>
          </div>
        </div>
      </div>

      {/* ================= STAFF ================= */}
      <div className="card mb-4">
        <h4 className="ms-3 mt-3">Staff Extended Fee</h4>
        <div className="card-body row">
          <div className="col-lg-3">
            <label>Base Price</label>
            <input
              type="number"
              className="form-control"
              value={staff.base}
              onChange={(e) => setStaff(calculateAmount(e.target.value))}
            />
          </div>
          <div className="col-lg-3">
            <label>18% GST</label>
            <input className="form-control" value={staff.gst} disabled />
          </div>
          <div className="col-lg-3">
            <label>Total</label>
            <input className="form-control" value={staff.total} disabled />
          </div>
          <div className="col-lg-3 d-flex align-items-end">
            <button
              className="btn btn-success w-100"
              onClick={() =>
                updateFee(
                  "employer_staff",
                  staff,
                  "Staff fee updated",
                  "Staff update failed",
                )
              }
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Setting;
