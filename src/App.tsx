import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { mock } from "../MOCK_DATA";
import { Circle, Layer, Rect, Stage, Text } from "react-konva";

function App() {
  const [count, setCount] = useState(0);

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

  const cordsArr = cords(100, 100, 100);
  console.log(cordsArr);
  const data = mock.map((item, index) => ({
    ...item,
    ...cordsArr.cords[index],
    color:
      index === cordsArr.star
        ? "#FFD700"
        : index % 4 !== 0
        ? "#228B22"
        : "#B22222",
  }));
  console.log(data);
  const [scale, setScale] = useState({
    x: 1,
    y: 1,
  });
  const handleWheel = (e) => {
    console.log(e);
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
  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      draggable
      scale={scale}
      onWheel={handleWheel}
      className="bg-neutral-900"
      to
    >
      <Layer>
        {data.map((item, index) => (
          <>
            <Text
              x={item.x}
              y={item.y}
              fill={item.color}
              width={150}
              fontSize={10}
              align="right"
              fontFamily="'Lobster'"
              draggable
              text={`${item.description} 
              @${item.user}
              `}
            />
          </>
        ))}
      </Layer>
    </Stage>
  );
}

export default App;
