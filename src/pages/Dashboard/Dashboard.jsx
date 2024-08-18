import React, { useEffect, useContext, useState } from "react";
import "./dashboard.css";
import { Link } from "react-router-dom";
import DataContext from "../../context/DataContext";
import { FaRupeeSign, FaShoppingCart, FaEye } from "react-icons/fa";
import ExportCSV from "./ExportCSV";
import DonutChart from "../../components/chart/DonutChart";
import { ToastContainer, Zoom } from "react-toastify";

const options = [
  { key: "All", value: "" },
  { key: "Food", value: "Food" },
  { key: "Travel", value: "Travel" },
  { key: "Entertainment", value: "Entertainment" },
  { key: "sports", value: "sports" },
  { key: "Others", value: "Others" },
];

const Dashboard = () => {
  const {
    setTrigger,
    trigger,
    handleExpenceDelete,
    chartData,
    handleHead,
    totalExpense,
    setTotalExpense,
    totalAmount,
    fetchAllExpenses,
    setChartData,
  } = useContext(DataContext);

  const [data, setData] = useState();
  const [amount, setAmount] = useState(0);
  const [trig, setTrig] = useState(true);

  useEffect(() => {
    setAmount(totalAmount);
    setData(totalExpense);
  }, [totalAmount, totalExpense]);

  useEffect(() => {
    if (data && data.length) {
      const temp = data
        .map((item) => Number(item.amount))
        .reduce((acc, cur) => acc + cur);

      setAmount(temp);
    } else {
      setAmount(0);
    }
  }, [data, trig]);

  const handleChange = (cat) => {
    setTrig(!trig);
    if (cat === "") {
      fetchAllExpenses();
      setData(totalExpense);
    } else {
      const temp = totalExpense.filter((e) => e.category === cat);

      const categoryMap = temp.reduce((acc, item) => {
        if (!acc[item.category]) {
          acc[item.category] = 0;
        }
        acc[item.category] += Number(item.amount);
        return acc;
      }, {});

      const chartLabels = Object.keys(categoryMap);
      const chartAmounts = Object.values(categoryMap);

      setChartData({
        labels: chartLabels,
        datasets: [
          {
            label: "Expense by Category",
            data: chartAmounts,
            backgroundColor: [
              "#ccb0e8",
              "#855bb0",
              "#786090",
              "#E0B0FF",
              "#C3B1E1",
              "#CCCCFF",
            ],
            borderWidth: 1,
            borderRadius: 10,
            borderJoinStyle: "round",
            borderColor: "black",
            hoverOffset: 25,
          },
        ],
      });

      setData(temp);
    }
  };

  useEffect(() => {
    fetchAllExpenses();
    setData(totalExpense);
  }, [setTrigger, trigger]);

  useEffect(() => {
    handleHead("Dashboard");
  }, []);

  return (
    <section className="dashboard pt-2">
      {/* {totalExpense && totalExpense.length ? ( */}
      <>
        {" "}
        <div className="activities__box container">
          <h3 className=" text-center p-2">Expense Stats</h3>
          <div className="problem__solved gap-3">
            <div className="codekata">
              <FaShoppingCart className="icon" />
              <div className="stats">
                <span>Total No of Expenses</span>
                <span>{data?.length}</span>
              </div>
            </div>
            <div className="codekata">
              <FaRupeeSign className="icon" />
              <div className="stats">
                <span>Total Value</span>
                <span>{amount}</span>
              </div>
            </div>
          </div>
          <div className="pt-4 d-flex align-items-center justify-content-center">
            <ExportCSV data={data} />
          </div>
        </div>
        <br />
        <div className="activities__box container">
          <h3 className=" text-center p-2">Expence Charts</h3>
          <div className="problem__solved gap-3">
            <div className={`chart__box d-flex `}>
              <div className="chart-container d-flex">
                {chartData && <DonutChart chartData={chartData} />}
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="activities__box container">
          <div className="problem__solved d-flex gap-4">
            <h3 className=" p-2">Search by Category </h3>
            <div className="form-group mb-3 mt-3">
              <div>
                <select
                  className={`form-control shadow-none 
          }`}
                  onChange={(e) => handleChange(e.target.value)}
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
          </div>
        </div>
        <br />
        <div className="activities__box container">
          <div className="problem__solved gap-3">
            {totalExpense && data && totalExpense.length ? (
              data.map((item) => {
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
      {/* ) : (
        "No Expence Added"
      )} */}
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
