# D Nagasumukh — Modern Technical Portfolio

A futuristic, high-performance, developer-centric portfolio engineered for **D Nagasumukh** (Computer Science & Engineering undergraduate at Reva University, Bangalore).

Repository: [https://github.com/nagasumukh01/New_Portfolio.git](https://github.com/nagasumukh01/New_Portfolio.git)

Built to replace slow-booting server-dependent setups with a **zero-cold-start, lightning-fast edge CDN architecture (<150ms render time)**.

---

## ⚡ Key Highlights & Features

- **Dynamic Typing Tagline Cycler**:
  - Automatically scrolls & cycles through:
    `Full stack developer` | `Machine Learning Engineer` | `App Developer`
  - Blinking terminal cursor with variable typing speed and natural pauses.
- **Unique Celestial Day/Night Orbital Switch**:
  - Custom capsule switch featuring cratered moon & night stars in dark mode, and glowing solar sun with daytime clouds in light mode.
  - Smooth theme transitions with state persistence in `localStorage`.
- **Interactive AI & ML Laboratory**:
  - **Live XAI Fraud Simulator**: Interactive sliders for transaction amounts, feature anomaly perturbations, real-time risk gauges, and dynamic SHAP feature attributions.
  - **2D Neural Decision Boundary Classifier**: Click anywhere on a 2D feature canvas to dynamically generate decision boundary heatmaps across linear, polynomial, and RBF kernels.
- **Hero Neural Synapse Forward Pass**:
  - Interactive neural layer data stream visualizing inputs passing through hidden dense layers into classification output logits.
- **High-Dimensional Latent Space Skills Explorer**:
  - PCA/t-SNE dimensionality reduction projection map of technical skills with real-time Cosine Similarity vector distance calculator.
- **Interactive Developer CLI Terminal (`nagasumukh@dev:~$`)**:
  - MacOS/Linux styled terminal with clickable command chips and command input.
  - Commands supported: `about`, `projects`, `skills`, `awards`, `experience`, `contact`, `clear`.
- **Live Streamlit Projects Showcase**:
  - **Fraud Detection System (XAI)**: `https://etgt-frd-v2-xai.streamlit.app/`
  - **ATS SACS Resume Evaluator**: `https://ats-sacs-resume.streamlit.app/`
  - **Research Lens AI Analyzer**: `https://research-lens-ai.streamlit.app/`
  - **GitHub Open Source Hub**: `https://github.com/nagasumukh01`
  - **Model Architecture Specs Modals**: Deep-dive architecture flow, performance benchmarks, and tech stacks for every project.
- **Interactive Resume (CV) Viewer & Print Engine**:
  - Clean CV modal with 1-click **Print / Save PDF** export.
- **Trophy Hall of Fame & Credentials Vault**:
  - Winner @ IIT Jammu Anhad'25 UI/UX Design Challenge (`IIT_jammu_cert.png`)
  - 2nd Runner-up @ Iotopia Hackathon (`iotopia_hackathon_cert.jpg`)
  - Top 14 Finalist @ Pan-India NER Tech Hackathon 2.0 (`NER_cert.png`)
  - Click-to-expand high-resolution lightbox modal.
- **Top Reading Scroll Progress Bar & Floating HUD Quick-Dock**:
  - Dynamic scroll progress bar and floating quick-navigation dock.

---

## 🚀 Deployment Configurations (Pre-Configured & Ready)

The project includes full configuration files for **Netlify**, **Render**, **Vercel**, and **GitHub Pages**.

### 1. Netlify Deployment (Zero-Config via `netlify.toml`)
This repo includes a pre-configured [`netlify.toml`](./netlify.toml) with edge security headers, asset caching, and SPA rewrites.
1. Log in to [Netlify](https://app.netlify.com).
2. Click **"Add new site"** -> **"Import an existing project"**.
3. Connect your GitHub account and select `nagasumukh01/New_Portfolio`.
4. Netlify will automatically detect:
   - **Publish directory**: `.`
   - **Build command**: *(leave empty)*
5. Click **"Deploy site"**. Your site goes live instantly with global SSL!

### 2. Render Deployment (Zero Cold Start via `render.yaml`)
This repo includes a pre-configured [`render.yaml`](./render.yaml) configured as a **Static Site** on Render's global edge network (which avoids Render's free web server sleep/hibernation delays).
1. Log in to [Render](https://dashboard.render.com).
2. Click **"New +"** -> **"Static Site"** (or **"Blueprint"** to use `render.yaml`).
3. Connect `https://github.com/nagasumukh01/New_Portfolio`.
4. Configure:
   - **Name**: `dnagasumukh-portfolio`
   - **Branch**: `main`
   - **Build Command**: *(leave empty)*
   - **Publish Directory**: `./`
5. Click **"Create Static Site"**. Deploys directly to `https://dnagasumukh-portfolio.onrender.com`.

### 3. Vercel Deployment (via `vercel.json`)
1. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
2. Select `New_Portfolio` and click **"Deploy"**.

### 4. GitHub Pages (via GitHub Actions)
A workflow is already included in [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml). In repo **Settings** -> **Pages**, choose **GitHub Actions** as source.

---

## 📁 File Structure

```text
New Portfolio/
├── index.html                  # Main responsive single-page portfolio
├── netlify.toml                # Netlify edge deployment, headers & rewrite rules
├── render.yaml                 # Render static site deployment configuration
├── vercel.json                 # Vercel CDN caching & clean routing configuration
├── .gitignore                  # Git ignore rules
├── .github/
│   └── workflows/
│       └── deploy.yml          # Automated GitHub Pages CI/CD workflow
├── assets/
│   ├── css/
│   │   └── style.css           # Cyber dark & technical light blueprint styles
│   ├── js/
│   │   ├── main.js             # Theme switch, TTS audio, typewriter, specs & resume modals
│   │   ├── ai-lab.js           # Live XAI Fraud simulator & 2D decision boundary classifier
│   │   ├── ml-engine.js        # Synapse forward pass & latent space skills explorer
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
└── README.md                   # Full documentation & deployment guides
```
