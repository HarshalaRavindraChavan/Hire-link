import React, { useState } from "react";
import "../Component2/css/Help.css";

function Help() {
  const [activeTab, setActiveTab] = useState("Candidate");

  return (
    <div className="hl-tabs-wrapper mt-5">
      {/* Tabs Header */}
      <div className="hl-tabs-header">
        <button
          className={
            activeTab === "Candidate"
              ? "hl-tab-btn hl-tab-active"
              : "hl-tab-btn"
          }
          onClick={() => setActiveTab("Candidate")}
        >
          Candidate
        </button>

        <button
          className={
            activeTab === "Employer" ? "hl-tab-btn hl-tab-active" : "hl-tab-btn"
          }
          onClick={() => setActiveTab("Employer")}
        >
          Employer
        </button>

        {/* <button
          className={
            activeTab === "Other" ? "hl-tab-btn hl-tab-active" : "hl-tab-btn"
          }
          onClick={() => setActiveTab("Other")}
        >
          Other
        </button> */}
      </div>

      {/* Tabs Content */}
      <div className="hl-tabs-content">
        {activeTab === "Candidate" && (
          <div className="hl-tab-panel">
            {/* Candidate */}
            <div className="hl-faq-section">
              <div className="container">
                <div className="row text-center">
                  <div className="col-md-12">
                    <div className="hl-faq-box">
                      <div className="hl-faq-item">
                        <h3 className="hl-faq-question">
                          <i className="fa fa-question-circle"></i>
                          Are my profits guaranteed?
                        </h3>
                        <div className="hl-faq-answer text-start">
                          <p>
                            Yes. Our investment model prioritizes diversified
                            ventures and ethical distribution, ensuring
                            consistent ROI.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="hl-faq-box">
                      <div className="hl-faq-item">
                        <h3 className="hl-faq-question">
                          <i className="fa fa-question-circle"></i>
                          Do I get voting rights?
                        </h3>
                        <div className="hl-faq-answer text-start">
                          <p>
                            Yes. Our investment model prioritizes diversified
                            ventures and ethical distribution, ensuring
                            consistent ROI.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="hl-faq-box">
                      <div className="hl-faq-item">
                        <h3 className="hl-faq-question">
                          <i className="fa fa-question-circle"></i>
                          Do I get voting rights?
                        </h3>
                        <div className="hl-faq-answer text-start">
                          <p>
                            Yes. Our investment model prioritizes diversified
                            ventures and ethical distribution, ensuring
                            consistent ROI.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="hl-faq-box">
                      <div className="hl-faq-item">
                        <h3 className="hl-faq-question">
                          <i className="fa fa-question-circle"></i>
                          Do I get voting rights?
                        </h3>
                        <div className="hl-faq-answer text-start">
                          <p>
                            Yes. Our investment model prioritizes diversified
                            ventures and ethical distribution, ensuring
                            consistent ROI.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "Employer" && (
          <div className="hl-tab-panel">
            {/* Employer */}
            <div className="hl-faq-section">
              <div className="container">
                <div className="row text-center">
                  <div className="col-md-12">
                    <div className="hl-faq-box">
                      <div className="hl-faq-item">
                        <h3 className="hl-faq-question">
                          <i className="fa fa-question-circle"></i>
                          Are my profits guaranteed?
                        </h3>
                        <div className="hl-faq-answer text-start">
                          <p>
                            Yes. Our investment model prioritizes diversified
                            ventures and ethical distribution, ensuring
                            consistent ROI.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="hl-faq-box">
                      <div className="hl-faq-item">
                        <h3 className="hl-faq-question">
                          <i className="fa fa-question-circle"></i>
                          Do I get voting rights?
                        </h3>
                        <div className="hl-faq-answer text-start">
                          <p>
                            Absolutely—every member acts as a partner, with
                            equal rights and transparency in governance.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="hl-faq-box">
                      <div className="hl-faq-item">
                        <h3 className="hl-faq-question">
                          <i className="fa fa-question-circle"></i>
                          Do I get voting rights?
                        </h3>
                        <div className="hl-faq-answer text-start">
                          <p>
                            Absolutely—every member acts as a partner, with
                            equal rights and transparency in governance.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="hl-faq-box">
                      <div className="hl-faq-item">
                        <h3 className="hl-faq-question">
                          <i className="fa fa-question-circle"></i>
                          Do I get voting rights?
                        </h3>
                        <div className="hl-faq-answer text-start">
                          <p>
                            Absolutely—every member acts as a partner, with
                            equal rights and transparency in governance.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="hl-faq-box">
                      <div className="hl-faq-item">
                        <h3 className="hl-faq-question">
                          <i className="fa fa-question-circle"></i>
                          Do I get voting rights?
                        </h3>
                        <div className="hl-faq-answer text-start">
                          <p>
                            Absolutely—every member acts as a partner, with
                            equal rights and transparency in governance.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* {activeTab === "Other" && (
          <div className="hl-tab-panel">
            <div className="hl-faq-section">
              <div className="container">
                <div className="row text-center">
                  <div className="col-md-12">
                    <div className="hl-faq-box">
                      <div className="hl-faq-item">
                        <h3 className="hl-faq-question">
                          <i className="fa fa-question-circle"></i>
                          Are my profits guaranteed?
                        </h3>
                        <div className="hl-faq-answer">
                          <p>
                            Yes. Our investment model prioritizes diversified
                            ventures and ethical distribution, ensuring
                            consistent ROI.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="hl-faq-box">
                      <div className="hl-faq-item">
                        <h3 className="hl-faq-question">
                          <i className="fa fa-question-circle"></i>
                          Do I get voting rights?
                        </h3>
                        <div className="hl-faq-answer">
                          <p>
                            Absolutely—every member acts as a partner, with
                            equal rights and transparency in governance.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="hl-faq-box">
                      <div className="hl-faq-item">
                        <h3 className="hl-faq-question">
                          <i className="fa fa-question-circle"></i>
                          Do I get voting rights?
                        </h3>
                        <div className="hl-faq-answer">
                          <p>
                            Absolutely—every member acts as a partner, with
                            equal rights and transparency in governance.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="hl-faq-box">
                      <div className="hl-faq-item">
                        <h3 className="hl-faq-question">
                          <i className="fa fa-question-circle"></i>
                          Do I get voting rights?
                        </h3>
                        <div className="hl-faq-answer">
                          <p>
                            Absolutely—every member acts as a partner, with
                            equal rights and transparency in governance.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="hl-faq-box">
                      <div className="hl-faq-item">
                        <h3 className="hl-faq-question">
                          <i className="fa fa-question-circle"></i>
                          Do I get voting rights?
                        </h3>
                        <div className="hl-faq-answer">
                          <p>
                            Absolutely—every member acts as a partner, with
                            equal rights and transparency in governance.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
}

export default Help;
