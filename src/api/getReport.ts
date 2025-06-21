type getReport = {
  size: string;
  withErrors: string;
  maxSpend: string;
};

export async function getReport({ size, withErrors, maxSpend }: getReport) {
  const query = new URLSearchParams({ size, withErrors, maxSpend }).toString();
  const response = await fetch(`http://localhost:3000/report?${query}`);
  if (!response.ok) throw new Error("Ошибка генерации отчёта");
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "report.csv";
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
}
