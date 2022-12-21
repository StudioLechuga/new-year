import React from "react";
import { useCards } from "../service/firabese";

function Modal() {
  const { addCard } = useCards();
  const [text, setText] = React.useState("");
  return (
    <div className="absolute top-0 w-full h-screen grid place-items-center ">
      <div className=" w-96 h-40 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 flex flex-col  p-2.5">
        <textarea
       
         
          onChange={(e) => setText(e.target.value)}
          className=""
          placeholder="John"
          required
        >
        
        </textarea>  <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={()=>{
            addCard(text)
          }}> Agregar</button>
      </div>
    </div>
  );
}

export default Modal;
