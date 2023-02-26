import { Page } from '@playwright/test';

export async function enterElementText(page: Page, locator: string, text: string): Promise<void> {
    await page.waitForSelector(locator);
    expect(await page.isVisible(locator)).toBe(true);
    await page.fill(locator, text);
}

export async function clickOnElement(page: Page, locator: string): Promise<void> {
    (await page.waitForSelector(locator)).isVisible();
    await page.click(locator);
}

export async function verifyElementText(page: Page, locator: string, expectedText: string): Promise<void> {
    await page.waitForSelector(locator);
    const eleText = await page.textContent(locator);
    console.log(' get text :: ' + eleText);
    if (eleText != null) {
        expect(eleText).toContain(expectedText);
    }
}

export async function selectOptionFromDropdown(page: Page, locator: string, option: string): Promise<void> {
    const selectDropDownLocator = await page.$(locator);
    selectDropDownLocator?.selectOption(option);
}
