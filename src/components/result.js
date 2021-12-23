import { useState, useRef } from "react";
import { toFixed } from "../utils";
import { BsThreeDots } from "react-icons/bs";
import { FaLock } from "react-icons/fa";
import { useDrag } from "@use-gesture/react";

export function Result({ totalPrice, tipAmount, totalPersons, currency }) {
  let totalAmount = totalPrice + tipAmount;
  let [list, setList] = useState(() => {
    return Array(totalPersons)
      .fill()
      .map((i, index) => {
        return {
          id: index.toString(),
          isLocked: false,
          ratio: 1, // 1:1:1
        };
      });
  });

  let toggleLock = (id) => {
    setList((list) =>
      list.map((item) =>
        item.id === id
          ? {
              ...item,
              isLocked: !item.isLocked,
            }
          : item
      )
    );
  };

  let onChange = (id, change) => {
    let unlockedBoxes = list.filter(
      (item) => item.isLocked === false && item.id !== id
    );

    if (unlockedBoxes.length === 0) return;

    // share the change equally among the remaining boxes
    // Todo: randomly share the remaining price among each persons
    let share = change / unlockedBoxes.length;

    setList((list) =>
      list.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            ratio: item.ratio + change,
          };
        }

        if (!item.isLocked) {
          return {
            ...item,
            ratio: item.ratio - share,
          };
        }
        
        // do nothing
        return item;
      })
    );
  };

  return (
    <div className="result">
      <div className="result-list-container">
        <div className="result-list">
          {list.map((item, index) => (
            <ResultItem
              key={item.id}
              index={index}
              {...item}
              currency={currency}
              totalAmount={totalAmount}
              totalPersons={totalPersons}
              onChange={onChange}
              toggleLock={toggleLock}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

let alphabets = "abcdefghijklmnopqrstuvwxyz";

let boxBaseHeight = 160;
let maxBoxHeight = boxBaseHeight * 1.2; // 120% of base box height
let minBoxHeight = boxBaseHeight * 0.8; // 80% of base box height

let calculateShare = (totalAmount, totalPersons, ratio) => {
  return toFixed((ratio / totalPersons) * totalAmount, 2);
};

let ResultItem = ({
  index,
  id,
  ratio,
  currency,
  isLocked,
  totalAmount,
  totalPersons,
  onChange,
  toggleLock,
}) => {
  let baseHeight = useRef(ratio * boxBaseHeight);

  let height = ratio * boxBaseHeight;

  let normalizeHeight = (height) => {
    if (height > maxBoxHeight) {
      return maxBoxHeight;
    } else if (height < minBoxHeight) {
      return minBoxHeight;
    } else {
      return height;
    }
  };

  const bind = useDrag(({ movement: [_, my], active, tap }) => {
    if (tap) {
      return toggleLock(id);
    }
    if (isLocked) {
      return;
    }
    let newHeight = normalizeHeight(baseHeight.current + my);
    let newRatio = (newHeight / boxBaseHeight) * 1;

    if (active) {
      onChange(id, newRatio - ratio);
    } else {
      baseHeight.current = newHeight;
    }
  });

  return (
    <div
      className="result-item"
      style={{
        width: "100%",
        height: height,
      }}
    >
      <div>
        <p className="result-item-person">Person {alphabets[index]}</p>
        <p className="result-item-price">
          {currency}{calculateShare(totalAmount, totalPersons, ratio)}
        </p>
      </div>
      <div
        {...bind()}
        className={"result-item-handle" + (isLocked ? " locked" : "")}
      >
        {isLocked ? (
          <span className="lock-icon">
            <FaLock />
          </span>
        ) : (
          <span className="dots-icon">
            <BsThreeDots />
            <BsThreeDots style={{ marginTop: -10 }} />
          </span>
        )}
      </div>
    </div>
  );
};
