import React, { useContext, useEffect } from "react";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import AppContext from "../AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { setToken } = useContext(AppContext);


  return (
    <div className="top-0 sticky fixed w-full h-16 shadow-md p-2 flex items-center bg-white">
      <div onClick={()=>{navigate("/")}} className="text-xl font-extrabold cursor-pointer">TODO</div>
      <div className="ml-auto text-xl cursor-pointer" onClick={()=>{navigate("/logout")}}>
        <IoLogOutOutline />
      </div>
    </div>
  );
};

export default Navbar;
