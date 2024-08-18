import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { toast } from "react-toastify";
import useWindowSize from "../hooks/useWindowSize";
const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  //
  const [totalExpense, setTotalExpense] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  //

  // variables and functions
  const { width } = useWindowSize();
  const [head, setHead] = useState("");
  const [loggedUser, setLoggedUser] = useState("");
  const [token, setToken] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [config, setConfig] = useState({
    headers: {
      authorization: `bearer ${token}`,
    },
  });

  //for pages

  const [flag, setFlag] = useState(true);
  const [toggle, setToggle] = useState(false);
  const [trigger, setTrigger] = useState(true);
  const [fetchedData, setFetchedData] = useState([]);
  const [product, setProduct] = useState(0);
  const [value, setValue] = useState(0);
  const [stock, setStock] = useState(0);
  const [category, setCategory] = useState(0);
  const [search, setSearch] = useState("");
  const [categoryQuantity, setCategoryQuantity] = useState("");
  const [chartData, setChartData] = useState();

  const [chartCategoryData, setChartCatogoryData] = useState([]);

  // handle signin done

  useEffect(() => {
    const loggedInUserJson = localStorage.getItem("loggedInUser");
    if (loggedInUserJson) {
      const user = JSON.parse(loggedInUserJson);
      setLoggedUser(user.formatUser);
      setToken(user.token);
      setConfig({
        headers: {
          authorization: `bearer ${user.token}`,
        },
      });
    }
    api
      .get("/")
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));
  }, []);

  const handleSignIn = async (data) => {
    setIsLoading(true);

    try {
      const response = await api.post("/api/user/login", data);
      localStorage.setItem("loggedInUser", JSON.stringify(response.data));
      setLoggedUser(response.data.formatUser);
      setToken(response.data.token);
      setConfig({
        headers: {
          authorization: `bearer ${response.data.token}`,
        },
      });
      setIsLoading(false);

      navigate("/dashboard");
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        console.log(error);
      }
      setIsLoading(false);
    }
  };

  // handle signout
  const handleLogout = () => {
    setToken(null);
    setLoggedUser(null);
    setHead("Class");
    navigate("/");
    localStorage.clear();
  };

  // handle sign up
  const handleSignUp = async (data) => {
    setIsLoading(true);

    try {
      const response = await api.post("/api/user/register", data);
      toast.success(response.data.message);
      toast.success("Check your Mail & Activate");
      setIsLoading(false);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      }
      setIsLoading(false);
    }
  };

  // handle profile update
  const handleProfileUpdate = async (data) => {
    setIsLoading(true);

    try {
      const response = await api.patch("/api/user/updateuser", data, config);
      const user = response.data;
      const updatedData = { token, user };
      localStorage.setItem("loggedInUser", JSON.stringify(updatedData));
      setLoggedUser(updatedData.user);
      toast.success("Profile Updated Successfully");
      setIsLoading(false);
      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        console.log(error);
      }
      setIsLoading(false);
    }
  };

  // handle password update
  const handlePasswordUpdate = async (data) => {
    setIsLoading(true);
    const passwordData = data;
    passwordData.email = loggedUser.email;

    try {
      await api.patch("/api/user/changepassword", passwordData, config);
      toast.success("password Updated Successfully");
      setIsLoading(false);
      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        console.log(error);
      }
      setIsLoading(false);
    }
  };

  // handle account confirming
  const handleConfirm = async (e) => {
    setIsLoading(true);

    e.preventDefault();
    try {
      await api.patch(`/api/user/confirm/${resetToken}`);
      toast.success("Account confirmed Successfully");
      setIsLoading(false);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        console.log(error);
      }
      setIsLoading(false);
    }
  };

  // handle forgot password
  const handleForgot = async (data) => {
    setIsLoading(true);

    try {
      await api.post("/api/user/forgotpassword", data);
      toast.success("Reset link send to your mail");
      setIsLoading(false);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        console.log(error);
      }
      setIsLoading(false);
    }
  };

  // handle password reset
  const handleReset = async (data) => {
    setIsLoading(true);

    try {
      const response = await api.patch(
        `/api/user/resetpassword/${resetToken}`,
        data
      );
      setResetToken("");
      toast.success(response.data.message);
      setIsLoading(false);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        console.log(error);
      }
      setIsLoading(false);
    }
  };

  //handle heading done
  const handleHead = (data) => {
    setHead(data);
    setToggle(false);
    localStorage.setItem("head", data);
  };

  //handle add expense //done
  const handleAddExpense = async (data) => {
    setIsLoading(true);

    try {
      const response = await api.post(`/api/expense`, data, config);

      toast.success("Expense Added Successfully");
      setIsLoading(false);
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        console.log(error);
      }
      setIsLoading(false);
    }
  };

  // handle expence update //done
  const handleUpdateExpence = async (data, id) => {
    setIsLoading(true);

    try {
      await api.patch(`/api/expense/${id}`, data, config);
      toast.success("Expence Updated Successfully");
      setIsLoading(false);
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        console.log(error);
      }
      setIsLoading(false);
    }
  };

  //handle fetch expense //done
  const fetchAllExpenses = async () => {
    try {
      const fetchedproductData = await api.get("/api/expense", config);

      if (fetchedproductData.data.length) {
        setTotalExpense(fetchedproductData.data);

        const categoryMap = fetchedproductData.data.reduce((acc, item) => {
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

        const amount = fetchedproductData.data
          .map((item) => Number(item.amount))
          .reduce((acc, cur) => acc + cur);

        setTotalAmount(amount);
      } else {
        setTotalAmount();
        setTotalExpense(0);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // handle product delete //done
  const handleExpenceDelete = async (id) => {
    try {
      const response = await api.delete(`/api/expense/${id}`, config);

      if (response.data.updatedExpenseList.length) {
        setTotalExpense(response.data.updatedExpenseList);

        const categoryMap = response.data.updatedExpenseList.reduce(
          (acc, item) => {
            if (!acc[item.category]) {
              acc[item.category] = 0;
            }
            acc[item.category] += Number(item.amount);
            return acc;
          },
          {}
        );

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

        const amount = response.data.updatedExpenseList
          .map((item) => Number(item.amount))
          .reduce((acc, cur) => acc + cur);

        setTotalAmount(amount);
        toast.success("Item Deleted Successfully");
      } else {
        setTotalExpense(null);
        setTotalAmount(0);
      }
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        console.log(error);
      }
    }
  };

  //

  return (
    <DataContext.Provider
      value={{
        head,
        setHead,
        loggedUser,
        setLoggedUser,
        token,
        setToken,
        resetToken,
        setResetToken,
        handleSignIn,
        handleLogout,
        handleSignUp,
        handleProfileUpdate,
        handleConfirm,
        handleForgot,
        handleReset,
        isLoading,
        setIsLoading,
        width,
        flag,
        setFlag,
        config,
        trigger,
        setTrigger,
        handleHead,
        toggle,
        setToggle,
        handlePasswordUpdate,
        fetchedData,
        setFetchedData,
        product,
        setProduct,
        value,
        setValue,
        stock,
        setStock,
        category,
        setCategory,
        search,
        setSearch,
        categoryQuantity,
        setCategoryQuantity,
        chartData,
        setChartData,
        chartCategoryData,
        setChartCatogoryData,
        //
        handleExpenceDelete,
        handleAddExpense,
        fetchAllExpenses,
        handleUpdateExpence,
        totalExpense,
        totalAmount,
        setTotalExpense,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
