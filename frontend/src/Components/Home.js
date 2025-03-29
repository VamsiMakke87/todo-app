import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../AppContext";
import Todo from "./Todo";


const Home = () => {
  const navigate = useNavigate();

  const { getReq, setToken, setErrorMsg } = useContext(AppContext);

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/login");
    (async () => {
      const res = await getReq(`/api/tasks`);

      const jsonData = await res.json();
      if (res.ok) {
        setTodos(jsonData);
        console.log(jsonData);
      } else {
        setErrorMsg(jsonData.message);
        setToken("");
        navigate("/logout");
      }
    })();
  }, []);

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
      </div>
      <div className="mt-4 justify-items-center space-y-2">
        {todos.map((todo) => (
          <Todo key={todo._id} todo={todo} />
        ))}
      </div>
    </div>
  );
};

export default Home;
