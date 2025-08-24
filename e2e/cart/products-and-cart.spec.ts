import { test, expect } from '@playwright/test';
import { login, UserCredentials } from '../utils/auth.utils';

test.describe('Product and Cart Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await login(page, UserCredentials.STANDARD_USER.username, UserCredentials.STANDARD_USER.password);
    });

    test('should validate product sorting', async ({ page }) => {
        await page.selectOption('[data-test="product_sort_container"]', 'za');
        let products = await page.locator('.inventory_item_name').allTextContents();
        expect([...products]).toEqual([...products].sort().reverse());

        await page.selectOption('[data-test="product_sort_container"]', 'lohi');
        let prices = await page.locator('.inventory_item_price').allTextContents();
        let priceNumbers = prices.map(p => parseFloat(p.replace('$', '')));
        expect([...priceNumbers]).toEqual([...priceNumbers].sort((a, b) => a - b));
    });

    test('should validate cart badge updates', async ({ page }) => {
        await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
        
        await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
        await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
        
        await page.click('.shopping_cart_link');
        await page.click('[data-test="remove-sauce-labs-backpack"]');
        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    });

    test('should validate product details page', async ({ page }) => {
        await page.click('.inventory_item_name:has-text("Sauce Labs Backpack")');
        
        await expect(page).toHaveURL(/.*inventory-item.html/);
        await expect(page.locator('.inventory_details_name')).toContainText('Sauce Labs Backpack');
        await expect(page.locator('.inventory_details_desc')).toBeTruthy();
        await expect(page.locator('.inventory_details_price')).toBeTruthy();
        
        await page.click('[data-test="back-to-products"]');
        await expect(page).toHaveURL(/.*inventory.html/);
    });
});
