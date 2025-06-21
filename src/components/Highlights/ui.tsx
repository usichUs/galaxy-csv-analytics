import { useUploaderStore } from "../../stores/useUploaderStore";
import { formatNumber } from "../../utils/formatNumber";
import { getDateByIndex } from "../../utils/getDate";
import { HIGHLIGHTS_CONFIG } from "./config";
import styles from "./styles.module.css";

export function Highlights() {
  const highlightsArr = useUploaderStore((s) => s.highlights);
  const highlights = highlightsArr.length
    ? highlightsArr[highlightsArr.length - 1]
    : null;

  if (!highlights) {
    return (
      <div className={styles.title_wrap}>
        <p>
          Здесь <br /> появятся хайлайты
        </p>
      </div>
    );
  }

  return (
    <div className={styles.highlights}>
      {HIGHLIGHTS_CONFIG.map(({ key, desc }) => (
        <div className={styles.highlight} key={key}>
          <p className={styles.highlight_value}>
            {highlights[key] !== undefined
              ? key === "big_spent_at" || key === "less_spent_at"
                ? getDateByIndex(Number(highlights[key]))
                : formatNumber(highlights[key])
              : "-"}
          </p>
          <p className={styles.highlight_desc}>{desc}</p>
        </div>
      ))}
    </div>
  );
}
