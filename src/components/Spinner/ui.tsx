import styles from "./styles.module.css";

export function Spinner() {
  return <div className={styles.loader} role="status"></div>;
}
