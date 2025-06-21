import { Outlet } from "react-router-dom";
import styles from "./Base.module.css";

export default function Base() {
  return (
    <div className={styles.base}>
      <Outlet />
    </div>
  );
}
