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

- [Desktop opening view](evidence/desktop.png), 1440 × 1000, captured from the live HTTPS site.
- [Mobile opening view](evidence/mobile.png), 390 × 844, captured from the live HTTPS site.
- Full-page and expanded-project screenshots remain local in `.artifacts/screenshots/`.

## Publication checks

The IEEE URL is explicitly supplied by the owner and matches Crossref's registered primary URL for DOI 10.1109/BDAI66031.2025.11325235. Automated access to the IEEE page was restricted during planning. The title, author order and link association were verified through Crossref; independent access to the IEEE article text was not verified.

## Deployment and online verification

- Live Version 1: https://nanju-intelligencelab.github.io/personal-portfolio/ai-generated-page.html.
- Repository: https://github.com/NanJu-IntelligenceLab/personal-portfolio.
- Published source commit: `b571ce8ea570e3a2ce11f4dc8294b3c2895276ba`.
- Successful verification and deployment workflow: https://github.com/NanJu-IntelligenceLab/personal-portfolio/actions/runs/45002247087.
- The GitHub-hosted Linux runner passed all 15 browser checks before deployment; the same 15 checks subsequently passed against the live GitHub Pages URL.
- GitHub Pages uses workflow publishing with HTTPS enforced. The site root redirects to the Version 1 entry page.
- All six deployed files returned HTTP 200 and matched local files byte-for-byte by SHA-256: the entry page, root redirect, CSS, JavaScript, SVG mark and `.nojekyll`.
- The uploaded Pages artifact was downloaded and its archive listing inspected. It contains only those six public files; `profile.md`, development records, test dependencies and local tooling are absent.
- In addition to simulated clipboard success/failure in the automated suite, real clipboard write/read succeeded in a browser context granted clipboard permissions on the live HTTPS site.
- The first publication attempt passed browser verification but failed during artifact discovery. Updating the official workflow action releases was followed by the successful run linked above.

## Limits

The project performance figures are reproduced from the supplied profile, not independently benchmarked. No server-side contact form is provided: the contact section uses an email link with progressive clipboard enhancement. Real email delivery is outside the browser checks. No personal reflection or conclusions are generated.

Scope: Version 1 only.
