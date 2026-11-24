# Cypress Tests

End-to-end tests for the marketing site.

## Test Structure

- `navigation.cy.ts`: Home page structure — nav, footer, headings, images, CTA.
- `spec.cy.ts`: Smoke test that the site loads.

## Running the Tests

To run the tests in headless mode:

```bash
npm run cypress:run
```

To open the Cypress Test Runner for interactive testing:

```bash
npm run cypress:open
```

## Test Environment

The tests require a local development server running at `http://localhost:3000`.
`npm run cypress` starts one for you and tears it down afterwards.

## Adding New Tests

1. Group related tests in the same file.
2. Use descriptive test names that clearly indicate what is being tested.
3. Update this README if you add new test files.

Specs for the removed saas flows (stripe webhooks, subscriptions, api keys,
supabase auth, the dashboard) are preserved at the `saas-v1` tag — see the
root README.
