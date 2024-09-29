import React, { useEffect } from "react";

import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import Loader from "../layout/Loader";
import AdminLayout from "../layout/AdminLayout";
import {
  useDeleteOrderMutation,
  useGetAdminOrdersQuery,
} from "../../redux/api/orderApi";

function ListOrders() {
  const { data, isLoading, error } = useGetAdminOrdersQuery();
  const [
    deleteOrder,
    { error: deleteError, isLoading: deleteLoading, isSuccess },
  ] = useDeleteOrderMutation();
  useEffect(() => {
    console.log(data);
    if (error) {
      toast.error(error?.data?.message);
    }
    if (deleteError) {
      toast.error(deleteError?.data?.message);
    }
    if (isSuccess) {
      toast.success("Order deleted");
    }
  }, [error, deleteError, data, isSuccess]);

  const deleteOrderHandler = (id) => {
    deleteOrder(id);
  };

  const setOrders = () => {
    const orders = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Payment Status",
          field: "paymentStatus",
          sort: "asc",
        },
        {
          label: "Order Status",
          field: "orderStatus",
          sort: "asc",
        },

        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };
    data?.orders?.forEach((order) => {
      orders.rows.push({
        id: order?._id,
        paymentStatus: order?.paymentInfo?.status.toUpperCase(),
        orderStatus: order?.orderStatus,
        actions: (
          <>
            <Link
              to={`/admin/order/${order?._id}`}
              className="btn btn-outline-primary "
            >
              <i className="fa fa-pencil"></i>
            </Link>

            <button
              className="btn btn-outline-danger ms-2"
              onClick={() => deleteOrderHandler(order?._id)}
              disabled={deleteLoading}
            >
              <i className="fa fa-trash"></i>
            </button>
          </>
        ),
      });
    });
    return orders;
  };
  if (isLoading) return <Loader />;
  return (
    <AdminLayout>
      <h1 className="my-5">{data?.orders?.length} Orders</h1>
      <MDBDataTable data={setOrders()} className="px-3" border striped hover />
    </AdminLayout>
  );
}

export default ListOrders;
