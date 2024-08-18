import React, { useContext } from "react";
import "./home.css";
import { Link } from "react-router-dom";
import LOGO from "../../assets/logo.png";
import DataContext from "../../context/DataContext";
import { FaHandHoldingHeart } from "react-icons/fa";
import { BsFillDiagram3Fill } from "react-icons/bs";

const Home = () => {
  const { loggedUser } = useContext(DataContext);
  return (
    <div className="home">
      <header>
        <div className="img__container">
          <img src={LOGO} alt=".." className="logo" />
        </div>
        <div className="home__button">
          {loggedUser ? (
            <>
              <Link
                to="/dashboard"
                className="btn btn-primary scale transition"
              >
                <BsFillDiagram3Fill /> Dashboard
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-primary scale transition">
                Login
              </Link>
              <Link to="/signup" className="btn btn-primary scale transition">
                Register
              </Link>
            </>
          )}
        </div>
      </header>
      <main>
        <div className="text-center">
          Welcome to Expence Tracker app.
          <br /> In this app You can manage Expenses.
          <br />
          <Link to={"/supportdev"}>
            <button className="btn btn-primary mt-2">
              Support The Developer <FaHandHoldingHeart />
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
