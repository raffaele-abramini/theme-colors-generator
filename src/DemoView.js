import React from "react";
import styled from "@emotion/styled";

const Box = styled.div`
  position: absolute;
  display: ${(p) => (p.isOpen ? "block" : "none")};
  z-index: 10;
`;

const Button = styled.button`
  color: ${(p) => p.theme.colorPrimaryOpposite};
  background: ${(p) => p.theme.colorPrimary};

  &:hover {
    background: ${({ theme }) =>
      theme.isLight ? theme.colorPrimaryDark : theme.colorPrimaryLight};
    color: ${({ theme }) =>
      theme.isLight
        ? theme.colorPrimaryOppositeDark
        : theme.colorPrimaryOppositeLight};
  }
`;

export const DemoView = ({ color, onChangeComplete, label }) => {
  return (
    <div style={{}}>
      <h4>hello there</h4>
      <hr />

      <p>Text here</p>

      <Button type="button">Click me</Button>
    </div>
  );
};
