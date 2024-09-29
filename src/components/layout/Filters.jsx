import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getPriceQueryParams } from "../../helpers/helpers";
import { ProductCategories } from "../../constants/constants";
import StarRatings from "react-star-ratings";

function Filters() {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();

  // handle price filter
  const handleButtonClick = (e) => {
    e.preventDefault();
    searchParams = getPriceQueryParams(searchParams, "min", min);
    searchParams = getPriceQueryParams(searchParams, "max", max);
    const path = window.location.pathname + "?" + searchParams.toString();

    navigate(path);
  };

  // handle Categories and Ratings filter
  const handleCheck = (check) => {
    const checkboxes = document.getElementsByName(check.name);
    console.log(checkboxes);
    checkboxes.forEach((item) => {
      if (item !== check) item.checked = false;
    });
    if (check.checked === false) {
      if (searchParams.has(check.name)) {
        searchParams.delete(check.name);
        const path = window.location.pathname + "?" + searchParams.toString();
        navigate(path);
      }
    } else {
      if (searchParams.has(check.name)) {
        searchParams.set(check.name, check.value);
      } else {
        searchParams.append(check.name, check.value);
      }

      const path = window.location.pathname + "?" + searchParams.toString();
      navigate(path);
    }
  };

  const defaultCheckHandler = (checkboxType, checkboxValue) => {
    console.log(checkboxValue);
    const value = searchParams.get(checkboxType);
    console.log(value);
    if (checkboxValue === value) return true;
    return false;
  };

  useEffect(() => {
    searchParams.has("min") && setMin(searchParams.get("min"));
    searchParams.has("max") && setMax(searchParams.get("max"));
  }, [searchParams]);

  return (
    <div className="border p-3 filter">
      <h3>Filters</h3>
      <hr />
      <h5 className="filter-heading mb-3">Price</h5>
      <form id="filter_form" className="px-2" onSubmit={handleButtonClick}>
        <div className="row">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Min ($)"
              name="min"
              value={min}
              onChange={(e) => setMin(e.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Max ($)"
              name="max"
              value={max}
              onChange={(e) => setMax(e.target.value)}
            />
          </div>
          <div className="col">
            <button type="submit" className="btn btn-primary">
              GO
            </button>
          </div>
        </div>
      </form>
      <hr />
      <h5 className="mb-3">Category</h5>
      {ProductCategories.map((each) => (
        <div className="form-check" key={each}>
          <input
            className="form-check-input"
            type="checkbox"
            name="Category"
            id={each}
            value={each}
            defaultChecked={defaultCheckHandler("Category", each)}
            onClick={(e) => handleCheck(e.target)}
          />
          <label className="form-check-label" htmlFor={each}>
            {each}
          </label>
        </div>
      ))}

      <hr />
      <h5 className="mb-3">Ratings</h5>
      {[5, 4, 3, 2, 1].map((rating) => (
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="ratings"
            id={rating}
            value={rating}
            defaultChecked={defaultCheckHandler("ratings", rating.toString())}
            onClick={(e) => handleCheck(e.target)}
          />
          <label className="form-check-label" htmlFor={rating}>
            <span className="star-rating">
              <StarRatings
                rating={rating}
                starRatedColor="#ffb829"
                numberOfStars={5}
                name="rating"
                starDimension="20px"
                starSpacing="2px"
              />
            </span>
          </label>
        </div>
      ))}
    </div>
  );
}

export default Filters;
