export function SplitButton({ showResult, onReset, onSplit, ...props }) {
  return (
    <div className="split-btn-wrap">
      <button
        className={"split-btn " + (showResult ? "edit" : "")}
        {...props}
        onClick={showResult ? onReset : onSplit}
      >
        {showResult ? <span>edit</span> : <span>SPLIT BILL</span>}
      </button>
    </div>
  );
}
