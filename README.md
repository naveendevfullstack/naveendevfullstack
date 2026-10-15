# Naveen M. — Developer Portfolio

A dashboard-style portfolio for a Flutter developer. Built with React 19, Vite, TypeScript, Tailwind CSS v4, React Router, Motion, Lucide, React Hook Form and Zod.

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build locally
npm run lint       # ESLint
npm run typecheck  # TypeScript only
```

Requires Node 20.19+ (tested on Node 25).

## Adding your real details

All personal content lives in `src/data/`. Nothing personal is hard-coded in components.

When you run `npm run dev`, a **Setup checklist** button sits in the bottom-right corner and lists everything still missing. It never appears in production builds.

| What | Where | Notes |
| --- | --- | --- |
| Email, GitHub, LinkedIn, location, photo | `src/data/profile.ts` | Empty values are hidden. Links appear in the sidebar, rail, contact section and command palette once set. |
| Availability badge | `profile.availability` | Set `open: false` to hide it. |
| Employer name, dates, location | `src/data/experience.ts` | `company`, `period` and `location` are optional and hidden until filled. Add more roles newest-first. |
| Education | `src/data/education.ts` | **The section and nav item are hidden in production while this list is empty.** |
| Projects | `src/data/projects.ts` | Lines marked `VERIFY` need confirming. Add `responsibilities`, `challenges`, `repoUrl`, `liveUrl` and `date` only when they're accurate. Each is hidden when empty. |
| Skills | `src/data/skills.ts` | Remove anything you wouldn't want to discuss in an interview. |
| About cards | `about` in `src/data/profile.ts` | Philosophy, strengths and interests. |

### Project images

Each project currently shows an **original SVG mockup** of its category. It's labelled "Illustrative mockup" so nobody takes it for a real screenshot. To use real screenshots:

1. Put the images in `public/images/projects/`. A 16:10 crop (e.g. 1600×1000, WebP or JPG) fits the cards best.
2. Add them to the project:
   ```ts
   screenshots: [{ src: 'images/projects/eatcircle-home.webp', alt: 'EatCircle home screen with food categories' }],
   ```
   The first screenshot becomes the card thumbnail. All of them appear in a gallery on the detail page.

### Resume

Put your PDF at **`public/resume.pdf`**. The "Download Resume" buttons stay disabled (with a tooltip explaining why) until the site confirms a real PDF is served at that path. The download is saved as `Naveen-M-Flutter-Developer-Resume.pdf`. Change the path or filename in `profile.resume`.

### Contact form

The form validates name, email, subject (3–120 characters) and message (20–4000 characters). It also has a hidden honeypot field and blocks double submissions. How it sends depends on configuration:

1. **Form endpoint (recommended).** Copy `.env.example` to `.env` and set:
   ```
   VITE_CONTACT_ENDPOINT=https://formspree.io/f/your-form-id
   ```
   Any service that accepts a JSON `POST` with `name`, `email`, `subject` and `message` and returns 2xx on success works (Formspree, Getform, a serverless function…). The form only shows success after a 2xx response, and shows an error otherwise. On Vercel or Netlify, set the variable in the project's environment settings.
2. **Mailto fallback.** With no endpoint but an email set in `profile.ts`, the button reads "Open in email app". It opens the visitor's mail client with the message filled in, and says plainly that nothing has been sent yet.
3. **Neither configured.** The form is disabled and says it isn't configured yet.

## Features

- **Dashboard shell:** sticky sidebar with an animated active-section indicator, a top bar with search, theme toggle and resume, and a drawer navigation on mobile and tablet.
- **Command palette:** opens with ⌘K, Ctrl K or `/`. Searches sections, projects (by name, category or tech), skills and actions (theme, resume, copy email, social links). Arrow keys, Home/End, Enter and Escape all work, and it follows the ARIA combobox/listbox pattern.
- **Overview:** hero with an animated gradient name, four stat cards driven by data (the project count comes from `projects.length`), and a profile rail with Latest Work. The rail sits beside the content on screens 1280px and wider, and stacks as cards on smaller screens.
- **Projects:** six cards, each with a lazily loaded detail route at `/projects/:slug`. Detail pages cover overview, problem, features, workflows (e.g. Decode's customer vs. service-agent flows), stack, gallery and previous/next links.
- **Technology coverage matrix:** a contribution-graph style view built *only* from the project data. It's explicitly labelled as not GitHub activity.
- **Skills:** grouped cards with a live filter. No made-up proficiency bars.
- **Light/dark theme:** stored in localStorage, follows the system on first visit, and is applied before first paint.
- **Accessibility:** skip link, semantic landmarks and heading order, visible focus rings, focus traps and focus restore in both dialogs, focus moves to the target section or page heading on navigation, `aria-current` in the nav, labelled form errors with `aria-invalid`, and no state shown by colour alone.
- **Reduced motion:** honoured both by Motion (`MotionConfig reducedMotion="user"`) and in CSS.
- **Performance:** Motion features, the project page and the form libraries (Zod + RHF) all load in separate chunks. The contact form chunk is prefetched when the browser is idle.

## Project structure

```
src/
  app/            App, router, route error boundary
  components/
    common/       Button, Badge, Section, SectionHeading, StatCard, ProjectCard,
                  CommandPalette, ThemeToggle, ResumeButton, Logo/Avatar, BrandIcons,
                  SetupChecklist (dev only)
    layout/       DashboardLayout, Sidebar, SidebarContent, Topbar, MobileNavigation, Footer
    projects/     ProjectGrid, ProjectArt (SVG mockups), ProjectMedia, CapabilityMatrix, LatestWork
    contact/      ContactForm
  sections/       Hero, Stats, ProfileRail, About, Experience, Projects, Skills, Education, Contact
  pages/          HomePage, ProjectPage (lazy), NotFoundPage
  data/           profile, projects, skills, experience, education, navigation
  hooks/          useTheme, useResume, useActiveSection, useSectionNav, useBodyScrollLock, …
  lib/            utils, contact (schema + submit), motionFeatures
  styles/         index.css (design tokens for both themes)
  types/          index.ts
public/
  icons/          favicon.svg, PNG app icons
  images/projects/  (your screenshots)
  og-image.png    1200×630 social preview
  resume.pdf      (add yours)
```

Colours, radii and fonts are CSS variables at the top of `src/styles/index.css`, mapped into Tailwind with `@theme inline`.

## Deployment

The build output is a static SPA in `dist/`. Deep links like `/projects/decode` need SPA fallback, which is already configured for each host:

- **Vercel:** import the repo. `vercel.json` rewrites routes to `index.html`. Framework preset: Vite.
- **Netlify:** import the repo. `netlify.toml` sets the build command, the publish directory and the SPA redirect.
- **GitHub Pages:** for a project site at `https://<user>.github.io/<repo>/`, build with the base path:
  ```bash
  VITE_BASE=/<repo>/ npm run build
  ```
  then publish `dist/` (e.g. with the `actions/deploy-pages` workflow). The build copies `index.html` to `404.html` so deep links work. A user site (`<user>.github.io`) needs no `VITE_BASE`.

**After you have a domain:** change `og:image` in `index.html` to an absolute URL (e.g. `https://yourdomain.com/og-image.png`), because some social platforms need absolute URLs for previews.
