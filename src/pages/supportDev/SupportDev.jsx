import React, { useContext } from "react";
import "./supportdev.css";
import { ToastContainer, Zoom, toast } from "react-toastify";
import { Formik, Form } from "formik";
import TextField from "../../components/textField/TextField";
import * as Yup from "yup";
import DataContext from "../../context/DataContext";
import useRazorpay from "react-razorpay";
import { BiDonateHeart } from "react-icons/bi";

const SupportDev = () => {
  const { isLoading, loggedUser } = useContext(DataContext);

  const [Razorpay] = useRazorpay();

  const validate = Yup.object({
    amount: Yup.number()
      .positive("Amount can't start with a minus")
      .integer("Amount number can't include a decimal point")
      .min(1)
      .required("Amount value is required"),
  });

  const handlesubmit = async (values) => {
    const options = {
      key: import.meta.env.VITE_RAZAR_KEY,
      key_secret: import.meta.env.VITE_RAZAR_SECRET,
      amount: values.amount * 100,
      currency: "INR",
      name: "Suriya Corp",
      description: "Test Transaction",
      image:
        "https://clipart-library.com/image_gallery2/Superman-Logo-Free-Download-PNG.png",
      handler: (res) => {
        console.log(res);
        toast.success(`Payment Success, Payment ID:${res.razorpay_payment_id}`);
      },
      prefill: {
        name: loggedUser.name,
        email: loggedUser.email,
        contact: loggedUser.phone,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzpay = new Razorpay(options);

    rzpay.open();
  };
  return (
    <section className="productEdit">
      <main className="container mt-5 p-3 text-white support__main__conatiner rounded gap-2">
        <div className="text-center donate__logo">
          <BiDonateHeart />
        </div>
        <div className="text-center donate__content mb-3">
          Welcome to Expence Tracker app.
          <br />
          To support and encourage the Creator Please Donate.
        </div>
        <div className="row donate__form">
          <div className="col-md-12 d-flex flex-column justify-content-center align-items-center">
            <div className="col-10 col-md-9 col-lg-7">
              <Formik
                initialValues={{
                  amount: "",
                }}
                validationSchema={validate}
                onSubmit={(values, { resetForm }) => {
                  handlesubmit(values);
                  resetForm({ values: "" });
                }}
              >
                {(formik) => (
                  <Form>
                    <TextField
                      label="Enter Amount :"
                      name="amount"
                      id="amount"
                      type="number"
                      placeholder="Enter Amount to Donate"
                    />
                    <button
                      type="submit"
                      className="col-12 btn btn-success btn-block login__btn mt-4 d-flex justify-content-center"
                    >
                      {isLoading ? (
                        <span className="spinner-border text-warning"></span>
                      ) : (
                        "Donate"
                      )}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </main>
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

export default SupportDev;
