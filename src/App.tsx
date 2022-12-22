import { useState, useRef, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import github from "./assets/github-mark.svg";
import wish from "./assets/wish.svg";
import "./App.css";
import { mock } from "../MOCK_DATA";
import { Circle, Layer, Rect, Stage, Text } from "react-konva";
import Modal from "./components/Modal";
import LoadingButton from "./components/LoadingButton";
import Button from "./components/Button";
import { useModal } from "./hook/useModal";
import { useFirebase } from "./hook/useFirebase";
import { useCard } from "./hook/useCards";
//import {Hammer} from "https://hammerjs.github.io/dist/hammer.min.js"
function App() {
  const { isModalOpen, openModal } = useModal();
  const { auth, provider, card: item, user } = useFirebase();
  const { data, scale, stageRef, handleWheel } = useCard();
  const submit = () => {
    auth.signInWithPopup(provider).catch(alert);
  };

  const handleClick = () => {
      if (user.displayName) {
        openModal();
      } else {
        submit();
      }
  };
  return (
    <>
      <Stage
        ref={stageRef}
        width={window.innerWidth}
        height={window.innerHeight}
        draggable
        scale={scale}
        onWheel={handleWheel}
        className="bg-neutral-900"
        to
      >
        <Layer>
          {data.map((item: any) => (
            <Text
              key={item.id}
              x={item.x}
              y={item.y}
              fill={item.color}
              width={150}
              strokeWidth={0.1}
              shadowBlur={10}
              letterSpacing={1}
              shadowColor={"#fff"}
              fontSize={10}
              align="right"
              fontFamily="'Lobster'"
              draggable
              text={`${item.description} 
           @${item.user}
           `}
            />
          ))}
        </Layer>
      </Stage>
      <div className="absolute  bottom-16  w-full h-2 flex items-center justify-center">
        {user.isLoading ? <LoadingButton /> : (
          <Button image={user.displayName ? wish : github} children={user.displayName ? 'Agregar deseo' : 'Login'} onClick={handleClick}/>
        )}
      </div>
      <div className="absolute md:hidden bottom-2 right-2  gap-1 p-1 flex flex-col">
        <button
          className="w-16 font-bold text-lg h-16 bg-white rounded-md "
          onTouchStart={() => {
            setScale({ x: scale.x + 0.3, y: scale.y + 0.3 });
          }}
        >
          +
        </button>
        <button
          className="w-16 font-bold text-lg h-16 bg-white rounded-md "
          onTouchStart={() => {
            setScale({ x: scale.x - 0.3, y: scale.y - 0.3 });
          }}
        >
          -
        </button>
      </div>
      {isModalOpen && <Modal />}
    </>
  );
}

export default App;
