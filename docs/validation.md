# Validation record

Date: 2026-11-22 (Asia/Shanghai).

## Local verification

- JavaScript syntax check: passed.
- Playwright Chromium: 15 browser checks passed. Checks cover the project-site entry path; overflow at 320, 768, 1280 and 1440px with project details open; keyboard access and independent native disclosures; active navigation and header offsets; clipboard success and permission failure; use without JavaScript; reduced motion; local resources and anchors; and core publication/project facts.
- axe-core WCAG 2 A/AA and 2.1 AA scans: no detected violations at 390px and 1440px with all project details open. Automated checks do not establish full accessibility conformance.
- Screenshots reviewed at desktop and mobile sizes. A mobile line-break spacing issue was found during visual inspection and corrected before release.
- Public website is approximately 55 KB uncompressed across its six files, with no external fonts, images, analytics or runtime dependencies. This is an asset-size observation, not a measured loading-time benchmark.
- Source profile is Git-ignored; no personal proficiency ratings appear on the website. Future work is explicitly marked not implemented.

## Evidence

- [Desktop opening view](evidence/desktop.png), 1440 × 1000.
- [Mobile opening view](evidence/mobile.png), 390 × 844.
- Full-page and expanded-project screenshots remain local in `.artifacts/screenshots/`.

## Publication checks

The IEEE URL is explicitly supplied by the owner and matches Crossref's registered primary URL for DOI 10.1109/BDAI66031.2025.11325235. Automated access to the IEEE page was restricted during planning. The title, author order and link association were verified through Crossref; independent access to the IEEE article text was not verified.

Deployment and online verification: pending.

## Limits

The project performance figures are reproduced from the supplied profile, not independently benchmarked. No server-side contact form is provided: the contact section uses an email link with progressive clipboard enhancement. Real email delivery is outside the browser checks. No personal reflection or conclusions are generated.

Scope: Version 1 only.
