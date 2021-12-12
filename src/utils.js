export let toFixed = (num, decimalPlaces) =>
  typeof num === "number" ? Number(num.toFixed(decimalPlaces)) : num;
