import { formatMoney } from "../utils";

export function Screen({
  totalPrice,
  totalPersons,
  tipPercent,
  tipAmount,
  currency,
}) {
  return (
    <div className="screen">
      <div className="screen-shapes">
        <div className="screen-shape screen-shape-1" />
        <div className="screen-shape screen-shape-2" />
      </div>
      <div className="screen-content">
        <div className="bill-input">
          <p className="bill-input-label">Total</p>
          <div className="bill-input-value">
            <span>{currency}</span>
            {formatMoney(totalPrice)}
          </div>
        </div>

        <div className="screen-info">
          <div className="screen-info-list">
            <div>
              <span>Bill</span>
              <span>
                {currency}
                {formatMoney(totalPrice)}
              </span>
            </div>
            <div>
              <span>Friends</span>
              <span>{totalPersons}</span>
            </div>
            <div>
              <span>Tip({tipPercent}%)</span>
              <span>
                {currency}
                {formatMoney(tipAmount)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
