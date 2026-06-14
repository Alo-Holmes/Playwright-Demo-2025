import { Locator, Page } from '@playwright/test';

export class InventoryPage {
  private readonly page: Page;
  private readonly sortContainer: Locator;
  private readonly cartBadge: Locator;
  private readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sortContainer = page.locator('[data-test="product-sort-container"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  async addItemToCart(itemName: string) {
    const dataTestName = itemName.toLowerCase().replace(/ /g, '-');
    await this.page.locator(`[data-test="add-to-cart-${dataTestName}"]`).click();
  }

  async removeItemFromCart(itemName: string) {
    const dataTestName = itemName.toLowerCase().replace(/ /g, '-');
    await this.page.locator(`[data-test="remove-${dataTestName}"]`).click();
  }

  async selectSortOption(option: string) {
    await this.sortContainer.selectOption(option);
  }

  async getProductNames() {
    return this.page.locator('[data-test="inventory-item-name"]').allTextContents();
  }

  async getProductPrices() {
    const prices = await this.page.locator('[data-test="inventory-item-price"]').allTextContents();
    return prices.map((p) => parseFloat(p.replace('$', '')));
  }

  async getCartBadgeCount() {
    return this.cartBadge.textContent();
  }

  async navigateToCart() {
    await this.cartLink.click();
  }

  async openProductDetails(itemName: string) {
    await this.page.locator('.inventory_item_name', { hasText: itemName }).click();
  }

  get badge() {
    return this.cartBadge;
  }
}
