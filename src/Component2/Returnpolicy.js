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
            <h3 className="crp-heading">Applicability</h3>
            <p className="crp-text">
              This Return & Refund Policy applies only to candidates (job
              seekers) who register and use Hirelinkinfo.com for job search,
              profile creation, job applications, and related career services.
            </p>
            <h3 className="crp-heading">Candidate Signup Fee</h3>

            <p className="crp-text">
              Candidates are required to pay a one-time signup/registration fee
              of ₹300 to create an account and access candidate-related services
              on Hirelinkinfo.com.
            </p>

            <h3 className="crp-heading">Nature of Services</h3>

            <p className="crp-text">
              All services provided to candidates are digital in nature,
              including online profile creation, job applications, and access to
              job-related features.
            </p>

            <h3 className="crp-heading">No Return Policy</h3>

            <p className="crp-text">
              Since Hirelinkinfo.com provides only digital services and no
              physical products to candidates, returns are not applicable.
            </p>

            <h3 className="crp-heading">Non-Refundable Signup Fee</h3>

            <p className="crp-text">
              The candidate signup fee of ₹300 is non-refundable once the
              account is created and access to the platform is provided.
            </p>

            <h3 className="crp-heading">Service Activation</h3>

            <p className="crp-text">
              Candidate services are activated immediately or shortly after
              successful payment. Once activated, candidates are not eligible
              for any return or refund.
            </p>

            <h3 className="crp-heading">
              Optional Paid Services (If Applicable)
            </h3>

            <p className="crp-text">
              If Hirelinkinfo.com offers additional paid services to candidates
              in the future (such as premium features, profile highlighting,
              resume services, or training programs), the payment terms will be
              clearly mentioned at the time of purchase.
            </p>

            <h3 className="crp-heading">Non-Refundable Paid Services</h3>

            <p className="crp-text">
              Any payment made by a candidate for optional paid services is
              non-refundable once the service is activated or delivered.
            </p>

            <h3 className="crp-heading">Exceptional Refund Cases</h3>

            <p className="crp-text">
              Refunds may be considered only in exceptional situations such as:
              <ul>
                <li>Duplicate payment made due to a technical error</li>
                <li>
                  Payment deducted but the candidate account or paid service was
                  not activated due to system failure
                </li>
              </ul>
            </p>

            <h3 className="crp-heading">Refund Request Timeline</h3>

            <p className="crp-text">
              Any refund request under exceptional circumstances must be raised
              within 7 working days from the date of payment along with valid
              transaction proof.
            </p>

            <h3 className="crp-heading">Refund Processing Time</h3>

            <p className="crp-text">
              Approved refunds, if any, will be processed to the original
              payment method within 7 to 10 working days.
            </p>

            <h3 className="crp-heading">No Job Guarantee</h3>

            <p className="crp-text">
              Hirelinkinfo.com does not guarantee job placement, interview
              calls, or employment. The signup fee and any other payments are
              for platform access and services only.
            </p>

            <h3 className="crp-heading">Violation & Misuse</h3>

            <p className="crp-text">
              No refund will be provided if a candidate account is suspended or
              terminated due to violation of platform rules, terms & conditions,
              or misuse of services.
            </p>

            <h3 className="crp-heading">Policy Modification Rights</h3>

            <p className="crp-text">
              Hirelinkinfo.com reserves the right to modify, update, or change
              this Candidate Return & Refund Policy at any time without prior
              notice. Updates will be effective immediately upon posting on the
              website.
            </p>
            <h3 className="crp-heading">Contact Support</h3>

            <p className="crp-text">
              For any questions or refund-related queries, candidates can
              contact Hirelinkinfo.com through the official support channels
              available on the website.
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
