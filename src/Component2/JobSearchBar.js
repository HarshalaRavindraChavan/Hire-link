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

    if (searchKeyword === appliedKeyword) {
      setShowKeywordSug(false);
      return;
    }

    const keyword = searchKeyword.toLowerCase();
    let suggestions = [];

    jobs.forEach((job) => {
      /* ===== Skills ===== */
      if (job.job_skills) {
        job.job_skills
          .split(",")
          .map((s) => s.trim())
          .forEach((skill) => {
            if (skill.trim().toLowerCase().startsWith(keyword)) {
              suggestions.push({ text: skill.trim(), type: "Skill" });
            }
          });
      }

      /* ===== Titles, Company, Categories ===== */
      [
        { value: job.job_title, type: "Job Title" },
        { value: job.job_company, type: "Company" },

        // 🔥 Category hierarchy
        { value: job.main_category, type: "Category" },
        { value: job.sub_category, type: "Sub Category" },
        { value: job.sub_category1, type: "Category" },
        { value: job.sub_category2, type: "Category" },
        { value: job.sub_category3, type: "Category" },
      ].forEach((item) => {
        if (item.value?.toLowerCase().startsWith(keyword)) {
          suggestions.push({ text: item.value, type: item.type });
        }
      });
    });

    // 🔹 Remove duplicates
    const unique = suggestions.filter(
      (v, i, a) => a.findIndex((t) => t.text === v.text) === i
    );

    setKeywordSug(unique.slice(0, 8));
    setShowKeywordSug(true);
  }, [searchKeyword, appliedKeyword, jobs]);

  /* ================= PLACE SUGGESTIONS ================= */
  useEffect(() => {
    if (!searchPlace.trim()) {
      setPlaceSug([]);
      setShowPlaceSug(false);
      return;
    }

    const place = searchPlace.toLowerCase();

    const suggestions = jobs
      .filter(
        (j) =>
          j.city_name?.toLowerCase().includes(place) ||
          j.state_name?.toLowerCase().includes(place)
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
            placeholder="Job title, Company, Category"
            value={searchKeyword}
            onChange={(e) => {
              setSearchKeyword(e.target.value);
              setAppliedKeyword("");
            }}
            // onFocus={() => searchKeyword && setShowKeywordSug(true)}
            style={{ boxShadow: "none" }}
          />
        </div>

        {showKeywordSug && keywordSug.length > 0 && (
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
                style={{ cursor: "pointer" }}
              >
                {item.text}
                <small className="text-muted">({item.type})</small>
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
            placeholder="City, State"
            value={searchPlace}
            onChange={(e) => {
              setSearchPlace(e.target.value);
              setAppliedPlace("");
            }}
            onFocus={() => searchPlace && setShowPlaceSug(true)}
            style={{ boxShadow: "none" }}
          />
        </div>

        {showPlaceSug && placeSug.length > 0 && (
          <ul
            className="list-group position-absolute w-100 shadow"
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
                style={{ cursor: "pointer" }}
              >
                {p}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* SEARCH BUTTON */}
      <div className="col-12 col-md-2 text-center">
        <button
          className="btn find-btn w-100 pt-3 pb-4 text-center mt-2"
          onClick={onSearch}
        >
          Find jobs
        </button>
      </div>
    </div>
  );
}

export default JobSearchBar;
