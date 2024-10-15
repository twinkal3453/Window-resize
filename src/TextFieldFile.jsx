import React, { useState, useRef } from "react";
import "./textField.css";

const TextFieldFile = () => {
  const [text, setText] = useState("");
  // Refs for syncing scroll
  const textAreaRef = useRef(null);
  const overlayRef = useRef(null);

  // Split text by new lines
  const lines = text.split("\n");

  // Sync scroll between textarea and overlay
  const handleScroll = () => {
    if (overlayRef.current && textAreaRef.current) {
      overlayRef.current.scrollTop = textAreaRef.current.scrollTop;
      overlayRef.current.scrollLeft = textAreaRef.current.scrollLeft;
    }
  };

  console.log("Text>>>", text);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>this is the TextArea.</h2>
      <div className="parent_component">
        <div className="textField_inputValue" ref={overlayRef}>
          {lines?.map((item, index) => {
            return (
              <div
                key={index}
                style={{
                  fontSize: ".83rem",
                  color: "black",
                }}
                className="colored-line"
              >
                {
                  item ||
                    "\u00A0" /* Render non-breaking space for empty lines */
                }
              </div>
            );
          })}
        </div>
        <textarea
          ref={textAreaRef}
          onChange={(e) => setText(e.target.value)}
          className="text_field"
          name=""
          id=""
          onScroll={handleScroll}
        />
      </div>
    </div>
  );
};

export default TextFieldFile;
