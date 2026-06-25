# GEO Analysis: devjatin.in

**Date:** 2026-06-25  
**Target:** https://devjatin.in  
**Business Type:** Personal Portfolio / Freelance Developer

---

## GEO Readiness Score: 22/100

| Category | Score | Weight | Weighted |
|----------|-------|--------|----------|
| Citability | 15/100 | 25% | 3.75 |
| Structural Readability | 20/100 | 20% | 4.00 |
| Multi-Modal Content | 30/100 | 15% | 4.50 |
| Authority & Brand Signals | 20/100 | 20% | 4.00 |
| Technical Accessibility | 30/100 | 20% | 6.00 |
| **Total** | | **100%** | **22.25** |

---

## Platform Breakdown

| Platform | Estimated Visibility | Status |
|----------|---------------------|--------|
| Google AI Overviews | Very Low | SPA rendering issue; no content for crawlers to cite |
| ChatGPT Web Search | Very Low | No Wikipedia presence, minimal GitHub stars, no Reddit mentions |
| Perplexity | Very Low | No Reddit/forum discussions, no community validation |
| Bing Copilot | Low | Bing renders JS poorly; no IndexNow integration |

---

## AI Crawler Access Status

### robots.txt Analysis

```
User-agent: *
Allow: /
Disallow: /dist/
Disallow: /node_modules/
```

| Crawler | Status | Notes |
|---------|--------|-------|
| GPTBot (OpenAI) | ALLOWED (wildcard) | Good - no explicit block |
| OAI-SearchBot (OpenAI) | ALLOWED (wildcard) | Good |
| ChatGPT-User | ALLOWED (wildcard) | Good |
| ClaudeBot (Anthropic) | ALLOWED (wildcard) | Good |
| PerplexityBot | ALLOWED (wildcard) | Good |
| CCBot (Common Crawl) | ALLOWED (wildcard) | Consider blocking for training |
| Bytespider (ByteDance) | ALLOWED (wildcard) | Consider blocking |

**Assessment:** All AI crawlers are technically allowed, but the critical issue is that **they cannot execute JavaScript**. The page returns an empty `<div id="root"></div>` to all AI crawlers. This is the single biggest GEO failure.

**After our fix:** The `<noscript>` fallback now provides structured content to non-JS crawlers, but this is a partial solution. Full SSR/SSG would be ideal.

---

## llms.txt Status

| Check | Before Fix | After Fix |
|-------|-----------|-----------|
| File exists at `/llms.txt` | MISSING | CREATED (pending deploy) |
| Follows standard format | N/A | YES |
| Contains structured info | N/A | YES - About, Skills, Experience, Projects, Services, Contact |
| Updated regularly | N/A | Needs manual updates with new projects |

**Current live status:** 404 (not yet deployed)  
**After deploy:** Will provide comprehensive structured data for AI crawlers

**Note from Google's AI optimization guide:** Google considers llms.txt as NOT a proven citation lever. However, it can help non-Google AI systems (ChatGPT, Perplexity, Claude) understand your site content when they can't render JavaScript.

---

## Brand Mention Analysis

### Platform Presence

| Platform | Status | Impact on AI Citations |
|----------|--------|----------------------|
| **Wikipedia** | NOT PRESENT | Critical gap - 47.9% of ChatGPT citations come from Wikipedia |
| **Reddit** | NO MENTIONS FOUND | High gap - 46.7% of Perplexity sources, 11.3% of ChatGPT |
| **YouTube** | NOT PRESENT | Highest correlation with AI visibility (0.737) |
| **LinkedIn** | PRESENT (linkedin.com/in/jatinverma9728) | Moderate signal |
| **GitHub** | PRESENT (13 repos, 9 stars, 1 follower) | Weak signal |
| **Dev.to / Medium** | NOT PRESENT | Missing content publishing |
| **Stack Overflow** | UNKNOWN | Community expertise signal |

### Brand Mention Strength

- **Total indexed mentions:** Minimal
- **Estimated brand strength vs. backlinks:** Brand signals are 3x more important than backlinks for AI citations (Ahrefs study). Your brand presence is near-zero across key platforms.

---

## Passage-Level Citability Analysis

### Current Content Assessment

The site's content is almost entirely in JavaScript-rendered components. When it IS rendered, here's the citability:

#### Citable Passages Found: 0

**Why:** No passage on the site meets the optimal 134-167 word self-contained block that AI systems prefer to cite. The content is:
- Very short snippets (project descriptions are 30-50 words)
- Visual/interactive (particle animations, counters)
- Generic statements without specific data

#### What Would Be Citable (if it existed):

A good citable passage would be:
> "Jatin Verma is a Full Stack Developer based in Bhiwani, India, specializing in the MERN stack (MongoDB, Express.js, React, Node.js) with 3+ years of professional experience. He has built production applications handling 1000+ concurrent users, including North Tech Hub, a scalable e-commerce and course platform with 60+ API endpoints and Razorpay payment integration. His frontend work at SmallFare as Team Lead achieved 70% improvement in UI responsiveness and 30% reduction in page load times."

This passage is ~90 words - it has specific claims, data, and is self-contained. But nothing like this exists on the current site.

---

## Server-Side Rendering Check

| Check | Status | Impact |
|-------|--------|--------|
| Rendering method | Client-side only (Vite SPA) | CRITICAL - AI crawlers see empty page |
| First meaningful content | After 3+ seconds (loader) | AI crawlers timeout before content |
| noscript fallback | ADDED (pending deploy) | PARTIAL FIX - provides text content |
| Pre-rendering | Not configured | HIGH PRIORITY |
| React Helmet / Head management | None | Meta tags are static in HTML (good) |

### What AI Crawlers Currently See

```html
<div id="root"></div>
```

### What They Will See After Deploy

```html
<noscript>
  <h1>Jatin Verma - Full Stack Developer & UI/UX Designer</h1>
  <p>Passionate MCA student and full-stack developer...</p>
  <h2>Skills</h2>
  <h2>Projects</h2>
  <h2>Experience</h2>
  <h2>Contact</h2>
</noscript>
```

**Limitation:** `<noscript>` content is only visible when JS is disabled. Some AI crawlers may not render this. SSR/SSG remains the gold standard.

---

## Top 5 Highest-Impact GEO Changes

### 1. Implement Pre-rendering or SSR (Impact: +30 points)

**Why:** AI crawlers (GPTBot, ClaudeBot, PerplexityBot) do NOT execute JavaScript. Zero content is discoverable.

**Options:**
- `vite-plugin-prerender` (quick, generates static HTML at build time)
- Migrate to Next.js with SSG (ideal long-term)
- Use a pre-rendering service (Prerender.io, Rendertron)

### 2. Create Long-Form Citable Content (Impact: +20 points)

**Why:** AI systems cite 134-167 word self-contained passages. Your site has zero.

**Action:**
- Add an "About Me" page with 500+ words of professional narrative
- Write 3-5 case studies (one per major project) with specific metrics
- Create technical blog posts that can be cited

**Example passage structure:**
```
## What is [Project Name]?

[Project Name] is a [type] built with [technology]. It handles [scale/metrics]
and solves [problem]. The key technical challenge was [challenge], solved by
[approach]. This resulted in [measurable outcome].
```

### 3. Build Brand Presence on Reddit & YouTube (Impact: +15 points)

**Why:** Reddit accounts for 46.7% of Perplexity citations and 11.3% of ChatGPT. YouTube mentions have 0.737 correlation with AI visibility.

**Action:**
- Share projects on r/webdev, r/reactjs, r/SideProject
- Create short YouTube tutorials (even 5-minute screen recordings)
- Answer questions on r/learnprogramming with linked examples
- Post on Dev.to and Hashnode (syndicate content)

### 4. Add Specific Data & Statistics (Impact: +10 points)

**Why:** AI systems prioritize content with specific, verifiable claims.

**Action:** Add measurable achievements:
- "Built e-commerce platform handling 1000+ concurrent users"
- "Achieved 70% improvement in UI responsiveness"
- "Delivered 8 production websites in 2024-2025"
- "Reduced page load time by 30%"

### 5. Deploy llms.txt and Optimize robots.txt (Impact: +5 points)

**Why:** Direct channel for AI crawlers to understand your content.

**Action:**
- Deploy the created `llms.txt` (already done, pending push)
- Add explicit AI crawler rules to robots.txt (optional, currently allowed via wildcard)
- Consider blocking training-only crawlers:

```
User-agent: CCBot
Disallow: /

User-agent: Bytespider
Disallow: /
```

---

## Schema Recommendations for AI Discoverability

### Current Schema (Good)
- `Person` with knowsAbout, sameAs, address
- `WebSite` with publisher reference

### Recommended Additions

```json
{
  "@type": "ProfilePage",
  "@id": "https://devjatin.in/#profilepage",
  "mainEntity": { "@id": "https://devjatin.in/#person" },
  "dateCreated": "2024-01-01",
  "dateModified": "2026-05-27"
}
```

```json
{
  "@type": "ItemList",
  "@id": "https://devjatin.in/#projects",
  "name": "Portfolio Projects",
  "numberOfItems": 8,
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "CreativeWork",
        "name": "North Tech Hub",
        "description": "Scalable e-commerce and course platform",
        "url": "https://northtechhub.in/",
        "creator": { "@id": "https://devjatin.in/#person" },
        "programmingLanguage": ["TypeScript", "JavaScript"],
        "applicationCategory": "E-commerce"
      }
    }
  ]
}
```

---

## Content Reformatting Suggestions

### About Section - Current:
> "I'm a passionate MCA student and full-stack developer who thrives on turning complex problems into elegant solutions through code and design."

### About Section - AI-Optimized:
> "Jatin Verma is a Full Stack Developer and UI/UX Designer with 3+ years of experience building production web applications. Based in Bhiwani, India, he specializes in the MERN stack (MongoDB, Express.js, React, Node.js), Next.js, and TypeScript. His work includes 8 production applications ranging from e-commerce platforms handling 1000+ concurrent users to architecture firm portfolios with 3D visualization. As a Team Lead at SmallFare (2025), he improved UI responsiveness by 70% and reduced page load times by 30%."

**Why this is better for AI:**
- Uses third person (matches how AI cites)
- Contains specific metrics
- Self-contained (no "I" that requires context)
- 97 words - close to optimal passage length
- Contains entity links (location, company, technologies)

---

## Quick Win Checklist

- [x] Allow AI crawlers in robots.txt (already allowed via wildcard)
- [x] Create `/llms.txt` (created, pending deploy)
- [x] Add noscript fallback content (created, pending deploy)
- [ ] Deploy changes to production
- [ ] Add publication/update dates visible on page
- [ ] Add author byline with credentials
- [ ] Create 3+ Reddit posts sharing projects
- [ ] Create 1 YouTube video about a project
- [ ] Write first Dev.to/Hashnode article
- [ ] Implement pre-rendering (vite-plugin-prerender)
- [ ] Add question-based headings ("What does Jatin Verma build?")
- [ ] Include specific statistics in About section

---

## Expected Score After Implementation

| Phase | GEO Score | Timeline |
|-------|-----------|----------|
| Current (live) | 22/100 | Now |
| After deploying fixes | 35/100 | This week |
| After pre-rendering + content rewrite | 50/100 | 2 weeks |
| After Reddit/YouTube presence | 60/100 | 1 month |
| After blog + case studies | 75/100 | 3 months |

---

## Key Insight

**Your biggest problem is not optimization - it's visibility.** AI systems cannot see your content at all because:
1. JavaScript rendering blocks all AI crawlers
2. No brand mentions exist on platforms AI systems draw from
3. No citable passages exist (even if content were visible)

The path to AI visibility is: **SSR first → Content depth second → Brand mentions third.**
