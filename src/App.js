import "./styles.css";
import { useState } from "react";
import { NumPad } from "./components/numpad";
import { PersonSlider } from "./components/slider";
import { Result } from "./result";
import { Screen } from "./components/screen";
import { TipSelect } from "./components/tips";
import { SplitButton } from "./components/split-button";
import { toFixed } from "./utils";

export default function App() {
  let [totalPrice, setTotalPrice] = useState("");
  let [totalPersons, setTotalPersons] = useState(2);
  let [tipPercent, setTipPercent] = useState(0);
  let [showResult, setShowResult] = useState(false);

  let reset = () => {
    setTotalPersons(2);
    setTotalPrice(200);
    setTipPercent(0);
    setShowResult(false);
  };

  let splitBill = () => {
    setShowResult(true);
  };

  let tipAmount = totalPrice ? toFixed(totalPrice * (tipPercent / 100), 2) : 0;

  return (
    <div className="App">
      <h3 className="title">Split bill</h3>
      <Screen
        tipPercent={tipPercent}
        tipAmount={tipAmount}
        totalPrice={totalPrice}
        totalPersons={totalPersons}
      />

      {showResult ? (
        <Result
          totalPrice={totalPrice}
          tipAmount={tipAmount}
          totalPersons={totalPersons}
        />
      ) : (
        <div>
          <div className="slider">
            <PersonSlider onChange={setTotalPersons} value={totalPersons} />
          </div>
          <TipSelect value={tipPercent} onChange={setTipPercent} />
          <NumPad value={totalPrice} onChange={setTotalPrice} />
        </div>
      )}
      <SplitButton
        showResult={showResult}
        onSplit={splitBill}
        onReset={reset}
        disabled={!totalPrice}
      />
    </div>
  );
}
