import React, { useContext, useState } from "react";
import DataContext from "../../context/DataContext";
import { ToastContainer, Zoom } from "react-toastify";
import { Formik, Form, ErrorMessage } from "formik";
import TextField from "../../components/textField/TextField";
import TextAreaField from "../../components/textField/TextAreaField";
import SelectField from "../../components/textField/SelectField";
import * as Yup from "yup";
import DateField from "../../components/textField/DateField";
import { getTodayDate } from "../../../utils/helper";

const AddExpense = () => {
  const { isLoading, handleAddExpense } = useContext(DataContext);

  const itemCode = (category) => {
    const letter = category.slice(0, 3).toUpperCase();
    const number = Date.now();
    const output = letter + "-" + number;
    return output;
  };

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

  return (
    <section className="productEdit">
      <div className="container mt-5 update__profile">
        <Formik
          initialValues={{
            category: "",
            amount: "",
            description: "",
            date: getTodayDate(),
          }}
          validationSchema={validate}
          onSubmit={(values, { resetForm }) => {
            handleAddExpense(values);
            resetForm({ values: "" });
            return;
          }}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <div className="detailCards">
                <h3 style={{ color: "var(--theme" }}>Add Expense :</h3>
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
                      "Add New"
                    )}
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
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

export default AddExpense;
