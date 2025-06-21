import styles from "./styles.module.css";

type LoaderProps = {
  progress?: number;
};

export function Loader({ progress = 0 }: LoaderProps) {
  const radius = 20;
  const stroke = 4;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg
      className={styles.loader}
      height={radius * 2}
      width={radius * 2}
      style={{ transform: "rotate(-90deg)" }}
    >
      <circle
        stroke="#eee"
        fill="none"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke="#2AE881"
        fill="none"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        style={{ transition: "stroke-dashoffset 0.3s linear" }}
      />
    </svg>
  );
}
