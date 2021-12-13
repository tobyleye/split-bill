import { useEffect, useRef } from "react";
import { IoBackspaceOutline } from "react-icons/io5";

let twoDecimalRegex = /^\d+(\.\d{1,2}?)?$/;

export function NumPad({ value, onChange }) {
  let containerRef = useRef(null);

  // useEffect(() => {
  //   let handler = (evt) => {
  //     let { key, keyCode } = evt;

  //     if (String(keyCode) === "8") {
  //       onChange(value.slice(0, -1));
  //     } else if (".0123456789".includes(key)) {
  //       let newValue = value.concat(key);

  //       if (twoDecimalRegex.test(newValue)) {
  //         onChange(value.concat(key));
  //       }
  //     }

  //     let el = containerRef.current.querySelector(`[data-value="${key}"]`)
  //     if (el) {
  //       el.classList.toggle('pressed')
  //       setTimeout(() => {
  //         el.classList.toggle('pressed')
  //       }, 0);
  //     }
  //   };

  //   window.addEventListener("keypress", handler);

  //   return () => {
  //     window.removeEventListener("keypress", handler);
  //   };
  // }, [onChange, value]);

  let handleClick = (e) => {
    let newValue = String(value) + e.target.textContent;
    if (twoDecimalRegex.test(newValue)) {
      onChange(newValue !== "" ? Number(newValue) : newValue);
    }
  };

  const clear = () => {
    onChange(String(value).slice(0, -1));
  };

  return (
    <div className="numpad" ref={containerRef}>
      {Array(9)
        .fill(null)
        .map((_, i) => {
          return (
            <button data-value={i} key={i} onClick={handleClick} data-value={i}>
              {i + 1}
            </button>
          );
        })}
      <button data-value="0" onClick={handleClick}>
        0
      </button>
      <button onClick={handleClick}>.</button>
      <button
        className="clear"
        data-value="clear"
        onClick={clear}
      >
        <IoBackspaceOutline />
        <span aria-hidden>clear</span>
      </button>
    </div>
  );
}
