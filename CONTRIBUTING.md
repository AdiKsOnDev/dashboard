# Contributing Guidelines

## Commit Scopes

This project uses the following commit scopes:

- `deps` - Dependency changes (package.json, package-lock.json)
- `config` - Configuration files (components.json, lib/utils.ts)
- `types` - TypeScript type definitions
- `ui` - UI components (shadcn/ui components)
- `theme` - Theme system (dark/light mode)
- `nav` - Navigation components (sidebar, mobile nav)
- `layout` - Layout and global styles
- `pages` - Page components (overview, projects, experience, blog, contact)
- `docs` - Documentation updates

## Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Formatting
- `refactor` - Code change (no feature/fix)
- `perf` - Performance improvement
- `test` - Tests
- `build` - Build system
- `ci` - CI configuration
- `chore` - Other changes
