import { describe, expect, it } from "vitest";
import { getStatusText } from "../getStatusText";

describe("getStatusText Utility", () => {
  it("returns error message when error is present", () => {
    const result = getStatusText({
      error: "Ошибка загрузки",
      isLoading: false,
      isSuccess: false,
      file: null,
    });
    expect(result).toBe("упс, не то...");
  });

  it("returns loading message when loading is in progress", () => {
    const result = getStatusText({
      error: null,
      isLoading: true,
      isSuccess: false,
      file: null,
    });
    expect(result).toBe("идёт парсинг файла");
  });

  it("returns success message when upload is successful", () => {
    const result = getStatusText({
      error: null,
      isLoading: false,
      isSuccess: true,
      file: null,
    });
    expect(result).toBe("готово!");
  });

  it("returns file uploaded message when file is present", () => {
    const result = getStatusText({
      error: null,
      isLoading: false,
      isSuccess: false,
      file: new File(["content"], "test.csv"),
    });
    expect(result).toBe("файл загружен!");
  });

  it("returns default message when no file is selected", () => {
    const result = getStatusText({
      error: null,
      isLoading: false,
      isSuccess: false,
      file: null,
    });
    expect(result).toBe("или перетащите сюда");
  });
});
