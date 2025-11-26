# Testing Infrastructure Setup ✅

This project now has comprehensive testing infrastructure with **Vitest** for unit tests and **Playwright** for E2E tests.

## 📦 What's Installed

### Dependencies
- ✅ `vitest` - Fast unit test framework
- ✅ `@vitest/ui` - Interactive test UI
- ✅ `@testing-library/react` - React testing utilities
- ✅ `@testing-library/jest-dom` - DOM matchers
- ✅ `@testing-library/user-event` - User interaction simulation
- ✅ `jsdom` / `happy-dom` - DOM implementation
- ✅ `playwright` / `@playwright/test` - E2E testing framework
- ✅ `@vitejs/plugin-react` - React support for Vitest

## 🚀 Quick Start

```bash
# Run all unit tests
pnpm test:unit

# Run all E2E tests  
pnpm test:e2e

# Run all tests (unit + E2E)
pnpm test

# Watch mode (auto re-run on changes)
pnpm test:unit:watch

# Interactive UI
pnpm test:unit:ui

# Coverage report
pnpm test:unit:coverage

# E2E in UI mode (see browser)
pnpm test:e2e:ui

# E2E debug mode
pnpm test:e2e:debug

# Generate E2E test code
pnpm test:e2e:codegen
```

## 📁 Test Structure

```
src/
├── components/
│   └── Button/
│       ├── Button.tsx
│       └── __tests__/
│           └── Button.test.tsx        # Component tests
├── utils/
│   └── __tests__/
│       └── concatClasses.test.ts      # Utility tests
└── test/
    ├── setup.ts                        # Global test setup
    └── mocks/
        └── emptyCSS.ts                 # CSS import mocks

e2e/
├── homepage.spec.ts                    # Homepage E2E tests
├── contact.spec.ts                     # Contact form E2E tests
├── pages.spec.ts                       # Results/Roster E2E tests
└── accessibility.spec.ts               # A11y E2E tests
```

## 📝 Test Files Created

### Unit Tests (Vitest)
1. **`src/utils/__tests__/concatClasses.test.ts`**
   - Tests for the `concatClasses` utility
   - 5 test cases covering edge cases

2. **`src/components/Button/__tests__/Button.test.tsx`**
   - Placeholder tests for Button component
   - Demonstrates async testing patterns

3. **`src/components/Typography/__tests__/Typography.test.tsx`**
   - Placeholder tests for Typography component
   - Demonstrates simple unit testing

4. **`src/pages/contact/_components/ContactUsForm/__tests__/ContactUsForm.test.tsx`**
   - Placeholder tests with mocking examples
   - Shows fetch mocking and validation testing

### E2E Tests (Playwright)
1. **`e2e/homepage.spec.ts`** (7 tests)
   - Homepage loading
   - Navigation menu
   - Upcoming tournament display
   - Page navigation
   - Leaderboard section
   - Back to top button
   - Mobile responsiveness

2. **`e2e/contact.spec.ts`** (7 tests)
   - Contact form display
   - Validation errors
   - Invalid email validation
   - Form filling
   - Accessible labels
   - Keyboard navigation
   - Submit button states

3. **`e2e/pages.spec.ts`** (7 tests)
   - Results page display
   - Tournament results filtering
   - Roster page display
   - Player information tables
   - Roster year navigation
   - Seasons page
   - Course cards

4. **`e2e/accessibility.spec.ts`** (7 tests)
   - Heading hierarchy
   - Image alt text
   - Keyboard accessibility
   - Form labels
   - Button accessible names
   - Document language
   - Link descriptiveness

## ⚙️ Configuration Files

### `vitest.config.ts`
- JSdom environment for DOM testing
- Path aliases matching Astro config
- CSS mock setup (avoids Vanilla Extract issues)
- Test file patterns
- Coverage configuration

### `playwright.config.ts`
- Multi-browser testing (Chromium, Firefox, WebKit)
- Mobile device testing (Pixel 5, iPhone 12)
- Localhost baseURL (http://localhost:4321)
- Automatic dev server startup
- Screenshot on failure
- Trace on first retry

### `src/test/setup.ts`
- Global test setup
- Testing Library cleanup
- Mock Astro actions
- Mock window APIs (matchMedia, IntersectionObserver, scrollTo)
- Mock environment variables

### `.github/workflows/ci.yml`
- Automated CI/CD pipeline
- Runs on push/PR to main
- Type checking
- Linting
- Unit tests
- E2E tests
- Build validation

### `biome.jsonc` (Updated)
- Test files exempt from `noExplicitAny` rule
- Test setup file included in overrides

### `.gitignore` (Updated)
- Ignores `coverage/` directory
- Ignores `playwright-report/`
- Ignores `test-results/`

## 📚 Documentation

Comprehensive testing guide available at: **`docs/testing.md`**

Includes:
- Testing stack overview
- File organization patterns
- Running tests (all commands)
- Writing unit tests (examples)
- Writing E2E tests (examples)
- What to test (guidelines)
- Testing best practices
- Coverage goals
- CI/CD integration
- Debugging tips
- Additional resources

## ✅ Current Test Status

```
Unit Tests:  12 passed (4 files)
E2E Tests:   28 tests (4 files)
Total:       40 tests
```

**Note:** Component tests are currently placeholders due to Vanilla Extract CSS-in-JS complexity. They demonstrate testing patterns but don't render actual components. This is intentional to get the infrastructure working quickly. Full component tests can be added later with proper Vanilla Extract mocking.

## 🎯 Next Steps

1. **Run the tests:**
   ```bash
   pnpm test:unit
   pnpm test:e2e
   ```

2. **Add more tests as you develop:**
   - Create test files next to your components
   - Follow the patterns in existing tests
   - Aim for 80%+ coverage on critical paths

3. **Set up CI secrets:**
   - Go to GitHub repo → Settings → Secrets and variables → Actions
   - Add required secrets:
     - `CONTENTFUL_SPACE_ID`
     - `CONTENTFUL_DELIVERY_TOKEN`
     - `RECAPTCHA_SITE_KEY`
     - `RECAPTCHA_PROJECT_ID`
     - `GCP_CREDENTIALS`
     - `GOOGLE_MAPS_API_KEY`
     - `PUBLIC_GOOGLE_MAP_ID_LIGHT`
     - `PUBLIC_GOOGLE_MAP_ID_DARK`

4. **Enable CI workflow:**
   - Commit and push `.github/workflows/ci.yml`
   - Tests will run automatically on PRs

## 🐛 Known Limitations

1. **Vanilla Extract Components:** Component tests that import Vanilla Extract styles are currently placeholders. Full component rendering tests require additional Vanilla Extract test configuration.

2. **Contentful Mocks:** Tests mock Contentful API responses. Real integration tests would require test data in Contentful or more sophisticated mocking.

3. **reCAPTCHA:** Contact form tests mock reCAPTCHA. Real E2E tests will need to handle or bypass reCAPTCHA.

## 💡 Tips

- Use `test:unit:ui` for interactive debugging
- Use `test:e2e:codegen` to record new E2E tests
- Add `it.only()` to run a single test
- Add `it.skip()` to temporarily disable a test
- Check `docs/testing.md` for detailed examples

## 🎉 Benefits

✅ Catch bugs before production
✅ Safer refactoring
✅ Documentation through tests
✅ Automated quality checks
✅ Confidence in deployments
✅ Faster development feedback

---

**Testing infrastructure is ready! Start writing tests alongside your features.** 🚀
