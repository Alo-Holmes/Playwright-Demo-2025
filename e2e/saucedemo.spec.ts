import { test, expect } from '@playwright/test';

test.describe('Sauce Demo Tests', () => {
  // Before each test, navigate to the website
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  });

  // Basic Tests
  test('should validate login page elements', async ({ page }) => {
    // Check if main elements are visible
    await expect(page.locator('[data-test="username"]')).toBeVisible();
    await expect(page.locator('[data-test="password"]')).toBeVisible();
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
    
    // Verify the login logo
    await expect(page.locator('.login_logo')).toHaveText('Swag Labs');
  });

  test('should show error for locked out user', async ({ page }) => {
    await page.fill('[data-test="username"]', 'locked_out_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');
    
    await expect(page.locator('[data-test="error"]')).toContainText('Sorry, this user has been locked out');
  });

  test('should validate product sorting', async ({ page }) => {
    // Login first
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');
    
    // Test different sorting options
    await page.selectOption('[data-test="product_sort_container"]', 'za');
    let products = await page.locator('.inventory_item_name').allTextContents();
    expect([...products]).toEqual([...products].sort().reverse()); // Verify Z to A sorting
    
    await page.selectOption('[data-test="product_sort_container"]', 'lohi');
    let prices = await page.locator('.inventory_item_price').allTextContents();
    let priceNumbers = prices.map(p => parseFloat(p.replace('$', '')));
    expect([...priceNumbers]).toEqual([...priceNumbers].sort((a, b) => a - b)); // Verify price low to high
  });

  // Intermediate Tests
  test('should validate cart badge updates', async ({ page }) => {
    // Login
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');
    
    // Add multiple items and verify cart badge
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    
    await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
    
    // Remove item and verify badge updates
    await page.click('.shopping_cart_link');
    await page.click('[data-test="remove-sauce-labs-backpack"]');
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });

  test('should validate product details page', async ({ page }) => {
    // Login
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');
    
    // Click on a product to view details
    await page.click('.inventory_item_name:has-text("Sauce Labs Backpack")');
    
    // Validate product details page
    await expect(page).toHaveURL(/.*inventory-item.html/);
    await expect(page.locator('.inventory_details_name')).toContainText('Sauce Labs Backpack');
    await expect(page.locator('.inventory_details_desc')).toBeTruthy();
    await expect(page.locator('.inventory_details_price')).toBeTruthy();
    
    // Test back navigation
    await page.click('[data-test="back-to-products"]');
    await expect(page).toHaveURL(/.*inventory.html/);
  });

  test('should validate checkout form validation', async ({ page }) => {
    // Login and add item to cart
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');
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

  // End-to-End Test
  test('should complete full purchase flow', async ({ page }) => {
    // Navigate to the website
    await page.goto('https://www.saucedemo.com/');

    // Login with standard user
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');

    // Verify successful login
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    
    // Add backpack to cart
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    
    // Add bike light to cart
    await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
    
    // Navigate to cart
    await page.click('.shopping_cart_link');
    
    // Verify both items are in cart
    await expect(page.locator('.cart_item')).toHaveCount(2);
    
    // Remove bike light from cart
    await page.click('[data-test="remove-sauce-labs-bike-light"]');
    
    // Verify only one item remains
    await expect(page.locator('.cart_item')).toHaveCount(1);
    
    // Proceed to checkout
    await page.click('[data-test="checkout"]');
    
    // Fill in checkout information
    await page.fill('[data-test="firstName"]', 'John');
    await page.fill('[data-test="lastName"]', 'Doe');
    await page.fill('[data-test="postalCode"]', '12345');
    
    // Continue to checkout overview
    await page.click('[data-test="continue"]');
    
    // Complete purchase
    await page.click('[data-test="finish"]');
    
    // Verify successful purchase
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  });
});
