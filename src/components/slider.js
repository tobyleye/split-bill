import {
  SliderInput,
  SliderTrack,
  SliderRange,
  SliderHandle,
} from "@reach/slider";
import "@reach/slider/styles.css";
import { FaUserFriends } from "react-icons/fa";

export function PersonSlider({ value, onChange }) {
  return (
    <div className="custom-slider">
      <div>
        <SliderInput
          className="slider-input"
          onChange={onChange}
          value={value}
          min={2}
          max={20}
          step={1}
        >
          <SliderTrack className="slider-track">
            <SliderRange className="slider-range" />
            <SliderHandle className="slider-handle" />
            <div className="slider-body">
              <FaUserFriends className="icon" />
              <span className="value">{value}</span>
            </div>
          </SliderTrack>
        </SliderInput>
      </div>
    </div>
  );
}
