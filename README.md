# Muhammad Usman Khan — Cybersecurity & Computer Science Portfolio

A responsive, single-page React portfolio built with Vite. The site presents Usman's academic background, project work, technical toolkit and interests in malware analysis, reverse engineering and threat research.

## Live website

**Production URL:** https://usman-cyber-portfolio.vercel.app

## Profile details included

- **Name:** Muhammad Usman Khan
- **Education:** BS Computer Science, IBA Sukkur
- **Email:** usmankhan.bscsf24@iba-suk.edu.pk
- **GitHub:** https://github.com/KhannUsman
- **LinkedIn:** https://www.linkedin.com/in/khannusman/

The supplied portrait is stored at `public/images/usman-khan-portrait.png`. It is used as provided; the website applies only a responsive CSS frame/crop.

## Requirements

- Node.js 22 LTS (Vite 8 requires a supported modern Node.js version; use Node 22.12 or newer).
- npm (included with Node.js).

## Easiest way on Windows

1. Extract the ZIP file into a normal folder, for example `Documents\\usman-cyber-portfolio`.
2. Install Node.js 22 LTS from [nodejs.org](https://nodejs.org/) if it is not already installed.
3. Double-click **`START-WEBSITE.bat`**.
4. On the first launch it installs dependencies, starts the Vite development server and opens the site at **http://127.0.0.1:5173**.
5. Keep the terminal window open while working. Close it to stop the local server.

## Run manually (VS Code terminal)

Open the extracted project folder in VS Code, then run:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (normally `http://127.0.0.1:5173`).

## Production build check

Run these commands before deployment:

```bash
npm run build
npm run preview
```

The production-ready files are generated in `dist/`. The preview URL is normally `http://127.0.0.1:4173`.

## GitHub → Netlify / Vercel deployment

To create three meaningful commits locally (the Week 13 requirement), open a terminal in the project folder and run the groups below in order:

```bash
git init
git branch -M main
git add package.json index.html vite.config.js src/main.jsx src/App.jsx
git commit -m "Build React portfolio foundation"

git add src/styles.css public/
git commit -m "Add responsive portfolio design and profile assets"

git add README.md .gitignore .nvmrc netlify.toml vercel.json START-WEBSITE.bat
git commit -m "Prepare deployment configuration and documentation"
```

Then create a **public** GitHub repository (for example `usman-cyber-portfolio`) and connect it:

```bash
git remote add origin https://github.com/KhannUsman/usman-cyber-portfolio.git
git push -u origin main
```

Do not upload `node_modules` or `dist`. Import the repository into Netlify or Vercel and use these settings:

- **Build command:** `npm run build`
- **Publish / output directory:** `dist`

Click **Deploy**. Add the resulting public URL to the **Production URL** line near the top of this README. The three commits above satisfy the assignment's progress-history requirement; later changes pushed to `main` will trigger automatic redeployment.

Configuration files are included for both hosts: `netlify.toml` and `vercel.json`.

## Project structure

```text
usman-cyber-portfolio/
├── public/
│   ├── favicon.svg
│   └── images/
│       └── usman-khan-portrait.png
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── .gitignore
├── .nvmrc
├── index.html
├── netlify.toml
├── package.json
├── vercel.json
├── vite.config.js
└── START-WEBSITE.bat
```

## Included interactions

- Responsive desktop, tablet and mobile navigation.
- Project category filters and detail dialogs.
- Direct email, GitHub and LinkedIn links.
- Copy-email button with a mailto fallback.
- Keyboard-accessible menu and dialogs, skip link and reduced-motion support.

## Content accuracy note

Project cards distinguish academic coursework, lab work and the current website build. Research interests are described as areas of learning rather than professional credentials. Update the project descriptions only when you have concrete completed work to show.

## Before submitting Week 13

- [ ] Push the project to a public GitHub repository.
- [ ] Confirm the live URL works on a phone.
- [ ] Add the live URL to this README.
- [ ] Make at least three commits showing progress.
- [ ] Push one final homepage change and verify the automatic deployment.

## v3 extras

- Boot sequence intro, `Ctrl+K` command palette, three themes (Matrix, Blue team, Red team), scramble headings, 3D tilt cards, skills ticker and scroll-spy navigation.
- Terminal commands: `help`, `whoami`, `skills`, `projects`, `contact`, `ls`, `clear` (plus a hidden easter egg).
- v5: lightweight Three.js hero (subtle wireframe core + starfield), Gmail contact button, vCard download, live PKT clock. Both fall back safely if WebGL is unavailable or reduced motion is on.
- v6: START-FAST.bat runs the optimised production build (much smoother than the dev server). Framer Motion powers the project filter and dialog animations.
- v8: GSAP + ScrollTrigger (hero parallax, scroll-velocity marquee), Lenis smooth scroll (toggle in the Ctrl+K search), Theatre.js intro timeline (add `?studio` in dev to edit it), and lazy-loaded Spline + Rive. Paste your Spline scene URL / Rive file in `src/config.js` to show the "Interactive lab" section.
