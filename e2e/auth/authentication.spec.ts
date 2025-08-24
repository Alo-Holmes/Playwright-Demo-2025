import { test, expect } from '@playwright/test';
import { login, UserCredentials } from '../utils/auth.utils';

test.describe('Authentication Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
    });

    test('should validate login page elements', async ({ page }) => {
        await expect(page.locator('[data-test="username"]')).toBeVisible();
        await expect(page.locator('[data-test="password"]')).toBeVisible();
        await expect(page.locator('[data-test="login-button"]')).toBeVisible();
        await expect(page.locator('.login_logo')).toHaveText('Swag Labs');
    });

    test('should show error for locked out user', async ({ page }) => {
        await login(page, UserCredentials.LOCKED_OUT_USER.username, UserCredentials.LOCKED_OUT_USER.password);
        await expect(page.locator('[data-test="error"]')).toContainText('Sorry, this user has been locked out');
    });

    test('should successfully login with standard user', async ({ page }) => {
        await login(page, UserCredentials.STANDARD_USER.username, UserCredentials.STANDARD_USER.password);
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });
});
