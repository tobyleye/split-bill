import {
  SliderInput,
  SliderTrack,
  SliderRange,
  SliderHandle
} from "@reach/slider";
import "@reach/slider/styles.css";
import { FaUserFriends } from "react-icons/fa";

export function PersonSlider({ value, onChange }) {
  return (
    <div
      style={{
        margin: "20px 0px"
      }}
    >
      <SliderInput
        style={{
          height: 38
        }}
        onChange={onChange}
        value={value}
        min={2}
        max={20}
        step={1}
      >
        <SliderTrack
          style={{
            borderRadius: 0,
            background: "#f1f1f1"
          }}
        >
          <SliderRange
            style={{
              background: "var(--color-green)"
            }}
          />
          <SliderHandle
            style={{
              height: 48,
              width: 8,
              borderRadius: 0,
              background: "var(--color-green-deep)"
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              width: "100%",
              display: 'flex',
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 20px",
            }}
          >
            <FaUserFriends style={{ fontSize: 20, color: "white" }} />
            <span style={{ fontSize: 20 }}>{value}</span>
          </div>
        </SliderTrack>
      </SliderInput>
    </div>
  );
}
