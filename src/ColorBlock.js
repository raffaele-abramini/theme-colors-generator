import React, { useState, useEffect, useRef } from "react";
import { ChromePicker } from "react-color";
import styled from "@emotion/styled";

const Box = styled.div`
  position: absolute;
  display: ${(p) => (p.isOpen ? "block" : "none")};
  z-index: 10;
`;

export const ColorBlock = ({ color, onChangeComplete, label }) => {
  const [isOpen, setOpen] = useState(false);
  const d = useRef();
  useEffect(
    (e) => {
      if (d && d.current) {
        const element = d.current;
        document.body.addEventListener("click", (e) => {
          if (e.target !== element && !element.contains(e.target)) {
            setOpen(false);
          }
        });
      }
    },
    [d]
  );
  return (
    <div style={{ position: "relative" }} ref={d}>
      <label>{label}</label>
      <div style={{ display: "inline-flex", marginBottom: "8px" }}>
        <input
          type="text"
          name="label"
          value={color}
          readOnly
          onClick={(e) => {
            setOpen(true);
          }}
          style={{}}
        />
        <div
          style={{
            height: "40px",
            width: "40px",
            background: color,
            marginLeft: "8px",
            border: "1px solid #ddd"
          }}
        ></div>
      </div>
      <Box isOpen={isOpen}>
        <ChromePicker color={color} onChangeComplete={onChangeComplete} />
      </Box>
    </div>
  );
};
