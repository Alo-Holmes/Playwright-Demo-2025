import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { UserCredentials } from '../utils/auth.utils';

test.describe('Product and Cart Tests', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.goto();
    await loginPage.login(
      UserCredentials.STANDARD_USER.username,
      UserCredentials.STANDARD_USER.password
    );
  });

  test('should validate product sorting', async () => {
    await inventoryPage.selectSortOption('za');
    const products = await inventoryPage.getProductNames();
    expect([...products]).toEqual([...products].sort().reverse());

    await inventoryPage.selectSortOption('lohi');
    const prices = await inventoryPage.getProductPrices();
    expect([...prices]).toEqual([...prices].sort((a, b) => a - b));
  });

  test('should validate cart badge updates', async () => {
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await expect(inventoryPage.badge).toHaveText('1');

    await inventoryPage.addItemToCart('Sauce Labs Bike Light');
    await expect(inventoryPage.badge).toHaveText('2');

    await inventoryPage.navigateToCart();
    // Use inventoryPage's remove method if it supports the cart page layout too (it does since selectors are shared)
    await inventoryPage.removeItemFromCart('Sauce Labs Backpack');
    await expect(inventoryPage.badge).toHaveText('1');
  });

  test('should validate product details page', async ({ page }) => {
    await inventoryPage.openProductDetails('Sauce Labs Backpack');

    await expect(page).toHaveURL(/.*inventory-item.html/);
    await expect(page.locator('.inventory_details_name')).toContainText('Sauce Labs Backpack');

    await page.click('[data-test="back-to-products"]');
    await expect(page).toHaveURL(/.*inventory.html/);
  });
});
