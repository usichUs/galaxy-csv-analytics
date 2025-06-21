import { useRef, useState } from "react";
import styles from "./styles.module.css";

type DropZoneProps = {
  file: File | null;
  error: string | null;
  isLoading: boolean;
  onFileChange: (file: File) => void;
  getStatusText: () => string;
  children?: React.ReactNode;
};

export function DropZone({
  file,
  error,
  isLoading,
  onFileChange,
  getStatusText,
  children,
}: DropZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileChange(e.target.files[0]);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileChange(e.dataTransfer.files[0]);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div
      className={`${styles.uploader_input} ${
        dragActive ? styles.dragover : ""
      } ${error ? styles.error : file ? styles.downloaded : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className={styles.uploader_input_wrap}>
        <input
          type="file"
          id="file-upload"
          className={styles.input_file}
          accept=".csv"
          onChange={handleInputChange}
          disabled={isLoading}
          ref={inputRef}
        />
        {children}
      </div>
      <p className={error ? styles.error_text : ""}>{getStatusText()}</p>
    </div>
  );
}
