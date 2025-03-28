import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [togglePassword, setTogglePassword] = useState("password");
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
          <div className="w-full bg-black text-white p-2 rounded-lg hover:bg-white hover:text-black border border-black cursor-pointer">
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
