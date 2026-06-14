import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';
import { UserCredentials } from '../utils/auth.utils';

test.describe('Checkout Tests', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await loginPage.goto();
    await loginPage.login(
      UserCredentials.STANDARD_USER.username,
      UserCredentials.STANDARD_USER.password
    );
  });

  test('should validate checkout form validation', async () => {
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.navigateToCart();
    await cartPage.proceedToCheckout();

    // Try to continue without filling form
    await checkoutPage.clickContinue();
    await expect(checkoutPage.error).toBeVisible();

    // Fill only first name and try
    await checkoutPage.fillInformation('John', '', '');
    await checkoutPage.clickContinue();
    await expect(checkoutPage.error).toBeVisible();

    // Fill required fields and verify success
    await checkoutPage.fillInformation('John', 'Doe', '12345');
    await checkoutPage.clickContinue();
    await expect(checkoutPage.header.page()).toHaveURL(/.*checkout-step-two.html/);
  });

  test('should complete full purchase flow', async () => {
    // Add items to cart
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.addItemToCart('Sauce Labs Bike Light');

    // Navigate to cart
    await inventoryPage.navigateToCart();
    await expect(cartPage.items).toHaveCount(2);

    // Remove bike light
    await cartPage.removeItem('Sauce Labs Bike Light');
    await expect(cartPage.items).toHaveCount(1);

    // Complete checkout
    await cartPage.proceedToCheckout();
    await checkoutPage.fillInformation('John', 'Doe', '12345');
    await checkoutPage.clickContinue();
    await checkoutPage.clickFinish();

    // Verify successful purchase
    await expect(checkoutPage.header).toHaveText('Thank you for your order!');
  });
});
