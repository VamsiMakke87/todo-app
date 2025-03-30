import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../AppContext";
import Todo from "./Todo";

const Home = () => {
  const navigate = useNavigate();

  const { getReq, setToken, setErrorMsg, setTodo } = useContext(AppContext);

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    try {
      if (!localStorage.getItem("token")) navigate("/login");
      (async () => {
        try {
          setTodo({});
          const res = await getReq(`/api/tasks`);

          const jsonData = await res.json();
          if (res.ok) {
            setTodos(jsonData);
          } else {
            setErrorMsg(jsonData.message);
            setToken("");
            navigate("/logout");
          }
        } catch (err) {
          setErrorMsg("Could not process request! Please login again!");
          navigate("/logout");
        }
      })();
    } catch (err) {
      setErrorMsg("Unknown error occured! Please try again!");
    }
  }, []);

  const editTodo = () => {
    navigate("/edit");
  };

  return (
    <div className="mt-2">
      <div className="justify-items-center cursor-pointer">
        <div
          onClick={() => {
            navigate("/add");
          }}
          className="border border-black border-dashed rounded-lg flex items-center h-16 w-10/12"
        >
          <div className=" w-full text-center text-lg font-semibold">
            +Create a TODO
          </div>
        </div>
        <div className="mt-2 ">
          <select className="p-2 rounded-md bg-black text-white  hover:text-white hover:bg-black">
            <option className=" hover:text-white hover:bg-black">All</option>
            <option>Completed</option>
            <option>In Progress</option>
          </select>
        </div>
      </div>
      <div className="mt-4 justify-items-center space-y-2">
        {todos.map((todo) => (
          <Todo
            key={todo._id}
            todo={todo}
            setTodos={setTodos}
            editTodo={editTodo}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
