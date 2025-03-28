import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../AppContext";

const Home = () => {
  const navigate = useNavigate();

  const { getReq } = useContext(AppContext);

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/login");
    (async () => {
      const res = await getReq(`/api/tasks`);

      if (res.ok) {
        const jsonData = await res.json();
        setTodos(jsonData);
        console.log(jsonData);
      }
    })();
  }, []);

  return (
    <div className="mt-2">
      <div className="justify-items-center cursor-pointer">
        <div className="border border-black border-dashed rounded-lg flex items-center h-16 w-10/12">
          <span className=" w-full text-center text-lg font-semibold">
            +Create a TODO
          </span>
        </div>
      </div>
    </div>
  );
};

export default Home;
