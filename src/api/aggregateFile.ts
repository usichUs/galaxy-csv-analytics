import type { Highlight } from "../Entities/Highlight";

type AggregateFileProps = {
  file: File;
  rows: string;
  onChunk?: (highlight: Highlight) => void;
  onProgress?: (percent: number) => void;
};

export async function aggregateFile({
  file,
  rows,
  onChunk,
  onProgress,
}: AggregateFileProps) {
  const formData = new FormData();
  formData.append("file", file);

  const query = new URLSearchParams({ rows }).toString();

  const textSample = await file.slice(0, 5_000_000).text();
  const sampleRows = textSample.split("\n").length;
  const estimatedTotalRows =
    file.size > 5_000_000
      ? Math.round((sampleRows / textSample.length) * file.size)
      : sampleRows;
  const rowsPerChunk = Number(rows);
  const expectedChunks = Math.max(
    1,
    Math.ceil(estimatedTotalRows / rowsPerChunk)
  );

  let receivedChunks = 0;

  const response = await fetch(`http://localhost:3000/aggregate?${query}`, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) throw new Error("Ошибка агрегации");

  const reader = response.body?.getReader();
  let result = "";
  const highlights: Highlight[] = [];

  while (reader) {
    const { done, value } = await reader.read();
    if (done) break;
    result += new TextDecoder().decode(value);

    const lines = result.split("\n");
    result = lines.pop() || "";

    for (const line of lines) {
      if (line.trim()) {
        const highlight: Highlight = JSON.parse(line);
        highlights.push(highlight);
        receivedChunks++;
        if (onChunk) onChunk(highlight);
        if (onProgress && expectedChunks) {
          onProgress(
            Math.min(100, Math.round((receivedChunks / expectedChunks) * 100))
          );
        }
      }
    }
  }

  if (result.trim()) {
    const highlight: Highlight = JSON.parse(result);
    highlights.push(highlight);
    receivedChunks++;
    if (onChunk) onChunk(highlight);
    if (onProgress && expectedChunks) {
      onProgress(
        Math.min(100, Math.round((receivedChunks / expectedChunks) * 100))
      );
    }
  }

  if (onProgress) onProgress(100);

  return highlights;
}
