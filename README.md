# MUHAMMAD RAHMAT HIDAYAT — VISUAL PORTFOLIO V2

An ultra-premium, high-performance web portfolio for **Muhammad Rahmat Hidayat** (Jakarta // ID). Designed with the strict visual rigor of elite modern studios like **Aristide Benoist** and **Obys Agency**, the site merges high-fashion editorial layouts with responsive, fluid mechanics.

---

## 🎨 Visual Identity & Design Pillars

* **Aesthetic Standard:** A carefully curated, human-styled design system focusing on negative spaces, paper-stone backgrounds, tactile micro-shadows, and asymmetrical typography.
* **Typography:** Clean, geometric tracking-widest editorial sans paired with classical italicized display serifs.
* **Signature Branding:** Features a handcrafted lowercase serif logotype signature (`m. rahmat hidayat`) accented with a dynamic theme-based dot indicator.
* **Grid Curation:** High-contrast grids that automatically adapt, featuring bespoke lightbox overlays that display authentic pixel specifications.

---

## 🛠️ Technical Stack & Innovations

1. **Vite + React 19:** Powered by the fastest modern frontend bundler.
2. **Tailwind CSS v4:** Rigid, utility-first layout blocks with highly tuned transitions.
3. **Framer Motion:** Spring-based kinetic mechanics, custom text fade-ins, and layout-preserving animation tracks.
4. **React Portals Integration:** Modal details are mounted directly under `document.body` to resolve all CSS stacking contexts and navbar z-index overlaps.
5. **Real-time Resolution Extractor:** Instantly loads selected image files in the background on click to query and output their exact physical pixel resolutions (`naturalWidth` x `naturalHeight` PX) in real-time.
6. **Fully Self-Contained Assets:** Migrated all photoshoot brand assets directly inside the workspace under `src/media-database/`, enabling **one-click deployment** on Vercel, Netlify, or GitHub Pages.

---

## 📂 Repository Directory

```
portfolio-web/
├── public/                 # Static public assets (icons, global details)
├── src/
│   ├── components/         # Shared premium layout panels, theme engine triggers
│   ├── pages/
│   │   ├── Home.jsx        # Landing hero screen with geographic markers
│   │   ├── Gallery.jsx     # High-fidelity asset room with interactive modal
│   │   ├── About.jsx       # prestiges biography as Creative Lead
│   │   └── ...
│   ├── media-database/     # Fully integrated high-definition campaign assets
│   ├── data.js             # Dynamic filesystem glob compiler for campaign metadata
│   ├── App.jsx             # Core router and signature header footer mapping
│   ├── index.css           # Global brutalist CSS variables and custom typography
│   └── main.jsx
├── vite.config.js          # Vite config with custom plugins
├── .gitignore              # OS & dependency filter configs
└── README.md               # Visual directory documentation
```

---

## 🚀 Getting Started

### 1. Installation
Clone the repository, open the directory in your terminal, and install all dependencies:
```bash
npm install
```

### 2. Development Mode
Boot up your high-speed local dev server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to experience the site live.

### 3. Production Build
Compile and bundle all visual layers for high-performance deployment:
```bash
npm run build
```
The optimized build artifacts will output inside the `dist/` directory, ready to deploy.

---

## 💼 Creative Footprint

* **Creative Lead & Founder:** Muhammad Rahmat Hidayat
* **Location:** Jakarta // ID
* **Geographical Coordinate Block:** `6.2088 S // 106.8456 E`
* **Status:** Verified Active Agency
