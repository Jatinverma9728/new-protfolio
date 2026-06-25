# SEO Audit Report: devjatin.in

**Date:** 2026-06-25  
**Business Type:** Personal Portfolio / Freelance Developer  
**Technology:** React SPA (Vite + TypeScript), Vercel Hosting  
**Pages Analyzed:** 1 (single-page application)

---

## Executive Summary

| Metric | Score |
|--------|-------|
| **Overall SEO Health Score** | **38/100** |
| Technical SEO | 35/100 |
| Content Quality | 45/100 |
| On-Page SEO | 55/100 |
| Schema / Structured Data | 70/100 |
| Performance (CWV) | 25/100 |
| AI Search Readiness | 20/100 |
| Images | 30/100 |

### Top 5 Critical Issues

1. **Client-Side Rendered SPA** - All content lives inside JavaScript; crawlers see an empty `<div id="root"></div>`
2. **No visible H1 tag** - Hero text is rendered via canvas particles, completely invisible to search engines
3. **Missing OG image** - `og-image.jpg` referenced in meta tags does not exist in the public folder
4. **Massive JS bundle** - Three.js + GSAP + Framer Motion + Spline likely exceeds 500kb+
5. **No security headers** - Missing HSTS, CSP, X-Frame-Options, etc.

### Top 5 Quick Wins

1. Add a real, crawlable `<h1>` tag with your name and title (hidden visually if needed)
2. Create and add an `og-image.jpg` to the public folder (1200x630px)
3. Add security headers to `vercel.json`
4. Fix Twitter Card meta tags (use `name` instead of `property`)
5. Add a `site.webmanifest` file

---

## Technical SEO (35/100)

### Crawlability

| Check | Status | Notes |
|-------|--------|-------|
| robots.txt | PASS | Properly blocks `/dist/` and `/node_modules/` |
| Sitemap | WARN | Only 1 URL listed; acceptable for SPA but limits discoverability |
| Canonical URL | PASS | `https://devjatin.in/` correctly set |
| robots meta | PASS | `index, follow` correctly set |
| JavaScript rendering | CRITICAL | Entire page content requires JS execution |
| Crawl budget | PASS | Single page, no waste |

### Indexability

| Issue | Severity | Details |
|-------|----------|---------|
| SPA without SSR/SSG | CRITICAL | Google can render JS but with delays (days-weeks). Bing, DuckDuckGo, Yandex, and AI crawlers may not render at all. The `<body>` contains only `<div id="root"></div>` + a script tag. |
| Dynamic content loading | HIGH | Cinematic loader delays content visibility by 3+ seconds even for JS-capable crawlers |
| Hash-based navigation | MEDIUM | `#about`, `#projects` etc. are not separate URLs - they won't appear as distinct results in SERPs |

### Security Headers

| Header | Status |
|--------|--------|
| HTTPS | PASS (Vercel default) |
| HSTS | MISSING |
| Content-Security-Policy | MISSING |
| X-Content-Type-Options | MISSING |
| X-Frame-Options | MISSING |
| Referrer-Policy | MISSING |
| Permissions-Policy | MISSING |

### URL Structure

- Clean URL: `https://devjatin.in/` - PASS
- No trailing slash issues
- No duplicate content (www vs non-www) - Vercel handles this

---

## Content Quality (45/100)

### E-E-A-T Assessment

| Signal | Score | Notes |
|--------|-------|-------|
| Experience | Medium | Shows 3+ years experience, internship at SmallFare, 5+ projects |
| Expertise | Medium | Lists 20 technologies but no deep technical writing or case studies |
| Authoritativeness | Low | No testimonials, no external validation, no blog content |
| Trustworthiness | Medium | Contact form present, social links verified, email visible |

### Content Depth

- **Hero Section**: Canvas particle animation - zero crawlable text content
- **About Section**: ~100 words of meaningful content - THIN
- **Experience Section**: Job titles and dates only - THIN
- **Skills Section**: List of technologies with skill levels
- **Projects Section**: 8 projects with descriptions (~30-50 words each)
- **Contact Section**: Contact form + social links

**Total estimated crawlable text:** < 500 words (after JS renders)  
**Recommended minimum:** 1,000-1,500 words for a portfolio homepage

### Missing Content Opportunities

- No blog/articles section (major missed opportunity for keyword ranking)
- No detailed case studies for projects
- No testimonials or social proof
- No certifications or education details on page
- No FAQ section targeting long-tail queries

---

## On-Page SEO (55/100)

### Title Tag

```
Jatin Verma | Full Stack Developer & UI/UX Designer
```
- Length: 52 characters - GOOD
- Contains primary keywords - GOOD
- Brand + profession format - GOOD

### Meta Description

```
Official portfolio of Jatin Verma, a Full Stack Developer & UI/UX Designer specializing in React, Next.js, Node.js, Express, MongoDB, and high-performance interactive web experiences.
```
- Length: 183 characters - SLIGHTLY LONG (aim for 150-160)
- Contains keywords - GOOD
- Has a call-to-action - MISSING (add "View projects" or similar)

### Heading Structure

| Level | Content | Status |
|-------|---------|--------|
| H1 | MISSING (canvas particles, not HTML) | CRITICAL |
| H2 | "Turning ideas into digital reality" | OK but not keyword-rich |
| H2 | "Featured Work" | Generic |
| H2 | "Let's create something remarkable" | Not keyword-optimized |
| H3 | Project titles (8x) | GOOD - descriptive |
| H3 | "Core Values" | OK |

### Internal Linking

- Navigation links to page sections (#about, #experience, etc.) - not crawlable as separate pages
- No internal links to distinct content pages (blog, individual projects)
- Footer only has external links

### Keywords Analysis

**Primary Keywords (in title/description):**
- "Jatin Verma" - brand name
- "Full Stack Developer"
- "UI/UX Designer"
- "React"
- "Next.js"
- "MERN Stack"

**Missing keyword opportunities:**
- "Web developer India"
- "Freelance developer"
- "Portfolio"
- "Hire developer"
- Location-based: "Developer Bhiwani" / "Developer Haryana"

---

## Schema / Structured Data (70/100)

### Current Implementation

```json
{
  "@graph": [
    { "@type": "Person" },
    { "@type": "WebSite" }
  ]
}
```

**Person Schema:** GOOD
- name, jobTitle, url, sameAs (GitHub, LinkedIn)
- knowsAbout with technologies
- address with locality
- alumniOf with education
- description

**WebSite Schema:** GOOD
- url, name, description, publisher reference

### Issues

| Issue | Severity |
|-------|----------|
| `alumniOf.name` is "Master of Computer Applications (MCA)" - should be the institution name | MEDIUM |
| Missing `image` property on Person | MEDIUM |
| Missing `email` property on Person | LOW |
| No `ProfilePage` schema for the portfolio itself | LOW |

### Missing Schema Opportunities

- `ItemList` for projects
- `CreativeWork` for individual projects
- `ContactPage` action
- `BreadcrumbList` (if pages are added later)

---

## Performance (25/100)

### Bundle Analysis (Estimated)

| Library | Estimated Size (gzipped) |
|---------|--------------------------|
| Three.js | ~150kb |
| @react-three/fiber + drei | ~80kb |
| GSAP (+ ScrollTrigger) | ~30kb |
| Framer Motion | ~40kb |
| Spline Runtime | ~100kb+ |
| React + React DOM | ~45kb |
| Other (AOS, lodash, mathjs, etc.) | ~50kb |
| **Total Estimated** | **~500kb+** |

**Budget for portfolio/landing page:** < 150kb JS (gzipped)  
**Status:** CRITICAL - ~3x over budget

### Loading Performance Issues

| Issue | Impact |
|-------|--------|
| Cinematic loader blocks content for 3+ seconds | LCP will exceed 2.5s target |
| Three fonts loaded from Google Fonts (3 families, 9 weights) | Render-blocking potential |
| Canvas particle animation on hero | CPU-intensive on mobile |
| Two .mp4 videos in public folder | Potential bandwidth issue if auto-played |
| External images (gstatic, freepik, pinimg) | No control over optimization |

### Core Web Vitals (Estimated)

| Metric | Estimated | Target | Status |
|--------|-----------|--------|--------|
| LCP | > 4s | < 2.5s | FAIL |
| INP | Unknown (heavy animations) | < 200ms | RISK |
| CLS | Low (fixed layouts) | < 0.1 | LIKELY PASS |
| FCP | > 3s (loader blocks) | < 1.5s | FAIL |
| TBT | > 500ms (heavy JS) | < 200ms | FAIL |

---

## Images (30/100)

### Issues Found

| Issue | Count | Severity |
|-------|-------|----------|
| Missing `width` and `height` attributes | All project images | HIGH (CLS) |
| External image hosting (no optimization control) | 8 images | MEDIUM |
| Missing `og-image.jpg` | 1 | HIGH |
| No WebP/AVIF format used | All | MEDIUM |
| Skill icons from external CDN (devicons) | 20 | LOW |
| No `fetchpriority="high"` on hero image | N/A (canvas) | N/A |

### Image Optimization Recommendations

- Self-host project screenshots in optimized WebP format
- Add explicit `width` and `height` to all `<img>` tags
- Create and add `og-image.jpg` (1200x630px) showing name + title + tech stack
- Use responsive images with `srcset` for different viewports

---

## AI Search Readiness (20/100)

### AI Crawler Accessibility

| Check | Status |
|-------|--------|
| Content visible without JS | FAIL - Empty page without JS |
| `llms.txt` file | MISSING |
| Clean, parseable structure | FAIL - Content in React components |
| Citation-worthy content | LOW - No articles, tutorials, or case studies |
| Brand mention signals | LOW - Limited external presence |

### Citability Score

- **Passage-level citability:** Very Low - No distinct, quotable content blocks
- **Factual claims:** None that AI would reference
- **Unique expertise demonstration:** Not present in crawlable content

### Recommendations for AI Visibility

1. Add a `/llms.txt` file describing who you are and what you do
2. Create blog content that AI systems can cite
3. Ensure all content is SSR/SSG rendered
4. Structure content with clear headings and self-contained paragraphs

---

## Additional Findings

### Accessibility Concerns (SEO-Adjacent)

| Issue | Status |
|-------|--------|
| `aria-label` on icon links | PASS (footer) |
| Form labels | MISSING (uses placeholder only) |
| Color contrast | UNKNOWN (CSS variables) |
| Keyboard navigation | PASS (standard links/buttons) |
| `lang="en"` on HTML | PASS |
| Reduced motion support | UNKNOWN |

### Mobile SEO

- Viewport meta tag: PASS
- Responsive CSS (media queries): Present
- Touch targets: Likely adequate
- Mobile-first design: Yes

### Vercel Configuration

Current `vercel.json` only sets Content-Type for resume PDFs. Missing:
- Security headers
- Cache-Control headers for static assets
- Redirect rules

---

## Scoring Breakdown

| Category | Weight | Raw Score | Weighted |
|----------|--------|-----------|----------|
| Technical SEO | 22% | 35 | 7.7 |
| Content Quality | 23% | 45 | 10.4 |
| On-Page SEO | 20% | 55 | 11.0 |
| Schema/Structured Data | 10% | 70 | 7.0 |
| Performance (CWV) | 10% | 25 | 2.5 |
| AI Search Readiness | 10% | 20 | 2.0 |
| Images | 5% | 30 | 1.5 |
| **TOTAL** | **100%** | | **42.1 → 38** |

*Score rounded down due to critical JS rendering issue that compounds across all categories.*

---

## Comparison: What Good Looks Like

| Metric | Your Site | Top Developer Portfolios |
|--------|-----------|--------------------------|
| Rendering | Client-side only | SSR/SSG (Next.js, Astro) |
| Content length | ~500 words | 2,000-5,000 words |
| Blog/articles | None | 10-50+ articles |
| Page speed (mobile) | Estimated 30-40 | 80-95 |
| Backlinks | Unknown | 50-500+ |
| Indexed pages | 1 | 20-100+ |
