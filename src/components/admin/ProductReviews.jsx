import React, { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import { MDBDataTable } from "mdbreact";
import {
  useDeleteReviewMutation,
  useLazyGetAdminProductReviewsQuery,
} from "../../redux/api/productsApi";
import Loader from "../layout/Loader";
import toast from "react-hot-toast";

function ProductReviews() {
  const [productId, setProductId] = useState("");
  const [getAdminProductReviews, { data, error, isLoading }] =
    useLazyGetAdminProductReviewsQuery();
  const [
    deleteReview,
    { error: deleteError, isLoading: deleteLoading, isSuccess },
  ] = useDeleteReviewMutation();
  useEffect(() => {
    console.log(data);
    if (error) {
      toast.error(error?.data?.message);
    }
    if (deleteError) {
      toast.error(deleteError?.data?.message);
    }
    if (isSuccess) {
      toast.success("review deleted");
    }
  }, [data, deleteError, isSuccess, error]);
  const deleteReviewHandler = (id) => {
    deleteReview({ productId, id });
  };
  const setReviews = () => {
    const reviews = {
      columns: [
        {
          label: "Review ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Rating",
          field: "rating",
          sort: "asc",
        },
        {
          label: "Comment",
          field: "comment",
          sort: "asc",
        },
        {
          label: "User",
          field: "user",
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
    data?.reviews?.forEach((review) => {
      reviews?.rows?.push({
        id: review?._id,
        rating: review?.rating,
        comment: review?.comment,
        user: review?.user,
        actions: (
          <button
            className="btn btn-outline-danger ms-2"
            onClick={() => deleteReviewHandler(review?._id)}
            disabled={deleteLoading}
          >
            <i className="fa fa-trash"></i>
          </button>
        ),
      });
    });
    return reviews;
  };
  const submitHandler = (e) => {
    e.preventDefault();
    getAdminProductReviews(productId);
  };
  if (isLoading) return <Loader />;
  return (
    <AdminLayout>
      <div className="row justify-content-center my-5">
        <div className="col-6">
          <form onSubmit={submitHandler}>
            <div className="mb-3">
              <label htmlFor="productId_field" className="form-label">
                Enter Product ID
              </label>
              <input
                type="text"
                id="productId_field"
                className="form-control"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <button
              id="search_button"
              type="submit"
              className="btn btn-primary w-100 py-2"
            >
              SEARCH
            </button>
          </form>
        </div>
      </div>

      {data?.reviews?.length > 0 ? (
        <MDBDataTable
          data={setReviews()}
          className="px-3"
          border
          striped
          hover
        />
      ) : (
        <p className="mt-5 text-center">No Reviews Posted</p>
      )}
    </AdminLayout>
  );
}

export default ProductReviews;
