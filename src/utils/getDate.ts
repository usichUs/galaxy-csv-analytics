const MONTHS = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

export function getDateByIndex(day: number) {
  const date = new Date(2025, 0);
  date.setDate(day);
  const month = MONTHS[date.getMonth()];
  return `${date.getDate()} ${month}`;
}
