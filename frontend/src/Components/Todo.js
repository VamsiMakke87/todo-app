import React from "react";
import { MdOutlineDeleteOutline, MdOutlineModeEdit } from "react-icons/md";

const Todo = (props) => {
  return (
    <div className="shadow-lg bg-white h-24 p-2 w-10/12 rounded-lg flex items-center h-16 w-10/12">
      <div className="flex">
        <div>
          <div className="text-2xl font-extrabold">{props.todo.title}</div>
          <div className="italic">{props.todo.description}</div>
        </div>
      </div>
      <div className="ml-auto flex space-x-2">
        <div className="cursor-pointer text-2xl">
          <MdOutlineModeEdit />
        </div>
        <div className="cursor-pointer text-2xl hover:text-red-600">
          <MdOutlineDeleteOutline />
        </div>
      </div>
    </div>
  );
};

export default Todo;
