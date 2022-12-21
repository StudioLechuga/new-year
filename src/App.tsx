import { useState, useRef, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { mock } from "../MOCK_DATA";
import { Circle, Layer, Rect, Stage, Text } from "react-konva";
import { auth, provider, useCards } from "./service/firabese";
import Modal from "./components/Modal";
//import {Hammer} from "https://hammerjs.github.io/dist/hammer.min.js"
function App() {
  const [data, setData] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cords = (initX: number, initY: number, gap: number) => {
    const arr: any = [[]];
    let xVal = initX || 0;
    let yVal = initY || 0;
    let level = 1;
    let subLevel = 0;
    for (let i = 0; i < mock.length; i++) {
      if (arr[level - 1].length < level) {
        arr[level - 1].push({
          x: arr[level - 1][subLevel] ? arr[level - 1][subLevel].x - gap : xVal,
          y: arr[level - 1][subLevel] ? arr[level - 1][subLevel].y + gap : yVal,
        });
        subLevel++;
      } else {
        yVal = yVal - gap;
        xVal = xVal - gap;
        arr.push([{ x: xVal, y: yVal }]);
        subLevel = 0;
        level++;
      }
    }
    const cords = arr.flat();
    const firstCord = arr[arr.length - 1][0];
    return {
      cords,
      star: cords.findIndex(
        (item: any) => item.x === firstCord.x && item.y === firstCord.y
      ),
    };
  };
  const {carts} = useCards();
  const cordsArr = cords(window.innerWidth, window.innerHeight, 100);
  useEffect(() => {
    const newData = carts.map((item: any, index) => ({
      ...item,
      ...cordsArr.cords[index],
      color:
        index === cordsArr.star
          ? "#FFD700"
          : index % 4 !== 0
          ? "#008000"
          : "#FF0000",
    }));
    setData(newData);
  }, [carts]);

  const [scale, setScale] = useState({
    x: 1,
    y: 1,
  });
  const stageRef = useRef(null);
  console.log(scale);
  const handleWheel = (e: any) => {
    const scaleBy = 1.3;
    const stage = e.target.getStage();
    const oldScale = stage.scaleX();

    const mousePointTo = {
      x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
      y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
    };

    const newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
    setScale({ x: newScale, y: newScale });
    stage.scale({ x: newScale, y: newScale });

    const newPos = {
      x: -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
      y: -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale,
    };
    stage.position(newPos);
    stage.batchDraw();
  };
  const handleDtap = (e: any) => {};
  // var hammertime = new Hammer(stageRef.current, { domEvents: true });

  //     // add rotate gesture
  //     hammertime.get('rotate').set({ enable: true });

  // now attach all possible events
  useEffect(() => {
    console.log(stageRef.current);
  }, [stageRef]);
  const submit = () => {
    auth.signInWithPopup(provider).catch(alert);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  console.log(auth.currentUser)
  return (
    <>
      <Stage
        ref={stageRef}
        width={window.innerWidth}
        height={window.innerHeight}
        draggable
        scale={scale}
        onWheel={handleWheel}
        onDblTap={handleDtap}
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
        <button
          onClick={auth.currentUser?.displayName ? openModal : submit}
          className="px-9 py-5 bg-white rounded-md capitalize font-bold text-lg"
        >
          {auth.currentUser?.displayName ? "Agregar mi proposito" : "login"}
        </button>
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
