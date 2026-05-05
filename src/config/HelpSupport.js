import React, { useState, useEffect } from "react";
import { FiHeadphones } from "react-icons/fi";
import { BASE_URL } from "../config/constants";
import { toast, ToastContainer } from "react-toastify";

const HelpSupport = () => {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [createTicketOpen, setCreateTicketOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [formOpen, setFormOpen] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null);

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    let err = {};

    if (!formData.fullname.trim()) err.fullname = "Required";

    if (!formData.email) err.email = "Required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) err.email = "Invalid";

    if (!formData.phone) err.phone = "Required";
    else if (!/^[0-9]{10}$/.test(formData.phone)) err.phone = "Invalid";

    if (!formData.subject || formData.subject === "Select")
      err.subject = "Required";

    if (!formData.message.trim()) err.message = "Required";

    setErrors(err);

    // ✅ MAIN FIX
    return Object.keys(err).length === 0;
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      const res = await fetch(`${BASE_URL}support`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          type: selectedOption === 1 ? "ticket" : "callback",
          formType:
            selectedForm === 1 || selectedForm === 4
              ? "Transactions and Refunds"
              : selectedForm === 2 || selectedForm === 5
                ? "Account related assistance"
                : "Others",
        }),
      });

      const data = await res.json();

      if (res.ok && data.status) {
        toast.success("Submitted successfully!");

        setFormData({
          fullname: "",
          email: "",
          phone: "",
          subject: "Select",
          message: "",
        });

        setFormOpen(false);
      } else {
        toast.error(data.message || "Error");
      }
    } catch (err) {
      console.log(err);
      toast.error("API Error");
    } finally {
      setLoading(false);
    }
  };

  const faqs = [
    // 💰 Transactions & Refunds
    {
      q: "Why is my payment not showing in the dashboard?",
      a: "Payments may take a few minutes to reflect due to processing delays. Please wait for 5–10 minutes or refresh the page.",
    },
    {
      q: "How long does it take to get a refund?",
      a: "Refunds are usually processed within 5-7 business days depending on your bank.",
    },
    {
      q: "My payment failed but money is deducted. What should I do?",
      a: "If the amount is deducted, it will be automatically refunded within 5-7 working days. If not, please create a support ticket.",
    },
    {
      q: "Can I cancel a transaction after payment?",
      a: "Once a transaction is completed, it cannot be cancelled. However, you can request a refund if applicable.",
    },

    // 👤 Account Related
    {
      q: "I am unable to login to my account. What should I do?",
      a: "Please check your email and password. If the issue persists, use the 'Forgot Password' option to reset your password.",
    },
    {
      q: "How can I update my profile details?",
      a: "Go to your account settings and update your personal information from the profile section.",
    },
    {
      q: "I did not receive OTP during login/signup.",
      a: "Please check your network and wait for a few seconds. You can also request to resend OTP.",
    },
    {
      q: "How do I delete my account?",
      a: "You can request account deletion by contacting support through 'Create Ticket' option.",
    },

    // ⚙️ Others
    {
      q: "How can I contact customer support?",
      a: "You can use the 'Contact Us' option to create a ticket or request a callback.",
    },
    {
      q: "What are your support working hours?",
      a: "Our support team is available from 10 AM to 7 PM (Monday to Saturday).",
    },
    {
      q: "How do I raise a support request?",
      a: "Click on Help & Support → Contact Us → Create Ticket and submit your issue.",
    },
    {
      q: "I am facing a technical issue on the website. What should I do?",
      a: "Please clear your browser cache or try again later. If the issue continues, contact support.",
    },
  ];

  const closeAll = () => {
    setOpen(false);
    setContactOpen(false);
    setCreateTicketOpen(false);
    setFormOpen(false);
    setActiveIndex(null);
  };

  const isChildOpen = contactOpen || createTicketOpen || formOpen;

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      {/* 🔘 Button */}
      <div style={styles.button} onClick={() => setOpen(true)}>
        <FiHeadphones style={styles.icon} />
        Help & Support
      </div>

      {/* 🌑 Overlay */}
      {(open || contactOpen || createTicketOpen || formOpen) && (
        <div
          style={styles.overlay}
          onClick={() => {
            setOpen(false);
            setContactOpen(false);
            setCreateTicketOpen(false);
            setFormOpen(false);
          }}
        />
      )}

      {/* 📦 RIGHT PANEL */}
      <div
        style={{
          ...styles.panel,
          transform: open ? "translateX(0)" : "translateX(100%)",

          filter: isChildOpen ? "blur(2px)" : "none",
          pointerEvents: isChildOpen ? "none" : "auto",
        }}
      >
        <div style={styles.header}>
          <span className="fw-bold fs-5">Help Center</span>
          <span style={styles.close} onClick={closeAll}>
            ✕
          </span>
        </div>

        {/* FAQ */}
        <div style={styles.section}>
          <h5 className="fw-bold fs-5" style={{ marginBottom: "10px" }}>
            Popular FAQs
          </h5>

          {faqs.map((item, index) => (
            <div key={index} style={styles.faqItem}>
              <div
                style={styles.faqQuestion}
                onClick={() =>
                  setActiveIndex(activeIndex === index ? null : index)
                }
              >
                <span>{item.q}</span>
                <span>{activeIndex === index ? "⮟" : "➤"}</span>
              </div>

              {activeIndex === index && (
                <div style={styles.faqAnswer}>{item.a}</div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <p style={styles.needMore}>Need more help?</p>
          <button
            style={styles.contactBtn}
            onClick={() => {
              setContactOpen(true);
            }}
          >
            Contact Us
          </button>
        </div>
      </div>

      {/* 📥 CONTACT POPUP */}
      <div
        // style={{
        //   ...styles.bottomSheet,
        //   bottom: contactOpen ? "90px" : "-400px",
        // }}
        style={{
          ...styles.bottomSheet,
          transform: contactOpen ? "translateX(0)" : "translateX(100%)",
        }}
      >
        <div style={styles.sheetHeader}>
          <span>Contact Us</span>
          <span style={styles.close} onClick={() => setContactOpen(false)}>
            ✕
          </span>
        </div>

        {/* OPTION 1 */}
        <div
          style={styles.sheetItem}
          onClick={() => {
            setContactOpen(false); // ✅ FIX
            setSelectedOption(1);
            setCreateTicketOpen(true);
          }}
        >
          <div>
            📧 Create Ticket
            <div style={styles.subText}>Resolution in 1-2 days</div>
          </div>
          <span style={styles.arrow}>›</span>
        </div>

        {/* OPTION 2 */}
        <div
          style={styles.sheetItem}
          onClick={() => {
            setContactOpen(false); // ✅ FIX
            setSelectedOption(2);
            setCreateTicketOpen(true);
          }}
        >
          <div>
            📞 Request Callback
            <div style={styles.subText}>10 AM - 7 PM</div>
          </div>
          <span style={styles.arrow}>›</span>
        </div>
      </div>

      {/* CREATE TICKET POPUP */}
      <div
        // style={{
        //   ...styles.bottomSheet,
        //   bottom: createTicketOpen ? "90px" : "-600px",
        // }}
        style={{
          ...styles.bottomSheet,
          transform: createTicketOpen ? "translateX(0)" : "translateX(100%)",
        }}
      >
        <div style={styles.sheetHeader}>
          <span>
            {
              {
                1: "Create Ticket",
                2: "Request Callback",
              }[selectedOption]
            }
          </span>

          <span style={styles.close} onClick={() => setCreateTicketOpen(false)}>
            ✕
          </span>
        </div>

        {/* OPTION 1 */}
        {selectedOption === 1 && (
          <>
            <div
              style={styles.sheetItem}
              onClick={() => {
                setCreateTicketOpen(false); // ✅ FIX
                setSelectedForm(1);
                setFormOpen(true);
              }}
            >
              <div>Transactions and Refunds</div>
              <span style={styles.arrow}>›</span>
            </div>

            <div
              style={styles.sheetItem}
              onClick={() => {
                setCreateTicketOpen(false); // ✅ FIX
                setSelectedForm(2);
                setFormOpen(true);
              }}
            >
              <div>Account related assistance</div>
              <span style={styles.arrow}>›</span>
            </div>

            <div
              style={styles.sheetItem}
              onClick={() => {
                setCreateTicketOpen(false); // ✅ FIX
                setSelectedForm(3);
                setFormOpen(true);
              }}
            >
              <div>Others</div>
              <span style={styles.arrow}>›</span>
            </div>
          </>
        )}

        {/* OPTION 2 */}
        {selectedOption === 2 && (
          <>
            <div
              style={styles.sheetItem}
              onClick={() => {
                setCreateTicketOpen(false); // ✅ FIX
                setSelectedForm(4);
                setFormOpen(true);
              }}
            >
              <div>Transactions and Refunds</div>
              <span style={styles.arrow}>›</span>
            </div>

            <div
              style={styles.sheetItem}
              onClick={() => {
                setCreateTicketOpen(false); // ✅ FIX
                setSelectedForm(5);
                setFormOpen(true);
              }}
            >
              <div>Account related assistance</div>
              <span style={styles.arrow}>›</span>
            </div>

            <div
              style={styles.sheetItem}
              onClick={() => {
                setCreateTicketOpen(false); // ✅ FIX
                setSelectedForm(6);
                setFormOpen(true);
              }}
            >
              <div>Others</div>
              <span style={styles.arrow}>›</span>
            </div>
          </>
        )}
      </div>

      {/* CREATE TICKET FORM POPUP */}
      <div
        // style={{
        //   ...styles.bottomSheet,
        //   bottom: formOpen ? "90px" : "-800px",
        // }}

        style={{
          ...styles.bottomSheet,
          transform: formOpen ? "translateX(0)" : "translateX(100%)",
        }}
      >
        <div style={styles.sheetHeader}>
          <span>
            {
              {
                1: "Create Ticket ➜ Transactions and Refunds",
                2: "Create Ticket ➜ Account related assistance",
                3: "Create Ticket ➜ Others",
                4: "Request Callback ➜ Transactions and Refunds",
                5: "Request Callback ➜ Account related assistance",
                6: "Request Callback ➜ Others",
              }[selectedForm]
            }
          </span>

          <span style={styles.close} onClick={() => setFormOpen(false)}>
            ✕
          </span>
        </div>

        {/* FORM (same UI unchanged) */}
        {(selectedForm === 1 ||
          selectedForm === 2 ||
          selectedForm === 3 ||
          selectedForm === 4 ||
          selectedForm === 5 ||
          selectedForm === 6) && (
          <form onSubmit={submitForm}>
            <div className="row">
              <div className="col-6">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className={`form-control ${errors.fullname ? "is-invalid" : ""}`}
                  placeholder="Enter Full Name"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                />
              </div>

              <div className="col-6">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  placeholder="Enter Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="col-6">
                <label className="form-label">Phone</label>
                <input
                  type="text"
                  className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                  placeholder="Enter Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              {selectedForm === 1 && (
                <div className="col-6">
                  <label className="form-label">Subject</label>
                  <select
                    className={`form-select form-control ${errors.subject ? "is-invalid" : ""}`}
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="Transactions">Transactions</option>
                    <option value="Refunds">Refunds</option>
                  </select>
                </div>
              )}

              {selectedForm === 2 && (
                <div className="col-6">
                  <label className="form-label">Subject</label>
                  <select
                    className={`form-select form-control ${errors.subject ? "is-invalid" : ""}`}
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="Login">Login</option>
                    <option value="Register">Register</option>
                  </select>
                </div>
              )}

              {selectedForm === 3 && (
                <div className="col-6">
                  <label className="form-label">Subject</label>
                  <select
                    className={`form-select form-control ${errors.subject ? "is-invalid" : ""}`}
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="Signin">Signin</option>
                    <option value="Signup">Signup</option>
                    <option value="Payment">Payment</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              )}

              {selectedForm === 4 && (
                <div className="col-6">
                  <label className="form-label">Subject</label>
                  <select
                    className={`form-select form-control ${errors.subject ? "is-invalid" : ""}`}
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="Transactions">Transactions</option>
                    <option value="Refunds">Refunds</option>
                  </select>
                </div>
              )}

              {selectedForm === 5 && (
                <div className="col-6">
                  <label className="form-label">Subject</label>
                  <select
                    className={`form-select form-control ${errors.subject ? "is-invalid" : ""}`}
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="Login">Login</option>
                    <option value="Register">Register</option>
                  </select>
                </div>
              )}

              {selectedForm === 6 && (
                <div className="col-6">
                  <label className="form-label">Subject</label>
                  <select
                    className={`form-select form-control ${errors.subject ? "is-invalid" : ""}`}
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="Signin">Signin</option>
                    <option value="Signup">Signup</option>
                    <option value="Payment">Payment</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              )}

              <div className="col-12">
                <label className="form-label">Message</label>
                <textarea
                  className={`form-control ${errors.message ? "is-invalid" : ""}`}
                  rows="4"
                  placeholder="Enter Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12 mt-1">
                <button
                  className="btn btn-outline-success w-100"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

const isMobile = window.innerWidth <= 768;

const styles = {
  button: {
    position: "fixed",
    right: isMobile ? "10px" : "20px",
    bottom: isMobile ? "10px" : "20px",
    background: "#2b3a67",
    color: "#fff",
    padding: isMobile ? "8px 12px" : "10px 16px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    cursor: "pointer",
    zIndex: 9999,
  },
  icon: {
    fontSize: "18px",
  },

  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.15)",
    backdropFilter: "blur(2px)",
    zIndex: 9998,
  },

  panel: {
    position: "fixed",
    top: isMobile ? "0" : "100px",
    right: isMobile ? "0" : "0",
    width: isMobile ? "100%" : "360px",
    height: isMobile ? "100%" : "70%",
    background: "#fff",
    borderRadius: isMobile ? "0" : "16px",
    boxShadow: "-5px 0 20px rgba(0,0,0,0.2)",
    transition: "0.3s ease",
    zIndex: 9999,
    display: "flex",
    flexDirection: "column",
  },

  header: {
    padding: "15px",
    background: "#2b3a67",
    color: "#fff",
    display: "flex",
    justifyContent: "space-between",
    borderTopLeftRadius: "6px",
    borderTopRightRadius: "6px",
  },

  close: {
    cursor: "pointer",
  },

  section: {
    padding: "15px",
    flex: 1,
    overflowY: "auto",

    scrollbarWidth: "none", // Firefox
    msOverflowStyle: "none", // IE & Edge
  },

  faqItem: {
    borderBottom: "1px solid #eee",
    padding: "10px 0",
  },

  faqQuestion: {
    display: "flex",
    justifyContent: "space-between",
    cursor: "pointer",
    fontSize: "14px",
  },

  faqAnswer: {
    marginTop: "6px",
    fontSize: "13px",
    color: "#555",
  },

  footer: {
    padding: "15px",
    background: "#f5f7fb",
    marginTop: "auto",
  },

  needMore: {
    textAlign: "center",
    marginBottom: "10px",
  },

  contactBtn: {
    width: "100%",
    padding: "12px",
    background: "#2b3a67",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  bottomSheet: {
    position: "fixed",
    right: isMobile ? "0" : "0",
    left: isMobile ? "0" : "auto",
    bottom: isMobile ? "0" : "90px",
    width: isMobile ? "100%" : "360px",
    background: "#ffffff",
    borderRadius: isMobile ? "20px 20px 0 0" : "10px",
    // boxShadow: "0 10px 40px rgba(0,0,0,0.20)",
    transition: "0.3s ease",
    border: "1px solid #eee",
    zIndex: 10000,
    padding: "15px",
  },

  sheetHeader: {
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "1px solid #eee",
    paddingBottom: "12px",
    marginBottom: "10px",
    fontWeight: "600",
    fontSize: "16px",
  },

  sheetItem: {
    padding: "14px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    borderRadius: "10px",
    marginBottom: "8px",
    background: "#f8f9fc",
    transition: "0.2s",
  },

  arrow: {
    color: "#999",
    fontSize: "18px",
  },

  subText: {
    fontSize: "12px",
    color: "#777",
  },

  errorText: {
    color: "red",
    fontSize: "12px",
    marginTop: "3px",
  },
};

export default HelpSupport;
