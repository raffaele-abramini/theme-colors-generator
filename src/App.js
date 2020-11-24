import React from "react";
import tinycolor from "tinycolor2";
import styled from "@emotion/styled";
import "./styles.css";
import { ColorBlock } from "./ColorBlock";

const squareStyle = {
  height: "50px",
  width: "50px"
};

const Button = styled.button`
  color: ${(p) => p.prim.opposite};
  background: ${(p) => p.prim.normal};

  &:hover {
    background: ${(p) =>
      tinycolor(p.bgColor).isDark() ? p.prim.light : p.prim.dark};
    color: ${(p) =>
      tinycolor(p.bgColor).isDark()
        ? p.prim.oppositeLight
        : p.prim.oppositeDark};
  }
`;

export default function App() {
  const [textColor, setTextColor] = React.useState("#fff");
  const [bgColor, setBgColor] = React.useState("#000");
  const [primaryColor, setPrimaryColor] = React.useState("#362EBB");
  const [perc, setPerc] = React.useState([]);
  const [prims, setPrims] = React.useState({});

  React.useEffect(() => {
    setPerc(
      [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((p) =>
        tinycolor.mix(bgColor, textColor, p).toHexString()
      )
    );
  }, [textColor, bgColor]);

  React.useEffect(() => {
    // TODO reformat
    setPrims({
      darkest: tinycolor(primaryColor).darken(60).toHexString(),
      darker: tinycolor(primaryColor).darken(40).toHexString(),
      dark: tinycolor(primaryColor).darken(20).toHexString(),
      normal: primaryColor,
      light: tinycolor(primaryColor).lighten(20).toHexString(),
      lighter: tinycolor(primaryColor).lighten(40).toHexString(),
      lightest: tinycolor(primaryColor).lighten(60).toHexString(),
      opposite: tinycolor
        .mostReadable(primaryColor, ["#000", "#fff"])
        .toHexString(),
      oppositeLight: tinycolor
        .mostReadable(tinycolor(primaryColor).lighten(20).toHexString(), [
          "#000",
          "#fff"
        ])
        .toHexString(),
      oppositeDark: tinycolor
        .mostReadable(tinycolor(primaryColor).darken(20).toHexString(), [
          "#000",
          "#fff"
        ])
        .toHexString()
    });
  }, [primaryColor]);

  return (
    <div className="App">
      <h1>Theme color generator</h1>
      <h2>Pick a text and background color</h2>
      <div style={{ display: "block" }}>
        <div>
          Text color
          <ColorBlock
            color={textColor}
            onChangeComplete={(c) => setTextColor(c.hex)}
          />
        </div>
        <div>
          Background color
          <ColorBlock
            color={bgColor}
            onChangeComplete={(c) => setBgColor(c.hex)}
          />
        </div>
        <div>
          Primary color
          <ColorBlock
            color={primaryColor}
            onChangeComplete={(c) => setPrimaryColor(c.hex)}
          />
        </div>
      </div>
      <h2>Example</h2>
      <div style={{ background: perc[0], color: perc[10], padding: "10px" }}>
        <h4>hello there</h4>
        <hr />

        <p>Text here</p>

        <Button prim={prims} type="button" bgColor={bgColor}>
          Click me
        </Button>
      </div>

      <h2>Base scale</h2>
      <div style={{ display: "flex" }}>
        {perc.map((c) => (
          <div style={{ ...squareStyle, background: c }}></div>
        ))}
      </div>
      <h2>Primary scale</h2>
      <div style={{ display: "flex" }}>
        {Object.values(prims).map((c) => (
          <div style={{ ...squareStyle, background: c }}></div>
        ))}
      </div>

      <h2>Tokens</h2>
      <pre>{`{
    colorBase0: ${perc[0]},
    colorBase10: ${perc[1]},
    colorBase20: ${perc[2]},
    colorBase30: ${perc[3]},
    colorBase40: ${perc[4]},
    colorBase50: ${perc[5]},
    colorBase60: ${perc[6]},
    colorBase70: ${perc[7]},
    colorBase80: ${perc[8]},
    colorBase90: ${perc[9]},
    colorBase100: ${perc[10]},
    colorPrimaryDarkest: ${prims.darkest},
    colorPrimaryDarker: ${prims.darker},
    colorPrimaryDark: ${prims.dark},
    colorPrimary: ${prims.normal},
    colorPrimaryLight: ${prims.light},
    colorPrimaryLighter: ${prims.lighter},
    colorPrimaryLightest: ${prims.lightest},
    colorPrimaryOpposite: ${prims.opposite},
    colorPrimaryOppositeDark: ${prims.oppositeDark},
    colorPrimaryOppositeLight: ${prims.oppositeLight}
}`}</pre>
    </div>
  );
}
