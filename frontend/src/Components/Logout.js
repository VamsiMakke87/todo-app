import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../AppContext";

const Logout = () => {
  const navigate = useNavigate();
  const {setToken} = useContext(AppContext);

  useEffect(() => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/login");
  }, []);

  return <></>;
};

export default Logout;
