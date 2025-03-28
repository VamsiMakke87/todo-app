import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import AppContext from "../AppContext";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [togglePassword, setTogglePassword] = useState("password");
  const navigate = useNavigate();
  const { postReq, setSuccessMsg, setErrorMsg, setToken } = useContext(AppContext);

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token){
            navigate("/");
        }
    },[]);

  const validateForm = async () => {
    try {
      const email = emailRef.current.value;
      const password = passwordRef.current.value;

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setErrorMsg("Please enter a valid email");
        emailRef.current.focus();
        return;
      } else {
        const res = await postReq("/api/login", {
          email: email,
          password: password,
        });

        const jsonData = await res.json();
        if (res.ok) {
          setSuccessMsg(jsonData.message);
          localStorage.setItem("token", jsonData.token);
          localStorage.setItem("userId",jsonData.userId);
          setToken(jsonData.token);
          navigate("/");
        } else {
          setErrorMsg(jsonData.message);
        }
      }
    } catch (err) {
      setErrorMsg("Unknown error occured! Please try again!");
    }
  };

  return (
    <div className="justify-center items-center h-screen w-screen flex text-center w-6/12">
      <div className="bg-white md:w-5/12 sm:w-8/12 w-10/12   p-6 px-10 rounded-lg shadow-lg">
        <div className="text-6xl font-extrabold pb-6">Login</div>
        <div className="space-y-2">
          <div className="space-y-1">
            <div className=" text-left font-bold">Email:</div>
            <div className="border  border-black p-1 py-2 rounded-sm">
              <input
                type="text"
                className="w-full outline-none"
                ref={emailRef}
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className=" text-left font-bold">Password:</div>
            <div className="border flex items-center  border-black p-1 py-2 rounded-sm">
              <input
                type={togglePassword}
                className="w-full outline-none"
                ref={passwordRef}
              />
              <div
                onClick={() => {
                  setTogglePassword((prev) =>
                    prev === "password" ? "text" : "password"
                  );
                }}
                className="text-xl cursor-pointer"
              >
                {togglePassword === "text" ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
          </div>
          <div
            onClick={validateForm}
            className="w-full bg-black text-white p-2 rounded-lg hover:bg-white hover:text-black border border-black cursor-pointer"
          >
            Login
          </div>
          <div>
            New User?{" "}
            <Link className="text-blue-600 cursor-pointer" to="/signup">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
