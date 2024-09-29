import React, { useEffect, useState } from "react";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector } from "react-redux";
import { caluculateOrderCost } from "../../helpers/helpers";
import {
  useCreateNewOrderMutation,
  useStripeCheckoutSessionMutation,
} from "../../redux/api/orderApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Payment() {
  const [method, setMethod] = useState();
  const navigate = useNavigate();
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const [createNewOrder, { isLoading, error, isSuccess }] =
    useCreateNewOrderMutation();

  const [stripeCheckoutSession, { data, checkError }] =
    useStripeCheckoutSessionMutation();

  useEffect(() => {
    console.log(data?.url);
    if (checkError) {
      toast.error(checkError?.data?.message);
    }
    if (data) {
      window.location.href = data?.url;
    }
  }, [data, checkError, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("Ordered Successfully");
      navigate("/me/orders?order_success=true");
    }
  }, [error, isSuccess, navigate]);
  const submitHandler = (e) => {
    e.preventDefault();
    const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
      caluculateOrderCost(cartItems);
    if (method === "COD") {
      const orderData = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice,
        taxAmount: taxPrice,
        shippingAmount: shippingPrice,
        totalAmount: totalPrice,
        paymentInfo: {
          status: "Not Paid",
        },
        paymentMethod: "COD",
      };
      createNewOrder(orderData);
    }
    if (method === "Card") {
      const orderData = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice,
        taxAmount: taxPrice,
        shippingAmount: shippingPrice,
        totalAmount: totalPrice,
      };
      stripeCheckoutSession(orderData);
    }
  };
  return (
    <>
      <CheckoutSteps shipping confirmOrder payment />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow rounded bg-body" onSubmit={submitHandler}>
            <h2 className="mb-4">Select Payment Method</h2>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="payment_mode"
                id="codradio"
                value="COD"
                onChange={(e) => setMethod("COD")}
              />
              <label className="form-check-label" htmlFor="codradio">
                Cash on Delivery
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="payment_mode"
                id="cardradio"
                value="Card"
                onChange={(e) => setMethod("Card")}
              />
              <label className="form-check-label" htmlFor="cardradio">
                Card - VISA, MasterCard
              </label>
            </div>

            <button
              id="shipping_btn"
              type="submit"
              disabled={isLoading}
              className="btn py-2 w-100"
            >
              CONTINUE
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Payment;
