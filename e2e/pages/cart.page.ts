import { Locator, Page } from '@playwright/test';

export class CartPage {
  private readonly page: Page;
  private readonly cartItems: Locator;
  private readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('[data-test="inventory-item"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async removeItem(itemName: string) {
    const dataTestName = itemName.toLowerCase().replace(/ /g, '-');
    await this.page.locator(`[data-test="remove-${dataTestName}"]`).click();
  }

  async getCartItemsCount() {
    return this.cartItems.count();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  get items() {
    return this.cartItems;
  }
}
