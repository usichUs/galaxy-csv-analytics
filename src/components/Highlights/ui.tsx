import { useUploaderStore } from "../../stores/useUploaderStore";
import { formatHighlightValue } from "../../utils/formatHighlightValue";
import { HIGHLIGHTS_CONFIG } from "./config";
import styles from "./styles.module.css";

export function Highlights() {
  const highlightsArr = useUploaderStore((s) => s.highlights);
  const highlights = highlightsArr[highlightsArr.length - 1];

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
            {formatHighlightValue(key, highlights[key])}
          </p>
          <p className={styles.highlight_desc}>{desc}</p>
        </div>
      ))}
    </div>
  );
}
