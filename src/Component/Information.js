import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SEO from "../SEO";
import { seoConfig } from "../config/seoConfig";
import { BASE_URL } from "../config/constants";

function Information() {
  const [info, setInfo] = useState({
    info_email: "",
    info_mobile: "",
    info_address: "",
    info_pincode: "",
  });

  // GET DATA
  const getInformation = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}admin/getdatawhere/tbl_setting/sett_id/5`,
      );

      if (res.data && res.data.data.length > 0) {
        const data = res.data.data[0];

        setInfo({
          info_email: data.info_email || "",
          info_mobile: data.info_mobile || "",
          info_address: data.info_address || "",
          info_pincode: data.info_pincode || "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInformation();
  }, []);

  // INPUT CHANGE
  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
  };

  // UPDATE DATA
  const updateInformation = async () => {
    try {
      const payload = {
        info_email: info.info_email,
        info_mobile: info.info_mobile,
        info_address: info.info_address,
        info_pincode: info.info_pincode,
      };

      const res = await axios.post(
        `${BASE_URL}admin/updatedata/tbl_setting/sett_id/5`,
        payload,
      );

      if (res.data.status) {
        toast.success("Information Updated Successfully");
      } else {
        toast.error("Update Failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      <SEO
        title={seoConfig.a_setting.title}
        description={seoConfig.a_setting.description}
      />

      <h3 className="fw-bold mb-4 mt-4">Information</h3>

      <div className="card mb-4">
        <div className="card-body row">
          <div className="col-lg-6">
            <label>Email</label>
            <input
              type="text"
              name="info_email"
              placeholder="Enter Email"
              value={info.info_email || ""}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="col-lg-6">
            <label>Contact Number</label>
            <input
              name="info_mobile"
              value={info.info_mobile || ""}
              placeholder="Enter Mobile Number"
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="col-lg-6">
            <label>Address</label>
            <input
              name="info_address"
              value={info.info_address || ""}
              placeholder="Enter Address"
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="col-lg-6">
            <label>Pincode</label>
            <input
              name="info_pincode"
              value={info.info_pincode || ""}
              placeholder="Enter Pin Code"
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="text-center mt-5">
            <button className="btn btn-success" onClick={updateInformation}>
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Information;
