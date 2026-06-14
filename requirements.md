# Requirements

## Project Overview

This project is an E2E automation suite for the Sauce Demo application (https://www.saucedemo.com).

## Technical Stack

- **Framework:** Playwright Test
- **Language:** TypeScript
- **Architecture:** Page Object Model (POM)
- **CI/CD:** GitHub Actions

## Standards

- All tests must use Page Objects.
- Assertions should use Playwright's `expect` for web-first assertions.
- Environment-specific data (like `baseURL`) should be managed in `playwright.config.ts`.
- Code must pass linting and formatting checks before merging.
