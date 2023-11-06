import { useState } from "react";
import { NumPad } from "./components/numpad";
import { PersonSlider } from "./components/slider";
import { Result } from "./components/result";
import { Screen } from "./components/screen";
import { TipSelect } from "./components/tips";
import { SplitButton } from "./components/split-button";
import { toFixed } from "./utils";
import "./styles/index.css";

let defaults = {
  totalPrice: "",
  totalPersons: 3,
  tipPercent: 0,
  currency: "₦",
};

export default function App() {
  let [totalPrice, setTotalPrice] = useState(defaults.totalPrice);
  let [totalPersons, setTotalPersons] = useState(defaults.totalPersons);
  let [tipPercent, setTipPercent] = useState(defaults.tipPercent);
  let [currency, setCurrency] = useState(defaults.currency);
  let [showResult, setShowResult] = useState(false);

  let reset = () => {
    setTotalPersons(defaults.totalPersons);
    setTipPercent(defaults.tipPercent);
    setTotalPrice(defaults.totalPrice);
    setShowResult(false);
  };

  let splitBill = () => {
    setShowResult(true);
  };

  let tipAmount = totalPrice ? toFixed(+totalPrice * (tipPercent / 100), 2) : 0;

  return (
    <div className="App">
      <header className="header">
        <h3 className="title">Split bill</h3>
        <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
          <option>₦</option>
          <option>$</option>
          <option>€</option>
          <option>£</option>
          <option value=""></option>
        </select>
      </header>

      <Screen
        tipPercent={tipPercent}
        tipAmount={tipAmount}
        totalPrice={totalPrice}
        totalPersons={totalPersons}
        currency={currency}
      />

      {showResult ? (
        <Result
          totalPrice={+totalPrice}
          tipAmount={tipAmount}
          totalPersons={totalPersons}
          currency={currency}
        />
      ) : (
        <>
          <PersonSlider onChange={setTotalPersons} value={totalPersons} />
          <TipSelect value={tipPercent} onChange={setTipPercent} />
          <NumPad value={totalPrice} onChange={setTotalPrice} />
        </>
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
