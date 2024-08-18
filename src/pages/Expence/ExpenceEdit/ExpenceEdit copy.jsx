import React, { useContext, useEffect, useState } from "react";
import DataContext from "../../../context/DataContext";
import { ToastContainer, Zoom } from "react-toastify";
import { useParams } from "react-router-dom";
import api from "../../../api/api";
import "./expenceedit.css";
import { AiOutlineClose } from "react-icons/ai";

const ExpenceEdit = () => {
  const { isLoading, handleHead, config, handleUpdateProduct } =
    useContext(DataContext);
  const [expence, setExpence] = useState(null);
  const { id } = useParams();

  const handleFetchSingleExpence = async (id) => {
    try {
      const fetchedData = await api.get(`/api/expense/${id}`, config);
      console.log(fetchedData.data);

      if (fetchedData.data) {
        setExpence(fetchedData.data);
      } else {
        setExpence([]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const options = [
    { key: "Select a Category", value: "" },
    { key: "Software", value: "Software" },
    { key: "Hardware", value: "Hardware" },
    { key: "Electronics", value: "Electronics" },
    { key: "Electrical", value: "Electrical" },
    { key: "Plumbing", value: "Plumbing" },
    { key: "Masonary", value: "Masonary" },
    { key: "Others", value: "Others" },
  ];

  useEffect(() => {
    handleFetchSingleExpence(id);
    handleHead("Update Expence");
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpence({ ...expence, [name]: value });
  };

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleImageRemove = (e) => {
    setProductImage(null);
    setImagePreview(null);
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", expence?.name);

    formData.append("category", expence?.category);
    formData.append("quantity", expence?.quantity);
    formData.append("price", expence?.price);
    formData.append("description", expence?.description);
    if (productImage) {
      formData.append("image", productImage);
    }
    handleUpdateProduct({ id, formData });
  };

  return (
    <section className="productEdit">
      <div className="container mt-5 update__profile">
        <form onSubmit={saveProduct}>
          <div className="detailCards">
            <h3 style={{ color: "var(--theme" }}>Update Product :</h3>
            <div className="form-group mb-3 ">
              <label htmlFor="image" className="label__style mb-0">
                Product Image
              </label>
              <div>
                <input
                  name="image"
                  id="image"
                  className={`form-control shadow-none `}
                  type="file"
                  onChange={(e) => handleImageChange(e)}
                />
              </div>
            </div>
            {imagePreview != null ? (
              <div className="image__preview rounded">
                <img
                  src={imagePreview}
                  alt="product"
                  className="rounded"
                  width={300}
                  height={300}
                />
                <span onClick={handleImageRemove}>
                  <AiOutlineClose />
                </span>
              </div>
            ) : (
              <p>No image set for this product.</p>
            )}
            <div className="form-group mb-3 ">
              <label htmlFor="name" className="label__style mb-0">
                Product Name
              </label>
              <div>
                <input
                  name="name"
                  id="name"
                  className={`form-control shadow-none `}
                  type="text"
                  placeholder="Enter Product Name"
                  value={expence?.name}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
            </div>
            <div className="form-group mb-3 ">
              <label htmlFor="category" className="label__style mb-0">
                Product Category
              </label>
              <div>
                <select
                  className={`form-control shadow-none `}
                  name="category"
                  id="category"
                  value={expence?.category}
                  onChange={(e) => handleInputChange(e)}
                >
                  {options.map((option) => {
                    return (
                      <option key={option.value} value={option.value}>
                        {option.key}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="form-group mb-3 ">
              <label htmlFor="name" className="label__style mb-0">
                Product Quantity
              </label>
              <div>
                <input
                  name="quantity"
                  id="quantity"
                  className={`form-control shadow-none `}
                  type="number"
                  placeholder="Enter Product Quantity"
                  value={expence?.quantity}
                  onChange={(e) => handleInputChange(e)}
                  min={0}
                  max={100}
                />
              </div>
            </div>
            <div className="form-group mb-3 ">
              <label htmlFor="name" className="label__style mb-0">
                Product Price
              </label>
              <div>
                <input
                  name="price"
                  id="price"
                  className={`form-control shadow-none `}
                  type="number"
                  placeholder="Enter Product Price"
                  value={expence?.price}
                  onChange={(e) => handleInputChange(e)}
                  min={0}
                />
              </div>
            </div>
            <div className="form-group mb-3 ">
              <label htmlFor="description" className="label__style mb-0">
                Description
              </label>
              <div>
                <textarea
                  className={`form-control formInputs textarea w-100 shadow-none 
                       `}
                  placeholder="Enter Description"
                  onChange={(e) => handleInputChange(e)}
                  name="description"
                  value={expence?.description}
                ></textarea>
              </div>
            </div>
            <div className="text-center mt-3">
              <button className="text-white button rounded" type="submit">
                {isLoading ? (
                  <span className="spinner-border spinner-border-sm text-warning"></span>
                ) : (
                  "Update"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={1000}
        transition={Zoom}
        draggable={false}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="dark"
      />
    </section>
  );
};

export default ExpenceEdit;
