# CLAUDE.md - Guidelines for Code in This Repository

## Build & Test Commands
- Development: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`
- Lint & Fix: `npm run lint:fix`
- Test: `npm run test`
- Single Test: `npm test -- -t "test name pattern"`
- Cypress: `npm run cypress`
- Single Cypress: `npm run cypress:run "path/to/spec.cy.ts"`

## Code Style Guidelines
- TypeScript with strict mode enabled
- ESLint with @skilbjo/eslint-config-rc, cypress, jest-dom plugins
- Format using named exports, not default exports
- Use functional components for React
- Path aliases: @/ for src/, @services/ for services, @test/ for tests
- Error handling: use TypeScript for type safety and explicit error handling
- Naming: camelCase for variables/functions, PascalCase for components/classes
- Angular-style commit messages (see commitlint config)
- Security: follow no-unsanitized/DOM and XSS prevention guidelines
- Tests: Jest for unit/integration, Cypress for E2E