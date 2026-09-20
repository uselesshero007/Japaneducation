# Japan Education App

Stitch HTML screens prepared for GitHub Pages and Kodular WebViewer.

Files:
- index.html — Home
- alphabet.html — Hiragana / Katakana
- lessons.html — Vocabulary / Flashcards
- quiz.html — Quiz / Practice
- profile.html — Profile / Progress

The pages use the external fonts/Tailwind resources already present in the Stitch export.

## Offline and progress features

- `app.js` adds the brief creator splash, offline status message, speech-synthesis pronunciation where the device supports it, and local progress for kana practice, study time, favorites, lesson completion, and streaks.
- `sw.js` caches the page shell and keeps previously visited pages and remote assets available after the connection is lost. The first visit should be made online so the browser can populate its cache.
- `manifest.webmanifest` provides the installable PWA metadata. Put the supplied logo at `assets/logo.png`; that path is reserved for the splash/logo slot and PWA icons.
- All learning content remains free and is stored in the existing static pages. No server or account is required.

## Local testing

Service workers require HTTP. From this folder, run `npx --yes http-server -p 4173` and open `http://127.0.0.1:4173/index.html`. Visit each page once while online, then use the browser's offline mode or disconnect the network and reload.

## GitHub Pages

Commit and push the project files to the configured Pages branch. GitHub Pages serves this static structure directly; keep `sw.js`, `manifest.webmanifest`, `app.js`, and the HTML files in the same published root. If the repository is hosted under a project path, the relative URLs in the app keep navigation and service-worker scope working there.
