import React, { useContext } from "react";
import Header from "./components/header/Header";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Navbar from "./components/navbar/Navbar";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";
import DataContext from "./context/DataContext";
import LoggedOut from "./pages/LoggedOut/LoggedOut";
import Signup from "./pages/Signup/Signup";
import Forgot from "./pages/Forgot/Forgot";
import Reset from "./pages/Reset/Reset";
import ConfirmUser from "./pages/confirmUser/ConfirmUser";
import AddExpense from "./pages/AddExpense/AddExpense";
import Home from "./pages/Home/Home";
import ReportBug from "./pages/ReportBug/ReportBug";
import EditProfile from "./pages/EditProfile/EditProfile";
import SupportDev from "./pages/supportDev/SupportDev";
import SupportDev2 from "./pages/supportDev/SupportDev2";
import ExpenceDetails from "./pages/Expence/ExpenceDetails/ExpenceDetails";
import ExpenceEdit from "./pages/Expence/ExpenceEdit/ExpenceEdit";

function App() {
  const { loggedUser } = useContext(DataContext);

  return (
    <>
      {loggedUser && (
        <>
          <Header />
          <Navbar />
        </>
      )}
      <Routes>
        {!loggedUser && (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/resetpassword/:id" element={<Reset />} />
            <Route path="/confirm/:id" element={<ConfirmUser />} />
            <Route path="/*" element={<LoggedOut />} />
            <Route path="/supportdev" element={<SupportDev2 />} />
          </>
        )}
        {loggedUser && (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/addexpense" element={<AddExpense />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/reportbug" element={<ReportBug />} />
            <Route path="/editProfile" element={<EditProfile />} />
            <Route path="/expence/view/:id" element={<ExpenceDetails />} />
            <Route path="/expence/edit/:id" element={<ExpenceEdit />} />
            <Route path="/supportdev" element={<SupportDev />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
