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
            <h1 className="erp-title fw-bold">Employer Return Policy</h1>
            <h3 className="erp-heading">Service Nature</h3>
            <p className="erp-text">
              Hirelinkinfo.com is a digital job portal platform that provides
              online services such as employer registration, job postings,
              candidate access, and other recruitment-related services. All
              services are delivered electronically.
            </p>
            <h3 className="erp-heading">No Physical Returns</h3>

            <p className="erp-text">
              Since Hirelinkinfo.com offers only digital services, there is no
              concept of physical product returns.
            </p>

            <h3 className="erp-heading">Employer Registration Fee</h3>

            <p className="erp-text">
              Employers are required to pay a registration fee (₹5000) to create
              an account and access employer-specific services on the platform.
            </p>

            <h3 className="erp-heading">Non-Refundable Payments</h3>

            <p className="erp-text">
              All payments made towards employer signup, subscriptions, job
              postings, or any other paid services on Hirelinkinfo.com are
              strictly non-refundable once the service is activated.
            </p>

            <h3 className="erp-heading">Service Activation</h3>

            <p className="erp-text">
              Services are activated immediately or within a short processing
              time after successful payment. Once activated, the user is not
              eligible for any return or refund.
            </p>

            <h3 className="erp-heading">No Cancellation Refund</h3>

            <p className="erp-text">
              Cancellation of any active service, subscription, or employer
              account will not result in a refund, either full or partial.
            </p>

            <h3 className="erp-heading">Exceptions for Refunds</h3>

            <p className="erp-text">
              Refunds may be considered only in exceptional cases, such as:
              <ul>
                <li>
                  Duplicate payment made by the user due to a technical error
                </li>
                <li>
                  Payment deducted but the service was not activated due to
                  system failure.
                </li>
              </ul>
            </p>

            <h3 className="erp-heading">Refund Request Timeline</h3>

            <p className="erp-text">
              Any refund request under exceptional circumstances must be raised
              within 7 working days from the date of payment along with valid
              transaction proof.
            </p>

            <h3 className="erp-heading">Refund Processing Time</h3>

            <p className="erp-text">
              If a refund is approved, the amount will be processed to the
              original payment method within 7 to 10 working days.
            </p>

            <h3 className="erp-heading">Dispute Resolution</h3>

            <p className="erp-text">
              Any disputes related to payments, refunds, or services shall be
              reviewed by the Hirelinkinfo.com management team, and their
              decision shall be final.
            </p>

            <h3 className="erp-heading">Policy Modification Rights</h3>

            <p className="erp-text">
              Hirelinkinfo.com reserves the right to modify, update, or change
              this Return & Refund Policy at any time without prior notice.
              Updated policies will be effective immediately upon publication on
              the website.
            </p>

            <h3 className="erp-heading">User Responsibility</h3>

            <p className="erp-text">
              Users are advised to read and understand this policy carefully
              before making any payment on Hirelinkinfo.com.
            </p>

            <h3 className="erp-heading">Contact Information</h3>

            <p className="erp-text">
              For any questions, concerns, or refund-related queries, users can
              contact Hirelinkinfo.com through the official support channels
              available on the website.
            </p>

            <p className="erp-footer-text">
              © {new Date().getFullYear()} All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Returnpolicy;
