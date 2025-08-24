# Playwright E2E Testing Demo 2025

This project demonstrates end-to-end testing capabilities using Playwright with TypeScript. It includes a comprehensive suite of tests for the Sauce Demo website (https://www.saucedemo.com/), showcasing various testing scenarios from basic to intermediate levels.

## Project Structure

```
e2e/
├── auth/
│   └── authentication.spec.ts    # Login and authentication tests
├── cart/
│   └── products-and-cart.spec.ts # Product and shopping cart tests
├── checkout/
│   └── checkout.spec.ts          # Checkout process tests
└── utils/
    └── auth.utils.ts             # Shared utilities and helper functions
```

## Features

- **Authentication Testing**: Validates login functionality with different user types
- **Product Catalog Testing**: Tests product sorting, filtering, and details
- **Shopping Cart Testing**: Verifies add/remove items and cart badge updates
- **Checkout Process Testing**: Ensures smooth checkout flow with form validation
- **GitHub Actions Integration**: Automated test execution on push and pull requests

## Prerequisites

- Node.js (LTS version)
- npm (Node Package Manager)
- Visual Studio Code (recommended)

## Setup

1. Clone the repository:
```bash
git clone https://github.com/Alo-Holmes/Playwright-Demo-2025.git
cd Playwright-Demo-2025
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

## Running Tests

### Run all tests:
```bash
npx playwright test
```

### Run specific test suites:
```bash
# Run authentication tests
npx playwright test e2e/auth/

# Run cart and product tests
npx playwright test e2e/cart/

# Run checkout tests
npx playwright test e2e/checkout/
```

### Run tests in UI mode:
```bash
npx playwright test --ui
```

### Run tests with headed browsers:
```bash
npx playwright test --headed
```

### View test report:
```bash
npx playwright show-report
```

## Test Categories

### Authentication Tests
- Login page element validation
- Standard user login
- Locked out user error handling
- Invalid credentials validation

### Product and Cart Tests
- Product sorting functionality
- Add/remove items from cart
- Cart badge updates
- Product details page validation

### Checkout Tests
- Checkout form validation
- Complete purchase flow
- Order confirmation

## CI/CD Integration

This project includes GitHub Actions workflow configuration for continuous integration. Tests are automatically run on:
- Push to main/master branch
- Pull requests to main/master branch

The workflow:
1. Sets up Node.js environment
2. Installs dependencies
3. Installs Playwright browsers
4. Runs all tests
5. Uploads test reports as artifacts

## Best Practices Demonstrated

- Page Object Pattern
- Reusable test utilities
- Modular test organization
- Clear test descriptions
- Proper error handling
- Clean and maintainable code structure

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
