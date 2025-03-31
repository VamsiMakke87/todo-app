import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../AppContext";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const ForgotPassword = () => {
  const [error, setError] = useState();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [togglePassword, setTogglePassword] = useState("password");
  const [toggleConfirmPassword, setConfirmTogglePassword] =
    useState("password");
  const { putReq, setSuccessMsg, setErrorMsg } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);

  const validateForm = async () => {
    try {
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      const confirmPassword = confirmPasswordRef.current.value;

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError("Please enter a valid email");
        emailRef.current.focus();
        return;
      } else if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/.test(
          password
        )
      ) {
        setError(
          <div className="text-left">
            Please enter a strong password:
            <ol>
              <li>- Must be at least 8 characters</li>
              <li>- Must contain at least one uppercase letter</li>
              <li>- Must contain at least one lowercase letter</li>
              <li>- Must contain at least one number</li>
              <li>- Must contain at least one special character</li>
            </ol>
          </div>
        );
        passwordRef.current.focus();
        return;
      } else if (password !== confirmPassword) {
        setError("Password and confirm password do not match!");
        confirmPasswordRef.current.focus();
        return;
      } else {
        setError("");
        const res = await putReq("/api/forgotpassword", {
          email: email,
          password: password,
        });

        if (res.ok) {
          setSuccessMsg("Password Updated Succesfully");
          navigate("/login");
        } else {
          const jsonData = await res.json();
          setErrorMsg(jsonData.message);
        }
      }
    } catch (err) {
      setError("Unknown error occured! Please try again!");
    }
  };

  return (
    <div className="justify-center items-center h-screen w-screen flex text-center w-6/12">
      <div className="bg-white md:w-5/12 sm:w-8/12 w-10/12   p-6 px-10 rounded-lg shadow-lg">
        <div className="text-5xl font-extrabold pb-6">Reset Password</div>
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
          <div className="space-y-1">
            <div className=" text-left font-bold">Confirm Password:</div>
            <div className="border flex items-center  border-black p-1 py-2 rounded-sm">
              <input
                type={toggleConfirmPassword}
                className="w-full outline-none"
                ref={confirmPasswordRef}
              />
              <div
                onClick={() => {
                  setConfirmTogglePassword((prev) =>
                    prev === "password" ? "text" : "password"
                  );
                }}
                className="text-xl cursor-pointer"
              >
                {toggleConfirmPassword === "text" ? (
                  <FaRegEye />
                ) : (
                  <FaRegEyeSlash />
                )}
              </div>
            </div>
          </div>
          <div
            onClick={validateForm}
            className="w-full bg-black text-white p-2 rounded-lg hover:bg-white hover:text-black border border-black cursor-pointer"
          >
            Reset Password
          </div>
          <div
            className="text-blue-600 cursor-pointer"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </div>
          {error && <div className="text-red-700">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
