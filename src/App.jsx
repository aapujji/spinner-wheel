import { useState } from 'react';
import './App.css';

function App() {
    const [rotation, setRotation] = useState(0);

    const createWedgePath = (startX, startY, radius, startAngle, endAngle) => {
        // https://stackoverflow.com/questions/13092979/svg-javascript-pie-wedge-generator
        var x1 = startX + radius * Math.cos((Math.PI * startAngle) / 180);
        var y1 = startY + radius * Math.sin((Math.PI * startAngle) / 180);
        var x2 = startX + radius * Math.cos((Math.PI * endAngle) / 180);
        var y2 = startY + radius * Math.sin((Math.PI * endAngle) / 180);

        var pathString =
            'M' +
            startX +
            ' ' +
            startY +
            ' L' +
            x1 +
            ' ' +
            y1 +
            ' A' +
            radius +
            ' ' +
            radius +
            ' 0 0 1 ' +
            x2 +
            ' ' +
            y2 +
            ' z';

        return pathString;
    };

    const items = ['one', 'two', 'three', 'four', 'five', 'six'];
    const angleSize = 360 / items.length;

    const handleSpin = () => {
        const winningIndex = Math.floor(Math.random() * items.length);
        console.log(items[winningIndex]);
        const targetAngle = angleSize * winningIndex + angleSize / 2;
        const totalAngle = 270 - targetAngle;
        const posTotalAngle = totalAngle < 0 ? totalAngle + 360 : totalAngle;

        console.log({ rotation, targetAngle, totalAngle, posTotalAngle });
        setRotation(rotation + posTotalAngle + 5 * 360);
    };

    return (
        <>
            <svg viewBox="0 0 400 400" width="400" height="400">
                <div className="pointer"></div>
                <g
                    className="wheel"
                    transform={`rotate(${rotation}, 200, 200)`}
                >
                    {items.map((item, index) => {
                        return (
                            <>
                                <path
                                    stroke="white"
                                    fill="blue"
                                    d={createWedgePath(
                                        200,
                                        200,
                                        190,
                                        angleSize * index,
                                        angleSize * (index + 1),
                                    )}
                                ></path>
                                <text
                                    x={
                                        200 +
                                        100 *
                                            Math.cos(
                                                (Math.PI *
                                                    (angleSize * index +
                                                        angleSize / 2)) /
                                                    180,
                                            )
                                    }
                                    y={
                                        200 +
                                        100 *
                                            Math.sin(
                                                (Math.PI *
                                                    (angleSize * index +
                                                        angleSize / 2)) /
                                                    180,
                                            )
                                    }
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                >
                                    {item}
                                </text>
                            </>
                        );
                    })}
                </g>
            </svg>
            <button type="button" onClick={handleSpin}>
                Spin!
            </button>
        </>
    );
}

export default App;
