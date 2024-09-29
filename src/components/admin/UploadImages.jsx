import React, { useEffect, useRef, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import {
  useDeleteProductImageMutation,
  useGetProductdetailsQuery,
  useUploadProductImagesMutation,
} from "../../redux/api/productsApi";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

function UploadImages() {
  const [images, setImages] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const params = useParams();
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const { data } = useGetProductdetailsQuery(params?.id);
  const [uploadProductImages, { error, isLoading, isSuccess }] =
    useUploadProductImagesMutation();
  const [
    deleteProductImage,
    { isLoading: isDeleteLoading, error: deleteError },
  ] = useDeleteProductImageMutation();
  useEffect(() => {
    if (data) {
      setUploadedImages(data?.images);
    }
    if (error) {
      toast.error(error?.data?.message);
    }
    if (deleteError) {
      toast.error(deleteError?.data?.message);
    }
    if (isSuccess) {
      toast.success("Images Uploaded");
      navigate("/admin/products");
    }
  }, [data, error, deleteError, isSuccess, navigate]);
  const onChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagePreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };
  const handleResetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const handlePreviewDelete = (image) => {
    const filteredImagesPreview = imagePreview?.filter((img) => img !== image);
    setImagePreview(filteredImagesPreview);
    setImages(filteredImagesPreview);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    uploadProductImages({ productId: params?.id, body: { images } });
  };

  const deleteImage = (imageId) => {
    deleteProductImage({ id: params?.id, body: { imageId } });
  };

  return (
    <AdminLayout>
      <div className="row wrapper">
        <div className="col-10 col-lg-8 mt-5 mt-lg-0">
          <form className="shadow rounded bg-body" onSubmit={submitHandler}>
            <h2 className="mb-4">Upload Product Images</h2>

            <div className="mb-3">
              <label htmlFor="customFile" className="form-label">
                Choose Images
              </label>

              <div className="custom-file">
                <input
                  type="file"
                  ref={fileInputRef}
                  name="product_images"
                  className="form-control"
                  id="customFile"
                  multiple
                  onChange={onChange}
                  onClick={handleResetFileInput}
                />
              </div>
              {imagePreview.length > 0 && (
                <div className="new-images my-4">
                  <p className="text-warning">New Images:</p>
                  <div className="row mt-4">
                    {imagePreview?.map((img) => (
                      <div className="col-md-3 mt-2">
                        <div className="card">
                          <img
                            src={img}
                            alt="Card"
                            className="card-img-top p-2"
                            style={{ width: "100%", height: "80px" }}
                          />
                          <button
                            style={{
                              backgroundColor: "#dc3545",
                              borderColor: "#dc3545",
                            }}
                            type="button"
                            onClick={() => handlePreviewDelete(img)}
                            className="btn btn-block btn-danger cross-button mt-1 py-0"
                          >
                            <i className="fa fa-times"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* <!-- End New Images --> */}

              {/* <!-- Uploaded Images --> */}
              {uploadedImages.length > 0 && (
                <div className="uploaded-images my-4">
                  <p className="text-success">Product Uploaded Images:</p>
                  <div className="row mt-1">
                    {uploadedImages?.map((image) => (
                      <div className="col-md-3 mt-2">
                        <div className="card">
                          <img
                            src={image?.url}
                            alt="Card"
                            className="card-img-top p-2"
                            style={{ width: "100%", height: "80px" }}
                          />
                          <button
                            style={{
                              backgroundColor: "#dc3545",
                              borderColor: "#dc3545",
                            }}
                            className="btn btn-block btn-danger cross-button mt-1 py-0"
                            disabled={isDeleteLoading || isLoading}
                            onClick={() => deleteImage(image?.public_id)}
                            type="button"
                          >
                            <i className="fa fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    ))}

                    {/* <!-- End Uploaded Image 1 --> */}
                  </div>
                </div>
              )}
            </div>

            <button
              id="register_button"
              type="submit"
              className="btn w-100 py-2"
              disabled={isLoading || isDeleteLoading}
            >
              {isLoading ? "Uploading....." : "Upload"}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}

export default UploadImages;
