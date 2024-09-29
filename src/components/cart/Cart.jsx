import React from "react";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { setCartItem, removeCartItem } from "../../redux/features/cartSlice";
import { Link, useNavigate } from "react-router-dom";

function Cart() {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const incrementQuantity = (item, quantity) => {
    const newQuantity = quantity + 1;
    if (newQuantity >= item?.stock) return;

    setItemToCart(item, newQuantity);
  };
  const decrementQuantity = (item, quantity) => {
    const newQuantity = quantity - 1;
    if (newQuantity <= 0) return;

    setItemToCart(item, newQuantity);
  };

  const navigate = useNavigate();

  const setItemToCart = (data, newQuantity) => {
    const cartItem = {
      product: data?.product,
      name: data?.name,
      price: data?.price,
      image: data?.image,
      stock: data?.stock,
      quantity: newQuantity,
    };
    dispatch(setCartItem(cartItem));
  };

  const removeCartHandler = (id) => {
    dispatch(removeCartItem(id));
  };

  const handleCheckout = () => {
    navigate("/shipping");
  };

  return (
    <>
      <h2 className="mt-5">
        Your Cart: <b>{cartItems.length} items</b>
      </h2>

      <div className="row d-flex justify-content-between">
        <div className="col-12 col-lg-8">
          {/* <!-- Cart Items --> */}
          <hr />
          {cartItems.map((each) => (
            <>
              <div className="cart-item" key={each._id}>
                <div className="row">
                  <div className="col-4 col-lg-3">
                    <img
                      src={each.image}
                      alt={each.name}
                      height="90"
                      width="115"
                    />
                  </div>
                  <div className="col-5 col-lg-3">
                    <Link to={`/product/${each.product}`}> {each.name} </Link>
                  </div>
                  <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                    <p id="card_item_price">${each.price}</p>
                  </div>
                  <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                    <div className="stockCounter d-inline">
                      <span
                        className="btn btn-danger minus"
                        onClick={() => decrementQuantity(each, each.quantity)}
                      >
                        -
                      </span>
                      <input
                        type="number"
                        className="form-control count d-inline"
                        value={each.quantity}
                      />
                      <span
                        className="btn btn-primary plus"
                        onClick={() => incrementQuantity(each, each.quantity)}
                      >
                        +
                      </span>
                    </div>
                  </div>
                  <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                    <i
                      id="delete_cart_item"
                      className="fa fa-trash btn btn-danger"
                      onClick={() => removeCartHandler(each?.product)}
                    ></i>
                  </div>
                </div>
              </div>
              <hr />
            </>
          ))}
        </div>

        <div className="col-12 col-lg-3 my-4">
          <div id="order_summary">
            <h4>Order Summary</h4>
            <hr />
            <p>
              Subtotal:{" "}
              <span className="order-summary-values">
                {cartItems.reduce((acc, item) => acc + item?.quantity, 0)}{" "}
                (Units)
              </span>
            </p>
            <p>
              Est. total:{" "}
              <span className="order-summary-values">
                $
                {cartItems
                  .reduce((acc, item) => acc + item?.quantity * item?.price, 0)
                  .toFixed(2)}{" "}
              </span>
            </p>
            <hr />
            <button
              id="checkout_btn"
              onClick={handleCheckout}
              className="btn btn-primary w-100"
            >
              Check out
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
