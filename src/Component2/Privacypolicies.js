import "../Component2/css/Privacypolicies.css";
import logo from "../Component2/logo/hirelink.png";

function PrivacyPolicies() {
  return (
    <>
      <div className="cpp-body">
        <div
          className="cpp-wrapper"
          style={{ backgroundImage: `url(${logo})` }}
        >
          <div className="cpp-container">
            <h1 className="cpp-title fw-bold">Candidate Privacy Policy</h1>
            <h3 className="cpp-heading">Introduction</h3>
            <p className="cpp-text">
              This Privacy Policy describes how Hirelinkinfo.com collects, uses,
              stores, and protects personal information provided by candidates
              while using the platform.
            </p>
            <h3 className="cpp-heading">Applicability</h3>

            <p className="cpp-text">
              This policy applies only to candidates who register, create
              profiles, search for jobs, or apply for jobs on Hirelinkinfo.com.
            </p>

            <h3 className="cpp-heading">
              Information Collected from Candidates
            </h3>

            <p className="cpp-text">
              Hirelinkinfo.com may collect the following information from
              candidates:
              <ul>
                <li>Full name, email address, phone number</li>
                <li>
                  Educational details, work experience, skills, and resume/CV
                </li>
                <li>Location and job preferences</li>
                <li>Login credentials and account information</li>
                <li>
                  Payment details (if any paid candidate services are used)
                </li>
              </ul>
            </p>

            <h3 className="cpp-heading">Purpose of Data Collection</h3>

            <p className="cpp-text">
              Candidate information is collected for purposes including:
              <ul>
                <li>Creating and managing candidate accounts</li>
                <li>Enabling job search and job applications</li>
                <li>
                  Sharing candidate profiles with employers for recruitment
                </li>
                <li>Providing platform support and communication</li>
                <li>Improving platform features and user experience</li>
              </ul>
            </p>

            <h3 className="cpp-heading">Profile Visibility to Employers</h3>

            <p className="cpp-text">
              Candidate profiles and resumes may be viewed by registered
              employers for recruitment purposes. By using the platform,
              candidates consent to such visibility.
            </p>

            <h3 className="cpp-heading">Use of Candidate Information</h3>

            <p className="cpp-text">
              Candidate data is used only for job-related and platform-related
              purposes. Hirelinkinfo.com does not sell or rent candidate
              personal information to unauthorized third parties.
            </p>

            <h3 className="cpp-heading">Data Sharing</h3>

            <p className="cpp-text">
              Candidate information may be shared only in the following cases:
              <ul>
                <li>With employers for recruitment and hiring purposes</li>
                <li>
                  With payment gateways for processing transactions (if
                  applicable)
                </li>
                <li>With legal authorities when required by law</li>
                <li>
                  With trusted service providers under confidentiality
                  obligations
                </li>
              </ul>
            </p>

            <h3 className="cpp-heading">Data Security</h3>

            <p className="cpp-text">
              Hirelinkinfo.com takes reasonable technical and organizational
              measures to protect candidate data from unauthorized access,
              misuse, loss, or alteration. However, absolute security cannot be
              guaranteed over the internet.
            </p>

            <h3 className="cpp-heading">Data Retention</h3>

            <p className="cpp-text">
              Candidate information will be retained as long as the candidate
              account remains active or as required by applicable laws. Data may
              be retained for legal or compliance purposes even after account
              deactivation.
            </p>

            <h3 className="cpp-heading">Candidate Account Responsibility</h3>

            <p className="cpp-text">
              Candidates are responsible for maintaining the confidentiality of
              their login credentials. Any activity performed through the
              candidate account will be the responsibility of the candidate.
            </p>

            <h3 className="cpp-heading">Third-Party Links</h3>

            <p className="cpp-text">
              Hirelinkinfo.com may contain links to third-party websites. The
              platform is not responsible for the privacy practices or content
              of such external sites.
            </p>

            <h3 className="cpp-heading">Account Suspension or Termination</h3>

            <p className="cpp-text">
              Candidate accounts may be suspended or terminated if false
              information, misuse of the platform, or violation of Terms &
              Conditions is detected. No refund will be provided in such cases.
            </p>

            <h3 className="cpp-heading">No Job Guarantee</h3>

            <p className="cpp-text">
              Hirelinkinfo.com does not guarantee job placement, interview
              calls, or employment. Candidate data is shared with employers only
              for recruitment consideration.
            </p>

            <h3 className="cpp-heading">Policy Updates</h3>

            <p className="cpp-text">
              Hirelinkinfo.com reserves the right to update or modify this
              Candidate Privacy Policy at any time. Changes will be effective
              immediately upon publication on the website.
            </p>

            <h3 className="cpp-heading">Consent</h3>

            <p className="cpp-text">
              By registering and using Hirelinkinfo.com, candidates consent to
              the collection, use, and sharing of their information as described
              in this policy.
            </p>

            <h3 className="cpp-heading">Contact Information</h3>

            <p className="cpp-text">
              For any privacy-related questions or concerns, candidates can
              contact Hirelinkinfo.com through the official support channels
              available on the website.
            </p>

            <p className="cpp-footer-text">
              © {new Date().getFullYear()} All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default PrivacyPolicies;
