import { useDrag } from "@use-gesture/react";
import { useState } from "react";

export function Box() {
  let [width, setWidth] = useState(50);

  const bind = useDrag((state) => {
    let {
      movement: [mx]
    } = state;
    console.log({ mx });
    setWidth(width + mx);
  });
  return (
    <div
      style={{
        width: width,
        height: 50
      }}
      className="box"
      {...bind()}
    ></div>
  );
}
