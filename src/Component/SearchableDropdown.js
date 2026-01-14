import React, { useState, useRef, useEffect } from "react";
import "./css/SearchableDropdown.css";

const SearchableDropdown = ({
  value,
  options = [],
  onChange,
  error,
  placeholder = "Select",
  searchPlaceholder = "Search...",
  labelKey = "name",
  valueKey = "id",
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef(null);

  const selectedOption = options.find(
    (o) => o[valueKey] === value
  );

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filteredOptions = options.filter((opt) =>
    opt[labelKey]
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="dropdown-select wide" ref={ref}>
      <div
        className="current"
        onClick={() => setOpen(!open)}
      >
        {selectedOption
          ? selectedOption[labelKey]
          : placeholder}
      </div>

      {open && (
        <div className="list">
          <div className="dd-search">
            <input
              type="text"
              className="dd-searchbox"
              placeholder={searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <ul>
            {filteredOptions.length === 0 && (
              <li className="option text-muted">
                No results
              </li>
            )}

            {filteredOptions.map((item) => (
              <li
                key={item[valueKey]}
                className={`option ${
                  value === item[valueKey] ? "selected" : ""
                }`}
                onClick={() => {
                  onChange(item[valueKey]);
                  setOpen(false);
                  setSearch("");
                }}
              >
                {item[labelKey]}
              </li>
            ))}
          </ul>
        </div>
      )}

      {error && (
        <div className="invalid-feedback d-block">
          {error}
        </div>
      )}
    </div>
  );
};

export default SearchableDropdown;
