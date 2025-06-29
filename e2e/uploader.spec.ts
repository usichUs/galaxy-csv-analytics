import { test, expect } from "@playwright/test";

test.describe("Uploader Component", () => {
  test("should upload a valid CSV file and display progress", async ({
    page,
  }) => {
    await page.goto("/");

    const fileInput = await page.locator('input[type="file"]');
    const submitButton = await page.locator("text=Отправить");

    await fileInput.setInputFiles("./e2e/fixtures/input.csv");
    await expect(submitButton).toBeEnabled();

    await submitButton.click();

    const progressText = await page.locator("text=идёт парсинг файла");
    await expect(progressText).toBeVisible();
  });

  test("should display error for invalid file format", async ({ page }) => {
    await page.goto("/");

    const fileInput = await page.locator('input[type="file"]');

    await fileInput.setInputFiles("./e2e/fixtures/input.txt");
    const errorText = await page.locator("text=упс, не то...");
    await expect(errorText).toBeVisible();
  });

  test("should reset state on cancel button click", async ({ page }) => {
    await page.goto("/");

    const fileInput = await page.locator('input[type="file"]');
    const cancelButton = await page.locator(
      'button[data-testid="cancel-button"]'
    );

    await fileInput.setInputFiles("./e2e/fixtures/input.csv");

    await cancelButton.click();

    const fileNameText = await page.locator("text=Загрузить файл");
    await expect(fileNameText).toBeVisible();
  });
});
