import { Page } from '@playwright/test';

export async function login(page: Page, username: string, password: string) {
    await page.fill('[data-test="username"]', username);
    await page.fill('[data-test="password"]', password);
    await page.click('[data-test="login-button"]');
}

export const UserCredentials = {
    STANDARD_USER: {
        username: 'standard_user',
        password: 'secret_sauce'
    },
    LOCKED_OUT_USER: {
        username: 'locked_out_user',
        password: 'secret_sauce'
    }
};
