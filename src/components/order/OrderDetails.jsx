import React, { useEffect } from "react";
import { useOrderDetailsQuery } from "../../redux/api/orderApi";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../layout/Loader";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function OrderDetails() {
  const params = useParams();
  const { data, isLoading, error } = useOrderDetailsQuery(params.id);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    console.log(data);
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [error, data]);
  const isPaid = data?.order?.paymentInfo.status === "paid" ? true : false;

  if (isLoading) return <Loader />;

  return (
    <div className="row d-flex justify-content-center">
      <div className="col-12 col-lg-9 mt-5 order-details">
        <div className="d-flex justify-content-between align-items-center">
          <h3 className="mt-5 mb-4">Your Order Details</h3>
          <a className="btn btn-success" href="/invoice/order/order-id">
            <i className="fa fa-print"></i> Invoice
          </a>
        </div>
        <table className="table table-striped table-bordered">
          <tbody>
            <tr>
              <th scope="row">ID</th>
              <td>{data?.order?._id}</td>
            </tr>
            <tr>
              <th scope="row">Status</th>
              <td
                className={
                  String(data?.order?.orderStatus).includes("Delivered")
                    ? "greenColor"
                    : "redColor"
                }
              >
                <b>{data?.order?.orderStatus}</b>
              </td>
            </tr>
            <tr>
              <th scope="row">Date</th>
              <td>
                {new Date(data?.order?.createdAt).toLocaleString("en-US")}
              </td>
            </tr>
          </tbody>
        </table>

        <h3 className="mt-5 mb-4">Shipping Info</h3>
        <table className="table table-striped table-bordered">
          <tbody>
            <tr>
              <th scope="row">Name</th>
              <td>{user?.name}</td>
            </tr>
            <tr>
              <th scope="row">Phone No</th>
              <td>{data?.order?.shippingInfo?.phoneNo}</td>
            </tr>
            <tr>
              <th scope="row">Address</th>
              <td>
                {data?.order?.shippingInfo?.address} ,{" "}
                {data?.order?.shippingInfo?.city} ,{" "}
                {data?.order?.shippingInfo?.zipCode} ,{" "}
                {data?.order?.shippingInfo?.country}
              </td>
            </tr>
          </tbody>
        </table>

        <h3 className="mt-5 mb-4">Payment Info</h3>
        <table className="table table-striped table-bordered">
          <tbody>
            <tr>
              <th scope="row">Status</th>
              <td className={isPaid ? "greenColor" : "redColor"}>
                <b>{data?.order?.paymentInfo?.status}</b>
              </td>
            </tr>
            <tr>
              <th scope="row">Method</th>
              <td>{data?.order?.paymentMethod}</td>
            </tr>
            {data?.order?.paymentMethod !== "COD" && (
              <tr>
                <th scope="row">Stripe ID</th>
                <td>{data?.order?.paymentInfo?.id}</td>
              </tr>
            )}

            <tr>
              <th scope="row">Amount Paid</th>
              <td>${data?.order?.totalAmount}</td>
            </tr>
          </tbody>
        </table>

        <h3 className="mt-5 my-4">Order Items:</h3>

        <hr />
        <div className="cart-item my-1">
          {data?.order?.orderItems?.map((each) => (
            <div className="row my-5">
              <div className="col-4 col-lg-2">
                <img
                  src={each.image}
                  alt="Product Name"
                  height="45"
                  width="65"
                />
              </div>

              <div className="col-5 col-lg-5">
                <Link to={`/product/${each.product}`}>{each.name}</Link>
              </div>

              <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                <p>{each.price}</p>
              </div>

              <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                <p>{each.quantity} Piece(s)</p>
              </div>
            </div>
          ))}
        </div>
        <hr />
      </div>
    </div>
  );
}

export default OrderDetails;
