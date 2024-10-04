import { useState, useCallback } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Divider from "@mui/material/Divider";

const useThrottle = (func, delay) => {
  let timeout = null;
  return (...args) => {
    if (timeout) {
      return;
    }
    func(...args);
    timeout = setTimeout(() => {
      timeout = null;
    }, delay);
  };
};

function App() {
  const [isMouseClicked, setIsMouseClicked] = useState({
    type: "",
    isPressed: false,
  });
  const { type, isPressed } = isMouseClicked;

  const [dimentions, setDimentions] = useState({
    col: 0,
    row: 0,
  });
  const { col, row } = dimentions;

  const handleDivHeightWidth = (e) => {
    const returnCoords = {
      col: e.clientX,
      row: e.clientY,
    };

    if (isPressed) {
      console.log("coords", returnCoords[type], type);
      setDimentions({ ...dimentions, [type]: returnCoords[type] });
    }
  };

  const getValue = (data) => {
    return `${data}px`;
  };

  // Use useCallback to memoize the throttled function
  const handleClickThrottled = useCallback(
    useThrottle(handleDivHeightWidth, 1000),
    [handleDivHeightWidth] // Dependency array can be adjusted based on your needs
  );

  return (
    <div
      onMouseMove={(e) => handleClickThrottled(e)}
      style={{ height: "100vh", display: "flex" }}
    >
      <div
        style={{
          height: "100%",
          width: "100%",
          background: "grey",
          display: "grid",
          gridTemplateColumns: `${col ? getValue(col) : "auto"} 2px auto`,
        }}
      >
        <div style={{ height: "100%", width: "100%", background: "yellow" }}>
          <h2 onClick={(e) => handleClickThrottled1(e)}>hello</h2>
        </div>
        <Divider
          variant="fullWidth"
          onMouseDown={() =>
            setIsMouseClicked({
              type: "col",
              isPressed: true,
            })
          }
          onMouseUp={() =>
            setIsMouseClicked({
              type: "",
              isPressed: false,
            })
          }
          style={{ cursor: "col-resize" }}
        />
        <div style={{ height: "100%", width: "100%", background: "pink" }}>
          <h2>Hello</h2>
        </div>
      </div>
    </div>
  );
}

export default App;
