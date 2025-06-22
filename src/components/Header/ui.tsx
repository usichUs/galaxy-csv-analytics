import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import Logo from "../../assets/Logo.svg";
import styles from "./styles.module.css";
import { Link, useLocation } from "react-router-dom";
import { MENU_ITEMS } from "./config";

export function Header() {
  const location = useLocation();

  return (
    <header className={styles.header}>
      <div className={styles.logo_div}>
        <img src={Logo} alt="Логотип" />
        <h2>Межгалактическая аналитика</h2>
      </div>
      <nav className={styles.nav_div}>
        {MENU_ITEMS.map((item) => (
          <Link
            to={item.path}
            className={location.pathname === item.path ? styles.active : ""}
            key={item.value}
          >
            <Icon width="32" icon={item.icon} />
            <p>{item.value}</p>
          </Link>
        ))}
      </nav>
    </header>
  );
}
