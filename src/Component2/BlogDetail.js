import React from "react";
import "../Component2/css/BlogDetail.css";
import { useNavigate } from "react-router-dom";

export default function BlogDetail() {
  const navigate = useNavigate();
  return (
    <>
      {/* ===== HERO BANNER ===== */}
      <section className="bd-hero">
        <img
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71"
          alt="blog cover"
        />
        <div className="bd-hero-overlay">
          <h1>What is MIS Report? Types, Examples & How to Create One</h1>
          <p>Hirelink Content Team · Career Advice · Jan 2026</p>
        </div>
      </section>

      {/* ===== CONTENT WRAPPER ===== */}
      <section className="bd-wrapper">
        <div className="bd-container">
          {/* ===== LEFT CONTENT ===== */}
          <article className="bd-content">
            <p className="bd-intro">
              Are you curious about MIS reports but not sure what they really
              mean or how they help in business decisions? This guide explains
              everything in simple terms.
            </p>

            <h2 id="mis">What is an MIS report?</h2>
            <p>
              MIS (Management Information System) reports provide structured and
              summarized data to managers so they can make informed decisions.
            </p>

            <h2 id="work">How do MIS reports work?</h2>
            <p>
              MIS reports collect data from multiple departments, process it,
              and present it in charts, tables, and summaries.
            </p>

            <h2 id="types">Types of MIS reports</h2>
            <ul>
              <li>Sales MIS Report</li>
              <li>Finance MIS Report</li>
              <li>HR MIS Report</li>
              <li>Inventory MIS Report</li>
            </ul>

            <h2 id="format">MIS report format</h2>
            <p>
              A standard MIS report includes objectives, data summary, analysis,
              and recommendations.
            </p>

            <h2 id="excel">How to make MIS report in Excel</h2>
            <p>
              Excel is widely used for MIS reports due to its formulas, charts,
              and pivot tables.
            </p>

            <h2 id="benefits">Benefits of MIS reports</h2>
            <p>
              MIS reports improve efficiency, track performance, and support
              strategic planning.
            </p>
          </article>

          {/* ===== RIGHT SIDEBAR ===== */}
          <aside className="bd-sidebar">
            <div className="bd-toc">
              <h4>In this article</h4>
              <ul>
                <li>
                  <a href="#mis">What is MIS report?</a>
                </li>
                <li>
                  <a href="#work">How MIS reports work</a>
                </li>
                <li>
                  <a href="#types">Types of MIS reports</a>
                </li>
                <li>
                  <a href="#format">MIS report format</a>
                </li>
                <li>
                  <a href="#excel">MIS report in Excel</a>
                </li>
                <li>
                  <a href="#benefits">Benefits of MIS</a>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
      {/* ===== FLOATING JOB BUTTON ===== */}
      <button className="job-float-btn" onClick={() => navigate("/")}>
        Looking for a job?
      </button>
    </>
  );
}
