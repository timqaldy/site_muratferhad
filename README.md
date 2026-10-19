# Murad Ferhad — website

A responsive, English-only static website for ney player, trombonist, composer and ney maker Murad Ferhad. The site keeps its warm neutral palette, editorial serif headlines and personal photographs. The visitor-facing content is present in HTML, so biographies, photographs and videos remain available if JavaScript is unavailable.

## Preview and publishing

- Preview locally: `py -m http.server 8000`, then open `http://localhost:8000/`.
- Build: no build step or package dependencies are required.
- Publish: pushing to `main` starts the GitHub Pages deployment in `.github/workflows/pages.yml`. The existing `CNAME` keeps the custom domain configuration.

## Updating the site

- Short and expanded biographies, section copy, milestones and English interface labels: `index.html`.
- Five music video titles, their order, YouTube links, embed IDs and player titles: `videos.html`. Keep each external link and embed ID paired.
- Photograph order, captions, alt text, crops and gallery expansion: `index.html`; the image files remain in `images/`.
- Background music controls: `script.js`; the audio file is `songs/MuradFerhad_1.mp3`. Playback starts only after the visitor presses the control.
- To add confirmed contact details later, add a populated Contact section and a working `mailto:` destination in `index.html`, then add it to the navigation. No contact address is currently present.

## Existing routes and assets

- `index.html` is the homepage.
- `videos.html` is the dedicated music videos page.
- `styles.css` and `videos.css` contain the shared and video-page styles.
- `images/` contains the supplied personal photographs; `songs/` contains the supplied background recording.
- `assets/` contains the original atmospheric artwork kept with the source project.

No CMS, backend, build tool or dependency installation is required.
