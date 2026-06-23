export const CURRENCY = "usd";
export const MIN_AMOUNT = 5;
export const MAX_AMOUNT = 50000;
export const AMOUNT_STEP = 1;

export function formatAmountForDisplay(amount: number, currency = CURRENCY) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    currencyDisplay: "symbol",
  }).format(amount);
}

export function formatAmountForStripe(amount: number, currency = CURRENCY) {
  const parts = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    currencyDisplay: "symbol",
  }).formatToParts(amount);

  const isZeroDecimal = !parts.some((part) => part.type === "decimal");
  return isZeroDecimal ? amount : Math.round(amount * 100);
}
