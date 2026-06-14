import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { UserCredentials } from '../utils/auth.utils';

test.describe('Authentication Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('should validate login page elements', async () => {
    await expect(loginPage.usernameField).toBeVisible();
    await expect(loginPage.passwordField).toBeVisible();
    await expect(loginPage.loginBtn).toBeVisible();
    await expect(loginPage.logo).toHaveText('Swag Labs');
  });

  test('should show error for locked out user', async () => {
    await loginPage.login(
      UserCredentials.LOCKED_OUT_USER.username,
      UserCredentials.LOCKED_OUT_USER.password
    );
    await expect(loginPage.error).toContainText('Sorry, this user has been locked out');
  });

  test('should successfully login with standard user', async ({ page }) => {
    await loginPage.login(
      UserCredentials.STANDARD_USER.username,
      UserCredentials.STANDARD_USER.password
    );
    await expect(page).toHaveURL(/.*inventory.html/);
  });
});
