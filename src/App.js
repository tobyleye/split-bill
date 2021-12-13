import "./styles.css";
import { useState } from "react";
import { NumPad } from "./components/numpad";
import { PersonSlider } from "./components/slider";
import { Result } from "./components/result";
import { Screen } from "./components/screen";
import { TipSelect } from "./components/tips";
import { SplitButton } from "./components/split-button";
import { toFixed } from "./utils";

let values = {
  totalPrice:'',
  totalPersons: 5,
  tipPercent: 0,
}

export default function App() {
  let [totalPrice, setTotalPrice] = useState(values.totalPrice);
  let [totalPersons, setTotalPersons] = useState(values.totalPersons);
  let [tipPercent, setTipPercent] = useState(values.tipPercent);
  let [showResult, setShowResult] = useState(false);

  let reset = () => {
    setTotalPersons(values.totalPersons);
    setTipPercent(values.tipPercent);
    setTotalPrice(200);
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
        <div className="controls">
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
