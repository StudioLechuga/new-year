import { useEffect, useRef, useState } from "react";
import { useFirebase } from "./useFirebase";

export const useCard = () => {
  const [data, setData] = useState<any>([]);

  const { card: item } = useFirebase();
  const cords = (initX: number, initY: number, gap: number, length: number) => {
    const arr: any = [[]];
    let xVal = initX || 0;
    let yVal = initY || 0;
    let level = 1;
    let subLevel = 0;
    for (let i = 0; i < length; i++) {
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

  useEffect(() => {
    const cordsArr = cords(
      window.innerWidth,
      window.innerHeight,
      100,
      item.length
    );
    const newData = item.map((item: any, index) => {

      return {
        ...item,
        ...cordsArr.cords[index],
        color:
          index === cordsArr.star
            ? "#FFD700"
            : index % 4 !== 0
            ? "#008000"
            : "#FF0000",
      };
    });
    setData(newData);
  }, [item]);

  const [scale, setScale] = useState({
    x: 1,
    y: 1,
  });
  const stageRef = useRef(null);

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
  return {
    data,
    scale,
    stageRef,
    handleWheel,
  };
};
