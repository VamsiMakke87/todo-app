import React from "react";

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
        <div className="cursor-pointer">Edit</div>
        <div className="cursor-pointer hover:text-red-600">Delete</div>
      </div>
    </div>
  );
};

export default Todo;
