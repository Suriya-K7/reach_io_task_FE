import React, { useContext, useEffect, useState } from "react";
import DataContext from "../../../context/DataContext";
import { Link, useParams } from "react-router-dom";
import api from "../../../api/api";
import { FaRupeeSign } from "react-icons/fa";

const ExpenceDetails = () => {
  const { handleHead, config } = useContext(DataContext);
  const [expence, setExpence] = useState(null);
  const { id } = useParams();

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
    handleHead("Expence Details");
  }, []);

  return (
    <section className="profile__page">
      <div className="profile__data p-3">
        <div className="box rounded container">
          {expence && expence ? (
            <div className="profile__details">
              <span>Category : {expence.category}</span>
              <span>
                Amount Spend : <FaRupeeSign /> {expence.amount}
              </span>
              <span>Description : {expence.description}</span>
              <span>Spend on Date : {expence.date}</span>
              <span>Created On : {expence.createdAt.slice(0, 10)}</span>
              <span>Updated On : {expence.updatedAt.slice(0, 10)}</span>
            </div>
          ) : (
            <p>No Expence Found</p>
          )}
        </div>
      </div>
      <div className="d-flex justify-content-center mt-4 ">
        <Link to="/Dashboard" className="text-white button rounded">
          Go Back
        </Link>
      </div>
    </section>
  );
};

export default ExpenceDetails;
