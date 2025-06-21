import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import styles from "./styles.module.css";
import { useHistoryStore } from "../../stores/useHistoryStore";
import { formatDate } from "../../utils/formatDate";
import { Link } from "react-router-dom";

export function HistoryList() {
  const { history, clearHistory, removeFromHistory } = useHistoryStore();
  return (
    <div className={styles.layout}>
      {Boolean(history.length) &&
        history.map((item) => (
          <div key={item.id} className={styles.history_wrapper}>
            <div className={styles.history}>
              <div className={styles.history_title}>
                <Icon width="32" icon="akar-icons:file" />
                <p>{item.fileName}</p>
              </div>
              <p className={styles.history_date}>{formatDate(item.date)}</p>
              <div
                className={`${styles.history_status} ${
                  item.status === "success" && styles.active
                }`}
              >
                <p>Обработан успешно</p>
                <Icon width="32" icon="ph:smiley" />
              </div>
              <div
                className={`${styles.history_status} ${
                  item.status === "error" && styles.active
                }`}
              >
                <p>Не удалось обработать</p>
                <Icon width="32" icon="ph:smiley-sad" />
              </div>
            </div>
            <div
              className={styles.history_delete}
              onClick={() => removeFromHistory(String(item.id))}
            >
              <Icon width="32" icon="ph:trash-fill" />
            </div>
          </div>
        ))}
      <div className={styles.buttons}>
        <Link to="/generate-csv">
          <p className={styles.generate_button}>Сгенерировать больше</p>
        </Link>
        <p className={styles.clear_all_button} onClick={clearHistory}>
          Очистить все
        </p>
      </div>
    </div>
  );
}
