import React, { useEffect } from "react";
import MetaData from "./layout/MetaData";
import { useGetProductsQuery } from "../redux/api/productsApi";
import ProductItem from "./product/ProductItem";
import Loader from "./layout/Loader";
import toast from "react-hot-toast";
import CustomPagination from "./layout/CustomPagination";
import { useSearchParams } from "react-router-dom";
import Filters from "./layout/Filters";

function HomePage() {
  let [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;

  const keyword = searchParams.get("keyword") || undefined;

  const min = searchParams.get("min") || undefined;

  const max = searchParams.get("max") || undefined;
  const category = searchParams.get("Category") || undefined;
  const rating = searchParams.get("ratings") || undefined;
  const params = { page, keyword, category, rating };
  min !== null && (params.min = min);
  max !== null && (params.max = max);
  console.log(params);

  const { data, isLoading, error, isError } = useGetProductsQuery(params);
  console.log(data);

  useEffect(() => {
    if (isError) {
      toast.error(error);
    }
  }, [isError, error]);
  const columnSize = keyword ? 4 : 3;

  //   console.log(data, isError);
  if (isLoading) return <Loader />;
  return (
    <>
      <MetaData title={"Buy best products online"} />
      <div className="row">
        {keyword && (
          <div className="col-6 col-md-3 mt-5">
            <Filters />
          </div>
        )}
        <div className={keyword ? "col-6 col-md-9" : "col-6 col-md-12"}>
          <h1 id="products_heading" className="text-secondary">
            {keyword
              ? `${data.products.length} Products found with keyword:${keyword}`
              : "Latest Products"}
          </h1>

          <section id="products" className="mt-5">
            <div className="row">
              {data?.products.map((product) => (
                <ProductItem
                  key={product._id}
                  product={product}
                  columnSize={columnSize}
                />
              ))}

              {/* End Product Item 1 */}
            </div>
          </section>
          <CustomPagination
            resPerPage={data?.resPerPage}
            productsCount={data?.productsCount}
          />
        </div>
      </div>
    </>
  );
}

export default HomePage;
