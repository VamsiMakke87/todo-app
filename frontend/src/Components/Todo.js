import React, { useContext, useState } from "react";
import { MdOutlineDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import AppContext from "../AppContext";

const Todo = (props) => {
  const { deleteReq, putReq, setErrorMsg, setSuccessMsg, setTodo } =
    useContext(AppContext);

  const [deleteClicked, setDeleteClicked] = useState(false);
  const [todoStatus, setTodoStatus] = useState(
    props.todo.isCompleted ? "Completed" : "In Progress"
  );

  const editTodo = async () => {
    setTodo(props.todo);
    props.editTodo();
  };

  const handleTodoStatusChange = async (e) => {
    try {
      setTodoStatus(e.target.value);

      const res = await putReq(`/api/tasks/${props.todo._id}`, {
        isCompleted: e.target.value === "Completed",
      });
      const jsonData = await res.json();

      if (res.ok) {
        setSuccessMsg(jsonData.message);
        props.updateTodoStatus(props.todo._id, e.target.value === "Completed");
      } else {
        setErrorMsg(jsonData.message);
      }
    } catch (err) {
      setErrorMsg("Could not process request! Please try again");
    }
  };

  const deleteTodo = async () => {
    try {
      const res = await deleteReq(`/api/tasks/${props.todo._id}`);

      const jsonData = await res.json();

      if (res.ok) {
        setSuccessMsg(jsonData.message);
        props.setTodos((prev) =>
          prev.filter((todo) => todo._id !== props.todo._id)
        );
      } else {
        setErrorMsg(jsonData.message);
      }
    } catch (err) {
      setErrorMsg("Unknown Error occured! Please try again later!");
    }
  };

  return (
    <div className="shadow-lg bg-white p-2 w-10/12 rounded-lg">
      <div className="flex items-start">
        <div className="flex flex-col w-full p-4">
          <div className="flex">
            <div className="text-xl font-extrabold break-words sm:w-8/12 w-4/12">
              {props.todo.title}
            </div>
            <div className="ml-auto flex space-x-2">
              <div>
                <select
                  value={todoStatus}
                  onChange={handleTodoStatusChange}
                  className="p-1 outline-none"
                >
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div onClick={editTodo} className="cursor-pointer text-2xl">
                <MdOutlineModeEdit />
              </div>
              <div
                onClick={() => {
                  setDeleteClicked(!deleteClicked);
                }}
                className="cursor-pointer text-2xl hover:text-red-600"
              >
                <MdOutlineDeleteOutline />
              </div>
            </div>
          </div>
          <div className="italic break-words">{props.todo.description}</div>
        </div>
      </div>
      {deleteClicked && (
        <div className="p-2 border-t-2 border-slate-300 items-center flex w-full">
          <div>Delete this todo?</div>
          <div className="ml-auto flex space-x-4">
            <div
              onClick={deleteTodo}
              className=" cursor-pointer bg-black text-white p-2 px-4 rounded-lg"
            >
              Yes
            </div>
            <div
              onClick={() => {
                setDeleteClicked(false);
              }}
              className="cursor-pointer border border-black p-2 px-4 rounded-lg"
            >
              No
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Todo;
