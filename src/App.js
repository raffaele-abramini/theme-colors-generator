import React from "react";
import tinycolor from "tinycolor2";
import { ThemeProvider } from "@emotion/react";
import "./styles.css";
import { ColorBlock } from "./ColorBlock";
import { DemoView } from "./DemoView";

const squareStyle = {
  height: "50px",
  width: "50px"
};

export default function App() {
  const [textColor, setTextColor] = React.useState("#fff");
  const [bgColor, setBgColor] = React.useState("#000");
  const [primaryColor, setPrimaryColor] = React.useState("#362EBB");
  const [perc, setPerc] = React.useState([]);
  const [prims, setPrims] = React.useState({});
  const [baseFontSize, setBaseFontSize] = React.useState(1);

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

  const theme = {
    colorBase0: perc[0],
    colorBase10: perc[1],
    colorBase20: perc[2],
    colorBase30: perc[3],
    colorBase40: perc[4],
    colorBase50: perc[5],
    colorBase60: perc[6],
    colorBase70: perc[7],
    colorBase80: perc[8],
    colorBase90: perc[9],
    colorBase100: perc[10],
    colorPrimaryDarkest: prims.darkest,
    colorPrimaryDarker: prims.darker,
    colorPrimaryDark: prims.dark,
    colorPrimary: prims.normal,
    colorPrimaryLight: prims.light,
    colorPrimaryLighter: prims.lighter,
    colorPrimaryLightest: prims.lightest,
    colorPrimaryOpposite: prims.opposite,
    colorPrimaryOppositeDark: prims.oppositeDark,
    colorPrimaryOppositeLight: prims.oppositeLigh,
    isLight: tinycolor(perc[0]).isLight(),
    baseFontSizeMultiplier: baseFontSize
  };

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
        <div>
          <label>Base font size multiplier</label>

          <input
            type="number"
            step={0.05}
            max={2}
            min={0.1}
            style={{
              display: "block",
              height: "40px"
            }}
            name="label"
            value={baseFontSize}
            onChange={(e) => {
              setBaseFontSize(e.target.value);
            }}
          />
        </div>
      </div>
      <h2>Example</h2>
      <ThemeProvider theme={theme}>
        <DemoView />
      </ThemeProvider>

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
      <pre>{JSON.stringify(theme, undefined, "\b  ")}</pre>
    </div>
  );
}
