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

  // Пример использования
  var circleRadius = 120;
  var numberOfPoints = 8;
  var pointsOnCircle = calculatePointsOnCircle(circleRadius, numberOfPoints);
  console.log(pointsOnCircle);
  var pointsOfRibs = [
    {
      n1: 1,
      n2: 2
    }
  ];

  var pointWidth = 8;

  return (
    <div className="graph min-h-[calc(100vh-56px)] flex items-center justify-center">
      <div className="flex flex-col">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            outline: "2px solid red",
            width: circleRadius * 2 + pointWidth * 2,
            aspectRatio: 1
          }}
        >
          <circle
            cx={circleRadius + pointWidth}
            cy={circleRadius + pointWidth}
            r={circleRadius}
            fill="green"
          />

          {pointsOnCircle
            ? pointsOnCircle.map((item, index) => (
                <circle
                  key={index}
                  cx={circleRadius + item.x + pointWidth}
                  cy={circleRadius + item.y + pointWidth}
                  r={pointWidth}
                  fill="red"
                />
              ))
            : null}
          {pointsOfRibs
            ? pointsOfRibs.map((item, index) => (
                <line
                  key={index}
                  x1={pointsOnCircle[item.n1 - 1].x + circleRadius + pointWidth}
                  x2={pointsOnCircle[item.n2 - 1].x + circleRadius + pointWidth}
                  y1={pointsOnCircle[item.n1 - 1].y + circleRadius + pointWidth}
                  y2={pointsOnCircle[item.n2 - 1].y + circleRadius + pointWidth}
                  stroke="orange"
                  strokeWidth="5"
                />
              ))
            : null}
        </svg>
      </div>
    </div>
  );
}