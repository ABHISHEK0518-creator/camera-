SecureSight — CCTV Installation Demo

What this is
- A small, responsive landing page for a CCTV installation business.
- Shows available cameras, specs, pricing, a gallery of previously installed cameras, and animated experience stats.

How to run
1. Open the folder in your file explorer: c:\Users\Dell\Desktop\intel
2. Double-click `index.html` or open it in your browser (Chrome, Edge, Firefox).

Files created
- index.html — main page markup
- styles.css — styles and layout
- script.js — data and interactive behavior (renders cameras, gallery, counters)
- README.md — this file

Customizing
- Edit camera list in `script.js` (the `cameras` array) to update camera offerings.
- Replace gallery image URLs in the `galleryImages` array.
- To wire the contact form to a backend, replace the demo `submit` handler in `script.js` with a fetch() POST.

Notes
- Images are external placeholder images (Unsplash). If you want local images, create an `assets/` directory and update the URLs.
- This is a static demo — no bundler or server required.

Next steps (suggested)
- Add a backend endpoint or Netlify function to accept contact requests.
- Add pricing tiers and installation packages.
- Replace placeholder images with your real installation photos.
