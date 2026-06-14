import { Locator, Page } from '@playwright/test';

export class LoginPage {
  private readonly page: Page;
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly loginLogo: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.loginLogo = page.locator('.login_logo');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async goto() {
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getLoginLogoText() {
    return this.loginLogo.textContent();
  }

  async getErrorMessageText() {
    return this.errorMessage.textContent();
  }

  async isErrorMessageVisible() {
    return this.errorMessage.isVisible();
  }

  // Getters for assertions if needed
  get logo() {
    return this.loginLogo;
  }
  get error() {
    return this.errorMessage;
  }
  get usernameField() {
    return this.usernameInput;
  }
  get passwordField() {
    return this.passwordInput;
  }
  get loginBtn() {
    return this.loginButton;
  }
}
