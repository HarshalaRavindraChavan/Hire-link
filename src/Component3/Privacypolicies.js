import "../Component3/css/Returnpolicy.css";
import SEO from "../SEO";
import { seoConfig } from "../config/seoConfig";
import logo from "../Component2/logo/hirelink.png";

function PrivacyPolicies() {
  return (
    <>
      <SEO
        title={seoConfig.e_privacy.title}
        description={seoConfig.e_privacy.description}
      />
      <div className="epp-body">
        <div
          className="epp-wrapper"
          style={{ backgroundImage: `url(${logo})` }}
        >
          <div className="epp-container">
            <h1 className="epp-title fw-bold">Employer Privacy Policy</h1>
            <h3 className="epp-heading">Introduction</h3>
            <p className="epp-text">
              This Privacy Policy explains how Hirelinkinfo.com collects, uses,
              stores, and protects information provided by employers while using
              the platform.
            </p>
            <h3 className="epp-heading">Applicability</h3>

            <p className="epp-text">
              This policy applies only to employers who register, access, or use
              employer-related services on Hirelinkinfo.com.
            </p>

            <h3 className="epp-heading">
              Information Collected from Employers
            </h3>

            <p className="epp-text">
              Hirelinkinfo.com may collect the following information from
              employers:
              <ul>
                <li>Company name, address, and contact details</li>
                <li>
                  Authorized person’s name, email address, and phone number
                </li>
                <li>Company registration details (if required)</li>
                <li>Payment and billing information</li>
                <li>Job posting details and recruitment-related data</li>
              </ul>
            </p>

            <h3 className="epp-heading">Purpose of Data Collection</h3>

            <p className="epp-text">
              Employer information is collected for purposes including but not
              limited to:
              <ul>
                <li>Account creation and management</li>
                <li>Processing payments and invoices</li>
                <li>Facilitating job postings and recruitment activities</li>
                <li>Providing customer support and communication</li>
                <li>Improving platform functionality and services</li>
              </ul>
            </p>

            <h3 className="epp-heading">Use of Employer Information</h3>

            <p className="epp-text">
              Employer data is used strictly for recruitment and
              platform-related operations. It will not be sold, rented, or
              shared with unauthorized third parties.
            </p>

            <h3 className="epp-heading">Candidate Data Access</h3>

            <p className="epp-text">
              Employers may access candidate profiles and data only for
              recruitment purposes. Employers are strictly prohibited from
              misusing candidate data for marketing, solicitation, or any
              unlawful activities.
            </p>

            <h3 className="epp-heading">Data Sharing</h3>

            <p className="epp-text">
              Employer information may be shared only in the following cases:
              <ul>
                <li>With payment gateways for transaction processing</li>
                <li>With legal or regulatory authorities if required by law</li>
                <li>
                  With service providers assisting in platform operations under
                  confidentiality agreements
                </li>
              </ul>
            </p>

            <h3 className="epp-heading">Data Retention</h3>

            <p className="epp-text">
              Employer data will be retained as long as the employer account
              remains active or as required by applicable laws. Data may be
              retained for legal, accounting, or compliance purposes even after
              account termination.
            </p>

            <h3 className="epp-heading">Account Responsibility</h3>

            <p className="epp-text">
              Employers are responsible for maintaining the confidentiality of
              their login credentials. Any activity performed through the
              employer account will be considered the responsibility of the
              employer.
            </p>

            <h3 className="epp-heading">Third-Party Links</h3>

            <p className="epp-text">
              Hirelinkinfo.com may contain links to third-party websites. The
              platform is not responsible for the privacy practices or content
              of such external websites.
            </p>

            <h3 className="epp-heading">Account Suspension or Termination</h3>

            <p className="epp-text">
              In case of violation of Terms & Conditions or misuse of the
              platform, Hirelinkinfo.com reserves the right to suspend or
              terminate the employer account. Data may be retained as per legal
              requirements.
            </p>

            <h3 className="epp-heading">No Refund Policy</h3>

            <p className="epp-text">
              Privacy-related actions such as account suspension or termination
              do not entitle employers to any refund of signup fees or other
              payments.
            </p>

            <h3 className="epp-heading">Changes to This Privacy Policy</h3>

            <p className="epp-text">
              Hirelinkinfo.com reserves the right to modify or update this
              Employer Privacy Policy at any time. Changes will be effective
              immediately upon posting on the website.
            </p>

            <h3 className="epp-heading">Consent</h3>

            <p className="epp-text">
              By registering as an employer and using Hirelinkinfo.com,
              employers consent to the collection and use of their information
              as described in this policy.
            </p>

            <h3 className="epp-heading">Contact Information</h3>

            <p className="epp-text">
              For any privacy-related questions or concerns, employers can
              contact Hirelinkinfo.com through the official support channels
              available on the website.
            </p>

            <p className="epp-footer-text">
              © {new Date().getFullYear()} All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default PrivacyPolicies;
