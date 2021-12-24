export let toFixed = (num, decimalPlaces) =>
  typeof num === "number" ? Number(num.toFixed(decimalPlaces)) : num;

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export let formatMoney = (x) => numberWithCommas(toFixed(x, 2));
