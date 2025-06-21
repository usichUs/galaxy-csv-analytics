import styles from "./styles.module.css";

type SubmitButtonProps = {
  text: string;
  isActive: boolean;
};

export function SubmitButton({ text, isActive }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={!isActive}
      className={`${styles.submit_button} ${isActive ? styles.active : ""}`}
    >
      {text}
    </button>
  );
}
