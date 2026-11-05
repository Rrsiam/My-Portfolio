# Robayet Rowshan Siam — Personal Portfolio

A fully responsive, single-page personal portfolio website designed to showcase my research (FYDP), software projects, academic achievements, and certifications.

🔗 **Live Demo:** [https://rrsiam.github.io/My-Portfolio/]

## 🚀 Key Features

- **Modern UI/UX:** Clean, minimal design with a seamless Light/Dark mode toggle (saved via LocalStorage).
- **Dynamic Project Carousel:** A custom-built, auto-playing carousel for featured projects. It includes manual controls (prev/next/dots), a hover-to-pause feature, and mobile touch-swipe support.
- **Interactive Proof Gallery:** Academic waivers and scholarships are displayed in a custom modal carousel that allows users to view multiple documents without leaving the page.
- **Tabbed Certifications:** A filtering system (AI, Cybersecurity, Hackathons, Badges) to organize credentials. PDFs open in a new tab, while external badges link directly to Credly.
- **Research (FYDP) Showcase:** A dedicated section highlighting my Final Year Design Project on Explainable Reinforcement Learning for Clinical Decision Support, complete with a visual benchmark comparison chart.
- **Scroll Animations:** Elements fade and slide in as you scroll, utilizing the `IntersectionObserver` API for performance.
- **Fully Responsive:** Optimized for mobile, tablet, and desktop. Includes a mobile hamburger menu.

## 🛠️ Tech Stack

This project is built from scratch using fundamental web technologies, without relying on heavy frameworks:
- **HTML5** - Semantic structure.
- **CSS3** - Custom properties (variables) for theming, CSS Grid, Flexbox, and media queries.
- **Vanilla JavaScript** - DOM manipulation, Intersection Observers, carousel logic, and modal state management.
- **Font Awesome** - Icons.
- **Google Fonts** - Inter typeface.

## 📂 Project Structure

```text
├── index.html                  # Main HTML structure
├── style.css                   # All styles, themes, and animations
├── script.js                   # Theme toggling, carousels, tabs, and modals
├── rrs.jpeg                    # Profile picture
├── Robayet_Rowshan_Siam_CV.pdf # Downloadable resume
├── certificates/               # Folder containing PDF certificates and hackathon images
└── waivers & scholarships/     # Folder containing images for the achievements modal
