import { FaCheck } from "react-icons/fa";

export function TipSelect({ value, onChange }) {
  return (
    <div className="tips">
      {[0, 10, 20, 30].map((tip) => (
        <div key={tip}>
          <RadioInput
            checked={tip === value}
            value={tip}
            onChange={(value) => onChange(value)}
          />
        </div>
      ))}
    </div>
  );
}

let RadioInput = ({ value, checked, onChange }) => {
  return (
    <label className="tips-radio-input">
      <input
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        name="tip"
        type="radio"
        checked={checked}
      />
      <span>
        {value}%
        <span className="check-icon">
          <FaCheck />
        </span>
      </span>
    </label>
  );
};
