import "../Component2/css/Returnpolicy.css";
import SEO from "../SEO";
import { seoConfig } from "../config/seoConfig";
import logo from "../Component2/logo/hirelink.png";

function Returnpolicy() {
  return (
    <>
      <SEO
        title={seoConfig.c_return.title}
        description={seoConfig.c_return.description}
      />
      <div className="crp-body">
        <div
          className="crp-wrapper"
          style={{ backgroundImage: `url(${logo})` }}
        >
          <div className="crp-container">
            <h1 className="crp-title fw-bold">Candidate Return Policy</h1>
            <h6 className="crp-sub-title fw-bold">
              Hirelink Infotech Pvt Ltd – HirelinkInfo Pharma Job Portal
            </h6>
            <h3 className="crp-heading">1. Introduction</h3>
            <p className="crp-text">
              This Return & Refund Policy applies to all candidates registering
              on <span className="text-bold">HirelinkInfo</span> (
              <a href="https://hirelinkinfo.com">https://hirelinkinfo.com</a>){" "}
              and its{" "}
              <span className="text-bold">
                {" "}
                Android and iOS mobile applications.
              </span>
            </p>
            <p className="crp-text">
              HirelinkInfo is a{" "}
              <span className="text-bold"> pharma job portal</span> designed to
              connect pharmaceutical job seekers with employers, recruiters, and
              career opportunities across India. By registering on our platform,
              you agree to the terms outlined in this policy.
            </p>
            <h3 className="crp-heading">2. Candidate Registration Fee</h3>
            <p className="crp-text">
              To access premium features of the HirelinkInfo job portal,
              candidates are required to pay:
            </p>
            <ul className="crp-list">
              <li className="crp-bold">₹300 Registration Fee</li>
              <li className="crp-bold">18% GST applicable</li>
              <li>
                Total payable amount as per invoice at the time of payment
              </li>
            </ul>
            <p className="crp-text">
              This is a{" "}
              <span className="text-bold">
                one-time candidate signup fee.
              </span>{" "}
            </p>
            <h3 className="crp-heading">3. Strict Non-Refundable Policy</h3>
            <p className="crp-text">
              The{" "}
              <span className="text-bold">
                ₹300 + 18% GST registration fee is 100% non-refundable
              </span>{" "}
              under all circumstances.
            </p>
            <p className="crp-text">Refunds will NOT be provided for:</p>
            <ul className="crp-list">
              <li> Not getting selected by employers </li>
              <li> Change of mind after registration </li>
              <li> Profile inactivity </li>
              <li> Dissatisfaction with job availability </li>
              <li> Failure to attend interviews </li>
              <li> Account suspension due to violation of platform rules </li>
              <li> Accidental payments made by the candidate </li>
            </ul>
            <p className="crp-text">
              Once payment is successfully processed, it is considered final and
              non-reversible.
            </p>
            <h3 className="crp-heading">4. Nature of Service</h3>
            <p className="crp-text">
              HirelinkInfo operates solely as a{" "}
              <span className="text-bold">digital job portal platform</span> for
              pharma candidates and employers.
            </p>
            <p className="crp-text"> We do NOT:</p>
            <ul className="crp-list">
              <li> Guarantee job placement </li>
              <li> Guarantee interview calls </li>
              <li> Guarantee salary packages </li>
              <li> Act as an employer or recruitment agency </li>
            </ul>
            <p className="crp-text">
              The registration fee grants access to platform features and
              profile visibility within the pharma job portal ecosystem. It does
              not guarantee employment outcomes.
            </p>
            <h3 className="crp-heading">5. Payment Processing</h3>
            <p className="crp-text">All payments are:</p>
            <ul className="crp-list">
              <li> Collected in advance</li>
              <li> Processed through secure third-party payment gateways </li>
              <li> Subject to applicable GST laws </li>
            </ul>
            <p className="crp-text">HirelinkInfo is not responsible for:</p>
            <ul className="crp-list">
              <li> Bank delays </li>
              <li> Payment gateway technical issues </li>
              <li>
                {" "}
                Transaction failures due to incorrect details entered by the
                candidate{" "}
              </li>
            </ul>
            <h3 className="crp-heading">6. Exceptional Technical Errors</h3>
            <p className="crp-text">
              Refund consideration may only occur in rare cases where:
            </p>
            <ul className="crp-list">
              <li>
                {" "}
                A verified duplicate payment is made for the same account{" "}
              </li>
              <li>
                A payment is successfully debited but the account is not
                activated due to technical error
              </li>
            </ul>
            <p className="crp-text">
              Such cases must be reported within{" "}
              <span className="text-bold">48 hours</span> of payment with valid
              proof. Any decision regarding refund approval remains solely at
              the discretion of Hirelink Infotech Pvt Ltd.
            </p>
            <h3 className="crp-heading">
              7. Account Suspension & Policy Violations
            </h3>
            <p className="crp-text">
              If a candidate account is suspended or terminated due to:
            </p>
            <ul className="crp-list">
              <li> False information submission </li>
              <li> Interview no-shows </li>
              <li> Misuse of the job portal</li>
              <li> Fraudulent activity </li>
              <li> Violation of terms & conditions</li>
            </ul>
            <p className="crp-text">
              No refund will be issued under any circumstances.
            </p>

            <h3 className="crp-heading">
              8. App Store Compliance (Android & iOS)
            </h3>
            <p className="crp-text">
              For users downloading the HirelinkInfo mobile application via:
            </p>
            <ul className="crp-list">
              <li> Google Play Store (Android) </li>
              <li> Apple App Store (iOS) </li>
            </ul>
            <p className="crp-text">Please note:</p>
            <ul className="crp-list">
              <li> Digital service fees are governed by this policy</li>
              <li>
                App store operators are not responsible for refunds related to
                job portal registration fees
              </li>
              <li>
                All refund-related decisions are managed exclusively by Hirelink
                Infotech Pvt Ltd.
              </li>
            </ul>
            <h3 className="crp-heading">9. GST Compliance</h3>
            <p className="crp-text">
              The candidate registration fee includes applicable{" "}
              <span className="text-bold">18% GST</span> as per Indian taxation
              laws.
            </p>
            <p className="crp-text">
              GST once remitted to government authorities cannot be reversed
              unless legally permitted.
            </p>
            <h3 className="crp-heading">10. Policy Updates</h3>
            <p className="crp-text">
              Hirelink Infotech Pvt Ltd reserves the right to:
            </p>
            <ul className="crp-list">
              <li> Modify or update this Return & Refund Policy</li>
              <li> Change pricing structure</li>
              <li> Introduce new subscription plans</li>
            </ul>
            <p className="crp-text">
              Updates may occur without prior notice. Continued use of the job
              portal implies acceptance of revised terms.
            </p>
            <h3 className="crp-heading">11. Legal Jurisdiction</h3>
            <p className="crp-text">
              All disputes relating to payments, refunds, or services shall be
              subject to:
            </p>
            <ul className="crp-list">
              <li> Indian laws </li>
              <li> Jurisdiction of Nashik, Maharashtra Courts </li>
            </ul>

            <h3 className="crp-heading">12. Acceptance of Policy</h3>
            <p className="crp-text">
              By completing payment of the{" "}
              <span className="text-bold">
                ₹300 + 18% GST non-refundable candidate registration fee,
              </span>{" "}
              you confirm that:
            </p>
            <ul className="crp-list">
              <li> You have read this Return & Refund Policy </li>
              <li> You understand that the fee is strictly non-refundable</li>
              <li> You agree to all stated terms</li>
            </ul>

            <h3 className="crp-heading fw-bold">
              Important Reminder for Pharma Job Seekers
            </h3>
            <p className="crp-text">
              HirelinkInfo is a professional{" "}
              <span className="text-bold"> pharma job portal </span>created to
              improve hiring transparency and streamline job opportunities in
              QA, QC, Production, R&D, Regulatory Affairs, Sales, and other
              pharmaceutical domains.
            </p>
            <p className="crp-text">
              Your registration fee provides platform access — not a job
              guarantee.
            </p>
            <p className="crp-footer-text">
              © {new Date().getFullYear()} All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Returnpolicy;
