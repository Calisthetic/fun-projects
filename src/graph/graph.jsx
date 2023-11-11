import { useEffect, useRef, useState } from "react";
import { IsNumeric } from "../utils/utils";
import "./styles.css"
import { useSearchParams } from "react-router-dom";

export default function Graph() {
  function calculatePointsOnCircle(radius, numberOfPoints) {
    var points = [];
    var angleIncrement = (2 * Math.PI) / numberOfPoints;

    for (var i = 0; i < numberOfPoints; i++) {
      var x = radius * Math.cos(i * angleIncrement);
      var y = radius * Math.sin(i * angleIncrement);
      points.push({ x: x, y: y });
    }

    return points;
  }
  function toRadians (angle) {
    return angle * (Math.PI / 180);
  }
  function toDegrees (angle) {
    return angle * (180 / Math.PI);
  }

  function calculatePointFromDirection(pointX, pointY, degrees, direction) {
    const length = 30
    let sideY = length * Math.sin(toRadians(degrees)) / Math.sin(toRadians(90))
    let sideX = length * Math.sin(toRadians(90-degrees)) / Math.sin(toRadians(90))
    return {
      x: (direction === 0 || direction === 1) ? pointX - sideX : pointX + sideX, 
      y: (direction === 1 || direction === 2) ? pointY - sideY : pointY + sideY
    }
  }

  var circleRadius = 120;
  const [numberOfPoints, setNumbersOfPoints] = useState(0);
  var pointWidth = 6;
  const [pointsOnCircle, setPointsOnCircle] = useState(calculatePointsOnCircle(circleRadius, numberOfPoints));

  const [pointsOfRibs, setPointsOfRibs] = useState();
  const [searchParams] = useSearchParams()
  const searchedArcs = searchParams.get("arcs")
  const [arcs, setArcs] = useState(searchedArcs);
  const inputRef = useRef()

  useEffect(() => {
    if (!arcs || arcs.length === 0) {
      return
    }
    window.history.pushState(null, "", `?arcs=${arcs}`)
    
    let points = []
    let num1 = null
    let num2 = null
    let numberOfPoints = 0
    let startIndex = null
    for (let i = 0; i < arcs.length; i++) {
      if (arcs[i] === "," || i + 1 === arcs.length) {
        if (IsNumeric(arcs[i]) && startIndex === null) {
          startIndex = i
        }
        if (startIndex !== null) {
          if (num1 === null) {
            num1 = parseInt(arcs.slice(startIndex, i + 1 === arcs.length ? i + 1 : i))
          } else if (num2 === null) {
            num2 = parseInt(arcs.slice(startIndex, i + 1 === arcs.length ? i + 1 : i))
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
      } else if (arcs[i] === " ") {
        if (startIndex !== null) {
          if (num1 !== null) {
            num2 = parseInt(arcs.slice(startIndex, i))
          } else if (num2 === null) {
            num1 = parseInt(arcs.slice(startIndex, i))
            startIndex = null
          }
        }
      } else if (IsNumeric(arcs[i])) {
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
  }, [arcs, circleRadius])

  const [isDirectedGraph, setIsDirectedGraph] = useState(true);
  return (
    <div className="graph min-h-[calc(100vh-56px)] flex items-center justify-center w-full">
      <div className="flex flex-col items-center max-w-xs">
        <div className="flex items-center justify-center w-full gap-x-2">
          <span className=" font-medium">Ориентированный граф</span>
          <label className="relative inline-flex items-center mr-1 cursor-pointer h-fit">
            <input type="checkbox" defaultChecked={isDirectedGraph} onInput={() => setIsDirectedGraph(!isDirectedGraph)} className="sr-only peer"/>
            <div className="w-9 h-5 rounded-full peer peer-checked:after:translate-x-full 
            bg-backgroundThirdLight dark:bg-backgroundThirdDark transition-colors
            after:content-[''] after:absolute after:top-0.5 after:left-[2px] 
            after:bg-white after:border-gray-300 after:border after:rounded-full 
            after:h-4 after:w-4 after:transition-all border-borderLight dark:border-borderDark 
            peer-checked:bg-iconLight peer-checked:dark:bg-iconDark" title="Download files"></div>
          </label>
        </div>
        <svg version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            width: circleRadius * 2 + pointWidth * 2,
            aspectRatio: 1,
            overflow: "visible",
            margin: "24px 0px"
          }}>
          <circle className=" stroke-backgroundThirdLight dark:stroke-backgroundThirdDark"
            cx={circleRadius + pointWidth}
            cy={circleRadius + pointWidth}
            r={circleRadius}
            strokeWidth="2"
            fill="none"/>
          {pointsOfRibs ? pointsOfRibs.map((item, index) => item.n1 === item.n2 ? (
            <>
              <circle key={index} className=" stroke-backgroundAccentLight dark:stroke-backgroundAccentDark"
                cx={pointsOnCircle[item.n1 - 1].x*1.2 + circleRadius + pointWidth}
                cy={pointsOnCircle[item.n1 - 1].y*1.2 + circleRadius + pointWidth}
                r={circleRadius / 5}
                fill="none"
                strokeWidth="2"
              ></circle>
              <text className="fill-textLight dark:fill-textDark" 
              x={pointsOnCircle[item.n1 - 1].x*1.2 + circleRadius + pointWidth-10}
              y={pointsOnCircle[item.n1 - 1].y*1.2 + circleRadius + pointWidth+16}>
                {"e"+(index+1)}
              </text>
            </>
          ) : (
            <>
              <line key={index} className=" stroke-backgroundAccentLight dark:stroke-backgroundAccentDark"
                x1={pointsOnCircle[item.n1-1].x + circleRadius + pointWidth}
                x2={pointsOnCircle[item.n2-1].x + circleRadius + pointWidth}
                y1={pointsOnCircle[item.n1-1].y + circleRadius + pointWidth}
                y2={pointsOnCircle[item.n2-1].y + circleRadius + pointWidth}
                strokeWidth="2"
              />
              <text className="fill-textLight dark:fill-textDark" 
              x={(pointsOnCircle[item.n1-1].x + circleRadius + pointWidth + pointsOnCircle[item.n2-1].x + circleRadius + pointWidth)/2}
              y={(pointsOnCircle[item.n1-1].y + circleRadius + pointWidth + pointsOnCircle[item.n2-1].y + circleRadius + pointWidth)/2}>
                {"e"+(index+1)}
              </text>
              {isDirectedGraph ? (
                <>
                  <line className="stroke-backgroundAccentLight dark:stroke-backgroundAccentDark"
                    x1={calculatePointFromDirection(
                      pointsOnCircle[item.n2-1].x + circleRadius + pointWidth,
                      pointsOnCircle[item.n2-1].y + circleRadius + pointWidth,
                      Math.round((180 / Math.PI) * Math.acos((Math.pow(Math.abs(pointsOnCircle[item.n1-1].x - pointsOnCircle[item.n2-1].x), 2) +
                      Math.pow(Math.abs(pointsOnCircle[item.n1-1].y - pointsOnCircle[item.n2-1].y), 2) +
                      Math.pow(Math.abs(pointsOnCircle[item.n1-1].x - pointsOnCircle[item.n2-1].x), 2)
                      - Math.pow(Math.abs(pointsOnCircle[item.n1-1].y - pointsOnCircle[item.n2-1].y), 2)) / 
                      (2 * Math.sqrt(Math.pow(Math.abs(pointsOnCircle[item.n1-1].x - pointsOnCircle[item.n2-1].x), 2) +
                      Math.pow(Math.abs(pointsOnCircle[item.n1-1].y - pointsOnCircle[item.n2-1].y), 2)) *
                      Math.abs(pointsOnCircle[item.n1-1].x - pointsOnCircle[item.n2-1].x)))) - 4, 
                      pointsOnCircle[item.n1-1].x > pointsOnCircle[item.n2-1].x ?
                        pointsOnCircle[item.n1-1].y < pointsOnCircle[item.n2-1].y ? 2 : 3
                      : pointsOnCircle[item.n1-1].y > pointsOnCircle[item.n2-1].y ? 0 : 1
                    ).x}
                    x2={pointsOnCircle[item.n2-1].x + circleRadius + pointWidth}
                    y1={calculatePointFromDirection(
                      pointsOnCircle[item.n2-1].x + circleRadius + pointWidth,
                      pointsOnCircle[item.n2-1].y + circleRadius + pointWidth,
                      Math.round((180 / Math.PI) * Math.acos((Math.pow(Math.abs(pointsOnCircle[item.n1-1].x - pointsOnCircle[item.n2-1].x), 2) +
                      Math.pow(Math.abs(pointsOnCircle[item.n1-1].y - pointsOnCircle[item.n2-1].y), 2) +
                      Math.pow(Math.abs(pointsOnCircle[item.n1-1].x - pointsOnCircle[item.n2-1].x), 2)
                      - Math.pow(Math.abs(pointsOnCircle[item.n1-1].y - pointsOnCircle[item.n2-1].y), 2)) / 
                      (2 * Math.sqrt(Math.pow(Math.abs(pointsOnCircle[item.n1-1].x - pointsOnCircle[item.n2-1].x), 2) +
                      Math.pow(Math.abs(pointsOnCircle[item.n1-1].y - pointsOnCircle[item.n2-1].y), 2)) *
                      Math.abs(pointsOnCircle[item.n1-1].x - pointsOnCircle[item.n2-1].x)))) - 4, 
                      pointsOnCircle[item.n1-1].x > pointsOnCircle[item.n2-1].x ?
                        pointsOnCircle[item.n1-1].y < pointsOnCircle[item.n2-1].y ? 2 : 3
                      : pointsOnCircle[item.n1-1].y > pointsOnCircle[item.n2-1].y ? 0 : 1
                    ).y}
                    y2={pointsOnCircle[item.n2-1].y + circleRadius + pointWidth}
                    strokeWidth="3"
                  ></line>
                  <line className="stroke-backgroundAccentLight dark:stroke-backgroundAccentDark"
                    x1={calculatePointFromDirection(
                      pointsOnCircle[item.n2-1].x + circleRadius + pointWidth,
                      pointsOnCircle[item.n2-1].y + circleRadius + pointWidth,
                      Math.round((180 / Math.PI) * Math.acos((Math.pow(Math.abs(pointsOnCircle[item.n1-1].x - pointsOnCircle[item.n2-1].x), 2) +
                      Math.pow(Math.abs(pointsOnCircle[item.n1-1].y - pointsOnCircle[item.n2-1].y), 2) +
                      Math.pow(Math.abs(pointsOnCircle[item.n1-1].x - pointsOnCircle[item.n2-1].x), 2)
                      - Math.pow(Math.abs(pointsOnCircle[item.n1-1].y - pointsOnCircle[item.n2-1].y), 2)) / 
                      (2 * Math.sqrt(Math.pow(Math.abs(pointsOnCircle[item.n1-1].x - pointsOnCircle[item.n2-1].x), 2) +
                      Math.pow(Math.abs(pointsOnCircle[item.n1-1].y - pointsOnCircle[item.n2-1].y), 2)) *
                      Math.abs(pointsOnCircle[item.n1-1].x - pointsOnCircle[item.n2-1].x)))) + 4, 
                      pointsOnCircle[item.n1-1].x > pointsOnCircle[item.n2-1].x ?
                        pointsOnCircle[item.n1-1].y < pointsOnCircle[item.n2-1].y ? 2 : 3
                      : pointsOnCircle[item.n1-1].y > pointsOnCircle[item.n2-1].y ? 0 : 1
                    ).x}
                    x2={pointsOnCircle[item.n2-1].x + circleRadius + pointWidth}
                    y1={calculatePointFromDirection(
                      pointsOnCircle[item.n2-1].x + circleRadius + pointWidth,
                      pointsOnCircle[item.n2-1].y + circleRadius + pointWidth,
                      Math.round((180 / Math.PI) * Math.acos((Math.pow(Math.abs(pointsOnCircle[item.n1-1].x - pointsOnCircle[item.n2-1].x), 2) +
                      Math.pow(Math.abs(pointsOnCircle[item.n1-1].y - pointsOnCircle[item.n2-1].y), 2) +
                      Math.pow(Math.abs(pointsOnCircle[item.n1-1].x - pointsOnCircle[item.n2-1].x), 2)
                      - Math.pow(Math.abs(pointsOnCircle[item.n1-1].y - pointsOnCircle[item.n2-1].y), 2)) / 
                      (2 * Math.sqrt(Math.pow(Math.abs(pointsOnCircle[item.n1-1].x - pointsOnCircle[item.n2-1].x), 2) +
                      Math.pow(Math.abs(pointsOnCircle[item.n1-1].y - pointsOnCircle[item.n2-1].y), 2)) *
                      Math.abs(pointsOnCircle[item.n1-1].x - pointsOnCircle[item.n2-1].x)))) + 4, 
                      pointsOnCircle[item.n1-1].x > pointsOnCircle[item.n2-1].x ?
                        pointsOnCircle[item.n1-1].y < pointsOnCircle[item.n2-1].y ? 2 : 3
                      : pointsOnCircle[item.n1-1].y > pointsOnCircle[item.n2-1].y ? 0 : 1
                    ).y}
                    y2={pointsOnCircle[item.n2-1].y + circleRadius + pointWidth}
                    stroke="yellow"
                    strokeWidth="3"
                  ></line>
                </>
              ) : null}
            </>
          )) : null}
          {pointsOnCircle ? pointsOnCircle.map((item, index) => (
            <>
              <circle key={index} className=" fill-buttonLight dark:fill-buttonDark"
                cx={circleRadius + item.x + pointWidth}
                cy={circleRadius + item.y + pointWidth}
                r={pointWidth}
              />
              <text className="fill-textLight dark:fill-textDark" x={circleRadius+item.x} y={circleRadius+item.y+pointWidth+20}>{index+1}</text>
            </>
          )) : null}
        </svg>
        <input className=" my-4 w-full border border-borderLight dark:border-borderDark 
        text-textLight text-sm rounded-lg block p-2 dark:focus:border-textDark
        focus:border-textLight bg-backgroundThirdLight dark:bg-backgroundThirdDark
        dark:placeholder-gray-400 dark:text-textDark"  
        defaultValue={searchedArcs && searchedArcs.length > 0 ? searchedArcs : 0}
        ref={inputRef} type="text" placeholder="1 2,2,2 3,3 4" 
        onInput={() => setArcs(inputRef.current.value)}></input>
        {pointsOnCircle && pointsOnCircle.length > 0 ? (
          <>
            <p className="font-medium">Таблица смежности</p>
            <div className=" max-w-xs max-h-[404px] overflow-auto mt-1">
              <div className="grid mt-1 w-max" style={{gridTemplateColumns: "repeat("+(pointsOnCircle.length+1)+", minmax(0, 1fr))"}}>
                <TableItem>V</TableItem>
                {pointsOnCircle.map((item, index) => (
                  <TableItem>V{index+1}</TableItem>
                ))}
                {isDirectedGraph ? (
                  pointsOnCircle.map((item, index) => (
                    <>
                      <TableItem>V{index+1}</TableItem>
                      {pointsOnCircle.map((item2, index2) => (
                        <TableItem key={index2}>{pointsOfRibs.filter(x => x.n2 === index2+1 && x.n1 === index+1).length === 0 ? 0 : 1}</TableItem>
                      ))}
                    </>
                  ))
                ) : (
                  pointsOnCircle.map((item, index) => (
                    <>
                      <TableItem>V{index+1}</TableItem>
                      {pointsOnCircle.map((item2, index2) => (
                        <TableItem key={index2}>{
                          pointsOfRibs.filter(x => (x.n2 === index2+1 && x.n1 === index+1) || (x.n1 === index2+1 && x.n2 === index+1)).length === 0 ? 0 : 1}
                        </TableItem>
                      ))}
                    </>
                  ))
                )}
              </div>
            </div>
          </>
        ) : null}
        {pointsOfRibs && pointsOfRibs.length > 0 ? (
          <>
            <p className="font-medium mt-2">Таблица инцидентности</p>
            <div className=" max-w-xs max-h-[404px] overflow-auto mt-1 mb-10">
              <div className="grid w-max" style={{gridTemplateColumns: "repeat("+(pointsOfRibs.length+1)+", minmax(0, 1fr))"}}>
                <TableItem>V\e</TableItem>
                {pointsOfRibs.map((item, index) => (
                  <TableItem>e{index+1}</TableItem>
                ))}
                {isDirectedGraph ? (
                  pointsOnCircle.map((item, index) => (
                    <>
                      <TableItem>V{index+1}</TableItem>
                      {pointsOfRibs.map((item2, index2) => (
                        <TableItem key={index2}>
                          {item2.n1 === index+1 && item2.n2 === index+1 ? 2 : 
                          item2.n1 === index+1 ? 1 :
                          item2.n2 === index+1 ? -1 : 0}
                        </TableItem>
                      ))}
                    </>
                  ))
                ) : (
                  pointsOnCircle.map((item, index) => (
                    <>
                      <TableItem>V{index+1}</TableItem>
                      {pointsOfRibs.map((item2, index2) => (
                        <TableItem key={index2}>{
                          (item2.n1 === index+1 && item2.n2 === index+1) ? 2 : 
                          ((item2.n1 === index+1 && item2.n2 !== index+1) || (item2.n1 !== index+1 && item2.n2 === index+1)) ? 1 : 0}
                        </TableItem>
                      ))}
                    </>
                  ))
                )}
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

function TableItem(props) {
  return (
    <div className="h-8 w-8 border text-center border-borderLight dark:border-borderDark">{props.children}</div>
  )
}