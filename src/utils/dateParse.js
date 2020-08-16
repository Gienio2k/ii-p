export default function dateParse(date) {
  return Number(date) < 10 ? "0" + date : date;
}
