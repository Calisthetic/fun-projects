import { useEffect, useRef, useState } from "react";
import { GetLastSymbol, IsNumeric } from "../utils/utils";

export default function Graph() {
  function calculatePointsOnCircle(radius, numberOfPoints) {
    var points = [];
    var angleIncrement = (2 * Math.PI) / numberOfPoints;

    for (var i = 0; i < numberOfPoints; i++) {
      var x = radius * Math.cos(i * angleIncrement);
      var y = radius * Math.sin(i * angleIncrement);
      points.push({ x: x, y: y });
    }

    console.log(points)
    return points;
  }

  // Пример использования
  var circleRadius = 120;
  const [numberOfPoints, setNumbersOfPoints] = useState(0);
  var pointWidth = 8;
  const [pointsOnCircle, setPointsOnCircle] = useState(calculatePointsOnCircle(circleRadius, numberOfPoints));

  const [pointsOfRibs, setPointsOfRibs] = useState();
  const inputRef = useRef()
  function InputHandle() {
    let text = inputRef.current.value
    if (text.length === 0) {
      return
    }
    
    let points = []
    let num1 = null
    let num2 = null
    let numberOfPoints = 0
    let startIndex = null
    for (let i = 0; i < text.length; i++) {
      if (text[i] === "," || i + 1 === text.length) {
        if (IsNumeric(text[i]) && startIndex === null) {
          startIndex = i
        }
        if (startIndex !== null) {
          if (num1 === null) {
            num1 = parseInt(text.slice(startIndex, i + 1 === text.length ? i + 1 : i))
          } else if (num2 === null) {
            num2 = parseInt(text.slice(startIndex, i + 1 === text.length ? i + 1 : i))
          }
        }
        if (num1 && num2 === null) {
          num2 = num1
        }
        if (num1 && num2) {
          if (numberOfPoints < num1 || numberOfPoints < num2) {
            numberOfPoints = num1 < num2 ? num2 : num1
          }
          points.push({n1: num1, n2: num2})
          startIndex = null
          num1 = null
          num2 = null
        }
      } else if (text[i] === " ") {
        if (startIndex !== null) {
          if (num1 !== null) {
            num2 = parseInt(text.slice(startIndex, i))
          } else if (num2 === null) {
            num1 = parseInt(text.slice(startIndex, i))
            startIndex = null
          }
        }
      } else if (IsNumeric(text[i])) {
        if (startIndex === null) {
          startIndex = i
        }
      }
    }
    if (points.length > 0) {
      setPointsOnCircle(calculatePointsOnCircle(circleRadius, numberOfPoints))
      setNumbersOfPoints(numberOfPoints)
      setPointsOfRibs(points)
    }
  }

  return (
    <div className="graph min-h-[calc(100vh-56px)] flex items-center justify-center">
      <div className="flex flex-col">
        <svg version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            outline: "2px solid red",
            width: circleRadius * 2 + pointWidth * 2,
            aspectRatio: 1,
            overflow: "visible"
          }}>
          <circle
            cx={circleRadius + pointWidth}
            cy={circleRadius + pointWidth}
            r={circleRadius}
            fill="green"/>
          {pointsOnCircle ? pointsOnCircle.map((item, index) => (
            <circle key={index}
              cx={circleRadius + item.x + pointWidth}
              cy={circleRadius + item.y + pointWidth}
              r={pointWidth}
              fill="red"
            />
          )) : null}
          {pointsOfRibs ? pointsOfRibs.map((item, index) => item.n1 === item.n2 ? (
            <circle key={index}
              cx={(pointsOnCircle[item.n1 - 1].x*1.2 + circleRadius + pointWidth)}
              cy={(pointsOnCircle[item.n1 - 1].y*1.2 + circleRadius + pointWidth)}
              r={circleRadius / 5}
              fill="none"
              stroke="white"
              strokeWidth="2"
            ></circle>
          ) : (
            <>
              <line key={index}
                x1={pointsOnCircle[item.n1-1].x + circleRadius + pointWidth}
                x2={pointsOnCircle[item.n2-1].x + circleRadius + pointWidth}
                y1={pointsOnCircle[item.n1-1].y + circleRadius + pointWidth}
                y2={pointsOnCircle[item.n2-1].y + circleRadius + pointWidth}
                stroke="orange"
                strokeWidth="5"
              />
              {/* cos(a)=(a^2+b^2+c^2)/(2*a*c) */}
              <text>{Math.acos((Math.pow(Math.abs(pointsOnCircle[item.n1-1].x - pointsOnCircle[item.n2-1].x), 2) +
                (Math.pow(Math.abs(pointsOnCircle[item.n1-1].y - pointsOnCircle[item.n2-1].y), 2) +
                Math.pow(Math.abs(pointsOnCircle[item.n1-1].x - pointsOnCircle[item.n2-1].x), 2)) -
                Math.pow(Math.abs(pointsOnCircle[item.n1-1].y - pointsOnCircle[item.n2-1].y), 2)) / 
                (2 * Math.abs(pointsOnCircle[item.n1-1].x - pointsOnCircle[item.n2-1].x) * 
                (Math.pow(Math.abs(pointsOnCircle[item.n1-1].y - pointsOnCircle[item.n2-1].y), 2) +
                Math.pow(Math.abs(pointsOnCircle[item.n1-1].x - pointsOnCircle[item.n2-1].x), 2))))}</text>
              {console.log(Math.abs(pointsOnCircle[item.n1-1].y - pointsOnCircle[item.n2-1].y))}
              {console.log(
                Math.sqrt(Math.pow(Math.abs(pointsOnCircle[item.n1-1].x - pointsOnCircle[item.n2-1].x), 2) +
                Math.pow(Math.abs(pointsOnCircle[item.n1-1].y - pointsOnCircle[item.n2-1].y), 2))
              )}
              <line 
                x1={pointsOnCircle[item.n1-1].x + circleRadius + pointWidth}
                x2={pointsOnCircle[item.n2-1].x + circleRadius + pointWidth}
                y1={pointsOnCircle[item.n1-1].y + circleRadius + pointWidth}
                y2={pointsOnCircle[item.n2-1].y + circleRadius + pointWidth}
                stroke="orange"
                strokeWidth="5"
              ></line>
            </>
          )) : null}
        </svg>
        <input className=" my-4 w-full border border-borderLight dark:border-borderDark 
        text-textLight text-sm rounded-lg block p-2 dark:focus:border-textDark
        focus:border-textLight bg-backgroundThirdLight dark:bg-backgroundThirdDark
        dark:placeholder-gray-400 dark:text-textDark" ref={inputRef}
        type="text" placeholder="1 2, 2 4" onInput={InputHandle}></input>
      </div>
    </div>
  );
}