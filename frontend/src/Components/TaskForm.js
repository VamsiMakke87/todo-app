import React, { useContext, useEffect, useRef, useState } from "react";
import AppContext from "../AppContext";
import { useNavigate, useParams } from "react-router-dom";

const TaskForm = (props) => {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const { setErrorMsg, postReq, putReq, setSuccessMsg, todo, setTodo } =
    useContext(AppContext);
  const navigate = useNavigate();
  const [descriptionLength, setDescriptionLength] = useState(
    todo.description?.length || 0
  );

  useEffect(() => {
    console.log(todo._id);
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  const validateForm = async () => {
    try {
      const title = titleRef.current.value;
      const description = descriptionRef.current.value;

      if (title.length < 3 || title.length > 20) {
        setErrorMsg("Title must be of length between 3 and 20");
      } else if (description.length > 200) {
        setErrorMsg("Description must be less than 200 characters!");
      } else {
        const data = {
          title: title,
          description: description,
        };
        let res;
        if (props.buttonText==='Add') res = await postReq("/api/tasks", data);
        else res = await putReq(`/api/tasks/${todo._id}`, data);
        const jsonData = await res.json();
        if (res.ok) {
          setTodo({});
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
    <div className="justify-center items-center h-full w-full flex text-center w-6/12">
      <div className="bg-white md:w-5/12 sm:w-8/12 w-10/12   p-6 px-10 rounded-lg shadow-lg">
        <div className="space-y-2">
          <div className="space-y-1">
            <div className=" text-left font-bold">
              Title:<span className="text-red-600">*</span>
            </div>
            <div className={`border  border-black p-1 py-2 rounded-sm`}>
              <input
                value={todo.title}
                type="text"
                className="w-full outline-none"
                ref={titleRef}
                onChange={() => {
                  setTodo({
                    ...todo,
                    title: titleRef.current.value,
                  });
                }}
              />
            </div>
          </div>
          <div className="space-y-1">
            <div className=" text-left font-bold">Description:</div>
            <div className="border  border-black p-1 py-2 rounded-sm">
              <textarea
                value={todo.description}
                type="text"
                className="w-full outline-none"
                ref={descriptionRef}
                onChange={() => {
                  setTodo({
                    ...todo,
                    description: descriptionRef.current.value,
                  });
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
            {props.buttonText} Todo
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
