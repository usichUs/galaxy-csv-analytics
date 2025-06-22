import type { Highlight } from "../../../Entities/Highlight";
import { formatHighlightValue } from "../../../utils/formatHighlightValue";
import { HIGHLIGHTS_CONFIG } from "../config";
import styles from "./styles.module.css";

export function ModalHighlights({ highlights }: { highlights: Highlight }) {
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
