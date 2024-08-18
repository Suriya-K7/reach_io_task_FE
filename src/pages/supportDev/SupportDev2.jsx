import React from "react";
import { Link } from "react-router-dom";
import LOGO from "../../assets/logo.png";
import "./supportdev2.css";

const SupportDev2 = () => {
  return (
    <section className="supportdev">
      <header>
        <div className="img__container">
          <img src={LOGO} alt=".." className="logo" />
        </div>
        <div className="home__button">
          <Link to={"/"}>
            <button className="btn btn-primary">Go Back To Home</button>
          </Link>
        </div>
      </header>
      <main className="support_main_conatiner mt-5 p-3 p-md-5">
        <div className="text-center">
          Welcome to Expence Tracker app.
          <br /> Please Login To Support Creator
        </div>
        <Link to={"/login"} className="text-center">
          <button className="btn btn-primary">Login</button>
        </Link>
      </main>
    </section>
  );
};

export default SupportDev2;
