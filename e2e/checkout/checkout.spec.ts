import { test, expect } from '@playwright/test';
import { login, UserCredentials } from '../utils/auth.utils';

test.describe('Checkout Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await login(page, UserCredentials.STANDARD_USER.username, UserCredentials.STANDARD_USER.password);
    });

    test('should validate checkout form validation', async ({ page }) => {
        await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
        await page.click('.shopping_cart_link');
        await page.click('[data-test="checkout"]');
        
        // Try to continue without filling form
        await page.click('[data-test="continue"]');
        await expect(page.locator('[data-test="error"]')).toBeVisible();
        
        // Fill only first name and try
        await page.fill('[data-test="firstName"]', 'John');
        await page.click('[data-test="continue"]');
        await expect(page.locator('[data-test="error"]')).toBeVisible();
        
        // Fill required fields and verify success
        await page.fill('[data-test="lastName"]', 'Doe');
        await page.fill('[data-test="postalCode"]', '12345');
        await page.click('[data-test="continue"]');
        await expect(page).toHaveURL(/.*checkout-step-two.html/);
    });

    test('should complete full purchase flow', async ({ page }) => {
        // Add items to cart
        await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
        await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
        
        // Navigate to cart
        await page.click('.shopping_cart_link');
        await expect(page.locator('.cart_item')).toHaveCount(2);
        
        // Remove bike light
        await page.click('[data-test="remove-sauce-labs-bike-light"]');
        await expect(page.locator('.cart_item')).toHaveCount(1);
        
        // Complete checkout
        await page.click('[data-test="checkout"]');
        await page.fill('[data-test="firstName"]', 'John');
        await page.fill('[data-test="lastName"]', 'Doe');
        await page.fill('[data-test="postalCode"]', '12345');
        await page.click('[data-test="continue"]');
        await page.click('[data-test="finish"]');
        
        // Verify successful purchase
        await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
    });
});
