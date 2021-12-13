export function Screen({ totalPrice, totalPersons, tipPercent, tipAmount }) {
  return (
    <ScreenBG>
      <div className="total-price">
        <p>Total</p>
        <p>${totalPrice}</p>
      </div>

      <div className="info">
        <div>
          <span>Bill</span>
          <span>${totalPrice}</span>
        </div>
        <div>
          <span>Friends</span>
          <span>{totalPersons}</span>
        </div>
        <div>
          <span>Tip({tipPercent}%)</span>
          <span>${tipAmount}</span>
        </div>
      </div>
    </ScreenBG>
  );
}

//  screen background
const ScreenBG = ({ children }) => {
  return (
    <div className="screen">
      <div className="screen-bg">
        <div className="screen-bg-shape screen-bg-shape-1" />
        <div className="screen-bg-shape screen-bg-shape-2" />
      </div>
      <div className="screen-content">{children}</div>
    </div>
  );
};
