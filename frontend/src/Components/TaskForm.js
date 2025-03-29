import React, { useContext, useRef, useState } from "react";
import AppContext from "../AppContext";
import { useNavigate } from "react-router-dom";

const TaskForm = () => {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const [descriptionLength, setDescriptionLength] = useState(0);
  const { setErrorMsg, postReq, setSuccessMsg } = useContext(AppContext);
  const navigate = useNavigate();

  const validateForm = async () => {
    try {
      const title = titleRef.current.value;
      const description = descriptionRef.current.value;

      if (title.length < 3) {
        setErrorMsg("Title must be of length between 3 and 20");
      } else if (description.length > 200) {
        setErrorMsg("Description must be less than 200 characters!");
      } else {
        const res = await postReq("/api/tasks", {
          title: title,
          description: description,
        });
        const jsonData = await res.json();
        if (res.ok) {
          setSuccessMsg(jsonData.message);
          navigate("/");
        } else {
          setErrorMsg(jsonData.message);
        }
      }
    } catch (err) {
      setErrorMsg("Unknown error occured! Please try again later!");
    }
  };

  return (
    <div className="justify-center items-center h-screen w-screen flex text-center w-6/12">
      <div className="bg-white md:w-5/12 sm:w-8/12 w-10/12   p-6 px-10 rounded-lg shadow-lg">
        <div className="space-y-2">
          <div className="space-y-1">
            <div className=" text-left font-bold">
              Title:<span className="text-red-600">*</span>
            </div>
            <div className={`border  border-black p-1 py-2 rounded-sm`}>
              <input
                type="text"
                className="w-full outline-none"
                ref={titleRef}
              />
            </div>
          </div>
          <div className="space-y-1">
            <div className=" text-left font-bold">Description:</div>
            <div className="border  border-black p-1 py-2 rounded-sm">
              <textarea
                type="text"
                className="w-full outline-none"
                ref={descriptionRef}
                onChange={() => {
                  setDescriptionLength(descriptionRef.current.value.length);
                }}
              />
              <div className="text-xs font-light text-right">
                {descriptionLength}/200 characters
              </div>
            </div>
          </div>

          <div
            onClick={validateForm}
            className="w-full bg-black text-white p-2 rounded-lg hover:bg-white hover:text-black border border-black cursor-pointer"
          >
            Add TODO
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
