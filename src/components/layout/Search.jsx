import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

function Search() {
  const [keyWord, setKeyWord] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyWord.trim()) {
      navigate(`/?keyword=${keyWord}`);
    } else {
      navigate("/");
    }
  };
  useEffect(() => {
    searchParams.has("keyword") && setKeyWord(searchParams.get("keyword"));
  }, [searchParams]);
  return (
    <form onSubmit={submitHandler}>
      <div className="input-group">
        <input
          type="text"
          id="search_field"
          aria-describedby="search_btn"
          className="form-control"
          placeholder="Enter Product Name ..."
          name="keyword"
          value={keyWord}
          onChange={(e) => setKeyWord(e.target.value)}
        />
        <button id="search_btn" className="btn" type="submit">
          <i className="fa fa-search" aria-hidden="true"></i>
        </button>
      </div>
    </form>
  );
}

export default Search;
