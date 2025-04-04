import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import TaskForm from "./Components/TaskForm";
import Home from "./Components/Home";
import AppContext from "./AppContext";
import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import Logout from "./Components/Logout";
import ForgotPassword from "./Components/ForgotPassword";

function App() {
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [todo, setTodo] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (errorMsg || successMsg) {
      const timer = setTimeout(() => {
        setErrorMsg("");
        setSuccessMsg("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [errorMsg, successMsg]);

  const getReq = async (url, data) => {
    try {
      const res = await fetch(`${backendURL}${url}`, {
        method: "GET",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      return res;
    } catch (err) {
      console.log(err);
      setErrorMsg("Could not process request. Please try again");
    }
  };

  const postReq = async (url, data) => {
    try {
      const res = await fetch(`${backendURL}${url}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      return res;
    } catch (err) {
      setErrorMsg("Could not process request. Please try again");
    }
  };

  const putReq = async (url, data) => {
    try {
      const res = await fetch(`${backendURL}${url}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      return res;
    } catch (err) {
      setErrorMsg("Could not process request. Please try again");
    }
  };

  const deleteReq = async (url, data) => {
    try {
      const res = await fetch(`${backendURL}${url}`, {
        method: "DELETE",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      return res;
    } catch (err) {
      setErrorMsg("Could not process request. Please try again");
    }
  };

  return (
    <>
      <AppContext.Provider
        value={{
          postReq,
          getReq,
          putReq,
          deleteReq,
          setSuccessMsg,
          setErrorMsg,
          setToken,
          todo,
          setTodo,
        }}
      >
        <div className="bg-slate-200 min-h-screen h-full">
          <Router>
            {token && <Navbar />}
            {errorMsg && (
              <div className="fixed left-0 w-full bg-red-500 text-white text-center py-2 z-40">
                {errorMsg}
              </div>
            )}
            {successMsg && (
              <div className="fixed left-0 w-full bg-green-500 text-white text-center py-2 z-40">
                {successMsg}
              </div>
            )}
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgotPassword" element={<ForgotPassword />} />
              <Route path="/" element={<Home />} />
              <Route path="/add" element={<TaskForm buttonText={"Add"} />} />
              <Route path="/edit" element={<TaskForm buttonText={"Edit"} />} />
              <Route path="/logout" element={<Logout />} />
            </Routes>
          </Router>
        </div>
      </AppContext.Provider>
    </>
  );
}

export default App;
