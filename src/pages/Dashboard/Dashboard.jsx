import React, { useEffect, useContext } from "react";
import "./dashboard.css";
import { Link } from "react-router-dom";
import DataContext from "../../context/DataContext";
import {
  FaRupeeSign,
  FaShoppingCart,
  FaEye,
  FaRegEdit,
  FaTrashAlt,
} from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import DonutChart from "../../components/chart/DonutChart";
import { ToastContainer, Zoom } from "react-toastify";

const Dashboard = () => {
  const {
    setTrigger,
    trigger,
    handleExpenceDelete,
    fetchedData,
    search,
    chartData,
    handleHead,
    setChartData,
    //
    totalExpense,
    totalAmount,
    fetchAllExpenses,
    //
  } = useContext(DataContext);

  useEffect(() => {
    fetchAllExpenses();
  }, [setTrigger, trigger, search]);

  // useEffect(() => {
  //   if (totalExpense && totalExpense.length) {
  //     setChartData({
  //       labels: totalExpense.map((data) => data.category),
  //       datasets: [
  //         {
  //           label: "Avalable Stock by Item",
  //           data: totalExpense.map((data) => data.amount),
  //           backgroundColor: [
  //             "#ccb0e8",
  //             "#855bb0",
  //             "#786090",
  //             "#E0B0FF",
  //             "#C3B1E1",
  //             "#CCCCFF",
  //           ],
  //           borderRadius: 10,
  //           borderJoinStyle: "round",
  //           borderColor: "black",
  //           hoverOffset: 25,
  //         },
  //       ],
  //     });
  //   }

  //   // if (categoryQuantity.length !== 0) {
  //   //   setChartCatogoryData({
  //   //     labels: categoryQuantity.map((data) => data.category),
  //   //     datasets: [
  //   //       {
  //   //         label: "Avalable Stock by Category",
  //   //         data: categoryQuantity.map((data) => data.quantity),
  //   //         backgroundColor: [
  //   //           "#ccb0e8",
  //   //           "#855bb0",
  //   //           "#786090",
  //   //           "#E0B0FF",
  //   //           "#C3B1E1",
  //   //           "#CCCCFF",
  //   //         ],
  //   //         borderRadius: 10,
  //   //         borderJoinStyle: "round",
  //   //         borderColor: "black",
  //   //         hoverOffset: 25,
  //   //       },
  //   //     ],
  //   //   });
  //   // }
  // }, [totalExpense]);

  useEffect(() => {
    handleHead("Dashboard");
  }, []);

  return (
    <section className="dashboard pt-2">
      {totalExpense && totalExpense.length ? (
        <>
          {" "}
          <div className="activities__box container">
            <h3 className=" text-center p-2">Expense Stats</h3>
            <div className="problem__solved gap-3">
              <div className="codekata">
                <FaShoppingCart className="icon" />
                <div className="stats">
                  <span>Total No of Expenses</span>
                  <span>{totalExpense?.length}</span>
                </div>
              </div>
              <div className="codekata">
                <FaRupeeSign className="icon" />
                <div className="stats">
                  <span>Total Value</span>
                  <span>{totalAmount}</span>
                </div>
              </div>
            </div>
          </div>
          <br />
          <div className="activities__box container">
            <h3 className=" text-center p-2">Expence Charts</h3>
            <div className="problem__solved gap-3">
              <div
                className={`chart__box d-flex ${
                  totalExpense.length === 0 ? "hide" : ""
                }`}
              >
                <div className="chart-container d-flex">
                  {chartData && <DonutChart chartData={chartData} />}
                </div>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="activities__box container">
            <div className="problem__solved gap-3">
              {totalExpense && totalExpense.length ? (
                totalExpense.map((item) => {
                  return (
                    <div
                      className="card"
                      style={{ width: "350px" }}
                      key={item._id}
                    >
                      <div className="card-body">
                        <p>Category : {item.category}</p>
                        <p>
                          Amount :<FaRupeeSign className="icon" /> {item.amount}
                        </p>
                        <p>Spend On : {item.date}</p>
                        <p>
                          Description : {item.description.slice(0, 15) + "..."}
                        </p>
                        <div className="d-flex justify-content-evenly">
                          <Link
                            to={`/expence/view/${item._id}`}
                            className="btn button text-white"
                          >
                            View
                          </Link>
                          <Link
                            to={`/expence/edit/${item._id}`}
                            className="btn button text-white"
                          >
                            Edit
                          </Link>
                          <span
                            onClick={() => handleExpenceDelete(item._id)}
                            className="btn button text-white"
                          >
                            Delete
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center d-flex justify-item-center">
                  No Expence Available
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        "No Expence Added"
      )}
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

export default Dashboard;
