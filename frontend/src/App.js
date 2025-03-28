import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import TaskForm from "./Components/TaskForm";
import Home from "./Components/Home";
import AppContext from "./AppContext";

function App() {
  const backendURL = process.env.REACT_APP_BACKEND_URL;

  console.log(backendURL);

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
      <AppContext.Provider value={{ postReq }}>
        <div className="bg-slate-200 h-screen">
          <Router>
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
