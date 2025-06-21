import { SubmitButton } from "../SubmitButton";
import styles from "./styles.module.css";
import { getReport } from "../../api/getReport";
import { Spinner } from "../Spinner";
import { useCSVGeneratorStore } from "../../stores/useCSVGeneratorStore";
import { CancelButton } from "../CancelButton";

export function CSVGenerator() {
  const {
    isLoading,
    setIsLoading,
    error,
    setError,
    isStarted,
    setIsStarted,
    isSuccess,
    setIsSuccess,
    reset,
  } = useCSVGeneratorStore();

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsStarted(true);
    setIsLoading(true);
    try {
      await getReport({
        size: "0.01",
        withErrors: "on",
        maxSpend: "1000",
      });
      setIsSuccess(true);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={styles.generator} onSubmit={handleGenerate}>
      <p>Сгенерируйте готовый csv-файл нажатием одной кнопки</p>
      {!isStarted ? (
        <SubmitButton text={"Начать генерацию"} isActive={true} />
      ) : (
        <>
          <div className={styles.generator_status_wrap}>
            <div
              className={`${styles.generator_status} ${
                isSuccess
                  ? styles.generator_status_success
                  : error
                  ? styles.generator_status_error
                  : styles.generator_status_loading
              }`}
            >
              {isLoading ? (
                <Spinner />
              ) : (
                <>
                  <p className={styles.status_message}>
                    {error ? "Ошибка" : "Done!"}
                  </p>
                </>
              )}
            </div>
            {!isLoading && <CancelButton handleReset={reset} />}
          </div>
          <p className={`${error && styles.status_message_error}`}>
            {isLoading
              ? "идет процесс генерации"
              : error
              ? "упс, не то..."
              : "файл сгенерирован"}
          </p>
        </>
      )}
    </form>
  );
}
