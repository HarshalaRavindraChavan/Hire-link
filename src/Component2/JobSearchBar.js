import { useEffect, useState } from "react";

function JobSearchBar({
  jobs = [],
  searchKeyword,
  setSearchKeyword,
  searchPlace,
  setSearchPlace,
  appliedKeyword,
  setAppliedKeyword,
  appliedPlace,
  setAppliedPlace,
  onSearch,
}) {
  const [keywordSug, setKeywordSug] = useState([]);
  const [placeSug, setPlaceSug] = useState([]);
  const [showKeywordSug, setShowKeywordSug] = useState(false);
  const [showPlaceSug, setShowPlaceSug] = useState(false);

  /* ================= KEYWORD SUGGESTIONS ================= */
  useEffect(() => {
    if (!searchKeyword.trim()) {
      setKeywordSug([]);
      setShowKeywordSug(false);
      return;
    }

    let suggestions = [];

    jobs.forEach((job) => {
      if (job.job_skills) {
        job.job_skills
          .split(",")
          .map((s) => s.trim())
          .forEach((skill) => {
            if (skill.toLowerCase().startsWith(searchKeyword.toLowerCase())) {
              suggestions.push({ text: skill, type: "Skill" });
            }
          });
      }

      [
        { value: job.job_title, type: "Job Title" },
        { value: job.job_company, type: "Company" },
      ].forEach((f) => {
        if (f.value?.toLowerCase().startsWith(searchKeyword.toLowerCase())) {
          suggestions.push({ text: f.value, type: f.type });
        }
      });
    });

    const unique = suggestions.filter(
      (v, i, a) => a.findIndex((t) => t.text === v.text) === i
    );

    setKeywordSug(unique.slice(0, 8));
    setShowKeywordSug(true);
  }, [searchKeyword, jobs]);

  /* ================= PLACE SUGGESTIONS ================= */
  useEffect(() => {
    if (!searchPlace.trim()) {
      setPlaceSug([]);
      setShowPlaceSug(false);
      return;
    }

    const suggestions = jobs
      .filter(
        (j) =>
          j.city_name?.toLowerCase().includes(searchPlace.toLowerCase()) ||
          j.state_name?.toLowerCase().includes(searchPlace.toLowerCase())
      )
      .map((j) => `${j.city_name}, ${j.state_name}`)
      .filter((v, i, a) => a.indexOf(v) === i)
      .slice(0, 6);

    setPlaceSug(suggestions);
    setShowPlaceSug(true);
  }, [searchPlace, jobs]);

  return (
    <div className="row justify-content-center g-2 home-serch ps-4 pe-4 mt-4">
      {/* JOB INPUT */}
      <div className="col-12 col-md-3 position-relative">
        <div className="search-input d-flex align-items-center">
          <i className="fa fa-search me-2"></i>
          <input
            className="form-control border-0"
            placeholder="Job title, keywords, or company"
            value={searchKeyword}
            onChange={(e) => {
              setSearchKeyword(e.target.value);
              setAppliedKeyword("");
            }}
            onFocus={() => searchKeyword && setShowKeywordSug(true)}
            style={{ boxShadow: "none" }}
          />
        </div>

        {showKeywordSug && (
          <ul
            className="list-group position-absolute w-100 shadow"
            style={{ zIndex: 1000, background: "#dfdcdcff" }}
          >
            {keywordSug.map((item, i) => (
              <li
                key={i}
                className="list-group-item list-group-item-action d-flex justify-content-between"
                onClick={() => {
                  setSearchKeyword(item.text);
                  setAppliedKeyword(item.text);
                  setShowKeywordSug(false);
                }}
              >
                {item.text} <small>({item.type})</small>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* LOCATION INPUT */}
      <div className="col-12 col-md-3 position-relative">
        <div className="search-input d-flex align-items-center">
          <i className="fa fa-location-dot me-2"></i>
          <input
            className="form-control border-0"
            placeholder="City, state"
            value={searchPlace}
            onChange={(e) => {
              setSearchPlace(e.target.value);
              setAppliedPlace("");
            }}
            onFocus={() => searchPlace && setShowPlaceSug(true)}
            style={{ boxShadow: "none" }}
          />
        </div>

        {showPlaceSug && (
          <ul
            className="list-group position-absolute w-100"
            style={{ zIndex: 1000, background: "#dfdcdcff" }}
          >
            {placeSug.map((p, i) => (
              <li
                key={i}
                className="list-group-item list-group-item-action"
                onClick={() => {
                  setSearchPlace(p);
                  setAppliedPlace(p);
                  setShowPlaceSug(false);
                }}
              >
                {p}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* SEARCH BUTTON */}
      <div className="col-12 col-md-2 text-center">
        <button className="btn find-btn w-100 pt-3 pb-4 text-center mt-2" onClick={onSearch}>
          Find jobs
        </button>
      </div>
    </div>
  );
}

export default JobSearchBar;
