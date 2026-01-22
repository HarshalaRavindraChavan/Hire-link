import React, { useState } from "react";
import SEO from "../SEO";
import { seoConfig } from "../config/seoConfig";
import "../Component2/css/Help.css";


function Help() {
  const [activeTab, setActiveTab] = useState("Candidate");

  return (
    <>
      <SEO
        title={seoConfig.help.title}
        description={seoConfig.help.description}
      />
      
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
              activeTab === "Employer"
                ? "hl-tab-btn hl-tab-active"
                : "hl-tab-btn"
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
                            What is Hirelinkinfo.com?
                          </h3>
                          <div className="hl-faq-answer text-start">
                            <p>
                              Hirelinkinfo.com is an online job portal platform
                              that helps candidates search for jobs, create
                              profiles, and apply for job opportunities posted
                              by employers.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="hl-faq-box">
                        <div className="hl-faq-item">
                          <h3 className="hl-faq-question">
                            <i className="fa fa-question-circle"></i>
                            Who can register as a candidate?
                          </h3>
                          <div className="hl-faq-answer text-start">
                            <p>
                              Any individual who is looking for a job,
                              internship, or career opportunity can register as
                              a candidate on Hirelinkinfo.com.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="hl-faq-box">
                        <div className="hl-faq-item">
                          <h3 className="hl-faq-question">
                            <i className="fa fa-question-circle"></i>
                            Is there a signup fee for candidates?
                          </h3>
                          <div className="hl-faq-answer text-start">
                            <p>
                              Yes, candidates are required to pay a one-time
                              signup/registration fee of ₹300 to create an
                              account and access candidate services.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="hl-faq-box">
                        <div className="hl-faq-item">
                          <h3 className="hl-faq-question">
                            <i className="fa fa-question-circle"></i>
                            Is the ₹300 signup fee refundable?
                          </h3>
                          <div className="hl-faq-answer text-start">
                            <p>
                              No. The candidate signup fee of ₹300 is
                              non-refundable once the account is created and
                              access to the platform is provided.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="hl-faq-box">
                        <div className="hl-faq-item">
                          <h3 className="hl-faq-question">
                            <i className="fa fa-question-circle"></i>
                            What services do candidates get after signup?
                          </h3>
                          <div className="hl-faq-answer text-start">
                            <p>
                              After signup, candidates can create a profile,
                              search jobs, apply for available job openings, and
                              access other candidate-related features provided
                              on the platform.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="hl-faq-box">
                        <div className="hl-faq-item">
                          <h3 className="hl-faq-question">
                            <i className="fa fa-question-circle"></i>
                            Does Hirelinkinfo.com guarantee a job or interview?
                          </h3>
                          <div className="hl-faq-answer text-start">
                            <p>
                              No. Hirelinkinfo.com does not guarantee job
                              placement, interview calls, or employment. The
                              platform only connects candidates with employers.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="hl-faq-box">
                        <div className="hl-faq-item">
                          <h3 className="hl-faq-question">
                            <i className="fa fa-question-circle"></i>
                            Can I cancel my candidate account and get a refund?
                          </h3>
                          <div className="hl-faq-answer text-start">
                            <p>
                              No. Once the account is activated, cancellation of
                              the account does not result in any refund.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="hl-faq-box">
                        <div className="hl-faq-item">
                          <h3 className="hl-faq-question">
                            <i className="fa fa-question-circle"></i>
                            Are there any additional charges for candidates?
                          </h3>
                          <div className="hl-faq-answer text-start">
                            <p>
                              Currently, only the signup fee applies. If any
                              optional paid services are introduced in the
                              future, the details and charges will be clearly
                              communicated before purchase.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="hl-faq-box">
                        <div className="hl-faq-item">
                          <h3 className="hl-faq-question">
                            <i className="fa fa-question-circle"></i>
                            What happens if my payment is deducted but my
                            account is not activated?
                          </h3>
                          <div className="hl-faq-answer text-start">
                            <p>
                              In case of payment deduction without account
                              activation due to a technical issue, candidates
                              can contact support within 7 working days with
                              payment proof. Refunds or resolutions will be
                              provided after verification.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="hl-faq-box">
                        <div className="hl-faq-item">
                          <h3 className="hl-faq-question">
                            <i className="fa fa-question-circle"></i>
                            How long does it take to process a refund in
                            exceptional cases?
                          </h3>
                          <div className="hl-faq-answer text-start">
                            <p>
                              If a refund is approved due to a technical or
                              duplicate payment issue, it will be processed
                              within 7 to 10 working days to the original
                              payment method.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="hl-faq-box">
                        <div className="hl-faq-item">
                          <h3 className="hl-faq-question">
                            <i className="fa fa-question-circle"></i>
                            Is my personal information safe on the platform?
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
                            Can employers directly contact candidates?
                          </h3>
                          <div className="hl-faq-answer text-start">
                            <p>
                              Employers may contact candidates based on job
                              applications or profile visibility, as per the
                              platform’s rules and privacy settings.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="hl-faq-box">
                        <div className="hl-faq-item">
                          <h3 className="hl-faq-question">
                            <i className="fa fa-question-circle"></i>
                            What if I face issues while using the platform?
                          </h3>
                          <div className="hl-faq-answer text-start">
                            <p>
                              Candidates can contact the support team through
                              the official support options available on
                              Hirelinkinfo.com.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="hl-faq-box">
                        <div className="hl-faq-item">
                          <h3 className="hl-faq-question">
                            <i className="fa fa-question-circle"></i>
                            Can my account be suspended?
                          </h3>
                          <div className="hl-faq-answer text-start">
                            <p>
                              Yes. Candidate accounts may be suspended or
                              terminated if there is misuse of the platform,
                              false information, or violation of Terms &
                              Conditions. No refund will be provided in such
                              cases.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="hl-faq-box">
                        <div className="hl-faq-item">
                          <h3 className="hl-faq-question">
                            <i className="fa fa-question-circle"></i>
                            Can Hirelinkinfo.com change rules or fees in the
                            future?
                          </h3>
                          <div className="hl-faq-answer text-start">
                            <p>
                              Yes. Hirelinkinfo.com reserves the right to modify
                              policies, features, or fees at any time. Updated
                              information will be published on the website.
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
                            What is Hirelinkinfo.com?
                          </h3>
                          <div className="hl-faq-answer text-start">
                            <p>
                              Hirelinkinfo.com is an online job portal platform
                              that helps employers post job openings, manage
                              applications, and connect with potential
                              candidates.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="hl-faq-box">
                        <div className="hl-faq-item">
                          <h3 className="hl-faq-question">
                            <i className="fa fa-question-circle"></i>
                            Who can register as an employer?
                          </h3>
                          <div className="hl-faq-answer text-start">
                            <p>
                              Any company, organization, consultant, or
                              individual recruiter looking to hire candidates
                              can register as an employer on Hirelinkinfo.com.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="hl-faq-box">
                        <div className="hl-faq-item">
                          <h3 className="hl-faq-question">
                            <i className="fa fa-question-circle"></i>
                            Is there a signup or registration fee for employers?
                          </h3>
                          <div className="hl-faq-answer text-start">
                            <p>
                              Yes. Employers are required to pay a one-time
                              signup/registration fee of ₹5000 to create an
                              employer account on Hirelinkinfo.com.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="hl-faq-box">
                        <div className="hl-faq-item">
                          <h3 className="hl-faq-question">
                            <i className="fa fa-question-circle"></i>
                            Is the ₹5000 employer signup fee refundable?
                          </h3>
                          <div className="hl-faq-answer text-start">
                            <p>
                              No. The employer signup fee of ₹5000 is strictly
                              non-refundable once the employer account is
                              created and services are activated.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="hl-faq-box">
                        <div className="hl-faq-item">
                          <h3 className="hl-faq-question">
                            <i className="fa fa-question-circle"></i>
                            What services are included after employer signup?
                          </h3>
                          <div className="hl-faq-answer text-start">
                            <p>
                              After signup, employers can create a company
                              profile, post job vacancies, view candidate
                              profiles, manage applications, and access other
                              employer-related recruitment tools.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="hl-faq-box">
                        <div className="hl-faq-item">
                          <h3 className="hl-faq-question">
                            <i className="fa fa-question-circle"></i>
                            Does Hirelinkinfo.com guarantee successful hiring or
                            candidate responses?
                          </h3>
                          <div className="hl-faq-answer text-start">
                            <p>
                              No. Hirelinkinfo.com does not guarantee hiring
                              success, candidate responses, or job fulfillment.
                              The platform only provides a medium to connect
                              employers and candidates.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="hl-faq-box">
                        <div className="hl-faq-item">
                          <h3 className="hl-faq-question">
                            <i className="fa fa-question-circle"></i>
                            Can an employer cancel the account and request a
                            refund?
                          </h3>
                          <div className="hl-faq-answer text-start">
                            <p>
                              No. Once the employer account is activated,
                              cancellation of the account or services does not
                              result in any refund or partial refund.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="hl-faq-box">
                        <div className="hl-faq-item">
                          <h3 className="hl-faq-question">
                            <i className="fa fa-question-circle"></i>
                            Are there any additional charges for employers?
                          </h3>
                          <div className="hl-faq-answer text-start">
                            <p>
                              Yes. Additional charges may apply for premium job
                              postings, featured listings, subscription
                              upgrades, or other paid recruitment services. All
                              charges will be displayed before payment.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="hl-faq-box">
                        <div className="hl-faq-item">
                          <h3 className="hl-faq-question">
                            <i className="fa fa-question-circle"></i>
                            What if the payment is deducted but the employer
                            account is not activated?
                          </h3>
                          <div className="hl-faq-answer text-start">
                            <p>
                              In case of payment deduction without account
                              activation due to a technical issue, employers
                              must contact support within 7 working days with
                              valid payment proof.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="hl-faq-box">
                        <div className="hl-faq-item">
                          <h3 className="hl-faq-question">
                            <i className="fa fa-question-circle"></i>
                            How long does it take to process a refund in
                            exceptional cases?
                          </h3>
                          <div className="hl-faq-answer text-start">
                            <p>
                              If a refund is approved due to duplicate payment
                              or technical error, it will be processed within 7
                              to 10 working days to the original payment method.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="hl-faq-box">
                        <div className="hl-faq-item">
                          <h3 className="hl-faq-question">
                            <i className="fa fa-question-circle"></i>
                            Can employers directly contact candidates?
                          </h3>
                          <div className="hl-faq-answer text-start">
                            <p>
                              Yes. Employers may contact candidates based on job
                              applications or profile access, subject to
                              platform rules and privacy policies.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="hl-faq-box">
                        <div className="hl-faq-item">
                          <h3 className="hl-faq-question">
                            <i className="fa fa-question-circle"></i>
                            Can an employer account be suspended?
                          </h3>
                          <div className="hl-faq-answer text-start">
                            <p>
                              Yes. Employer accounts may be suspended or
                              terminated if fake job postings, misleading
                              information, or violation of Terms & Conditions is
                              detected. No refund will be provided in such
                              cases.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="hl-faq-box">
                        <div className="hl-faq-item">
                          <h3 className="hl-faq-question">
                            <i className="fa fa-question-circle"></i>
                            Is candidate data protected?
                          </h3>
                          <div className="hl-faq-answer text-start">
                            <p>
                              Yes. Employers are required to use candidate data
                              responsibly and strictly for recruitment purposes.
                              Any misuse may lead to account suspension or legal
                              action.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="hl-faq-box">
                        <div className="hl-faq-item">
                          <h3 className="hl-faq-question">
                            <i className="fa fa-question-circle"></i>
                            Can Hirelinkinfo.com change employer fees or
                            services?
                          </h3>
                          <div className="hl-faq-answer text-start">
                            <p>
                              Yes. Hirelinkinfo.com reserves the right to change
                              pricing, services, or policies at any time.
                              Changes will be effective upon publication on the
                              website.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="hl-faq-box">
                        <div className="hl-faq-item">
                          <h3 className="hl-faq-question">
                            <i className="fa fa-question-circle"></i>
                            How can employers contact support?
                          </h3>
                          <div className="hl-faq-answer text-start">
                            <p>
                              Employers can contact Hirelinkinfo.com through the
                              official support channels available on the website
                              for assistance.
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
    </>
  );
}

export default Help;
