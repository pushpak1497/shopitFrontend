import React, { useEffect } from "react";
import {
  useDeleteProductMutation,
  useGetAdminProductsQuery,
} from "../../redux/api/productsApi";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import Loader from "../layout/Loader";
import AdminLayout from "../layout/AdminLayout";

function ListProducts() {
  const { data, isLoading, error } = useGetAdminProductsQuery();
  const [
    deleteProduct,
    { isLoading: deleteLoading, error: deleteError, isSuccess },
  ] = useDeleteProductMutation();
  useEffect(() => {
    console.log(data);
    if (error) {
      toast.error(error?.data?.message);
    }
    if (deleteError) {
      toast.error(deleteError?.data?.message);
    }
    if (isSuccess) {
      toast.success("product deleted");
    }
  }, [error, deleteError, data, isSuccess]);

  const deleteHandler = (id) => {
    deleteProduct(id);
  };

  const setProducts = () => {
    const products = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Stock",
          field: "stock",
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
    data?.products?.forEach((product) => {
      products.rows.push({
        id: product?._id,
        name: `${product?.name?.substring(0, 20)}...`,
        stock: product?.stock,

        actions: (
          <>
            <Link
              to={`/admin/products/${product?._id}`}
              className="btn btn-outline-primary "
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <Link
              to={`/admin/products/${product?._id}/upload_images`}
              className="btn btn-outline-success ms-2"
            >
              <i className="fa fa-image"></i>
            </Link>
            <button
              className="btn btn-outline-danger ms-2"
              onClick={() => deleteHandler(product?._id)}
              disabled={deleteLoading}
            >
              <i className="fa fa-trash"></i>
            </button>
          </>
        ),
      });
    });
    return products;
  };
  if (isLoading) return <Loader />;
  return (
    <AdminLayout>
      <h1 className="my-5">{data?.products?.length} Products</h1>
      <MDBDataTable
        data={setProducts()}
        className="px-3"
        border
        striped
        hover
      />
    </AdminLayout>
  );
}

export default ListProducts;
