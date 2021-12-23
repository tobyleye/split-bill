import { useDrag } from "@use-gesture/react";
import { useState, useRef } from "react";
import { FaLock } from "react-icons/fa";
import { toFixed } from "../utils";

export function TestGesture() {
  let [boxes, setBoxes] = useState([
    {
      id: "1",
      ratio: 1,
      isLocked: false,
    },
    {
      id: "2",
      ratio: 1,
      isLocked: false,
    },
    {
      id: "3",
      ratio: 1,
      isLocked: false,
    },
  ]);

  let onChange = (id, change) => {
    let unlockedBoxes = boxes.filter(
      (box) => box.isLocked === false && box.id !== id
      );
      
      if (unlockedBoxes.length === 0) return;
      
      // share the change equally among the remaining boxes
      // Todo randomly share the remaining price among each persons
    let share = change / unlockedBoxes.length;

    setBoxes((boxes) =>
      boxes.map((box) => {
        if (box.id === id) {
          return {
            ...box,
            ratio: box.ratio + change,
          };
        }

        if (!box.isLocked) {
          return {
            ...box,
            ratio: box.ratio - share,
          };
        }

        return box
      })
    );
  };

  let toggleLock = (id) => {
    setBoxes((boxes) =>
      boxes.map((box) =>
        box.id === id
          ? {
              ...box,
              isLocked: !box.isLocked,
            }
          : box
      )
    );
  };

  return (
    <div className="test-gesture">
      <h3>Test gesture with use gesture</h3>
      {boxes.map((box) => {
        return (
          <Box
            key={box.id}
            {...box}
            onChange={onChange}
            toggleLock={toggleLock}
          />
        );
      })}
    </div>
  );
}

let boxBaseHeight = 100;
let boxBaseWidth = 200;
let maxBoxHeight = boxBaseHeight * 1.2; // 120% of base box height
let minBoxHeight = boxBaseHeight * 0.8; // 80% of base box height

function Box({ onChange, ratio, id, isLocked, toggleLock }) {
  let baseHeight = useRef(ratio * boxBaseHeight);
  let [width] = useState(boxBaseWidth);
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

  const bind = useDrag(
    ({ movement: [my], active, tap }) => {
      if (tap) {
        return toggleLock(id);
      }

      if (isLocked) {
        return;
      }

      let newHeight = normalizeHeight(baseHeight.current + my);
      let newRatio = (newHeight / boxBaseHeight) * 1;
      onChange(id, newRatio - ratio);
      if (active) {
        // setHeight(newHeight);
      } else {
        baseHeight.current = newHeight;
      }
    }
  );

  return (
    <div
      style={{
        width: width,
        height: height,
        display: "grid",
        placeItems: "center",
      }}
      className="box"
    >
      {/* <span>[{width},{height}]</span> */}
      <span>${toFixed((ratio / 3) * 120)}</span>
      <span {...bind()} className="box-handle">
        {isLocked && <FaLock />}
      </span>
    </div>
  );
}
