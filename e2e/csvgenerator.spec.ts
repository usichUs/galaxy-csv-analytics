import { test, expect } from "@playwright/test";

test.describe("CSVGenerator Component", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/generate-csv");
  });

  test("should complete full generation flow successfully", async ({
    page,
  }) => {
    await page.route("**/report?*", async (route) => {
      const url = new URL(route.request().url());
      expect(url.searchParams.get("size")).toBe("0.01");
      expect(url.searchParams.get("withErrors")).toBe("on");
      expect(url.searchParams.get("maxSpend")).toBe("1000");

      await new Promise((resolve) => setTimeout(resolve, 500));

      const csvData =
        "id,civ,developer_id,date,spend\n4,humans,4982866877162,314,972\n18,blobs,6768375664145,240,757";
      const buffer = Buffer.from(csvData, "utf-8");

      await route.fulfill({
        status: 200,
        contentType: "text/csv",
        headers: {
          "Content-Disposition": 'attachment; filename="report.csv"',
        },
        body: buffer,
      });
    });

    const generateButton = page.locator("button:has-text('Начать генерацию')");
    await expect(generateButton).toBeVisible();

    await generateButton.click();

    await expect(page.locator("text=идет процесс генерации")).toBeVisible();
    await expect(page.locator("[role='status']")).toBeVisible();

    await expect(page.locator("text=Done!")).toBeVisible();
    await expect(page.locator("text=файл сгенерирован")).toBeVisible();

    const cancelButton = page.getByTestId("cancel-button");
    await expect(cancelButton).toBeVisible();

    await cancelButton.click();
    await expect(generateButton).toBeVisible();
  });

  test("should display error message on generation failure", async ({
    page,
  }) => {
    await page.route("**/report?*", async (route) => {
      const url = new URL(route.request().url());
      expect(url.searchParams.get("size")).toBe("0.01");
      expect(url.searchParams.get("withErrors")).toBe("on");
      expect(url.searchParams.get("maxSpend")).toBe("1000");

      await new Promise((resolve) => setTimeout(resolve, 500));

      await route.fulfill({
        status: 500,
        body: "Internal Server Error",
      });
    });

    const generateButton = page.locator("button:has-text('Начать генерацию')");
    await generateButton.click();

    await expect(page.locator("text=идет процесс генерации")).toBeVisible();

    await expect(page.locator("text=Ошибка")).toBeVisible();
    await expect(page.locator("text=упс, не то...")).toBeVisible();

    const cancelButton = page.getByTestId("cancel-button");
    await expect(cancelButton).toBeVisible();

    await cancelButton.click();
    await expect(generateButton).toBeVisible();
  });
});
