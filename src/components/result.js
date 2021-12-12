import { useState } from "react";
import { toFixed } from "./utils";

export function Result({ totalPrice, tipAmount, totalPersons }) {
  let [list, setList] = useState(() => {
    let amountPerPerson = toFixed((totalPrice + tipAmount) / totalPersons, 2);
    return Array(totalPersons)
      .fill()
      .map((i, index) => {
        return {
          id: index,
          isLocked: false,
          amount: amountPerPerson
        };
      });
  });

  return (
    <div className="result-list">
      {list.map((i, index) => (
        <ResultItem key={i.id} index={index} obj={i} />
      ))}
    </div>
  );
}

let alphabets = "abcdefghijklmnopqrstuvwxyz";

let ResultItem = ({ index, obj }) => {
  return (
    <div className="result-item">
      <div>
        <p className="result-item-person">Person {alphabets[index]}</p>
        <p className="result-item-price">${obj.amount}</p>
      </div>
    </div>
  );
};
