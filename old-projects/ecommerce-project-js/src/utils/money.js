
export function formatMoney(cents){
  const amount = (cents > 0 ? cents : -1 * cents);
  return `$${(amount/ 100).toFixed(2)}`;
}