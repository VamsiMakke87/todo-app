import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import TaskForm from "./Components/TaskForm";
import Home from "./Components/Home";
import AppContext from "./AppContext";
import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";

function App() {
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [token, setToken] = useState();

  useEffect(() => {
    if (errorMsg || successMsg) {
      const timer = setTimeout(() => {
        setErrorMsg("");
        setSuccessMsg("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [errorMsg, successMsg]);

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
      return { message: "Could not process request. Please try again" };
    }
  };

  return (
    <>
      <AppContext.Provider value={{ postReq, setSuccessMsg, setErrorMsg, setToken }}>
        <div className="bg-slate-200 h-screen">
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
              <Route path="/" element={<Home />} />
              <Route path="/add" element={<TaskForm />} />
              <Route path="/edit/:id" element={<TaskForm />} />
            </Routes>
          </Router>
        </div>
      </AppContext.Provider>
    </>
  );
}

export default App;
