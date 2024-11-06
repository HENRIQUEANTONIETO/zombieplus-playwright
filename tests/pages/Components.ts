import { expect, Page } from "@playwright/test";

export class Toast {
    page: Page
    constructor(page: Page) {
        this.page = page
    }

    async containText(message: string) {
        const toast = this.page.locator('.toast');
        await expect(toast).toContainText(message);

        await expect(toast).not.toBeVisible({ timeout: 5000 })
    }
}