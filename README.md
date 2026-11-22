# NanJu Wu — Personal portfolio

Version 1 of a personal webpage coursework experiment: an AI-generated portfolio developed with Codex after an interactive planning discussion.

**Website:** https://nanju-intelligencelab.github.io/personal-portfolio/ai-generated-page.html

Plain HTML, CSS and JavaScript. No runtime dependencies, remote fonts, trackers, backend or build step. GitHub Pages publishes only `site/`.

## Local preview

With Node.js 22 or later:

```sh
npm run dev
```

Open http://127.0.0.1:4173/personal-portfolio/ai-generated-page.html. The preview server also supports the repository subpath used in production.

## Verification

```sh
npm ci
npx playwright install chromium
npm run check
npm test
```

Development dependencies are used only for browser and accessibility checks. Tests cover layout, native disclosures, keyboard navigation, clipboard success and failure, reduced motion, no-JavaScript access, resource paths, core factual content and automated accessibility scans. The workflow runs these checks before deploying.

With the preview server running, `npm run capture` saves desktop and mobile opening views to `docs/evidence/` and full-page / expanded-project captures to the local, Git-ignored `.artifacts/screenshots/` directory.

To run the same checks against the deployed site, set `SITE_URL` to `https://nanju-intelligencelab.github.io/personal-portfolio/` before running `npm test`.

## Content and experiment records

- [Content baseline](docs/content-baseline.md): public facts and publication rules for reuse in Version 2.
- [Development log](docs/development-log.md): human decisions, AI decisions and technical workflow.
- [Validation record](docs/validation.md): actual checks, screenshots and remaining limitations.

The original `profile.md` remains local and is excluded from Git. Its approved public content is represented in the HTML and the content baseline. No personal reflection or conclusions are generated for the coursework report.

Version 2 is outside this implementation. Its future route is `me-designed-page.html`; that page is not created or advertised as available.
