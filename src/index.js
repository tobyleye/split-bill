import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { TestGesture } from "./components/test_gesture"

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
    {/* <TestGesture /> */}
  </StrictMode>,
  rootElement 
);
