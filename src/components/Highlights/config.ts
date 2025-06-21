import type { Highlight } from "../../Entities/Highlight";

export const HIGHLIGHTS_CONFIG: { key: keyof Highlight; desc: string }[] = [
  {
    key: "total_spend_galactic",
    desc: "общие расходы в галактических кредитах",
  },
  {
    key: "less_spent_civ",
    desc: "цивилизация с минимальными расходами",
  },
  {
    key: "rows_affected",
    desc: "количество обработанных записей",
  },
  {
    key: "big_spent_at",
    desc: "день года с максимальными расходами",
  },
  {
    key: "less_spent_at",
    desc: "день года с минимальными расходами",
  },
  {
    key: "big_spent_value",
    desc: "максимальная сумма расходов за день",
  },
  {
    key: "big_spent_civ",
    desc: "цивилизация с максимальными расходами",
  },
  {
    key: "average_spend_galactic",
    desc: "средние расходы в галактических кредитах",
  },
];
