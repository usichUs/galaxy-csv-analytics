import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import Logo from "../../assets/Logo.svg";
import styles from "./styles.module.css";
import { Link, useLocation } from "react-router-dom";

export function Header() {
  const location = useLocation();

  return (
    <header className={styles.header}>
      <div className={styles.logo_div}>
        <img src={Logo} alt="Логотип" />
        <h2>Межгалактическая аналитика</h2>
      </div>
      <nav className={styles.nav_div}>
        <Link to="/" className={location.pathname === "/" ? styles.active : ""}>
          <Icon width="32" icon="mage:upload" />
          <p>CSV Аналитик</p>
        </Link>
        <Link
          to="/generate-csv"
          className={location.pathname === "/generate-csv" ? styles.active : ""}
        >
          <Icon width="32" icon="oui:ml-create-multi-metric-job" />
          <p>CSV Генератор</p>
        </Link>
        <Link
          to="/history"
          className={location.pathname === "/history" ? styles.active : ""}
        >
          <Icon width="32" icon="solar:history-linear" />
          <p>История</p>
        </Link>
      </nav>
    </header>
  );
}
// 40(left) - 20(right) - 80(bottom) - 40(top)
