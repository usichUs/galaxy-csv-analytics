type getStatusTextProps = {
  error: string | null;
  isLoading: boolean;
  isSuccess: boolean;
  file: File | null;
};

export function getStatusText({
  error,
  isLoading,
  isSuccess,
  file,
}: getStatusTextProps): string {
  if (error) return "упс, не то...";
  if (isLoading) return "идёт парсинг файла";
  if (isSuccess) return "готово!";
  if (file) return "файл загружен!";
  return "или перетащите сюда";
}
