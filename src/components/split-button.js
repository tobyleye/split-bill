import { FaPencilAlt } from "react-icons/fa"

export function SplitButton({ showResult, onReset, onSplit, ...props }) {
  return (
    <div className="split-btn-wrap">
      <button
        className={"split-btn " + (showResult ? "edit" : "")}
        {...props}
        onClick={showResult ? onReset : onSplit}
      >
        {showResult ? <span className="edit-icon">
          <FaPencilAlt />
        </span> : <span>SPLIT BILL</span>}
      </button>
    </div>
  );
}
