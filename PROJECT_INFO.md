# Portfolio Project - Documentation & Changelog

## Project Overview
- **Name**: Portfolio
- **Type**: React + Vite Single Page Application
- **Purpose**: Personal portfolio website showcasing skills, projects, experience, and contact information
- **Tech Stack**: React 19, Vite 7 (rolldown-vite), TailwindCSS 4, Framer Motion, React Router 7

## Project Structure
```
portfolio/
├── public/                 # Static assets (served as-is)
│   ├── Resume.pdf          # Downloadable resume
│   └── vite.svg            # Favicon
├── src/
│   ├── assets/             # Images, icons, media files
│   ├── components/         # Reusable UI components
│   │   ├── Navbar.jsx      # Navigation bar
│   │   └── IntroAnimation.jsx # Landing animation
│   ├── sections/           # Page sections
│   │   ├── Home.jsx        # Hero section
│   │   ├── About.jsx       # About me
│   │   ├── Skills.jsx      # Technical skills
│   │   ├── Projects.jsx    # Project showcase
│   │   ├── Experience.jsx  # Work experience
│   │   ├── Testimonials.jsx # Client/testimonials
│   │   ├── Contact.jsx     # Contact form
│   │   └── Footer.jsx      # Footer
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # Entry point
│   ├── App.css             # Global styles
│   └── index.css           # Base styles + Tailwind imports
├── dist/                   # Production build output (auto-generated)
├── node_modules/           # Dependencies (auto-generated)
├── package.json            # Project configuration
├── vite.config.js          # Vite configuration
├── eslint.config.js        # ESLint configuration
└── .gitignore              # Git ignore rules
```

## Key Features
- **Responsive Design**: Mobile-first with TailwindCSS
- **Animations**: Framer Motion for smooth transitions
- **Contact Form**: EmailJS integration for form submissions
- **PDF Resume**: Embedded PDF viewer with react-pdf
- **Routing**: React Router for multi-page feel
- **Charts**: Recharts for skill visualizations
- **Gesture Support**: react-use-gesture for interactions

## Development Commands
| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build in `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint checks |

## Deployment
- **Platform**: Netlify / Vercel / GitHub Pages
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Node Version**: 18+ (specify in platform settings)

---

## CHANGELOG

### [Unreleased] - Current Development
- **Feature**: Added full-page resume view at `/resume` route with PDF viewer, zoom, rotation, fullscreen, and download controls (src/sections/ResumePage.jsx, src/App.jsx, src/components/Navbar.jsx, src/sections/About.jsx)
- **Feature**: Updated Navbar to use React Router NavLink with Resume link in desktop and mobile menus (src/components/Navbar.jsx)
- **Feature**: Fixed all skill logos visibility - switched to simpleicons.org for WebSockets, Socket.IO, Pandas, NumPy, Matplotlib, Plotly, Playwright, React Testing Library, Multer, System Design (src/sections/Skills.jsx)
- **Feature**: Added CI/CD skills with logos: Jenkins, CircleCI, GitLab CI, Azure DevOps, ArgoCD (src/sections/Skills.jsx)
- **Feature**: Added Light/Dark mode toggle with ThemeContext, persisted in localStorage, **default is dark mode** (src/context/ThemeContext.jsx, src/components/Navbar.jsx, src/index.css, src/App.jsx)
- **Feature**: "Hire Me" buttons now redirect to LinkedIn profile (https://www.linkedin.com/in/sumanjhanp/) instead of email (src/components/Navbar.jsx)
- **Fix**: Fixed mobile menu visibility - increased max-height to 500px, changed overflow to auto for scrollable content (src/components/Navbar.jsx)
- **Fix**: Fixed resume PDF viewing - removed iframe sandbox attribute blocking PDF, added "Open in New Tab" fallback (src/sections/ResumePage.jsx)
- **Fix**: Fixed Navbar navigation - now works from any page: on main page scrolls to section; from /resume navigates home then scrolls to section; Resume link always goes to /resume route (src/components/Navbar.jsx)
- **Refactor**: Removed ResumeModal from About section, replaced with navigation to dedicated resume page (src/sections/About.jsx)
- **Refactor**: Footer now only shows "Download CV" button (removed "View Resume") (src/sections/Footer.jsx)
- **Config**: Added React Router routing for `/resume` route (src/App.jsx)
- Project documentation created (PROJECT_INFO.md)
- .gitignore updated for proper local/dev separation

### [v0.0.1] - Initial Setup
- React + Vite project initialized
- TailwindCSS 4 configured
- Basic project structure created
- Components: Navbar, IntroAnimation
- Sections: Home, About, Skills, Projects, Experience, Testimonials, Contact, Footer
- EmailJS integration for contact form
- PDF resume viewer with react-pdf
- Framer Motion animations
- Recharts for skill visualization

---

## UPDATE LOG (Auto-maintained)

> **Note**: Update this section manually after significant changes, or use the script below.

### How to Update This Log
1. After each feature/fix, add an entry under `[Unreleased]`
2. When releasing, move entries to a new version section
3. Follow format: `- **Type**: Description (files affected)`

### Entry Types
- `Feature` - New functionality
- `Fix` - Bug fix
- `Refactor` - Code restructuring
- `Style` - UI/CSS changes
- `Docs` - Documentation updates
- `Config` - Configuration changes
- `Chore` - Maintenance tasks

---

## LOCAL DEVELOPMENT NOTES

### Files That Should NOT Be Committed to GitHub
See `.gitignore` for the complete list. Key exclusions:

| File/Folder | Reason |
|-------------|--------|
| `node_modules/` | Dependencies (restored via `npm install`) |
| `dist/` | Build output (generated on deployment) |
| `.env` | Environment variables (secrets, API keys) |
| `*.local` | Local overrides |
| `.vscode/` | Editor settings (personal preference) |
| `.DS_Store` | macOS system files |
| `*.log` | Log files |

### Files That SHOULD Be Committed
- All source code in `src/`
- `public/` assets
- `package.json` & `package-lock.json`
- Configuration files: `vite.config.js`, `eslint.config.js`, `tailwind.config.js`
- `.gitignore`
- `README.md`
- `PROJECT_INFO.md` (this file)

### Environment Variables
Create a `.env` file locally (not committed):
```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Access in code: `import.meta.env.VITE_EMAILJS_SERVICE_ID`

---

## QUICK REFERENCE

### Adding a New Section
1. Create `src/sections/NewSection.jsx`
2. Import and add to `src/App.jsx`
3. Add navigation link in `src/components/Navbar.jsx`
4. Update this PROJECT_INFO.md

### Adding a New Project
Edit `src/sections/Projects.jsx` - add to the projects array

### Updating Resume
Replace `public/Resume.pdf` and `src/assets/resume.png` (thumbnail)

### Changing Theme Colors
Edit Tailwind config in `vite.config.js` or `src/index.css`

---

## TROUBLESHOOTING

| Issue | Solution |
|-------|----------|
| Build fails | Delete `node_modules` & `package-lock.json`, run `npm install` |
| Styles not updating | Restart dev server, check Tailwind content paths |
| Images not loading | Use relative paths from `public/` or import in components |
| EmailJS not working | Verify `.env` variables, check browser console |

---

## CONTACT & SUPPORT
- **Repository**: [GitHub URL]
- **Live Demo**: [Deployment URL]
- **Email**: [Your Email]

---

*Last Updated: 2026-10-14*
*This file should be updated with each significant change to the project.*