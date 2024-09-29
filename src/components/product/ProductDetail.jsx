import React, { useEffect, useState } from "react";
import { useGetProductdetailsQuery } from "../../redux/api/productsApi";
import { useParams } from "react-router-dom";
import Loader from "../layout/Loader";
import StarRatings from "react-star-ratings";
import toast from "react-hot-toast";
import { setCartItem } from "../../redux/features/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NewReview from "../reviews/NewReview";
import ListReviews from "../reviews/ListReviews";

function ProductDetail() {
  const params = useParams();
  const [quantity, setQuantity] = useState(1);
  const { data, isLoading, error, isError } = useGetProductdetailsQuery(
    params.id
  );
  console.log(data);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [activeImage, setActiveImage] = useState("");
  useEffect(() => {
    setActiveImage(
      data?.images[0] ? data?.images[0].url : "/images/default_product.png"
    );
  }, [data]);
  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [error, isError]);

  const incrementQuantity = () => {
    const count = document.querySelector(".count");
    if (count.valueAsNumber >= data?.stock) return;
    const qty = count.valueAsNumber + 1;
    setQuantity(qty);
  };
  const decrementQuantity = () => {
    const count = document.querySelector(".count");
    if (count.valueAsNumber <= 1) return;
    const qty = count.valueAsNumber - 1;
    setQuantity(qty);
  };

  const setItemToCart = () => {
    const cartItem = {
      product: data?._id,
      name: data?.name,
      price: data?.price,
      image: data?.images[0]?.url,
      stock: data?.stock,
      quantity,
    };
    dispatch(setCartItem(cartItem));
    toast.success("Item Added to cart");
  };

  if (isLoading) return <Loader />;
  return (
    <div className="row d-flex justify-content-around">
      <div className="col-12 col-lg-5 img-fluid" id="product_image">
        <div className="p-3">
          <img
            className="d-block w-100"
            src={activeImage}
            alt={data?.name}
            width="340"
            height="390"
          />
        </div>
        <div className="row justify-content-start mt-5">
          {data?.images?.map((image) => (
            <div className="col-2 ms-4 mt-2">
              <Link role="button">
                <img
                  className={`d-block border rounded p-3 cursor-pointer ${
                    image?.url === activeImage ? "border-warning" : ""
                  }`}
                  height="100"
                  width="100"
                  src={image?.url}
                  alt={data?.name}
                  onClick={(e) => setActiveImage(image?.url)}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="col-12 col-lg-5 mt-5">
        <h3>{data?.name}</h3>
        <p id="product_id">Product {data._id}</p>

        <hr />

        <div className="d-flex">
          <StarRatings
            rating={data.rating}
            starRatedColor="#ffb829"
            numberOfStars={5}
            name="rating"
            starDimension="18px"
            starSpacing="1px"
          />
          <span id="no-of-reviews" className="pt-1 ps-2">
            ({data.noOfReviews} Reviews)
          </span>
        </div>
        <hr />

        <p id="product_price">${data.price}</p>
        <div className="stockCounter d-inline">
          <span className="btn btn-danger minus" onClick={decrementQuantity}>
            -
          </span>
          <input
            type="number"
            className="form-control count d-inline p-1 m-1"
            value={quantity}
            readonly
          />
          <span className="btn btn-primary plus" onClick={incrementQuantity}>
            +
          </span>
        </div>
        <button
          type="button"
          id="cart_btn"
          className="btn btn-primary d-inline ms-4"
          disabled={data.stock === 0}
          onClick={setItemToCart}
        >
          Add to Cart
        </button>

        <hr />

        <p>
          Status:
          <span
            id="stock_status"
            className={data.stock > 0 ? "greenColor" : "redColor"}
          >
            {data.stock > 0 ? "In Stock" : "Out Of Stock"}
          </span>
        </p>

        <hr />

        <h4 className="mt-2">Description:</h4>
        <p>{data.description}</p>
        <hr />
        <p id="product_seller mb-3">
          Sold by: <strong>{data.seller}</strong>
        </p>

        {isAuthenticated ? (
          <NewReview productId={data?._id} />
        ) : (
          <div className="alert alert-danger my-5" type="alert">
            Login to post your review.
          </div>
        )}
      </div>
      {data?.reviews?.length > 0 && <ListReviews reviews={data?.reviews} />}
    </div>
  );
}

export default ProductDetail;
