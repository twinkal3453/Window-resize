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

  // TextArea related state and code..
  const [text, setText] = useState("");

  // Handle text change
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  // Split text by new lines
  const lines = text.split("\n");

  console.log("Line 45", text);

  /**------------------------- end --------------------------------------- */

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
        <div style={{ height: "100%", width: "100%", background: "white" }}>
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
        <div
          style={{
            height: "100%",
            width: "100%",
            background: "white",
            border: "1px solid red",
          }}
        >
          {/* the TextArea component */}
          <div className="text-area-container">
            {/* Render the colored text overlay */}
            <div className="text-overlay" style={{ overflowY: "auto" }}>
              {lines.map((line, index) => (
                <div
                  key={index}
                  style={{ color: "pink" }}
                  className="colored-line"
                >
                  {
                    line ||
                      "\u00A0" /* Render non-breaking space for empty lines */
                  }
                </div>
              ))}
            </div>

            {/* Transparent textarea for input */}
            <textarea
              className="text-input"
              value={text}
              onChange={handleTextChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
