# GEMINI.md

## Project Context

This is a Playwright-based E2E test suite using the Page Object Model (POM) architecture.

## Architectural Rules

1. **Page Object Model (POM):** All UI interactions are encapsulated in Page Object classes located in `e2e/pages/`.
2. **Base URL:** Always use relative paths in `page.goto()`. The base URL is configured in `playwright.config.ts`.
3. **Locators:** Use stable `data-test` attributes mapped within Page Objects.
4. **Clean Code:**
   - Test files are organized by feature in `e2e/`.
   - No direct `page.locator()` calls should exist in spec files.
   - Test data is managed in `e2e/utils/`.

## Development Workflow

- `npm run lint`: Check code style.
- `npm run format`: Automatically format code.
- `npm test`: Run all tests.

## Completed Phases

- Phase 1: Foundation & Standardization
- Phase 2: Architectural Refactoring (POM)
- Phase 3: Cleanup & Test Consolidation
- Phase 4: Pipeline & Telemetry Optimization
