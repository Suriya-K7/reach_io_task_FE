import React, { useContext, useEffect } from "react";
import "./editprofile.css";
import DataContext from "../../context/DataContext";
import { ToastContainer, Zoom } from "react-toastify";
import { Formik, Form } from "formik";
import TextField from "../../components/textField/TextField";
import * as Yup from "yup";

const EditProfile = () => {
  const {
    handleProfileUpdate,
    handlePasswordUpdate,
    loggedUser,
    isLoading,
    handleHead,
  } = useContext(DataContext);

  const validate = Yup.object({
    name: Yup.string()
      .max(15, "Must be less than 15 Characters")
      .min(6, "Must be at least 6 Characters")
      .required("Required"),
    email: Yup.string().email("Email is Invalid").required("Required"),
  });

  const validate2 = Yup.object({
    oldpassword: Yup.string()
      .max(15, "Must be less than 15 Characters")
      .min(6, "Must be at least 6 Characters")
      .required("Required"),
    password: Yup.string()
      .max(15, "Must be less than 15 Characters")
      .min(6, "Must be at least 6 Characters")
      .required("Required"),
    cPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password Must Match")
      .required("Required"),
  });

  useEffect(() => {
    handleHead("Update Profile");
  }, []);

  return (
    <section className="profile">
      <div className="container mt-5 update__profile">
        <Formik
          initialValues={{
            name: loggedUser.name,
            email: loggedUser.email,
          }}
          validationSchema={validate}
          onSubmit={(values, { resetForm }) => {
            handleProfileUpdate(values);
            resetForm({ values: "" });
          }}
        >
          {(formik) => (
            <Form>
              <div className="detailCards">
                <h3 style={{ color: "var(--theme" }}>Update Profile :</h3>
                <TextField
                  label="Name"
                  name="name"
                  id="name"
                  type="text"
                  placeholder="Enter First Name"
                />
                <TextField
                  label="Email"
                  name="email"
                  id="email"
                  type="email"
                  disabled
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
      </div>
      <div className="container mt-5 update__profile">
        <Formik
          initialValues={{
            oldpassword: "",
            password: "",
            cPassword: "",
          }}
          validationSchema={validate2}
          onSubmit={(values, { resetForm }) => {
            handlePasswordUpdate(values);
            resetForm({ values: "" });
          }}
        >
          {(formik) => (
            <Form>
              <div className="detailCards">
                <h3 style={{ color: "var(--theme" }}>Update Password :</h3>
                <TextField
                  label="Old Password"
                  name="oldpassword"
                  id="oldpassword"
                  type="password"
                  placeholder="Enter Old Password"
                />
                <TextField
                  label="Password"
                  name="password"
                  id="password"
                  type="password"
                  placeholder="Enter Password"
                />
                <TextField
                  label="Confirm Password"
                  name="cPassword"
                  id="cPassword"
                  type="password"
                  placeholder="Confirm Password"
                />
                <div className="text-center mt-3">
                  <button className="text-white button rounded" type="submit">
                    {isLoading ? (
                      <span className="spinner-border spinner-border-sm text-warning"></span>
                    ) : (
                      "Update Password"
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

export default EditProfile;
