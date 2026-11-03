# D Nagasumukh — Modern Technical Portfolio

A futuristic, high-performance, developer-centric portfolio engineered for **D Nagasumukh** (Computer Science & Engineering undergraduate at Reva University, Bangalore).

Built to replace slow-booting server-dependent setups with a **zero-cold-start, lightning-fast edge CDN architecture (<150ms render time)**.

---

## ⚡ Key Highlights & Features

- **Dynamic Typing Tagline Cycler**:
  - Automatically scrolls & cycles through:
    `Full stack developer` | `Machine Learning Engineer` | `App Developer`
  - Blinking terminal cursor with variable typing speed and natural pauses.
- **Interactive Cybernetic Canvas**:
  - 60 FPS neural node mesh connecting nodes and reacting dynamically to mouse movement.
- **Interactive Developer CLI Terminal (`nagasumukh@dev:~$`)**:
  - MacOS/Linux styled terminal with clickable command chips and command input.
  - Commands supported: `about` / `cat about.json`, `projects`, `skills`, `awards`, `experience`, `contact`, `clear`.
- **Live Streamlit Projects Showcase**:
  - **Fraud Detection System (XAI)**: `https://etgt-frd-v2-xai.streamlit.app/`
  - **ATS SACS Resume Evaluator**: `https://ats-sacs-resume.streamlit.app/`
  - **Research Lens AI Analyzer**: `https://research-lens-ai.streamlit.app/`
  - **GitHub Open Source Hub**: `https://github.com/nagasumukh01`
  - Category filters: *All*, *Machine Learning & AI*, *Web & Cloud*, *Open Source*.
- **High-Tech Arsenal & Skills**:
  - Interactive proficiency indicators for Python, C, SQL, Java, DSA, UI/UX, ML, and Web stacks.
  - Direct badges for **LeetCode** and **HackerRank** profiles.
- **Experience & Education Timeline**:
  - R&D Intern @ DevCreations & Solutions (Reva Nest)
  - C Program Intern @ PINNACLE
  - B.Tech CSE @ Reva University (CGPA: 8.06), PUC (94.67%), SSLC (87.68%).
- **Awards & Certifications Lightbox Gallery**:
  - Winner @ IIT Jammu Anhad'25 UI/UX Design Challenge (`IIT_jammu_cert.png`)
  - 2nd Runner-up @ Iotopia Hackathon (`iotopia_hackathon_cert.jpg`)
  - Top 14 Finalist @ Pan-India NER Tech Hackathon 2.0 (`NER_cert.png`)
  - Interactive click-to-expand lightbox preview.
- **Contact Channels & Clipboard**:
  - 1-click email copy button with toast notification (`nagasumukh01@gmail.com`).
  - Direct message form and social links (LinkedIn, GitHub, LeetCode, HackerRank).

---

## 🚀 Why Render was Slow vs Why This Architecture is Instant

| Metric | Old Render Free Tier | New Edge Static (Vercel / GitHub Pages) |
| :--- | :--- | :--- |
| **Cold Start Time** | **50 – 90 seconds** (Server spins down after 15 min) | **0.00 seconds** (Instant CDN delivery) |
| **Page Render Speed** | ~2.5s – 4.0s (after wake-up) | **< 150 milliseconds worldwide** |
| **Hosting Cost** | Free (with hibernation) | **100% Free Forever** (No hibernation) |
| **Uptime** | Inconsistent | 99.99% Global Uptime |
| **Maintenance** | Requires Python runtime maintenance | Zero maintenance, zero dependencies |

---

## 🌐 Free 1-Minute Deployment Options

### Option 1: Vercel (Recommended — Highest Speed & Free SSL)
1. Push this directory to your GitHub account (`https://github.com/nagasumukh01/portfolio`).
2. Go to [vercel.com](https://vercel.com) and log in with your GitHub account.
3. Click **"Add New Project"** and select your `portfolio` repository.
4. Click **"Deploy"** (no build settings required — it automatically recognizes `vercel.json`).
5. Your portfolio is live in 10 seconds at `https://your-name.vercel.app` with instant global speeds.

### Option 2: GitHub Pages (100% Free directly on GitHub)
1. Push this directory to a repository named `portfolio` or `nagasumukh01.github.io`.
2. In your GitHub repository, navigate to **Settings** -> **Pages**.
3. Under **Build and deployment** -> **Source**, select **GitHub Actions** (the included `.github/workflows/deploy.yml` workflow will automatically deploy on every push).
4. Your portfolio will be live at `https://nagasumukh01.github.io/portfolio`.

### Option 3: Netlify (Drag-and-Drop)
1. Log in to [netlify.com](https://netlify.com).
2. Simply drag and drop this entire folder into the Netlify dashboard.
3. Instant live link with custom subdomain support.

---

## 📁 File Structure

```text
New Portfolio/
├── index.html                  # Main responsive single-page portfolio
├── vercel.json                 # Vercel CDN caching & clean routing configuration
├── .gitignore                  # Git ignore rules
├── .github/
│   └── workflows/
│       └── deploy.yml          # Automated GitHub Pages CI/CD workflow
├── assets/
│   ├── css/
│   │   └── style.css           # Futuristic cybernetic design, typography & layout
│   ├── js/
│   │   ├── main.js             # Typewriter cycler, neural canvas, lightbox & filters
│   │   └── terminal.js         # Interactive Linux terminal emulator
│   └── images/
│       ├── profile.png         # Profile portrait
│       ├── fraud_detection.svg # Fraud Detection project thumbnail
│       ├── ats-score.png       # ATS SACS project thumbnail
│       ├── research-ai.png     # Research Lens AI thumbnail
│       ├── github_profile.svg  # GitHub open source thumbnail
│       ├── IIT_jammu_cert.png  # IIT Jammu winner certificate
│       ├── iotopia_hackathon_cert.jpg # Iotopia certificate
│       ├── NER_cert.png        # NER hackathon certificate
│       ├── leetcode.png        # LeetCode platform icon
│       └── hackerrank.png      # HackerRank platform icon
└── README.md
```
