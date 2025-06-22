import { useRef } from "react";
import { useUploaderStore } from "../../stores/useUploaderStore";
import { SubmitButton } from "../SubmitButton/ui";
import styles from "./styles.module.css";
import { Loader } from "../Loader/ui";
import { aggregateFile } from "../../api/aggregateFile";
import { DropZone } from "../DropZone";
import { getStatusText } from "../../utils/getStatusText";
import { CancelButton } from "../CancelButton/ui";
import { useHistoryStore } from "../../stores/useHistoryStore";

export function Uploader() {
  const {
    file,
    isLoading,
    error,
    isSuccess,
    progress,
    setFile,
    setIsLoading,
    setError,
    setIsSuccess,
    setHighlights,
    setProgress,
    reset,
  } = useUploaderStore();

  const inputRef = useRef<HTMLInputElement>(null);

  const { addToHistory } = useHistoryStore.getState();

  const handleFileChange = (file: File) => {
    setFile(file);
    setError("");
    setIsSuccess(false);
  };

  const handleReset = () => {
    reset();
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("Пожалуйста, выберите файл для загрузки.");
      return;
    }
    if (!file.name.endsWith("csv")) {
      setError("Недопустимый формат файла");
      return;
    }
    setIsLoading(true);
    setError("");
    setIsSuccess(false);
    setHighlights([]);

    try {
      const result = await aggregateFile({
        file,
        rows: "1000",
        onChunk: (highlight) => {
          setHighlights([...useUploaderStore.getState().highlights, highlight]);
        },
        onProgress: (percent) => {
          setProgress(percent);
        },
      });

      if (result.length) {
        addToHistory({
          id: Date.now(),
          date: new Date().toISOString(),
          highlights: result[result.length - 1],
          fileName: file.name,
          status: "success",
        });
      }

      setIsLoading(false);
      setIsSuccess(true);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        addToHistory({
          id: Date.now(),
          date: new Date().toISOString(),
          highlights: null,
          fileName: file?.name || "",
          status: "error",
        });
      } else {
        setError("Неизвестная ошибка");
      }
      setIsLoading(false);
      setIsSuccess(false);
    }
  };

  return (
    <form className={styles.uploader} onSubmit={handleSubmit}>
      <p className={styles.uploader_desc}>
        Загрузите <span>csv</span> файл и получите
        <span>полную информацию</span> о нём за сверхнизкое время
      </p>
      <DropZone
        file={file}
        error={error}
        isLoading={isLoading}
        onFileChange={handleFileChange}
        getStatusText={() =>
          getStatusText({ error, isLoading, isSuccess, file })
        }
      >
        <label
          htmlFor="file-upload"
          className={`${styles.upload_button} ${
            error
              ? styles.upload_button_error
              : isSuccess
              ? styles.upload_button_succes
              : file
              ? styles.upload_button_uploaded
              : ""
          }`}
        >
          {isLoading ? (
            <Loader progress={progress} />
          ) : error ? (
            file?.name
          ) : file ? (
            file.name
          ) : (
            "Загрузить файл"
          )}
        </label>
        {file && <CancelButton handleReset={handleReset} />}
      </DropZone>
      {!error && !isSuccess && !isLoading && (
        <SubmitButton text={"Отправить"} isActive={!!file && !isLoading} />
      )}
    </form>
  );
}
