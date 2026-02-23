import "../Component3/css/Privacypolicies.css";
import SEO from "../SEO";
import { seoConfig } from "../config/seoConfig";
import logo from "../Component2/logo/hirelink.png";

function Returnpolicy() {
  return (
    <>
      <SEO
        title={seoConfig.e_return.title}
        description={seoConfig.e_return.description}
      />
      <div className="erp-body">
        <div
          className="erp-wrapper"
          style={{ backgroundImage: `url(${logo})` }}
        >
          <div className="erp-container">
            <h2 className="erp-title">Employer Return & Refund Policy</h2>
            <h6
              className=""
              style={{ textAlign: "center", fontWeight: "bold" }}
            >
              PharmaJobsHireLink – Official Pharma Job Portal Policy
            </h6>

            <h3 className="erp-heading">1. Platform Purpose</h3>
            <p className="erp-text">
              This Return & Refund Policy governs payments made by employers,
              recruiters, HR teams, and pharmaceutical companies using the
              <b>PharmaJobsHireLink pharma job portal</b> for recruitment
              services, resume access, and candidate search tools.
            </p>

            <p className="erp-text">
              By registering or making payment on the platform, you confirm that
              you have read, understood, and agreed to this policy in full.
            </p>

            <h3 className="erp-heading">2. Nature of Platform Service</h3>
            <p className="erp-text">
              PharmaJobsHireLink is a <b>digital pharma job portal platform,</b>{" "}
              not a recruitment agency or placement consultancy.
            </p>
            <p className="erp-text">
              Payments made by employers are solely for:
              <br></br>
              <br></br>● Portal access<br></br>● Resume database search
              <br></br>● Candidate profile visibility
              <br></br>● Recruitment tools
            </p>
            <p className="erp-text">
              Payments are{" "}
              <b>
                not for guaranteed hiring, interviews, or candidate response.
              </b>
            </p>

            <h3 className="erp-heading">3. Employer Fees Structure</h3>
            <p className="erp-text">
              The platform provides paid employer services with the following
              charges:
            </p>
            <table class="tblx9-wrapper">
              <thead class="tblx9-head">
                <tr class="tblx9-row">
                  <th class="tblx9-th">Service</th>
                  <th class="tblx9-th">Fee</th>
                  <th class="tblx9-th">GST</th>
                  <th class="tblx9-th">Total</th>
                </tr>
              </thead>

              <tbody class="tblx9-body">
                <tr class="tblx9-row">
                  <td class="tblx9-td">Employer Registration</td>
                  <td class="tblx9-td">₹5000</td>
                  <td class="tblx9-td">18%</td>
                  <td class="tblx9-td">Non-Refundable</td>
                </tr>

                <tr class="tblx9-row">
                  <td class="tblx9-td">Staff Account Creation</td>
                  <td class="tblx9-td">₹2500</td>
                  <td class="tblx9-td">18%</td>
                  <td class="tblx9-td">Non-Refundable</td>
                </tr>

                <tr className="tblx9-row">
                  <td class="tblx9-td">Resume Download</td>
                  <td class="tblx9-td">₹60</td>
                  <td class="tblx9-td">18%</td>
                  <td class="tblx9-td">Non-Refundable</td>
                </tr>
              </tbody>
            </table>

            <p className="erp-text">
              All amounts must be paid 100% in advance before service
              activation.
            </p>

            <h3 className="erp-heading">4. Strict No Refund Policy</h3>
            <p className="erp-text">
              All payments made to PharmaJobsHireLink are final and
              non-refundable under any condition.
              <br></br>
              <br></br>Refund requests will not be accepted for reasons
              including but not limited to:
            </p>
            <p className="erp-text">
              ● Employer changed hiring plans<br></br> ● No suitable candidates
              found <br></br>● Low response rate from candidates<br></br> ●
              Hiring completed elsewhere
              <br></br> ● Account inactivity
              <br></br> ● Staff misuse of credits
              <br></br> ● Mistaken payment
              <br></br> ● Technical misunderstanding of features
              <br></br> ● Dissatisfaction with candidate quality
            </p>

            <p className="erp-text">
              Once payment is successfully processed,{" "}
              <b>
                no reversal, cancellation, or credit adjustment will be provided
              </b>
            </p>

            <h3 className="erp-heading">5. GST Non-Reversible Clause</h3>
            <p className="erp-text">
              All employer payments include 18% GST as mandated by Indian tax
              law.
              <br></br>
              <br></br>After invoice generation:
            </p>
            <p className="erp-text">
              ● GST is remitted to authorities<br></br>● It cannot be refunded
              or reversed<br></br>● The platform cannot modify tax invoices once
              issued
            </p>

            <h3 className="erp-heading">6. Resume Download Charges Policy</h3>
            <p className="erp-text">
              Employers and authorized staff can search and download resumes
              using platform credits.
              <br></br>
              <br></br>Important rules:
            </p>
            <p className="erp-text">
              ● Each resume download costs ₹60 + GST<br></br>● Charges apply
              instantly when resume is accessed<br></br>● Credits once used
              cannot be reversed
              <br></br>● Charges apply even if candidate is not hired
              <br></br>
              <br></br>
              This fee is for data access, not for hiring success
            </p>

            <h3 className="erp-heading">7. Staff Account Payment Policy</h3>
            <p className="erp-text">
              Employers may create internal recruiter or HR staff accounts
              <br></br>
              <br></br>Conditions:
              <br></br>
              <br></br>● Each staff login costs ₹2500 + GST
              <br></br>● Payment is non-refundable<br></br>● Staff access cannot
              be transferred to another company
              <br></br>● Employers are responsible for all staff actions
              <br></br>
              <br></br>Deleting a staff account does not qualify for refund.
            </p>

            <h3 className="erp-heading">
              8. Payment Errors or Duplicate Transactions
            </h3>
            <p className="erp-text">
              Refund review will only be considered if:
              <br></br>
              <br></br>● Exact duplicate payment is made for the same service
              <br></br>● Payment is deducted but account is not activated due to
              verified system error<br></br>
              <br></br>Such cases must be reported within 48 hours with valid
              proof.
              <br></br>
              <br></br>Approval of such requests remains solely at company
              discretion.
            </p>

            <h3 className="erp-heading">9. Suspension or Termination</h3>
            <p className="erp-text">
              No refund will be issued if employer account is suspended due to:
            </p>
            <p className="erp-text">
              ● Policy violation
              <br></br>● Fraudulent activity<br></br>● Fake job postings
              <br></br>● Candidate complaints
              <br></br>● Data misuse
              <br></br>● Terms violation
            </p>
            <p className="erp-text">
              Termination automatically cancels all remaining credits without
              compensation.
            </p>

            <h3 className="erp-heading">10. Third-Party Payment Gateways</h3>
            <p className="erp-text">
              Payments are processed through secure external gateways.
              <br></br>
              <br></br>PharmaJobsHireLink is not responsible for:<br></br>
              <br></br>● Bank delays
              <br></br> ● Server timeouts
              <br></br> ● Network issues
              <br></br> ● Payment failures caused by incorrect details
              <br></br>
              <br></br>
              Employers must verify transaction details before confirming
              payment.
            </p>

            <h3 className="erp-heading">11. Mobile App Payment Compliance</h3>
            <p className="erp-text">
              Employers using the mobile platform via
              <br></br>
              <b>Google Play Store</b> and
              <br></br>
              <b>Apple App Store</b>
              <br></br>● Platform services are digital and non-refundable
              <br></br>● App stores do not manage or approve refunds for portal
              services
              <br></br>● Refund decisions are handled only by PharmaJobsHireLink
            </p>

            <h3 className="erp-heading">12. No Service Guarantee Disclaimer</h3>
            <p className="erp-text">
              Payment for employer access does not guarantee:
              <br></br>
              <br></br>● Hiring success<br></br> ● Interview scheduling
              <br></br> ● Candidate acceptance
              <br></br> ● Databases
              <br></br> ● Candidate availability
              <br></br>
              <br></br>
              The platform provides technology tools only, not recruitment
              outcomes.
            </p>

            <h3 className="erp-heading">13. Legal Enforceability</h3>
            <p className="erp-text">
              By making payment, employers legally confirm that::
            </p>
            <p className="erp-text">
              ● They understand all fees are non-refundable<br></br>● They
              accept the pricing model
              <br></br>● They agree not to initiate payment disputes or
              chargebacks without valid legal basis
              <br></br>
              <br></br>Unjustified payment disputes may result in:
              <br></br>● Permanent account suspension
              <br></br>● Legal recovery action
              <br></br>● Restriction from future platform use
            </p>

            <h3 className="erp-heading">14. Policy Modification Rights</h3>
            <p className="erp-text">
              PharmaJobsHireLink reserves the right to:
            </p>
            <p className="erp-text">
              ● Change pricing<br></br>● Modify services<br></br>● Update refund
              rules<br></br>● CIntroduce new plans<br></br>
              <br></br>Updates may be made at any time without prior notice.
              Continued use of the pharma job portal indicates acceptance of
              revised policies.
            </p>

            <h3 className="erp-heading">15. Jurisdiction</h3>
            <p className="erp-text">
              All payment-related disputes shall fall under the legal
              jurisdiction of courts located in <b>Nashik, India.</b>
            </p>

            <h3 className="erp-heading">16. Acceptance Confirmation</h3>
            <p className="erp-text">
              By completing payment on PharmaJobsHireLink, the employer
              confirms:
            </p>
            <p className="erp-text">
              ● Full understanding of this Return Policy
              <br></br>● Acceptance of strict non-refund rules<br></br>●
              Agreement with all platform payment terms
            </p>

            <p className="erp-footer-text" style={{ fontWeight: "bold" }}>
              © {new Date().getFullYear()} All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Returnpolicy;
