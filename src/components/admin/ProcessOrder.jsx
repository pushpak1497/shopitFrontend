import React, { useState, useEffect } from "react";
import AdminLayout from "../layout/AdminLayout";
import { Link, useParams } from "react-router-dom";
import {
  useOrderDetailsQuery,
  useUpdateOrderMutation,
} from "../../redux/api/orderApi";
import toast from "react-hot-toast";
import Loader from "../layout/Loader";

function ProcessOrder() {
  const params = useParams();
  const [status, setStatus] = useState("Processing");
  const { data, isLoading } = useOrderDetailsQuery(params?.id);
  const [updateOrder, { error, isSuccess }] = useUpdateOrderMutation();

  const order = data?.order;
  useEffect(() => {
    console.log(order);
    if (order?.orderStatus) {
      setStatus(order?.orderStatus);
    }
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("Order Updated");
    }
  }, [error, data, order, isSuccess]);
  const isPaid = data?.order?.paymentInfo.status === "paid" ? true : false;

  const orderUpdateHandler = (id) => {
    updateOrder({ id, body: { status } });
  };

  if (isLoading) return <Loader />;
  return (
    <AdminLayout>
      <div className="row d-flex justify-content-around">
        <div className="col-12 col-lg-8 order-details">
          <h3 className="mt-5 mb-4">Order Details</h3>

          <table className="table table-striped table-bordered">
            <tbody>
              <tr>
                <th scope="row">ID</th>
                <td>{order?._id}</td>
              </tr>
              <tr>
                <th scope="row">Order Status</th>
                <td
                  className={
                    String(order?.orderStatus).includes("Delivered")
                      ? "greenColor"
                      : "redColor"
                  }
                >
                  <b>{order?.orderStatus}</b>
                </td>
              </tr>
            </tbody>
          </table>

          <h3 className="mt-5 mb-4">Shipping Info</h3>
          <table className="table table-striped table-bordered">
            <tbody>
              <tr>
                <th scope="row">User ID</th>
                <td>{order?.user}</td>
              </tr>
              <tr>
                <th scope="row">Phone No</th>
                <td>{order?.shippingInfo?.phoneNo}</td>
              </tr>
              <tr>
                <th scope="row">Address</th>
                <td>
                  {order?.shippingInfo?.address}, {order?.shippingInfo?.city},{" "}
                  {order?.shippingInfo?.country}
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
                  <b>{order?.paymentInfo?.status}</b>
                </td>
              </tr>
              <tr>
                <th scope="row">Method</th>
                <td>{order?.paymentMethod}</td>
              </tr>
              {order?.paymentMethod === "Card" && (
                <tr>
                  <th scope="row">Stripe ID</th>
                  <td>{order?.paymentInfo?.id}</td>
                </tr>
              )}

              <tr>
                <th scope="row">Amount</th>
                <td>${order?.totalAmount}</td>
              </tr>
            </tbody>
          </table>

          <h3 className="mt-5 my-4">Order Items:</h3>

          <hr />
          <div className="cart-item my-1">
            {order?.orderItems?.map((item) => (
              <div className="row my-5">
                <div className="col-4 col-lg-2">
                  <img
                    src={
                      item?.image
                        ? item?.image
                        : "../images//default_product.png"
                    }
                    alt={item?.name}
                    height="45"
                    width="65"
                  />
                </div>
                <div className="col-5 col-lg-5">
                  <Link to={`/product/${item?.product}`}>{item?.name}</Link>
                </div>
                <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                  <p>${item?.price}</p>
                </div>
                <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                  <p>{item?.quantity} Piece(s)</p>
                </div>
              </div>
            ))}
          </div>
          <hr />
        </div>

        <div className="col-12 col-lg-3 mt-5">
          <h4 className="my-4">Status</h4>

          <div className="mb-3">
            <select
              className="form-select"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>

          <button
            className="btn btn-primary w-100"
            onClick={() => orderUpdateHandler(order?._id)}
          >
            Update Status
          </button>

          <h4 className="mt-5 mb-3">Order Invoice</h4>
          <Link
            to={`/invoice/order/${order?._id}`}
            className="btn btn-success w-100"
          >
            <i className="fa fa-print"></i> Generate Invoice
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
}

export default ProcessOrder;
