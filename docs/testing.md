# Testing Guide

This document outlines the testing infrastructure and best practices for the UCSD Casual Golf Club project.

## 🧪 Testing Stack

- **Vitest**: Unit and component testing
- **@testing-library/react**: React component testing utilities
- **Playwright**: End-to-end testing
- **jsdom**: DOM implementation for Node.js

## 📁 Test File Organization

```
src/
├── components/
│   └── Button/
│       ├── Button.tsx
│       └── __tests__/
│           └── Button.test.tsx
├── utils/
│   └── __tests__/
│       ├── formatDate.test.ts
│       └── concatClasses.test.ts
└── test/
    └── setup.ts

e2e/
├── homepage.spec.ts
├── contact.spec.ts
├── pages.spec.ts
└── accessibility.spec.ts
```

## 🚀 Running Tests

### Unit Tests

```bash
# Run all unit tests
pnpm test:unit

# Watch mode (re-run on file changes)
pnpm test:unit:watch

# UI mode (interactive test runner)
pnpm test:unit:ui

# Coverage report
pnpm test:unit:coverage
```

### End-to-End Tests

```bash
# Run all E2E tests
pnpm test:e2e

# UI mode (watch tests run in browser)
pnpm test:e2e:ui

# Debug mode (step through tests)
pnpm test:e2e:debug

# Generate test code (record interactions)
pnpm test:e2e:codegen
```

### Run All Tests

```bash
# Run both unit and E2E tests
pnpm test
```

## 📝 Writing Unit Tests

### Testing Utilities

```typescript
import { describe, expect, it } from "vitest";
import { formatDate } from "../formatDate";

describe("formatDate", () => {
  it("should format a valid date string correctly", () => {
    const date = "2024-03-15T10:30:00.000Z";
    const result = formatDate(date);
    expect(result).toBe("March 15, 2024");
  });

  it("should handle invalid date strings gracefully", () => {
    const result = formatDate("invalid-date");
    expect(result).toBe("Invalid Date");
  });
});
```

### Testing React Components

```typescript
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Button } from "../Button";

describe("Button", () => {
  it("should render with children text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument();
  });

  it("should handle click events", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    
    render(<Button onClick={handleClick}>Click me</Button>);
    
    await user.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Testing Forms

```typescript
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, beforeEach, vi } from "vitest";
import { ContactUsForm } from "../ContactUsForm";

describe("ContactUsForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  it("should submit form with valid data", async () => {
    const user = userEvent.setup();
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });
    global.fetch = mockFetch;

    render(<ContactUsForm />);

    await user.type(screen.getByLabelText(/name/i), "John Doe");
    await user.type(screen.getByLabelText(/email/i), "john@example.com");
    await user.click(screen.getByRole("button", { name: /send/i }));

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalled();
    });
  });
});
```

## 🎭 Writing E2E Tests

### Basic Page Test

```typescript
import { expect, test } from "@playwright/test";

test.describe("Homepage", () => {
  test("should load successfully", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/UCSD Casual Golf Club/i);
  });

  test("should display navigation menu", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: /about/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /contact/i })).toBeVisible();
  });
});
```

### Testing Forms

```typescript
test("should show validation errors", async ({ page }) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: /send message/i }).click();

  await expect(page.getByText(/name is required/i)).toBeVisible();
  await expect(page.getByText(/email is required/i)).toBeVisible();
});
```

### Testing Interactions

```typescript
test("should navigate between pages", async ({ page }) => {
  await page.goto("/");
  
  await page.getByRole("link", { name: /about/i }).click();
  await expect(page).toHaveURL(/\/about/);
  
  await page.getByRole("link", { name: /contact/i }).click();
  await expect(page).toHaveURL(/\/contact/);
});
```

## 🎯 What to Test

### Unit Tests - Test These:

✅ **Utility Functions**
- Pure functions (formatDate, concatClasses, etc.)
- Data transformations
- Validation logic

✅ **React Components**
- Rendering with different props
- User interactions (clicks, typing)
- Conditional rendering
- Component state changes

✅ **Business Logic**
- Form validation
- Data processing
- Error handling

❌ **Don't Unit Test These:**
- Contentful API calls (mock them)
- Third-party libraries
- Vanilla Extract styles

### E2E Tests - Test These:

✅ **Critical User Flows**
- Homepage loads
- Navigation works
- Contact form submission
- Roster/Results display

✅ **Accessibility**
- Keyboard navigation
- Screen reader compatibility
- ARIA labels

✅ **Responsive Design**
- Mobile menu
- Touch interactions
- Viewport changes

❌ **Don't E2E Test These:**
- Individual component props
- Edge cases (use unit tests)
- Backend logic

## 🔧 Configuration

### Vitest Setup (`vitest.config.ts`)

```typescript
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    exclude: ["node_modules", "dist", ".astro", "e2e/**"],
  },
});
```

### Playwright Setup (`playwright.config.ts`)

```typescript
export default defineConfig({
  testDir: "./e2e",
  use: {
    baseURL: "http://localhost:4321",
  },
  webServer: {
    command: "pnpm start",
    url: "http://localhost:4321",
    reuseExistingServer: !process.env.CI,
  },
});
```

## 🎨 Testing Best Practices

### 1. Test User Behavior, Not Implementation

❌ **Bad:**
```typescript
expect(component.state.isOpen).toBe(true);
```

✅ **Good:**
```typescript
expect(screen.getByRole("dialog")).toBeVisible();
```

### 2. Use Semantic Queries

Priority order:
1. `getByRole` (most accessible)
2. `getByLabelText` (forms)
3. `getByPlaceholderText`
4. `getByText`
5. `getByTestId` (last resort)

### 3. Avoid Testing Implementation Details

❌ **Bad:**
```typescript
expect(component.props.onClick).toHaveBeenCalled();
```

✅ **Good:**
```typescript
await user.click(button);
expect(screen.getByText("Success!")).toBeInTheDocument();
```

### 4. Mock External Dependencies

```typescript
vi.mock("astro:actions", () => ({
  actions: {
    getCaptchaConfig: vi.fn().mockResolvedValue({ data: { SITE_KEY: "test" } }),
  },
}));
```

### 5. Clean Up After Tests

```typescript
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});
```

## 📊 Coverage Goals

Target coverage levels:
- **Statements**: 80%+
- **Branches**: 75%+
- **Functions**: 80%+
- **Lines**: 80%+

Priority coverage areas:
1. Contact form (critical business logic)
2. Utility functions (high reuse)
3. Interactive components (Button, Link)
4. Form validation

Lower priority:
- Presentational components (Typography, Hero)
- Layout components
- Style-only components

## 🚦 CI/CD Integration

Tests run automatically on:
- Pull requests
- Commits to main branch
- Pre-deployment

See `.github/workflows/ci.yml` for CI configuration.

## 🐛 Debugging Tests

### Vitest Debugging

```bash
# Run tests in UI mode
pnpm test:unit:ui

# Run specific test file
pnpm vitest src/utils/__tests__/formatDate.test.ts

# Debug in VS Code
# Add breakpoint and run "Debug Current Test File"
```

### Playwright Debugging

```bash
# Run in debug mode (step through)
pnpm test:e2e:debug

# Run in headed mode (see browser)
pnpm playwright test --headed

# Run specific test
pnpm playwright test e2e/contact.spec.ts
```

## 📚 Additional Resources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Playwright Documentation](https://playwright.dev/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## 🤝 Contributing Tests

When adding new features:
1. Write tests first (TDD) or alongside code
2. Ensure existing tests pass
3. Add E2E tests for critical flows
4. Update this documentation if needed

Example test checklist for new components:
- [ ] Renders correctly with default props
- [ ] Handles all prop variations
- [ ] User interactions work
- [ ] Error states display
- [ ] Accessibility (keyboard, screen readers)
- [ ] Edge cases covered
