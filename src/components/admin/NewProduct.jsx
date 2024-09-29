import React, { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import { useNavigate } from "react-router-dom";
import { ProductCategories } from "../../constants/constants";

import toast from "react-hot-toast";
import { useCreateProductMutation } from "../../redux/api/productsApi";

function NewProduct() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: ProductCategories[0],
    stock: "",
    seller: "",
  });
  const [createProduct, { error, isSuccess, isLoading }] =
    useCreateProductMutation();
  const { name, description, price, category, stock, seller } = product;
  const onChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("Product Created Successfully");
      navigate("/admin/products");
    }
  }, [error, isSuccess, navigate]);
  const submitCreateHandler = (e) => {
    e.preventDefault();
    console.log(category);
    const productData = {
      name,
      description,
      price,
      category,
      stock,
      seller,
    };
    createProduct(productData);
  };
  return (
    <AdminLayout>
      <div className="row wrapper">
        <div className="col-10 col-lg-10 mt-5 mt-lg-0">
          <form
            className="shadow rounded bg-body"
            onSubmit={submitCreateHandler}
          >
            <h2 className="mb-4">New Product</h2>
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
              {isLoading ? "CREATING...." : "CREATE"}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}

export default NewProduct;
