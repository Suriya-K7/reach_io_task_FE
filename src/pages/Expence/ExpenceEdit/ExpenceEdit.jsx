import React, { useContext, useEffect, useState } from "react";
import DataContext from "../../../context/DataContext";
import { ToastContainer, Zoom } from "react-toastify";
import { useParams } from "react-router-dom";
import api from "../../../api/api";
import "./expenceedit.css";
import { Formik, Form } from "formik";
import TextField from "../../../components/textField/TextField";
import DateField from "../../../components/textField/DateField";
import TextAreaField from "../../../components/textField/TextAreaField";
import * as Yup from "yup";
import SelectField from "../../../components/textField/SelectField";

const ExpenceEdit = () => {
  const { isLoading, handleHead, config, handleUpdateExpence } =
    useContext(DataContext);
  const [expence, setExpence] = useState(null);
  const { id } = useParams();

  const validate = Yup.object({
    category: Yup.string().required("Required"),
    amount: Yup.number()
      .max(100000, "Must be less than 100000")
      .min(0, "Must be at least 1")
      .required("Required"),
    description: Yup.string()
      .max(250, "Must be less than 250 Characters")
      .min(10, "Must be at least 10 Characters")
      .required("Required"),
    date: Yup.string().required("Date is required"),
  });

  const handleFetchSingleExpence = async (id) => {
    try {
      const fetchedData = await api.get(`/api/expense/${id}`, config);

      if (fetchedData.data) {
        setExpence(fetchedData.data);
      } else {
        setExpence([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetchSingleExpence(id);
    handleHead("Update Expence");
  }, []);

  return (
    <section className="productEdit">
      <div className="container mt-5 update__profile">
        {expence && (
          <Formik
            initialValues={{
              category: expence.category,
              amount: expence.amount,
              description: expence.description,
              date: expence.date,
            }}
            validationSchema={validate}
            onSubmit={(values) => {
              handleUpdateExpence(values, id);
              return;
            }}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <div className="detailCards">
                  <SelectField label="Category" name="category" id="category" />
                  <TextField
                    label="Amount"
                    name="amount"
                    id="amount"
                    type="number"
                    placeholder="Enter the Amount"
                  />
                  <DateField
                    label="Date"
                    name="date"
                    id="date"
                    placeholder="Enter the date"
                  />
                  <TextAreaField
                    label="Description"
                    name="description"
                    id="description"
                    type="text"
                    placeholder="Enter Description"
                  />
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
              </Form>
            )}
          </Formik>
        )}
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
