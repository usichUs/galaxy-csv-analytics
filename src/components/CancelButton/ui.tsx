import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import styles from "./styles.module.css";

export function CancelButton({ handleReset }: { handleReset: () => void }) {
  return (
    <button className={styles.cancel} onClick={handleReset}>
      <Icon width="32" icon="proicons:cancel" />
    </button>
  );
}
