import React, { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import { useNavigate, useParams } from "react-router-dom";
import { ProductCategories } from "../../constants/constants";

import toast from "react-hot-toast";
import {
  useGetProductdetailsQuery,
  useUpdateProductMutation,
} from "../../redux/api/productsApi";

function UpdateProduct() {
  const navigate = useNavigate();
  const params = useParams();
  const { data } = useGetProductdetailsQuery(params?.id);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: ProductCategories[0],
    stock: "",
    seller: "",
  });

  const [updateProduct, { error, isSuccess, isLoading }] =
    useUpdateProductMutation();
  const { name, description, price, category, stock, seller } = product;
  const onChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (data) {
      setProduct({
        name: data?.name,
        description: data?.description,
        price: data?.price,
        category: data?.category,
        stock: data?.stock,
        seller: data?.seller,
      });
    }
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("Product Updated");
      navigate("/admin/products");
    }
  }, [error, isSuccess, navigate, data]);
  const submitUpdateHandler = (e) => {
    e.preventDefault();
    console.log(params?.id);
    const productData = {
      name,
      description,
      price,
      category,
      stock,
      seller,
    };
    updateProduct({ productId: params?.id, body: productData });
  };
  return (
    <AdminLayout>
      <div className="row wrapper">
        <div className="col-10 col-lg-10 mt-5 mt-lg-0">
          <form
            className="shadow rounded bg-body"
            onSubmit={submitUpdateHandler}
          >
            <h2 className="mb-4">Update Product</h2>
            <div className="mb-3">
              <label htmlFor="name_field" className="form-label">
                {" "}
                Name{" "}
              </label>
              <input
                type="text"
                id="name_field"
                className="form-control"
                name="name"
                value={name}
                onChange={onChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="description_field" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="description_field"
                rows="8"
                name="description"
                value={description}
                onChange={onChange}
              ></textarea>
            </div>

            <div className="row">
              <div className="mb-3 col">
                <label htmlFor="price_field" className="form-label">
                  {" "}
                  Price{" "}
                </label>
                <input
                  type="text"
                  id="price_field"
                  className="form-control"
                  name="price"
                  value={price}
                  onChange={onChange}
                />
              </div>

              <div className="mb-3 col">
                <label htmlFor="stock_field" className="form-label">
                  {" "}
                  Stock{" "}
                </label>
                <input
                  type="number"
                  id="stock_field"
                  className="form-control"
                  name="stock"
                  value={stock}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="mb-3 col">
                <label htmlFor="category_field" className="form-label">
                  {" "}
                  Category{" "}
                </label>
                <select
                  className="form-select"
                  id="category_field"
                  name="category"
                  value={category}
                  onChange={onChange}
                >
                  {ProductCategories.map((each) => (
                    <option key={each} value={each}>
                      {each}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3 col">
                <label htmlFor="seller_field" className="form-label">
                  {" "}
                  Seller Name{" "}
                </label>
                <input
                  type="text"
                  id="seller_field"
                  className="form-control"
                  name="seller"
                  value={seller}
                  onChange={onChange}
                />
              </div>
            </div>
            <button type="submit" className="btn w-100 py-2">
              {isLoading ? "UPDATING...." : "UPDATE"}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}

export default UpdateProduct;
