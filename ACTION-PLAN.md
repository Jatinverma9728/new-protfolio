# SEO Action Plan: devjatin.in

**Generated:** 2026-06-25  
**Current Score:** 38/100  
**Target Score:** 70/100 (achievable in 4-6 weeks)

---

## CRITICAL (Fix Immediately)

### 1. Add Crawlable H1 and Text Content

**Problem:** The hero section uses a canvas-based particle animation for text. Search engines see NO text in the hero.

**Fix:**
```tsx
// In HeroSection.tsx, add a visually-hidden but crawlable H1:
<h1 className="sr-only">Jatin Verma - Full Stack Developer & UI/UX Designer</h1>
```

Add to your CSS:
```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

**Impact:** HIGH  
**Effort:** 10 minutes

---

### 2. Create the Missing OG Image

**Problem:** `og-image.jpg` is referenced in meta tags but doesn't exist. Social shares show a broken preview.

**Fix:**
- Create a 1200x630px image with: Your name, title, and a professional design
- Save as `public/og-image.jpg`

**Impact:** HIGH (social sharing, link previews)  
**Effort:** 30 minutes

---

### 3. Consider Migrating to Next.js or Adding Pre-rendering

**Problem:** This is the single most impactful issue. As a Vite SPA, your entire content is invisible to many crawlers.

**Options (pick one):**

| Option | Effort | SEO Impact | Recommendation |
|--------|--------|------------|----------------|
| **A) Migrate to Next.js** | High (1-2 weeks) | Maximum | Best long-term |
| **B) Add `vite-plugin-prerender`** | Low (1-2 hours) | Good | Quick fix |
| **C) Add `react-snap`** | Low (1-2 hours) | Good | Alternative quick fix |

**Recommended:** Option B for now, Option A when rebuilding:
```bash
npm install vite-plugin-prerender --save-dev
```

```ts
// vite.config.ts
import prerender from 'vite-plugin-prerender';

export default defineConfig({
  plugins: [
    react(),
    prerender({
      routes: ['/'],
    }),
  ],
});
```

**Impact:** CRITICAL  
**Effort:** 2 hours (Option B) or 1-2 weeks (Option A)

---

### 4. Fix the Cinematic Loader for SEO

**Problem:** Even if Google renders JS, your 3+ second loader delays content visibility, hurting LCP.

**Fix:** Make the loader not block content from being in the DOM:
```tsx
// Instead of conditionally rendering content:
{isLoading && <CinematicLoader />}
{/* Content always in DOM but visually hidden during load: */}
<main style={{ visibility: isLoading ? 'hidden' : 'visible' }}>
  ...
</main>
```

**Impact:** HIGH (LCP improvement)  
**Effort:** 30 minutes

---

## HIGH (Fix Within 1 Week)

### 5. Add Security Headers

Add to `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" },
        { "key": "Strict-Transport-Security", "value": "max-age=31536000; includeSubDomains" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" }
      ]
    }
  ]
}
```

**Impact:** MEDIUM (trust signals, security)  
**Effort:** 15 minutes

---

### 6. Fix Twitter Card Meta Tags

**Problem:** Twitter cards use `name` attribute, not `property`:
```html
<!-- Current (wrong) -->
<meta property="twitter:card" content="..." />

<!-- Correct -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:url" content="https://devjatin.in/" />
<meta name="twitter:title" content="..." />
<meta name="twitter:description" content="..." />
<meta name="twitter:image" content="..." />
```

**Impact:** MEDIUM  
**Effort:** 5 minutes

---

### 7. Add Width and Height to All Images

**Problem:** Project images lack dimensions, causing CLS (Cumulative Layout Shift).

**Fix:** In `ProjectsSection.tsx`:
```tsx
<img
  src={project.image}
  alt={project.title}
  loading="lazy"
  decoding="async"
  width={600}
  height={400}
/>
```

**Impact:** MEDIUM (CLS improvement)  
**Effort:** 15 minutes

---

### 8. Self-Host Project Images

**Problem:** External images (freepik, gstatic, pinimg) can be slow, unavailable, or unoptimized.

**Fix:**
- Download project screenshots/images
- Optimize to WebP format (< 100kb each)
- Place in `public/images/projects/`
- Update `data.ts` with local paths

**Impact:** MEDIUM (speed, reliability)  
**Effort:** 1 hour

---

### 9. Add Form Labels for Accessibility & SEO

**Problem:** Contact form uses only `placeholder` text - no labels.

**Fix:**
```tsx
<label htmlFor="name" className="sr-only">Your name</label>
<input id="name" type="text" name="name" placeholder="Your name" ... />
```

**Impact:** LOW-MEDIUM (accessibility, form SEO)  
**Effort:** 15 minutes

---

## MEDIUM (Fix Within 1 Month)

### 10. Fix Schema.org `alumniOf`

**Problem:** `alumniOf.name` is "Master of Computer Applications (MCA)" but should be the institution name.

**Fix:**
```json
"alumniOf": {
  "@type": "EducationalOrganization",
  "name": "Your University Name",
  "description": "Master of Computer Applications (MCA)"
}
```

**Impact:** LOW  
**Effort:** 5 minutes

---

### 11. Add `llms.txt` for AI Search Visibility

Create `public/llms.txt`:
```
# Jatin Verma

## About
Jatin Verma is a Full Stack Developer and UI/UX Designer based in Bhiwani, India.
Specializes in React, Next.js, Node.js, TypeScript, and the MERN stack.

## Services
- Full Stack Web Development
- Frontend Development (React, Next.js)
- Backend Development (Node.js, Express)
- UI/UX Design

## Contact
- Email: vermajatin447@gmail.com
- LinkedIn: linkedin.com/in/jatinverma9728
- GitHub: github.com/Jatinverma9728
- Website: https://devjatin.in
```

**Impact:** MEDIUM (AI search visibility)  
**Effort:** 15 minutes

---

### 12. Optimize Font Loading

**Problem:** Loading 3 font families with 9 weights is excessive.

**Fix:**
- Reduce to essential weights only:
  - Inter: 400, 500, 600 (drop 300, 700)
  - Syne: 700, 800 (drop 600)
  - JetBrains Mono: 400 (drop 500)
- Add `&display=swap` (already present)
- Consider using `font-display: optional` for non-critical fonts

**Impact:** MEDIUM (FCP improvement)  
**Effort:** 15 minutes

---

### 13. Add a Blog Section

**Problem:** With 1 page and ~500 words, there's almost nothing for search engines to index.

**Recommended topics:**
- "Building Interactive Portfolio with React & GSAP"
- "MERN Stack Best Practices in 2026"
- "How I Built [Project Name]: A Technical Deep Dive"
- "Getting Started with Three.js in React"

**Implementation:** Create a separate blog using Next.js or a headless CMS, linked from your portfolio.

**Impact:** VERY HIGH (long-term SEO growth)  
**Effort:** Ongoing

---

### 14. Reduce JavaScript Bundle Size

**Opportunities:**
- Remove `mathjs` (50kb+) - likely unused or replaceable
- Dynamic import Three.js/Spline (only load on desktop)
- Replace `lodash` with individual function imports
- Consider replacing particle canvas with CSS animations for mobile

```ts
// Dynamic import example:
const Scene3D = lazy(() => import('./components/Scene3D'));

// Only render on desktop:
{!isMobile && (
  <Suspense fallback={null}>
    <Scene3D />
  </Suspense>
)}
```

**Impact:** HIGH (performance)  
**Effort:** 2-4 hours

---

### 15. Add `site.webmanifest`

Create `public/site.webmanifest`:
```json
{
  "name": "Jatin Verma - Full Stack Developer",
  "short_name": "JV Portfolio",
  "icons": [
    { "src": "/favicon-32x32.png", "sizes": "32x32", "type": "image/png" },
    { "src": "/apple-touch-icon.png", "sizes": "180x180", "type": "image/png" }
  ],
  "theme_color": "#000000",
  "background_color": "#000000",
  "display": "standalone"
}
```

**Impact:** LOW  
**Effort:** 10 minutes

---

## LOW (Backlog)

### 16. Add More Social Proof

- Get testimonials from SmallFare internship
- Add client testimonials for projects (Chawla Architects, etc.)
- Show GitHub contribution stats
- Add download count or usage metrics for projects

### 17. Improve Meta Description

Shorten to < 160 characters and add CTA:
```
Jatin Verma - Full Stack Developer specializing in React, Next.js & MERN stack. View 5+ interactive projects and get in touch for collaborations.
```

### 18. Add Separate Project Pages (Long-term)

Each project should have its own URL with:
- Detailed case study (500+ words)
- Technical challenges and solutions
- Results/metrics
- Screenshots gallery
- Schema markup (`CreativeWork`)

---

## Implementation Timeline

### Week 1 (Quick Wins)
- [ ] Add crawlable H1 (item 1)
- [ ] Create OG image (item 2)
- [ ] Fix Twitter meta tags (item 6)
- [ ] Add security headers (item 5)
- [ ] Fix loader content visibility (item 4)
- [ ] Add image dimensions (item 7)
- [ ] Add form labels (item 9)

### Week 2
- [ ] Add pre-rendering plugin (item 3B)
- [ ] Self-host images (item 8)
- [ ] Create llms.txt (item 11)
- [ ] Optimize font loading (item 12)
- [ ] Fix alumniOf schema (item 10)
- [ ] Add webmanifest (item 15)

### Week 3-4
- [ ] Reduce bundle size (item 14)
- [ ] Improve meta description (item 17)
- [ ] Add social proof (item 16)

### Month 2+
- [ ] Start blog (item 13)
- [ ] Consider Next.js migration (item 3A)
- [ ] Add project pages (item 18)

---

## Expected Score After Implementation

| Phase | Score | Timeline |
|-------|-------|----------|
| Current | 38/100 | Now |
| After Week 1 | 50/100 | +1 week |
| After Week 2 | 60/100 | +2 weeks |
| After Month 1 | 70/100 | +4 weeks |
| After Blog + Migration | 85/100 | +3 months |
