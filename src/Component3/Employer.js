import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import "../Component3/css/Employer.css";

function Employer() {
  useEffect(() => {
    document.title = "Hirelink | Employer";
  }, []);

  return (
    <>
      {/* <!-- ================= HERO SECTION ================= --> */}
      <section className="hero-section" id="get-started">
        <div className="container">
          <div className="row align-items-center g-4">
            {/* <!-- LEFT CONTENT --> */}
            <div className="col-12 col-lg-6">
              <p className="hero-kicker mb-2">For Employers & Recruiters</p>
              <h1 className="hero-title mb-3">
                Find the right candidates,
                <span className="text-primary">faster</span>.
              </h1>
              <p className="hero-subtitle mb-4">
                Post jobs in minutes, reach millions of job seekers and manage
                your entire hiring pipeline in one simple dashboard.
              </p>

              <form className="row g-2 hero-form align-items-center">
                <div className="col-12 col-md-5 position-relative">
                  <i className="fa fa-search input-icon-right"></i>

                  <input
                    type="text"
                    className="form-control form-control-lg input-box"
                    placeholder="Job title"
                  />
                </div>

                <div className="col-12 col-md-4 position-relative">
                  <input
                    type="text"
                    className="input-box form-control-lg form-control"
                    placeholder="City or remote"
                    aria-label="Location"
                  />
                  <i className="fa fa-location-dot input-icon-right"></i>
                </div>

                <div className="col-12 col-md-3 d-grid">
                  <NavLink
                    to="/signin"
                    type="submit"
                    className="btn btn-lg"
                    style={{
                      backgroundColor: "green",
                      color: "white",
                      height: "42px",
                    }}
                  >
                    Post job
                  </NavLink>
                </div>
              </form>

              <p className="mt-3 small text-muted">
                No long-term contracts · Pay only for results · Cancel anytime
              </p>

              <div className="d-flex align-items-center mt-4 hero-trust">
                <div className="avatar-group me-3">
                  <span className="avatar"></span>
                  <span className="avatar"></span>
                  <span className="avatar"></span>
                </div>
                <div className="small ms-1">
                  Trusted by
                  <span className="fw-semibold">10,000+ companies</span> across
                  India.
                </div>
              </div>
            </div>

            {/* <!-- RIGHT STAT CARD --> */}
            <div className="col-12 col-lg-6">
              <div className="hero-card shadow-sm p-3">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <p className="small text-muted mb-1">LIVE JOB</p>
                    <h5 className="mb-0">Senior Frontend Developer</h5>
                    <p className="text-muted mb-0 small">Pune · Full-time</p>
                  </div>
                  <span className="badge rounded-pill bg-soft-primary text-primary">
                    New
                  </span>
                </div>

                <div className="d-flex align-items-center justify-content-between mt-4 mb-3">
                  <div>
                    <p className="small text-muted mb-1">
                      Candidates this week
                    </p>
                    <h4 className="mb-0">48</h4>
                  </div>
                  <div>
                    <p className="small text-muted mb-1">Qualified matches</p>
                    <h4 className="mb-0">23</h4>
                  </div>
                  <div>
                    <p className="small text-muted mb-1">Avg. time to hire</p>
                    <h4 className="mb-0">7 days</h4>
                  </div>
                </div>

                <div className="progress mb-2" style={{ height: "8px" }}>
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: "70%", background: "#2b861f" }}
                  ></div>
                </div>
                <p className="small text-muted mb-0">
                  You’re ahead of similar companies in your industry.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- ================= LOGOS STRIP ================= --> */}
      <section className="py-4 bg-white border-top border-bottom ps-2 pe-2">
        <div className="container text-center">
          <p
            className="mb-3 text-muted small"
            style={{ fontWeight: "bold", color: "black" }}
          >
            Companies hiring with Hirelink
          </p>
          <div className="d-flex flex-wrap justify-content-center gap-4 align-items-center">
            <span className="logo-pill">TechNova</span>
            <span className="logo-pill">UrbanFoods</span>
            <span className="logo-pill">Skyline HR</span>
            <span className="logo-pill">FinZen</span>
            <span className="logo-pill">Spark Mobility</span>
          </div>
        </div>
      </section>

      {/* <!-- ================= FEATURES ================= --> */}
      <section className="py-5 py-lg-6 bg-light ps-3 pe-3" id="features">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title" style={{ fontWeight: "bold" }}>
              Everything you need to hire smarter
            </h2>
            <p className="text-muted">
              From posting your first job to building an entire hiring pipeline,
              we’ve got you covered.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-6 col-lg-4">
              <div className="feature-card h-100">
                <div className="icon-circle mb-3">
                  <i className="bi bi-megaphone"></i>
                </div>
                <h5>Job posting made simple</h5>
                <p className="text-muted small mb-0">
                  Publish jobs in minutes with guided templates and smart
                  suggestions based on your role and location.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className="feature-card h-100">
                <div className="icon-circle mb-3">
                  <i className="bi bi-people"></i>
                </div>
                <h5>Smart candidate matching</h5>
                <p className="text-muted small mb-0">
                  Our matching engine highlights candidates that best fit your
                  requirements so you don’t have to sift through every resume.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className="feature-card h-100">
                <div className="icon-circle mb-3">
                  <i className="bi bi-kanban"></i>
                </div>
                <h5>Pipeline &amp; team collaboration</h5>
                <p className="text-muted small mb-0">
                  Track every applicant stage and collaborate with hiring
                  managers in one clean dashboard.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className="feature-card h-100">
                <div className="icon-circle mb-3">
                  <i className="bi bi-graph-up-arrow"></i>
                </div>
                <h5>Realtime insights</h5>
                <p className="text-muted small mb-0">
                  See which channels and jobs perform best with clear,
                  easy-to-read analytics.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className="feature-card h-100">
                <div className="icon-circle mb-3">
                  <i className="bi bi-funnel"></i>
                </div>
                <h5>Built-in screening</h5>
                <p className="text-muted small mb-0">
                  Use screening questions and filters to remove unqualified
                  candidates automatically.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className="feature-card h-100">
                <div className="icon-circle mb-3">
                  <i className="bi bi-shield-check"></i>
                </div>
                <h5>Candidate-friendly experience</h5>
                <p className="text-muted small mb-0">
                  Mobile-optimised job pages and one-click apply help you get
                  more applications from the right people.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- ================= HOW IT WORKS ================= --> */}
      <section className="py-5 ps-4 pe-4" id="how-it-works">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-lg-5">
              <h2 className="section-title mb-3">
                Start hiring in 3 easy steps
              </h2>
              <p className="text-muted">
                Get set up in minutes – no complex tools, no training required.
              </p>
            </div>
            <div className="col-lg-7">
              <div className="row g-4">
                <div className="col-md-4">
                  <div className="step-card h-100">
                    <span className="step-number">1</span>
                    <h6 className="mt-2">Create your free account</h6>
                    <p className="small text-muted mb-0">
                      Tell us about your company and hiring needs.
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="step-card h-100">
                    <span className="step-number">2</span>
                    <h6 className="mt-2">Post your first job</h6>
                    <p className="small text-muted mb-0">
                      Use our templates to publish your role in minutes.
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="step-card h-100">
                    <span className="step-number">3</span>
                    <h6 className="mt-2">Review &amp; hire</h6>
                    <p className="small text-muted mb-0">
                      Shortlist, schedule interviews and hire – all in one
                      place.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <a
                  href="#get-started"
                  className="btn me-2"
                  style={{ backgroundColor: "green", color: "white" }}
                >
                  Get started at no cost
                </a>
                <span className="small text-muted">
                  Only pay when you choose to boost visibility.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- ================= PRICING ================= --> */}
      <section className="py-5 bg-light ps-3 pe-3" id="pricing">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">
              Flexible pricing that fits your hiring
            </h2>
            <p className="text-muted">
              Start free, then add boosts only when you need more visibility.
            </p>
          </div>

          <div className="row g-4 justify-content-center">
            {/* <!-- Free --> */}
            <div className="col-md-6 col-lg-4">
              <div className="pricing-card h-100">
                <h6 className="text-uppercase small text-muted mb-2">
                  Starter
                </h6>
                <h3 className="mb-3">Free</h3>
                <p className="small text-muted">
                  Ideal for small businesses hiring occasionally.
                </p>
                <ul className="list-unstyled small mb-4">
                  <li>
                    <i className="bi bi-check2 me-2"></i>Up to 3 active jobs
                  </li>
                  <li>
                    <i className="bi bi-check2 me-2"></i>Basic candidate filters
                  </li>
                  <li>
                    <i className="bi bi-check2 me-2"></i>Email support
                  </li>
                </ul>
                <a
                  href="#get-started"
                  className="btn btn-outline-primary w-100"
                >
                  Start for free
                </a>
              </div>
            </div>

            {/* <!-- Recommended --> */}
            <div className="col-md-6 col-lg-4">
              <div className="pricing-card h-100 pricing-featured">
                <span
                  className="badge badge-top"
                  style={{ fontWeight: "bold" }}
                >
                  Most popular
                </span>
                <h6 className="text-uppercase small text-muted mb-2">Growth</h6>
                <h3 className="mb-3">
                  ₹4,999 <span className="fs-6 text-muted">/ month</span>
                </h3>
                <p className="small text-muted">
                  For teams that need to hire consistently.
                </p>
                <ul className="list-unstyled small mb-4">
                  <li>
                    <i className="bi bi-check2 me-2"></i>Unlimited job posts
                  </li>
                  <li>
                    <i className="bi bi-check2 me-2"></i>Boosted job visibility
                  </li>
                  <li>
                    <i className="bi bi-check2 me-2"></i>Advanced filters &amp;
                    tags
                  </li>
                  <li>
                    <i className="bi bi-check2 me-2"></i>ATS &amp; calendar
                    integrations
                  </li>
                </ul>
                <a
                  href="#get-started"
                  className="btn w-100"
                  style={{ backgroundColor: "green", color: "white" }}
                >
                  Talk to sales
                </a>
              </div>
            </div>

            {/* <!-- Enterprise --> */}
            <div className="col-md-6 col-lg-4">
              <div className="pricing-card h-100">
                <h6 className="text-uppercase small text-muted mb-2">
                  Enterprise
                </h6>
                <h3 className="mb-3">Let’s talk</h3>
                <p className="small text-muted">
                  For large organisations with custom needs.
                </p>
                <ul className="list-unstyled small mb-4">
                  <li>
                    <i className="bi bi-check2 me-2"></i>Custom contracts &amp;
                    SLAs
                  </li>
                  <li>
                    <i className="bi bi-check2 me-2"></i>Dedicated account
                    manager
                  </li>
                  <li>
                    <i className="bi bi-check2 me-2"></i>Tailored integrations
                  </li>
                </ul>
                <a href="#contact" className="btn btn-outline-primary w-100">
                  Contact sales
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- ================= TESTIMONIAL ================= --> */}
      <section className="py-5 ps-3 pe-3">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-lg-6">
              <div className="testimonial-card">
                <p className="quote">
                  “Hirelink helped us reduce our time-to-hire from 30 days to
                  just 9 days. The quality of candidates has improved
                  significantly.”
                </p>
                <div className="d-flex align-items-center mt-3">
                  <div className="avatar avatar-lg me-3"></div>
                  <div>
                    <h6 className="mb-0">Priya Sharma</h6>
                    <p className="small text-muted mb-0">
                      Head of Talent · FinZen Technologies
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <h2 className="section-title mb-3">
                Make your next hire with confidence
              </h2>
              <p className="text-muted mb-3">
                Whether you’re hiring your first employee or scaling across
                multiple locations, Hirelink gives you the tools to stay in
                control at every step.
              </p>
              <ul className="list-unstyled small text-muted mb-4">
                <li>
                  <i className="bi bi-check2 me-2"></i>3x more relevant
                  applications
                </li>
                <li>
                  <i className="bi bi-check2 me-2"></i>Built for Indian job
                  market
                </li>
                <li>
                  <i className="bi bi-check2 me-2"></i>Secure and GDPR-ready
                  platform
                </li>
              </ul>
              <NavLink
                to="/signin"
                className="btn me-2"
                style={{ backgroundColor: "green", color: "white" }}
              >
                Post a job now
              </NavLink>
              <a href="#contact" className="btn btn-link p-0 align-baseline">
                Book a quick demo <i className="bi bi-arrow-right-short"></i>
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* !-- ================= FAQ ================= --> */}
      <section className="py-5 bg-light ps-3 pe-3" id="faq">
        <div className="container">
          <div className="text-center mb-4">
            <h2 className="section-title">Questions employers often ask</h2>
            <p className="text-muted">
              A quick look at how Hirelink works for your business.
            </p>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="accordion" id="faqAccordion">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="faq1-heading">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#faq1"
                    >
                      Is it free to post a job?
                    </button>
                  </h2>
                  <div
                    id="faq1"
                    className="accordion-collapse collapse show"
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body">
                      Yes. You can start with a free job post and pay only when
                      you choose to boost your visibility or unlock premium
                      features.
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header" id="faq2-heading">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#faq2"
                    >
                      How do I get better quality candidates?
                    </button>
                  </h2>
                  <div
                    id="faq2"
                    className="accordion-collapse collapse"
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body">
                      Use detailed job descriptions, screening questions and
                      recommended skills. Our matching engine also surfaces the
                      most relevant candidates higher in your list.
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header" id="faq3-heading">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#faq3"
                    >
                      Can my team collaborate on hiring?
                    </button>
                  </h2>
                  <div
                    id="faq3"
                    className="accordion-collapse collapse"
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body">
                      Yes. You can invite hiring managers, share feedback, and
                      track candidate progress together from a shared dashboard.
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header" id="faq4-heading">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#faq4"
                    >
                      Do you support remote and hybrid roles?
                    </button>
                  </h2>
                  <div
                    id="faq4"
                    className="accordion-collapse collapse"
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body">
                      Absolutely. You can mark jobs as remote, hybrid, or
                      on-site, and candidates can filter based on their
                      preferences.
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-center small text-muted mt-3" id="contact">
                Still have questions?
                <NavLink to="/contacts" className="link-primary ms-2">
                  Contact our support team
                </NavLink>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
      <hr class="text-white" />
    </>
  );
}

export default Employer;
