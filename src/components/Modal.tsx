import React from "react";
import { useModal } from "../hook/useModal";
import { useFirebase } from "../hook/useFirebase";

function Modal() {
  const { addCard, refecthData } = useFirebase()
  const { closeModal } = useModal();
  const [text, setText] = React.useState("");
  const handleClick = async () => {
    addCard(text).then(() => {
      refecthData();
      closeModal();
    });

  
  };
  const handleChange = (e: any) => {
    if (text.length < 100) {
      setText(e.target.value);
    }
  };
  return (
    <div className="absolute top-0 w-full h-screen grid place-items-center ">
      <div
        className="absolute z-10 top-0 w-full h-screen grid place-items-center"
        onClick={handleClick}
      ></div>
      <div className=" w-96 z-20 box-border p-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 flex flex-col justify-center items-center  p-2.5 gap-2">
        <label className="font-bold  ">Agrega tu proposito</label>
        <div className="relative w-full h-44 flex">
          <textarea
            value={text}
            onChange={handleChange}
            placeholder="John"
            className="w-full  border outline-none h-44 p-2 border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            required
          ></textarea>
          <span className="absolute font-bold bottom-1 right-5 ">
            {text.length}/100
          </span>
        </div>
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={handleClick}
        >
          {" "}
          Agregar
        </button>
      </div>
    </div>
  );
}

export default Modal;
