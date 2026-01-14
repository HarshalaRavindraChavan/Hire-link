import React, { useState, useRef, useEffect } from "react";
import "./css/SearchableDropdown.css";

const SearchableDropdown = ({ name, value, options, onChange, error }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef();

  const selectedOption = options.find(o => o.state_id === value);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filteredOptions = options.filter(opt =>
    opt.state_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dropdown-select wide" ref={ref}>
      <div
        className="current"
        onClick={() => setOpen(!open)}
      >
        {selectedOption ? selectedOption.state_name : "Select State"}
      </div>

      {open && (
        <div className="list">
          <div className="dd-search">
            <input
              type="text"
              className="dd-searchbox"
              placeholder="Search state..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <ul>
            {filteredOptions.length === 0 && (
              <li className="option text-muted">No results</li> 
            )}

            {filteredOptions.map(state => (
              <li
                key={state.state_id}
                className={`option ${
                  value === state.state_id ? "selected" : ""
                }`}
                onClick={() => {
                  onChange(state.state_id);
                  setOpen(false);
                  setSearch("");
                }}
              >
                {state.state_name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {error && <div className="invalid-feedback d-block">{error}</div>}
    </div>
  );
};

export default SearchableDropdown;
